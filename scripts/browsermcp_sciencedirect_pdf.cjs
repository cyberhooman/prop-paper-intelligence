#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const childProcess = require("node:child_process");
const { WebSocket, WebSocketServer } = require("C:/Users/aaidi/AppData/Roaming/npm/node_modules/@browsermcp/mcp/node_modules/ws");

const ROOT = path.resolve(__dirname, "..");
const RAW_DIR = path.join(ROOT, "papers", "raw");
const LOG_DIR = path.join(ROOT, "logs");
const WS_PORT = 9009;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseArgs(argv) {
  const args = {
    paperId: "paper_08",
    url: "https://www.sciencedirect.com/science/article/pii/S014098832400714X",
    pii: "S014098832400714X",
    clickLabel: "View\\s*PDF",
    fallbackUrl: null,
    waitForConnect: 120,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--paper-id") args.paperId = argv[++i];
    else if (arg === "--url") args.url = argv[++i];
    else if (arg === "--pii") args.pii = argv[++i];
    else if (arg === "--click-label") args.clickLabel = argv[++i];
    else if (arg === "--fallback-url") args.fallbackUrl = argv[++i];
    else if (arg === "--wait-for-connect") args.waitForConnect = Number(argv[++i]);
    else throw new Error(`Unknown argument: ${arg}`);
  }

  return args;
}

function extractRef(snapshot, labelPattern) {
  const regex = new RegExp(`(?:link|button) "${labelPattern}" \\[ref=([^\\]]+)\\]`, "i");
  const match = snapshot.match(regex);
  return match ? match[1] : null;
}

function writeDebug(paperId, stage, text) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
  const file = path.join(LOG_DIR, `browsermcp_${paperId}_${stage}.txt`);
  fs.writeFileSync(file, text, "utf8");
  return file;
}

function chromeHistoryTime(ms) {
  return Math.trunc((ms + 11644473600000) * 1000);
}

function queryChromeHistory(pii, sinceChromeTime) {
  const script = String.raw`
import json, os, shutil, sqlite3, sys, tempfile
pii = sys.argv[1].lower()
since_time = int(sys.argv[2])
root = os.path.expandvars(r'%LOCALAPPDATA%\Google\Chrome\User Data')
matches = []
for profile in os.listdir(root):
    hist = os.path.join(root, profile, 'History')
    if not os.path.exists(hist):
        continue
    tmp = os.path.join(tempfile.gettempdir(), 'chrome_history_sciencedirect_' + profile.replace(' ', '_') + '.sqlite')
    try:
        shutil.copy2(hist, tmp)
        con = sqlite3.connect(tmp)
        cur = con.cursor()
        rows = cur.execute("""
            SELECT url, title, last_visit_time FROM urls
            WHERE last_visit_time >= ?
              AND (
                lower(url) LIKE '%sciencedirect%'
                OR lower(url) LIKE '%sciencedirectassets%'
                OR lower(url) LIKE '%elsevier%'
              )
              AND lower(url) LIKE ?
            ORDER BY last_visit_time DESC
            LIMIT 20
        """, (since_time, '%' + pii + '%')).fetchall()
        for url, title, visit_time in rows:
            matches.append({'profile': profile, 'url': url, 'title': title, 'last_visit_time': visit_time})
        con.close()
    except Exception:
        pass
matches.sort(key=lambda row: row['last_visit_time'], reverse=True)
print(json.dumps(matches[:20]))
`;
  try {
    const output = childProcess.execFileSync(
      "python",
      ["-c", script, pii, String(sinceChromeTime)],
      { encoding: "utf8", timeout: 10000 }
    );
    return JSON.parse(output);
  } catch {
    return [];
  }
}

function findRecentChromeDownload(sinceMs) {
  const downloads = path.join(process.env.USERPROFILE, "Downloads");
  if (!fs.existsSync(downloads)) return null;
  const files = fs.readdirSync(downloads)
    .map((name) => path.join(downloads, name))
    .filter((file) => {
      const stat = fs.statSync(file);
      return stat.isFile() && stat.mtimeMs >= sinceMs && path.extname(file).toLowerCase() === ".pdf";
    })
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return files[0] || null;
}

class BrowserMcpDriver {
  constructor(port) {
    this.ws = null;
    this.server = new WebSocketServer({ port });
    this.server.on("connection", (socket) => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.close();
      }
      this.ws = socket;
      console.log("[browsermcp] connected");
    });
  }

  async waitForConnection(timeoutSeconds) {
    const started = Date.now();
    while (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      if ((Date.now() - started) / 1000 > timeoutSeconds) {
        throw new Error("BrowserMCP extension did not connect; click the BrowserMCP extension icon and Connect.");
      }
      await sleep(1000);
    }
  }

  async send(type, payload = {}, timeoutMs = 30000) {
    await this.waitForConnection(1);
    const id = crypto.randomUUID();
    const message = { id, type, payload };

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        cleanup();
        reject(new Error(`WebSocket response timeout after ${timeoutMs}ms`));
      }, timeoutMs);

      const cleanup = () => {
        clearTimeout(timeout);
        this.ws.off("message", onMessage);
        this.ws.off("error", onError);
        this.ws.off("close", onClose);
      };

      const onMessage = (data) => {
        let parsed;
        try {
          parsed = JSON.parse(data.toString());
        } catch {
          return;
        }
        if (parsed.type !== "messageResponse" || parsed.payload?.requestId !== id) return;
        cleanup();
        if (parsed.payload.error) reject(new Error(parsed.payload.error));
        else resolve(parsed.payload.result);
      };

      const onError = () => {
        cleanup();
        reject(new Error("WebSocket error occurred"));
      };

      const onClose = () => {
        cleanup();
        reject(new Error("WebSocket closed"));
      };

      this.ws.on("message", onMessage);
      this.ws.on("error", onError);
      this.ws.on("close", onClose);
      this.ws.send(JSON.stringify(message));
    });
  }

  async snapshotText(status = "") {
    let url = "";
    let title = "";
    let snapshot = "";

    try {
      url = await this.send("getUrl", undefined, 10000);
    } catch (error) {
      url = `[getUrl_error] ${error.message}`;
    }
    try {
      title = await this.send("getTitle", undefined, 10000);
    } catch (error) {
      title = `[getTitle_error] ${error.message}`;
    }
    try {
      snapshot = await this.send("browser_snapshot", {}, 30000);
    } catch (error) {
      snapshot = `[snapshot_error] ${error.message}`;
    }

    return `${status ? `${status}\n` : ""}\n- Page URL: ${url}\n- Page Title: ${title}\n- Page Snapshot\n\`\`\`yaml\n${snapshot}\n\`\`\`\n`;
  }

  close() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.close();
    }
    this.server.close();
  }
}

async function main() {
  const args = parseArgs(process.argv);
  const sinceMs = Date.now() - 2000;
  const sinceChromeTime = chromeHistoryTime(sinceMs);
  const driver = new BrowserMcpDriver(WS_PORT);

  try {
    console.log(`[browsermcp] waiting for extension on port ${WS_PORT}`);
    await driver.waitForConnection(args.waitForConnect);

    console.log(`[${args.paperId}] navigate ${args.url}`);
    await driver.send("browser_navigate", { url: args.url }, 60000);
    await sleep(8000);

    let snapshot = await driver.snapshotText("after article navigation");
    const firstDebug = writeDebug(args.paperId, "sciencedirect_article", snapshot);
    const viewPdfRef = extractRef(snapshot, args.clickLabel);

    if (viewPdfRef) {
      console.log(`[${args.paperId}] click ${args.clickLabel} (${viewPdfRef})`);
      try {
        await driver.send("browser_click", { element: `${args.clickLabel} link`, ref: viewPdfRef }, 60000);
      } catch (error) {
        console.log(`[${args.paperId}] click returned error: ${error.message}; inspecting tab anyway`);
      }
    } else {
      const fallbackUrl = args.fallbackUrl || `${args.url}/pdfft?isDTMRedir=true&download=true`;
      console.log(`[${args.paperId}] no View PDF ref; navigate fallback ${fallbackUrl}`);
      try {
        await driver.send("browser_navigate", { url: fallbackUrl }, 60000);
      } catch (error) {
        console.log(`[${args.paperId}] fallback navigate returned error: ${error.message}; inspecting tab anyway`);
      }
    }

    await sleep(10000);
    snapshot = await driver.snapshotText("after PDF attempt");
    const secondDebug = writeDebug(args.paperId, "sciencedirect_pdf_attempt", snapshot);
    const currentUrl = await driver.send("getUrl", undefined, 10000);
    const history = queryChromeHistory(args.pii, sinceChromeTime);
    const downloaded = findRecentChromeDownload(sinceMs);
    const outPath = path.join(RAW_DIR, `${args.paperId}.pdf`);

    if (downloaded) {
      fs.copyFileSync(downloaded, outPath);
      console.log(JSON.stringify({
        status: "copied_recent_chrome_download",
        paper_id: args.paperId,
        file: outPath,
        source_download: downloaded,
        bytes: fs.statSync(outPath).size,
        article_debug: firstDebug,
        pdf_debug: secondDebug,
        current_url: currentUrl,
        history,
      }, null, 2));
      return;
    }

    console.log(JSON.stringify({
      status: "no_download_found",
      paper_id: args.paperId,
      article_debug: firstDebug,
      pdf_debug: secondDebug,
      current_url: currentUrl,
      history,
    }, null, 2));
  } finally {
    driver.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

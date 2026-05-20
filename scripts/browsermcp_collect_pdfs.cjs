#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const childProcess = require("node:child_process");
const { WebSocket, WebSocketServer } = require("C:/Users/aaidi/AppData/Roaming/npm/node_modules/@browsermcp/mcp/node_modules/ws");

const ROOT = path.resolve(__dirname, "..");
const LINKS_CSV = path.join(ROOT, "metadata", "selected_30_pdf_links.csv");
const RAW_DIR = path.join(ROOT, "papers", "raw");
const LOG_DIR = path.join(ROOT, "logs");
const WS_PORT = 9009;

function parseArgs(argv) {
  const args = {
    ids: null,
    from: null,
    to: null,
    pace: 25,
    waitForConnect: 90,
    skipExisting: true,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--ids") args.ids = argv[++i].split(",").map((s) => s.trim()).filter(Boolean);
    else if (arg === "--from") args.from = argv[++i];
    else if (arg === "--to") args.to = argv[++i];
    else if (arg === "--pace") args.pace = Number(argv[++i]);
    else if (arg === "--wait-for-connect") args.waitForConnect = Number(argv[++i]);
    else if (arg === "--include-existing") args.skipExisting = false;
    else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];

    if (quoted) {
      if (ch === '"' && next === '"') {
        field += '"';
        i += 1;
      } else if (ch === '"') {
        quoted = false;
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"') quoted = true;
    else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += ch;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }

  const [headers, ...body] = rows.filter((r) => r.some((v) => v !== ""));
  return body.map((values) => Object.fromEntries(headers.map((h, idx) => [h, values[idx] ?? ""])));
}

function paperNumber(paperId) {
  const match = paperId.match(/paper_(\d+)/);
  return match ? Number(match[1]) : Number.NaN;
}

function selectRows(rows, args) {
  if (args.ids) {
    const wanted = new Set(args.ids);
    return rows.filter((row) => wanted.has(row.paper_id));
  }

  const from = args.from ? paperNumber(args.from) : 1;
  const to = args.to ? paperNumber(args.to) : 30;
  return rows.filter((row) => {
    const n = paperNumber(row.paper_id);
    return n >= from && n <= to;
  });
}

function ssrnIdFor(row) {
  for (const value of [row.doi, row.doi_url, row.open_landing_url, row.url]) {
    const match = String(value || "").match(/ssrn\.(\d+)|abstract_id=(\d+)/i);
    if (match) return match[1] || match[2];
  }
  return null;
}

function extractRef(snapshot, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(?:link|button) "${escaped}" \\[ref=([^\\]]+)\\]`);
  const match = snapshot.match(regex);
  return match ? match[1] : null;
}

function extractPdfUrlFromSnapshot(snapshot) {
  const urlMatch = snapshot.match(/Page URL:\s+(https?:\/\/[^\s]+\.pdf[^\s]*)/i);
  if (urlMatch) return urlMatch[1];
  const downloadMatch = snapshot.match(/https?:\/\/download\.ssrn\.com\/[^\s"'<>]+/i);
  return downloadMatch ? downloadMatch[0] : null;
}

function extractOpenPdfHref(snapshot) {
  const regex = /link "Open PDF in Browser" \[ref=[^\]]+\]:\r?\n\s+- \/url: ([^\r\n]+)/;
  const match = snapshot.match(regex);
  return match ? match[1].trim() : null;
}

function extractDownloadHref(snapshot) {
  const regex = /link "PDF iconDownload This Paper" \[ref=[^\]]+\]:\r?\n\s+- \/url: ([^\r\n]+)/;
  const match = snapshot.match(regex);
  return match ? match[1].trim() : null;
}

function chromeHistoryTime(ms) {
  return Math.trunc((ms + 11644473600000) * 1000);
}

function queryChromeSignedUrl(ssrnId, token, sinceChromeTime) {
  const script = String.raw`
import json, os, shutil, sqlite3, sys, tempfile
ssrn_id = sys.argv[1]
token = sys.argv[2]
since_time = int(sys.argv[3])
root = os.path.expandvars(r'%LOCALAPPDATA%\Google\Chrome\User Data')
matches = []
for profile in os.listdir(root):
    hist = os.path.join(root, profile, 'History')
    if not os.path.exists(hist):
        continue
    tmp = os.path.join(tempfile.gettempdir(), 'chrome_history_capture_' + profile.replace(' ', '_') + '.sqlite')
    try:
        shutil.copy2(hist, tmp)
        con = sqlite3.connect(tmp)
        cur = con.cursor()
        rows = cur.execute("""
            SELECT url, title, last_visit_time FROM urls
            WHERE lower(url) LIKE '%download.ssrn.com%'
              AND last_visit_time >= ?
              AND (url LIKE ? OR url LIKE ? OR url LIKE ?)
            ORDER BY last_visit_time DESC
            LIMIT 5
        """, (since_time, '%' + ssrn_id + '%', '%' + token + '%', '%abstractId=' + ssrn_id + '%')).fetchall()
        for url, title, visit_time in rows:
            matches.append({'profile': profile, 'url': url, 'title': title, 'last_visit_time': visit_time})
        con.close()
    except Exception:
        pass
matches.sort(key=lambda row: row['last_visit_time'], reverse=True)
print(json.dumps(matches[:1]))
`;
  try {
    const output = childProcess.execFileSync(
      "python",
      ["-c", script, ssrnId, token || "", String(sinceChromeTime)],
      { encoding: "utf8", timeout: 10000 }
    );
    const rows = JSON.parse(output);
    return rows[0]?.url || null;
  } catch {
    return null;
  }
}

function findRecentChromeDownload(token, sinceMs) {
  const downloads = path.join(process.env.USERPROFILE, "Downloads");
  if (!fs.existsSync(downloads)) return null;
  const lowerToken = String(token || "").toLowerCase();
  const files = fs.readdirSync(downloads)
    .map((name) => path.join(downloads, name))
    .filter((file) => {
      const stat = fs.statSync(file);
      const name = path.basename(file).toLowerCase();
      return stat.isFile()
        && stat.mtimeMs >= sinceMs
        && name.endsWith(".pdf")
        && (!lowerToken || name.includes(lowerToken.slice(0, 8)) || name.includes("ssrn"));
    })
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return files[0] || null;
}

function writeDebug(paperId, stage, text) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
  const file = path.join(LOG_DIR, `browsermcp_${paperId}_${stage}.txt`);
  fs.writeFileSync(file, text, "utf8");
  return file;
}

async function downloadPdf(url, outPath) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36",
      "Accept": "application/pdf,*/*",
    },
  });

  const bytes = Buffer.from(await response.arrayBuffer());
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}; ${bytes.length} bytes`);
  }
  if (bytes.slice(0, 4).toString("utf8") !== "%PDF") {
    throw new Error(`not_pdf; content-type=${response.headers.get("content-type")}; bytes=${bytes.length}`);
  }

  fs.writeFileSync(outPath, bytes);
  return bytes.length;
}

class BrowserMcpDriver {
  constructor(port) {
    this.port = port;
    this.ws = null;
    this.server = new WebSocketServer({ port });
    this.server.on("connection", (socket) => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.close();
      }
      this.ws = socket;
      console.log(`[browsermcp] connected`);
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

  async pageSnapshot(status = "") {
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

async function collectOne(driver, row) {
  const outPath = path.join(RAW_DIR, `${row.paper_id}.pdf`);
  const ssrnId = ssrnIdFor(row);
  if (!ssrnId) return { paper_id: row.paper_id, status: "no_ssrn_id" };

  const abstractUrl = `https://papers.ssrn.com/sol3/papers.cfm?abstract_id=${ssrnId}`;
  console.log(`[${row.paper_id}] navigate ${abstractUrl}`);
  try {
    await driver.send("browser_navigate", { url: abstractUrl }, 45000);
  } catch (error) {
    console.log(`[${row.paper_id}] navigate returned error: ${error.message}; inspecting tab anyway`);
  }
  await sleep(5000);

  let snapshot = await driver.pageSnapshot();
  if (/Enable JavaScript and cookies to continue|Checking if the site connection is secure/i.test(snapshot)) {
    console.log(`[${row.paper_id}] waiting for Cloudflare challenge`);
    await sleep(12000);
    snapshot = await driver.pageSnapshot();
  }

  const cookieRef = extractRef(snapshot, "Accept only necessary cookies");
  if (cookieRef) {
    console.log(`[${row.paper_id}] dismiss cookies`);
    await driver.send("browser_click", { element: "Accept only necessary cookies button", ref: cookieRef }, 30000);
    await sleep(1000);
    snapshot = await driver.pageSnapshot();
  }

  if (/under review or has been removed from SSRN|removed from SSRN/i.test(snapshot)) {
    return { paper_id: row.paper_id, status: "unavailable_removed" };
  }

  let openRef = extractRef(snapshot, "Open PDF in Browser");
  if (!openRef) {
    await sleep(2000);
    snapshot = await driver.pageSnapshot();
    openRef = extractRef(snapshot, "Open PDF in Browser");
  }
  if (!openRef) {
    return { paper_id: row.paper_id, status: "no_open_pdf_link" };
  }

  const openHref = extractOpenPdfHref(snapshot);
  const downloadHref = extractDownloadHref(snapshot);
  const downloadRef = extractRef(snapshot, "PDF iconDownload This Paper");
  const deliveryToken = (openHref || downloadHref || "").match(/Delivery\.cfm\/([^?]+)/i)?.[1] || "";
  const historySince = chromeHistoryTime(Date.now() - 2000);
  const downloadSince = Date.now() - 2000;

  if (openHref) {
    const deliveryUrl = new URL(openHref, abstractUrl).href;
    console.log(`[${row.paper_id}] navigate delivery ${deliveryUrl}`);
    try {
      await driver.send("browser_navigate", { url: deliveryUrl }, 45000);
    } catch (error) {
      console.log(`[${row.paper_id}] delivery navigate returned error: ${error.message}; checking URL anyway`);
    }
  } else {
    console.log(`[${row.paper_id}] click Open PDF in Browser (${openRef})`);
    try {
      await driver.send("browser_click", { element: "Open PDF in Browser link", ref: openRef }, 45000);
    } catch (error) {
      console.log(`[${row.paper_id}] click returned error: ${error.message}; checking URL anyway`);
    }
  }
  await sleep(4000);

  snapshot = await driver.pageSnapshot();
  let pdfUrl = extractPdfUrlFromSnapshot(snapshot);
  if (!pdfUrl) {
    pdfUrl = queryChromeSignedUrl(ssrnId, deliveryToken, historySince);
    if (pdfUrl) console.log(`[${row.paper_id}] captured signed URL from Chrome history`);
  }
  if (!pdfUrl) {
    const currentUrl = await driver.send("getUrl", undefined, 10000);
    if (/\.pdf/i.test(currentUrl)) pdfUrl = currentUrl;
  }
  if (!pdfUrl && downloadRef) {
    console.log(`[${row.paper_id}] fallback click Download This Paper (${downloadRef})`);
    try {
      await driver.send("browser_click", { element: "Download This Paper link", ref: downloadRef }, 45000);
    } catch (error) {
      console.log(`[${row.paper_id}] download click returned error: ${error.message}; checking history/downloads`);
    }
    await sleep(6000);
    pdfUrl = queryChromeSignedUrl(ssrnId, deliveryToken, historySince);
    if (pdfUrl) console.log(`[${row.paper_id}] captured clicked-download signed URL from Chrome history`);
  }
  if (!pdfUrl && downloadHref) {
    const downloadUrl = new URL(downloadHref, abstractUrl).href;
    console.log(`[${row.paper_id}] fallback navigate download ${downloadUrl}`);
    try {
      await driver.send("browser_navigate", { url: downloadUrl }, 45000);
    } catch (error) {
      console.log(`[${row.paper_id}] download navigate returned error: ${error.message}; checking history/downloads`);
    }
    await sleep(6000);
    pdfUrl = queryChromeSignedUrl(ssrnId, deliveryToken, historySince);
    if (pdfUrl) console.log(`[${row.paper_id}] captured fallback signed URL from Chrome history`);
  }
  if (!pdfUrl) {
    const downloadedFile = findRecentChromeDownload(deliveryToken, downloadSince);
    if (downloadedFile) {
      fs.copyFileSync(downloadedFile, outPath);
      return { paper_id: row.paper_id, status: "downloaded_from_chrome_downloads", file: path.basename(outPath), bytes: fs.statSync(outPath).size };
    }
    const debugFile = writeDebug(row.paper_id, "no_signed_pdf_url", snapshot);
    return { paper_id: row.paper_id, status: "no_signed_pdf_url", debug: debugFile };
  }

  console.log(`[${row.paper_id}] download signed PDF`);
  const bytes = await downloadPdf(pdfUrl, outPath);
  return { paper_id: row.paper_id, status: "downloaded", file: path.basename(outPath), bytes };
}

async function main() {
  const args = parseArgs(process.argv);
  const rows = selectRows(parseCsv(fs.readFileSync(LINKS_CSV, "utf8")), args);
  const driver = new BrowserMcpDriver(WS_PORT);
  const results = [];

  try {
    console.log(`[browsermcp] waiting for extension on port ${WS_PORT}`);
    await driver.waitForConnection(args.waitForConnect);

    for (const row of rows) {
      const outPath = path.join(RAW_DIR, `${row.paper_id}.pdf`);
      if (args.skipExisting && fs.existsSync(outPath) && fs.statSync(outPath).size > 0) {
        console.log(`[${row.paper_id}] skip existing`);
        results.push({ paper_id: row.paper_id, status: "already_exists" });
        continue;
      }

      try {
        const result = await collectOne(driver, row);
        console.log(`[${row.paper_id}] ${result.status}${result.bytes ? ` (${Math.round(result.bytes / 1024)} KB)` : ""}`);
        results.push(result);
      } catch (error) {
        console.log(`[${row.paper_id}] error: ${error.message}`);
        results.push({ paper_id: row.paper_id, status: "error", error: error.message });
      }

      if (row !== rows[rows.length - 1] && args.pace > 0) {
        await sleep(args.pace * 1000);
      }
    }
  } finally {
    driver.close();
  }

  console.log(JSON.stringify({ results }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

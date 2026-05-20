"""Build intake/ready_for_local_ai.jsonl, rankings/latest_paper_ranking.md,
and rejected/rejected_papers.csv from the metadata CSVs.

This is a pure read-from-metadata + filesystem-check generator. It does NOT
fabricate abstracts; missing abstracts are written as empty strings.

Run from repo root:
    python scripts/build_intake.py
"""
from __future__ import annotations

import csv
import json
import os
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
META_HIGH = REPO_ROOT / "metadata" / "selected_30_high_value_papers.csv"
META_LINKS = REPO_ROOT / "metadata" / "selected_30_pdf_links.csv"
RAW_DIR = REPO_ROOT / "papers" / "raw"
INTAKE_JSONL = REPO_ROOT / "intake" / "ready_for_local_ai.jsonl"
RANKING_MD = REPO_ROOT / "rankings" / "latest_paper_ranking.md"
REJECTED_CSV = REPO_ROOT / "rejected" / "rejected_papers.csv"


def load_high_value() -> dict[str, dict]:
    rows: dict[str, dict] = {}
    with META_HIGH.open(encoding="utf-8", newline="") as fh:
        for row in csv.DictReader(fh):
            rows[row["paper_id"]] = row
    return rows


def load_links() -> dict[str, dict]:
    rows: dict[str, dict] = {}
    with META_LINKS.open(encoding="utf-8", newline="") as fh:
        for row in csv.DictReader(fh):
            rows[row["paper_id"]] = row
    return rows


def split_list(value: str, sep: str) -> list[str]:
    if not value:
        return []
    return [item.strip() for item in value.split(sep) if item.strip()]


def parse_int(value: str | None) -> int | None:
    if value is None or value == "":
        return None
    try:
        return int(float(value))
    except ValueError:
        return None


def build() -> None:
    high = load_high_value()
    links = load_links()

    intake_rows: list[dict] = []
    rejected_rows: list[dict] = []

    for paper_id, meta in high.items():
        link = links.get(paper_id, {})
        local_pdf = link.get("local_pdf", "").strip()
        status = link.get("download_status", "").strip()
        pdf_path = f"papers/raw/{local_pdf}" if local_pdf else ""
        pdf_exists = bool(local_pdf) and (RAW_DIR / local_pdf).exists()

        title = meta.get("title", "").strip()
        authors = split_list(meta.get("authors", ""), ";")
        year = parse_int(meta.get("year"))
        doi = meta.get("doi", "").strip()
        url = meta.get("url", "").strip()
        buckets = split_list(meta.get("buckets", ""), ";")
        rank = parse_int(meta.get("rank"))
        priority = parse_int(meta.get("prop_priority_score"))
        relevance = parse_int(meta.get("relevance_score"))
        abstract = meta.get("abstract", "") or ""

        why_bits = []
        if buckets:
            why_bits.append("tags=" + ",".join(buckets))
        if priority is not None:
            why_bits.append(f"priority={priority}")
        if relevance is not None:
            why_bits.append(f"relevance={relevance}")
        why_selected = "; ".join(why_bits)

        if pdf_exists:
            intake_rows.append(
                {
                    "paper_id": paper_id,
                    "rank": rank,
                    "title": title,
                    "authors": authors,
                    "year": year,
                    "doi": doi,
                    "url": url,
                    "pdf_path": pdf_path,
                    "source": link.get("oa_source", "") or "SSRN",
                    "concept_tags": buckets,
                    "priority_score": priority,
                    "relevance_score": relevance,
                    "why_selected": why_selected,
                    "abstract": abstract,
                    "local_ai_status": "new",
                }
            )
        else:
            rejected_rows.append(
                {
                    "paper_id": paper_id,
                    "rank": meta.get("rank", ""),
                    "title": title,
                    "doi": doi,
                    "url": url,
                    "download_status": status or "unavailable",
                    "reason": (
                        "SSRN removed at author/rights-holder request"
                        if "removed" in status
                        else "No open-access PDF available"
                        if "paywall" in status
                        else "PDF not present in papers/raw"
                    ),
                }
            )

    INTAKE_JSONL.parent.mkdir(parents=True, exist_ok=True)
    with INTAKE_JSONL.open("w", encoding="utf-8", newline="\n") as fh:
        for row in intake_rows:
            fh.write(json.dumps(row, ensure_ascii=False) + "\n")

    REJECTED_CSV.parent.mkdir(parents=True, exist_ok=True)
    with REJECTED_CSV.open("w", encoding="utf-8", newline="") as fh:
        writer = csv.DictWriter(
            fh,
            fieldnames=["paper_id", "rank", "title", "doi", "url", "download_status", "reason"],
        )
        writer.writeheader()
        for row in rejected_rows:
            writer.writerow(row)

    RANKING_MD.parent.mkdir(parents=True, exist_ok=True)
    with RANKING_MD.open("w", encoding="utf-8", newline="\n") as fh:
        fh.write("# Latest Paper Ranking\n\n")
        fh.write(
            "Human-readable shortlist of the highest-relevance academic/SSRN papers "
            "collected by the remote paper agent. PDFs live in `papers/raw/`. "
            "Machine-readable form: `intake/ready_for_local_ai.jsonl`.\n\n"
        )
        fh.write(
            "Scores follow the 0-15 rubric in `docs/REMOTE_PAPER_AGENT_PROMPT.md`. "
            "Ranking does NOT imply any backtest or pass-rate claim.\n\n"
        )
        fh.write("## Collected (PDF available)\n\n")
        fh.write("| Rank | Paper ID | Title | Year | Relevance | Priority | Tags |\n")
        fh.write("|---:|---|---|---:|---:|---:|---|\n")
        for row in sorted(intake_rows, key=lambda r: (r["rank"] or 999)):
            fh.write(
                f"| {row['rank']} | `{row['paper_id']}` | {row['title']} | "
                f"{row['year'] or ''} | {row['relevance_score'] or ''} | "
                f"{row['priority_score'] or ''} | {', '.join(row['concept_tags'])} |\n"
            )
        if rejected_rows:
            fh.write("\n## Rejected / Unavailable\n\n")
            fh.write("See `rejected/rejected_papers.csv` for the full list and reasons.\n")

    print(f"intake rows: {len(intake_rows)}")
    print(f"rejected rows: {len(rejected_rows)}")


if __name__ == "__main__":
    build()

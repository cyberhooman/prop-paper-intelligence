# Local AI Handoff — Instructions

You are the **local AI** that reads this repo after the remote paper agent
has pushed PDFs and metadata. Your job is to extract structured intelligence
from each paper so that a **separate** local strategy-tester (also not in
this repo) can later validate candidate ideas with no-lookahead backtests
and prop-firm rule simulation.

> **Hard boundary.** You do not run backtests. You do not claim a pass rate.
> You do not declare anything live-ready. Your output is hypotheses, risks,
> and priorities — not validated strategies.

## Inputs

- `papers/raw/*.pdf` — the actual PDF you must read.
- `intake/ready_for_local_ai.jsonl` — one row per downloaded PDF. Each row
  has `paper_id`, `pdf_path`, metadata, tags, and `local_ai_status: "new"`.
- `metadata/selected_30_high_value_papers.csv` — broader CSV with abstract
  text if available.
- `rankings/latest_paper_ranking.md` — human-readable shortlist.

## Per-paper extraction schema

For every row in `ready_for_local_ai.jsonl` where `local_ai_status == "new"`,
read the PDF and produce a structured record with these fields:

1. **bibliographic metadata** — title, authors, year, venue, DOI, URL.
2. **claimed edge** — what the paper says works (signal name + direction).
3. **market / instrument scope** — which instruments and asset classes.
4. **timeframe / sampling frequency** — intraday bar size, daily, weekly.
5. **core hypothesis** — one-sentence falsifiable statement.
6. **possible strategy translation** — high-level rules a tester could
   implement. Inputs, signal, entry, exit, sizing.
7. **required data** — bars, news feed, sentiment index, futures curve, etc.
8. **known-before-trade constraints** — what is observable at decision time
   without leaking future information.
9. **lookahead risks** — specific places the paper uses information that
   would not be available live (full-sample normalization, future-anchored
   regimes, look-ahead session classification, in-sample tuning, etc.).
10. **feasibility score (0–5)** — is this implementable with retail/prop data?
11. **testing priority (low / medium / high)** — your subjective ranking.
12. **decision** — one of `reject`, `maybe`, `strong-candidate`.

## Output destination

Local AI output (extractions, candidate specs, edge summaries) does NOT
belong in this repo. Write them into your local working area or into the
separate strategy-tester repo. This repo is intake-only and must stay clean.

After processing a paper, the only mutation to this repo (if any) is to
flip `local_ai_status` from `"new"` to `"processed"` in
`intake/ready_for_local_ai.jsonl`. Do not add extracted markdown,
candidate YAML, or backtest configs here.

## Rules

- Never claim a backtest result, Sharpe, pass rate, drawdown number, or
  live-readiness from a paper alone. Papers are hypotheses.
- Flag any paper whose methodology uses information unavailable at trade
  time. Lookahead risk is a first-class output, not a footnote.
- Be conservative: prefer `maybe` over `strong-candidate` when in doubt.
- Hand off to the strategy tester only after you have made lookahead and
  data-availability risks explicit.

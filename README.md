# prop-paper-intelligence

**Paper-intake repository only.**

This repo collects, scores, and queues academic / SSRN research papers for
downstream review. It is **not** a strategy tester. It runs no backtests,
makes no claims about edge magnitude, and certifies nothing as live-ready.

## System boundary

There are three components in the broader workflow. Only the first lives
here.

```
[1] Remote paper agent        --> THIS REPO
    - Searches SSRN + academic sources
    - Downloads legally available PDFs
    - Saves metadata
    - Scores 0-15 with the rubric in docs/REMOTE_PAPER_AGENT_PROMPT.md
    - Pushes ranked PDFs + metadata

[2] Local AI                  --> separate workspace
    - Pulls this repo
    - Reads PDFs + metadata
    - Extracts hypotheses, edges, lookahead risks
    - Produces candidate specs
    - Output does NOT come back into this repo

[3] Local strategy tester     --> separate repo
    - Receives candidate specs from [2]
    - Runs no-lookahead backtests
    - Simulates prop-firm pass/fail rules
    - Decides what is usable
```

**No paper, ranking, or PDF in this repo proves an 80% prop-firm pass rate
or any pass rate at all.** Papers are hypotheses to be tested, not
strategies that work.

## Directory layout

```
papers/
  raw/                            # downloaded PDFs only
metadata/
  selected_30_high_value_papers.csv
  selected_30_pdf_links.csv
  paper_scores.csv
  ssrn_prop_research_sources.csv  # broader source corpus
intake/
  ready_for_local_ai.jsonl        # machine-readable queue for local AI
rankings/
  latest_paper_ranking.md         # human-readable ranked shortlist
rejected/
  rejected_papers.csv             # unavailable / low-quality / out-of-scope
docs/
  REMOTE_PAPER_AGENT_PROMPT.md
  LOCAL_AI_HANDOFF.md
scripts/
  build_intake.py                 # regenerates intake JSONL + rankings
  browsermcp_collect_pdfs.cjs     # PDF collection helper
  browsermcp_sciencedirect_pdf.cjs
```

## Intake JSONL schema

One row per downloaded PDF in `intake/ready_for_local_ai.jsonl`:

```json
{
  "paper_id": "paper_01",
  "rank": 1,
  "title": "...",
  "authors": ["..."],
  "year": 2020,
  "doi": "...",
  "url": "...",
  "pdf_path": "papers/raw/paper_01.pdf",
  "source": "SSRN/Crossref/etc",
  "concept_tags": ["gold_xau", "intraday_momentum_reversal"],
  "priority_score": 55,
  "relevance_score": 14,
  "why_selected": "Short reason this paper is worth local AI extraction.",
  "abstract": "... if available",
  "local_ai_status": "new"
}
```

Rules:

- Every `pdf_path` must point to a real file under `papers/raw/`.
- No fabricated metadata. Missing fields are empty strings or null.
- Local AI flips `local_ai_status` to `"processed"` after extraction; no
  extracted output is committed here.

## Regenerating the intake queue

After adding or removing PDFs / metadata rows:

```bash
python scripts/build_intake.py
```

This rebuilds:

- `intake/ready_for_local_ai.jsonl`
- `rankings/latest_paper_ranking.md`
- `rejected/rejected_papers.csv`

## See also

- `docs/REMOTE_PAPER_AGENT_PROMPT.md` — instructions for the paper-finding
  agent, including the 0–15 scoring rubric and action thresholds.
- `docs/LOCAL_AI_HANDOFF.md` — instructions for the local AI that reads
  this repo and produces hypothesis extractions for the strategy tester.

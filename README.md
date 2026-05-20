# prop-paper-intelligence

Research-paper intelligence repo for turning academic/trading papers into **testable prop-firm strategy hypotheses**.

This repo is the upstream research funnel. It should not make final trading claims. It extracts, scores, filters, and packages ideas so a separate strategy tester can run no-lookahead backtests, stress costs, rolling prop-firm evaluation, and decision memos.

## Pipeline

```text
papers/raw PDFs
    ↓ Stage 1 extraction
papers/extracted markdown notes
    ↓ Stage 2 scoring/filtering
metadata/paper_scores.csv + notes/topic maps
    ↓ Stage 3 candidate generation
candidates/*.yaml
    ↓ handoff
handoff/ready_for_strategy_tester/*.yaml
    ↓ external strategy tester
backtest + stress validation + decision memo
```

## Rules

- Papers create **hypotheses**, not validated strategies.
- Do not claim an 80%+ pass rate from paper evidence alone.
- A candidate is only usable after no-lookahead validation in the strategy tester.
- Every candidate must list source papers, data requirements, lookahead risks, and validation gates.
- The strategy tester decides final status: `rejected`, `research_promising`, `pass_ready_candidate`, `forward_validation_ready`, or `live_ready`.

## Directory layout

```text
papers/
  raw/                  # original PDFs or paper downloads; can use Git LFS if large
  extracted/            # markdown extraction per paper
metadata/
  ssrn_prop_research_sources.csv
  paper_scores.csv
notes/
  ssrn_prop_research_intake_decision.md
  topic notes
candidates/
  candidate YAML/JSON files ready for review
handoff/
  ready_for_strategy_tester/  # only validated-format candidates go here
rejected/
  ideas rejected before testing, with reason
scripts/
  validation and extraction utilities
templates/
  reusable candidate and extraction templates
```

## Current seeded research

Initial SSRN-indexed corpus and memo are included:

- `metadata/ssrn_prop_research_sources.csv` — 221 source records.
- `notes/ssrn_prop_research_intake_decision.md` — first strategy-research intake memo.

Priority hypotheses from this seed:

1. XAU/OANDA intraday momentum-reversal regime filter.
2. XAU gold news-sentiment overlay.
3. Gold volatility/liquidity/session seasonality filter.
4. Independent commodity adaptive time-series momentum branch.
5. Lower-priority gold/silver or fix-to-fix mean-reversion branch.

## Validate candidate files

```bash
python scripts/validate_candidates.py candidates handoff/ready_for_strategy_tester
```

The validator checks required YAML fields and catches missing handoff information before candidates are sent to the strategy tester.

## Quant strategy tester handoff

Finished research must be promoted into a digestible machine-readable handoff file:

```bash
python scripts/promote_candidate_to_handoff.py candidates/<candidate_id>.yaml
python scripts/validate_candidates.py handoff/ready_for_strategy_tester
```

Use these templates/contracts:

- `templates/strategy_tester_handoff_template.yaml`
- `templates/quant_tester_output_contract.md`
- `handoff/README.md`

The tester should receive precise experiment specs, not raw PDFs or vague summaries.

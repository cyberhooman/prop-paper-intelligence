# Strategy Tester Handoff

This folder contains research outputs that are ready to be consumed by the quant strategy tester.

Do **not** put raw PDFs, loose notes, or vague ideas here. Every file in `ready_for_strategy_tester/` should be a machine-readable YAML candidate that follows `templates/strategy_tester_handoff_template.yaml` and validates with:

```bash
python scripts/validate_candidates.py candidates handoff/ready_for_strategy_tester
```

## Handoff principle

The strategy tester should not need to understand academic papers. It should receive a clear, falsifiable experiment spec:

```text
candidate_id
source papers
strategy family
target instrument/feed/timeframe
feature definitions
entry/filter/exit/risk logic
lookahead rules
data requirements
validation plan
expected output files
promotion/rejection criteria
```

## Status meanings

- `candidate_ready`: researched enough to specify, but not yet copied into handoff.
- `ready_for_strategy_tester`: machine-readable and ready to backtest.
- `in_backtest`: strategy tester has started implementation/validation.
- `rejected`: rejected before or after testing.
- `research_promising`: not pass-ready but worth further study.
- `pass_ready_candidate`: passed historical/stress validation, still not necessarily live-ready.
- `forward_validation_ready`: can be forward-tested.
- `live_ready`: only if the strategy tester decision memo explicitly says so.

## Required tester behavior

The tester must treat handoff files as hypotheses, not truth.

Required checks:

1. No-lookahead feature construction.
2. Baseline comparison against the current active strategy if applicable.
3. Realistic spread/slippage/commission stress grid.
4. Rolling prop-firm pass/fail evaluation.
5. Failure-window attribution.
6. Decision memo with one of the official statuses.

## File naming

Use:

```text
ready_for_strategy_tester/<candidate_id>.yaml
```

Example:

```text
ready_for_strategy_tester/ssrn_semivariance_regime_filter_xau_001.yaml
```

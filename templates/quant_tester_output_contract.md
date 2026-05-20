# Quant Strategy Tester Output Contract

When research is finished, outputs must be digestible by a quant strategy tester and by a human reviewer.

## Required handoff package

Each promoted research idea must include:

1. `handoff/ready_for_strategy_tester/<candidate_id>.yaml`
   - Machine-readable experiment spec.
   - Uses `templates/strategy_tester_handoff_template.yaml`.
2. `papers/extracted/<paper_id>_*.md`
   - Human-readable source extraction.
3. `metadata/paper_scores.csv`
   - Scoring/provenance.
4. Optional: `notes/<topic>.md`
   - Synthesis notes.

## Tester should be able to parse

- `candidate_id`
- `strategy_family`
- `target_system`
- instruments/feed/timeframe
- features and exact calculations
- known-at timestamps and lookahead rules
- entry/filter/exit/risk logic
- cost/stress profiles
- validation checks
- target metrics
- rejection rules
- expected output paths

## Required tester output

The strategy tester should return:

```text
orb_backtest/results/<candidate>_summary.csv
orb_backtest/results/<candidate>_trades.csv
orb_backtest/results/<candidate>_rolling_windows.csv
orb_backtest/results/<candidate>_decision.md
```

The decision memo must contain:

- candidate ID,
- exact command used,
- data sources and date ranges,
- no-lookahead audit result,
- baseline comparison,
- stress-cost results,
- rolling pass rate,
- trade count,
- drawdown and failed-window attribution,
- final status.

## Official statuses

Use only:

- `rejected`
- `research_promising`
- `pass_ready_candidate`
- `forward_validation_ready`
- `live_ready`

Never call a strategy `live_ready` unless all broker, prop-rule, parity, data-depth, and forward-validation gates pass.

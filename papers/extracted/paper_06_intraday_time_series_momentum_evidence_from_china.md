# Paper Extraction: Intraday time‐series momentum: Evidence from China

## Metadata

- Paper ID: `paper_06`
- DOI: `10.1002/fut.22084`
- URL: https://doi.org/10.1002/fut.22084
- Authors: Muzhao Jin; Fearghal Kearney; Youwei Li; Yung Chiang Yang
- Year: 2020
- Source file: pending PDF in `papers/raw/`
- Extraction status: metadata_selected_pending_pdf
- Buckets: `intraday_momentum_reversal;volatility_liquidity_session;commodity_trend`
- Candidate path: `candidate/regime_or_session_filter`
- Priority score: 47

## Abstract / summary

Abstract This study conducts an investigation of intraday time‐series momentum across four Chinese commodity futures contracts: copper, steel, soybean, and soybean meal. Our results indicate that the first half‐hour return positively predicts the last half‐hour return across all four futures. Furthermore, in metals markets, we find that first trading sessions with high volume or volatility are associated with the strongest intraday time‐series momentum dynamics. Based on this, we propose an intraday momentum informed trading strategy that earns a return in excess of standard always long and buy‐and‐hold benchmarks.

## Strategy-relevant claims

Metadata-level inference only. Full-paper extraction required before relying on claims.

- Relevant because selected for: `candidate/regime_or_session_filter`
- Search/relevance buckets: `intraday_momentum_reversal;volatility_liquidity_session;commodity_trend`

## Instruments / markets

To extract from PDF. Metadata suggests possible relevance to gold, commodity futures, intraday markets, news sentiment, volatility/liquidity, trend/momentum, or mean-reversion depending on buckets.

## Timeframes / holding period

To extract from PDF.

## Candidate features

To extract from PDF. Candidate feature families to check:

- Intraday return/momentum state.
- Realized upside/downside semivariance.
- Volatility/liquidity/session buckets.
- Gold/macro/news sentiment features.
- Trend-following/adaptive momentum signals.
- Mean-reversion/pair spread z-scores, if applicable.

## Possible trading logic

To extract from PDF. Do not send to strategy tester until full-paper logic is clear.

## Lookahead / leakage risks

Must verify from PDF and later strategy tester implementation. Common risks:

- Using post-signal candle information before the trade decision.
- Using news/event outcomes before release timestamp.
- Using full-sample normalization instead of rolling/expanding windows.
- Using future volatility/liquidity labels.

## Prop-firm relevance

Metadata-level status: potentially useful. Full-paper review must assess:

- daily loss compatibility,
- spread/slippage sensitivity,
- news restrictions,
- session reset compatibility,
- whether idea is independent from current NSP XAU model.

## Score

- Relevance to XAU/futures/CFD: pending full PDF review
- Testability with available data: pending full PDF review
- Independence from current NSP: pending full PDF review
- Lookahead risk, inverted score: pending full PDF review
- Implementation difficulty, inverted score: pending full PDF review
- Overall priority: 47

## Decision

- Status: selected_for_pdf_collection
- Reason: selected from the 221-paper corpus as one of the 30 highest-value papers for prop strategy research.
- Candidate file, if any: see `candidates/` and `handoff/ready_for_strategy_tester/` after full extraction.

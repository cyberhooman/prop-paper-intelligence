# Paper Extraction: Market microstructure of FT-SE 100 index futures: An intraday empirical analysis

## Metadata

- Paper ID: `paper_29`
- DOI: `10.1002/(sici)1096-9934(199902)19:1<31::aid-fut2>3.0.co;2-h`
- URL: https://doi.org/10.1002/(sici)1096-9934(199902)19:1<31::aid-fut2>3.0.co;2-h
- Authors: Yiuman Tse
- Year: 1999
- Source file: pending PDF in `papers/raw/`
- Extraction status: metadata_selected_pending_pdf
- Buckets: `intraday_momentum_reversal;news_sentiment;volatility_liquidity_session`
- Candidate path: `candidate/news_overlay`
- Priority score: 37

## Abstract / summary

This article examines the market microstructure of the FT-SE Index futures market by analyzing the intraday patterns of bid-ask spreads and trading activity. The patterns are remarkably different from those of stock and options markets because of the futures market's open outcry system with frenzied scalpers/short-term marketmakers. Spreads are stable over the day, but decline sharply at the close and increase when U.S. macroeconomic news is distributed. Traders actively trade at the open with narrow spreads and large trade sizes. Volatility and volume have higher values at the open and close and when U.S. news is released. The overall results suggest that information asymmetry in the index futures market is insignificant, and traders find it easy to control inventory. The results are also broadly consistent with the Grossman and Miller (1988) model that describes liquidity as the price of transaction demand for immediacy. © 1999 John Wiley & Sons, Inc. Jrl Fut Mark 19: 31–58, 1999

## Strategy-relevant claims

Metadata-level inference only. Full-paper extraction required before relying on claims.

- Relevant because selected for: `candidate/news_overlay`
- Search/relevance buckets: `intraday_momentum_reversal;news_sentiment;volatility_liquidity_session`

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
- Overall priority: 37

## Decision

- Status: selected_for_pdf_collection
- Reason: selected from the 221-paper corpus as one of the 30 highest-value papers for prop strategy research.
- Candidate file, if any: see `candidates/` and `handoff/ready_for_strategy_tester/` after full extraction.

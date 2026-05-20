# Paper Extraction: Scheduled FOMC Statements and Cryptocurrency Trading Activity: Intraday Evidence from a 24/7 Market

## Metadata

- Paper ID: `paper_19`
- DOI: `10.2139/ssrn.6299551`
- URL: https://doi.org/10.2139/ssrn.6299551
- Authors: Manlu Yang; Yufeng Wang
- Year: 2026
- Source file: pending PDF in `papers/raw/`
- Extraction status: metadata_selected_pending_pdf
- Buckets: `intraday_momentum_reversal;news_sentiment;volatility_liquidity_session`
- Candidate path: `candidate/news_overlay`
- Priority score: 42

## Abstract / summary

We study how scheduled U.S. monetary policy communication affects cryptocurrency markets in a continuous-trading setting. Combining 41 scheduled FOMC meeting statements (January 2021–January 2026) with hourly BTC–USD and ETH–USD data, we document sharp, concentrated jumps in both volatility and trading activity in the first hour after the 14:00 (New York time) statement release. For Bitcoin, mean absolute hourly returns rise from 0.66% in the hour before the announcement to 1.25% in the first post-announcement hour, while USD trading volume increases by a factor of 2.54. Ethereum exhibits similar effects (0.85% to 1.50%; volume factor 2.81). Matched-week controls, hour-matched placebos, and fixed-effects regressions confirm that these jumps are not explained by intraday seasonality or slow-moving time variation. Cross-venue replication on Bitfinex and robustness to alternative volatility and volume proxies reinforce the conclusion that major cryptocurrencies exhibit sizeable and predictable macro event risk at scheduled FOMC communication times, with direct implications for risk management and liquidity provision.

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
- Overall priority: 42

## Decision

- Status: selected_for_pdf_collection
- Reason: selected from the 221-paper corpus as one of the 30 highest-value papers for prop strategy research.
- Candidate file, if any: see `candidates/` and `handoff/ready_for_strategy_tester/` after full extraction.

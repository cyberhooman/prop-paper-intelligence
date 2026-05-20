# Paper Extraction: Gold Silver Pair Trading -Mean Reversion Strategy Using Machine Learning

## Metadata

- Paper ID: `paper_14`
- DOI: `10.22541/au.176523297.71168178/v1`
- URL: https://doi.org/10.22541/au.176523297.71168178/v1
- Authors: Vineet Kumar Mittal; Richa Mittal
- Year: 2025
- Source file: pending PDF in `papers/raw/`
- Extraction status: metadata_selected_pending_pdf
- Buckets: `gold_xau;news_sentiment;volatility_liquidity_session;mean_reversion_pairs`
- Candidate path: `candidate/news_overlay`
- Priority score: 44

## Abstract / summary

The gold-silver relationship has long served as a benchmark for relative-value and meanreversion trading in commodity markets. This study develops a quantitative framework that integrates classical cointegration analysis with modern machine learning (ML) techniques to enhance trading performance in the gold-silver spread. Using futures and ETF data (COMEX GC-SI, GLD-SLV) from 2015-2025, the paper first confirms long-term cointegration and then applies dynamic hedge estimation via Kalman filtering. Mean reversion signals are standardized through z-score normalization and augmented with ML-based regime filters (Gradient Boosting, Support Vector Machine) trained on volatility, macro, and sentiment features to distinguish stable versus unstable spread conditions. Backtests reveal that ML-filtered mean reversion trades outperform static statistical arbitrage by improving entry precision and reducing drawdowns, particularly during high-volatility regimes such as the 2020 COVID crisis, the 2022 inflation spike, and the 2024 commodity rally. The proposed hybrid framework demonstrates that integrating adaptive learning models into classical econometric approaches significantly enhances profitability and risk control for commodity pair trading. Highlights  Presents a hybrid gold-silver mean reversion framework integrating cointegration, Kalman filtering, and machine learning classifiers.  Demonstrates dynamic hedge ratio estimation using state-space modeling for adaptive spread tracking.  Incorporates machine learning regime filters (Gradient Boosting, SVM) to enhance trade timing and reduce drawdowns.  Backtests across 2015-2025 show superior Sharpe ratios and lower volatility than static statistical arbitrage models.  Extends event-driven and volatility-forecasting methods (Mittal, 2025) to commodity spread trading with risk-controlled execution.

## Strategy-relevant claims

Metadata-level inference only. Full-paper extraction required before relying on claims.

- Relevant because selected for: `candidate/news_overlay`
- Search/relevance buckets: `gold_xau;news_sentiment;volatility_liquidity_session;mean_reversion_pairs`

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
- Overall priority: 44

## Decision

- Status: selected_for_pdf_collection
- Reason: selected from the 221-paper corpus as one of the 30 highest-value papers for prop strategy research.
- Candidate file, if any: see `candidates/` and `handoff/ready_for_strategy_tester/` after full extraction.

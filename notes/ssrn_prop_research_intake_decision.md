# SSRN Prop-Firm Strategy Research Intake Memo

Generated from Crossref/OpenAlex metadata for SSRN-indexed papers because direct `ssrn.com` access is Cloudflare-blocked in this environment. Source corpus saved at `orb_backtest/results/ssrn_prop_research_sources.csv`.

## Scope and hard rule

The goal is **not** to declare a guaranteed 80% prop-firm pass rate from papers. The goal is to extract strategy hypotheses that are plausible enough to feed into this repo's no-lookahead validation system. A candidate only becomes usable after baseline, stress-cost, rolling prop evaluation, and a decision memo.

Current local status remains: `OANDA current-history 100%; final live-ready pending exact-feed history, Pine parity, broker-rule verification, and forward-validation sample growth.`

## Corpus summary

- Queries searched: 25 SSRN/Crossref queries around intraday momentum, futures, gold, news sentiment, volatility/liquidity, mean reversion, trend following, and technical trading rules.
- Records collected: 221
- Most useful buckets:
  - `intraday_momentum_reversal`: 105 matching records
  - `gold_xau_news_sentiment`: 42 matching records
  - `volatility_liquidity_session`: 43 matching records
  - `commodity_futures_trend`: 52 matching records
  - `mean_reversion_pairs`: 23 matching records

## Highest-value papers / evidence trails

- **Intraday Seasonality in Efficiency, Liquidity, Volatility and Volume: Platinum and Gold Futures in Tokyo and New York** (2017) — 10.2139/ssrn.3021533
  - Bucket: `intraday_momentum_reversal`; relevance score: 14
  - Authors: Kentaro Iwatsubo; Clinton Watkins; Tao Xu
- **Liquidity and Volatility in the Chinese Commodity Futures Market: Evidence from Intraday Data** (2015) — 10.2139/ssrn.2626040
  - Bucket: `intraday_momentum_reversal`; relevance score: 13
  - Authors: Ying Jiang; Shamim Ahmed; Xiaoquan Liu
- **Time Series Momentum and Reversal: Intraday Information from Realized Semivariance** (2020) — 10.2139/ssrn.3584014
  - Bucket: `intraday_momentum_reversal`; relevance score: 13
  - Authors: Zhenya Liu; Shanglin Lu; Bo Li; Shixuan Wang
- **Forecasting Intraday Volatility: Evidence from China Gold Futures Market** (2023) — 10.2139/ssrn.4359812
  - Bucket: `intraday_momentum_reversal`; relevance score: 13
  - Authors: Chuxin Ye; Xingguo Luo; Yinsong Xue; Jiamin Lv
- **Market microstructure of FT-SE 100 index futures: An intraday empirical analysis** (1999) — 10.1002/(sici)1096-9934(199902)19:1<31::aid-fut2>3.0.co;2-h
  - Bucket: `intraday_momentum_reversal`; relevance score: 12
  - Authors: Yiuman Tse
  - Abstract note: This article examines the market microstructure of the FT-SE Index futures market by analyzing the intraday patterns of bid-ask spreads and trading activity. The patterns are remarkably different from those of stock and options markets because of the futures market's open outcry system with frenzied scalpers/short-term marketmakers. Spreads are stable ove...
- **Intraday Momentum in Chinese Commodity Futures Markets** (2020) — 10.2139/ssrn.3577431
  - Bucket: `intraday_momentum_reversal`; relevance score: 12
  - Authors: Wei Zhang; Pengfei Wang; Yi Li
- **Gold Silver Pair Trading -Mean Reversion Strategy Using Machine Learning** (2025) — 10.22541/au.176523297.71168178/v1
  - Bucket: `gold_xau_news_sentiment`; relevance score: 14
  - Authors: Vineet Kumar Mittal; Richa Mittal
  - Abstract note: The gold-silver relationship has long served as a benchmark for relative-value and meanreversion trading in commodity markets. This study develops a quantitative framework that integrates classical cointegration analysis with modern machine learning (ML) techniques to enhance trading performance in the gold-silver spread. Using futures and ETF data (COMEX...
- **News Sentiment in the Gold Futures Market** (2013) — 10.2139/ssrn.2309868
  - Bucket: `gold_xau_news_sentiment`; relevance score: 12
  - Authors: Lee A. Smales
- **News Sentiment and Commodity Futures Investing** (2024) — 10.2139/ssrn.4870724
  - Bucket: `gold_xau_news_sentiment`; relevance score: 11
  - Authors: Thanh Vu; Yeguang Chi; Lina El-Jahel
- **Novel and Old News Sentiment in Commodity Futures Markets** (2024) — 10.2139/ssrn.4755296
  - Bucket: `gold_xau_news_sentiment`; relevance score: 11
  - Authors: Lina El-Jahel; Yeguang Chi; Thanh Vu
- **Intraday time‐series momentum: Evidence from China** (2020) — 10.1002/fut.22084
  - Bucket: `volatility_liquidity_session`; relevance score: 12
  - Authors: Muzhao Jin; Fearghal Kearney; Youwei Li; Yung Chiang Yang
  - Abstract note: Abstract This study conducts an investigation of intraday time‐series momentum across four Chinese commodity futures contracts: copper, steel, soybean, and soybean meal. Our results indicate that the first half‐hour return positively predicts the last half‐hour return across all four futures. Furthermore, in metals markets, we find that first trading sess...
- **Is There an Intraday Momentum Effect in Commodity Futures and Options: Evidence from the Chinese Market** (2024) — 10.2139/ssrn.4688712
  - Bucket: `commodity_futures_trend`; relevance score: 12
  - Authors: Luyuan Zheng; Xingguo Luo
- **Adaptive Time Series Momentum: An Objective Benchmark for Systematic Trend-Following Strategies** (2016) — 10.2139/ssrn.2772047
  - Bucket: `commodity_futures_trend`; relevance score: 11
  - Authors: Gert Elaut
- **Commodity Futures Trading Strategies:  Trend-Following and Calendar Spreads** (2017) — 10.2139/ssrn.2942340
  - Bucket: `commodity_futures_trend`; relevance score: 11
  - Authors: Hilary Till; Joseph Eagleeye
- **Time Preference and Commodity Calendar Spread** (2025) — 10.2139/ssrn.5296359
  - Bucket: `mean_reversion_pairs`; relevance score: 10
  - Authors: Bosang Kim
  - Abstract note: We present evidence supporting time preference in commodity market. We show that the time variations of&nbsp; commodity calendar spreads can be driven, predicted, and explained by ambiguity preference variables extracted from the US equity market. A high degree of optimism predicts rising pessimism through mean reversion, which lowers the prices of the fi...
- **Arbitrage Trading Strategy in Gold Futures.** (2026) — 10.2139/ssrn.6077836
  - Bucket: `mean_reversion_pairs`; relevance score: 10
  - Authors: Peter Bell
  - Abstract note: There appears to be an arbitrage trading strategy in the gold market where you are "long" gold overnight, between the London Fix each day. Holding gold price exposure in this way produced reliable profits between 2000 and 2010. In fact, these reliable profits resemble the returns seen with a theoretical example of an inefficient market where a Bollinger B...
- **Futures Trading Under Mean Reversion** (2016) — 10.1142/9789814725927_0005
  - Bucket: `mean_reversion_pairs`; relevance score: 9
  - Abstract note: Futures are an integral part of the universe of derivatives. A futures is a contract that requires the buyer to purchase (seller to sell) a fixed quantity of an asset, such as a commodity, at a fixed price to be paid for on a prespecified future date. Commonly traded on exchanges, there are futures written on various underlying assets or references, inclu...
- **Mean Reversion of Currencies and Futures** (2013) — 10.1002/9781118676998.ch5
  - Bucket: `mean_reversion_pairs`; relevance score: 8
  - Abstract note: Opportunities for mean reversion strategies in currencies and futures are limited but not nonexistent. This chapter will guide the reader toward those situations where mean reversion occurs, such as the trading of futures calendar spreads. In addition, we will discuss a trading strategy for one unique futures intermarket spread: the volatility future vers...

## Candidate hypotheses to feed our system

### 1) Intraday time-series momentum / reversal regime filter

- Literature signal: intraday time-series momentum and intraday reversal effects appear across futures/markets, often conditional on volatility, liquidity, or realized semivariance.
- System feed idea: add a **regime classifier** around the current XAU/independent VBR research rather than replacing the entry logic immediately.
- Testable features:
  - Prior session direction / first-half-day return.
  - Realized upside vs downside semivariance over N bars.
  - Volatility percentile and liquidity/session bucket.
  - Momentum continuation only in high-vol / discrete-information windows; reversal/pullback preference otherwise.
- Why this can help pass rate: it may reduce low-quality windows and avoid trades where pullback logic fights intraday continuation.
- Validation gate: must improve rolling pass rate under stress costs, not just win rate.

### 2) Gold news-sentiment overlay for XAUUSD

- Literature signal: SSRN-indexed work exists on **News Sentiment in the Gold Futures Market** and **News Sentiment and Commodity Futures Investing**.
- System feed idea: create a XAU-specific sentiment/event feature file, separate from the current strategy core.
- Testable features:
  - Scheduled macro event class: CPI, NFP, FOMC, PCE, unemployment, yields-related releases.
  - Directional sentiment score before the signal candle.
  - Novel-vs-old news flag; skip stale-news continuation.
  - Forbidden-news blocker for prop/broker rule compatibility.
- Why this can help pass rate: current live-readiness is blocked partly by news-rule verification; a formal news overlay can both improve edge and enforce prop compliance.
- Validation gate: zero lookahead — only headlines/events known before signal confirmation.

### 3) Volatility/liquidity/session seasonality model for gold

- Literature signal: intraday seasonality in gold/platinum futures, and volatility/liquidity studies, support session-specific behavior.
- System feed idea: tag every candidate trade by session and volatility/liquidity regime.
- Testable features:
  - London open, London fix, NY open, COMEX pit/session overlap, Asia quiet period.
  - ATR percentile and range expansion compression state.
  - Spread proxy / realized range proxy, if exact broker spread history unavailable.
- Why this can help pass rate: prop passing is path-dependent; avoiding high drawdown session buckets can matter more than maximizing total PnL.
- Validation gate: rolling windows must stay above target under widened spread/slippage assumptions.

### 4) Independent commodity trend / adaptive TSMOM branch

- Literature signal: futures trend-following/time-series momentum has broad evidence, but it may be slower than our 30m XAU model.
- System feed idea: build an independent branch, not a tiny tweak to NSP: adaptive trend-following / breakout-retreat model on MGC/XAU/NQ/CL with risk parity sizing.
- Testable features:
  - Adaptive lookback momentum.
  - Volatility-targeted position sizing with prop daily-loss cap.
  - Session filter and daily profit block to comply with prop consistency rules.
- Why this can help pass rate: diversification can stand beside current NSP XAU instead of overfitting one model.
- Validation gate: must pass as an independent family and in combined portfolio stress tests.

### 5) Mean-reversion/pairs branch: gold/silver or fix-to-fix behavior

- Literature signal: SSRN-indexed papers discuss gold futures arbitrage and gold/silver pair-trading mean reversion.
- System feed idea: research only, because prop firms/brokers may not allow the exact cross-asset execution or carry/swap assumptions.
- Testable features:
  - XAU/XAG spread z-score.
  - Overnight/fix-to-fix bias only if broker and prop rules allow holding.
  - Bollinger/volatility-band mean reversion after stretched moves.
- Why this can help pass rate: independent return source.
- Validation gate: strict financing/swap/spread modeling and broker instrument availability.

## Recommended implementation order

1. **Do first:** `xauusd_oanda_ssrn_regime_filter_research.py`
   - Overlay semivariance + intraday momentum/reversal + volatility/session tags onto existing OANDA/XAU 30m signal history.
   - It is the lowest-risk way to use SSRN ideas because it does not mutate the current active Pine logic until validated.
2. **Do second:** `xauusd_oanda_news_sentiment_overlay_research.py`
   - Build a no-lookahead event/sentiment blocker/booster for gold macro events.
3. **Do third:** `xauusd_session_vbr_independent_research.py`
   - Independent volatility/session breakout-retest family to stand beside NSP XAU.
4. **Do later:** gold/silver pairs or fix-to-fix mean reversion only after data and prop/broker permission are confirmed.

## Pass-rate target interpretation

For this repo, an **80%+ pass-rate claim** should require all of these:

- At least the same rolling-window standard used in current decision files.
- Realistic spread/commission/slippage stress.
- No same-candle fill or signal leakage.
- Broker/proper reset-time compatibility.
- Decision memo under `orb_backtest/results/`.
- If used for paid prop: current file must explicitly say live-ready; otherwise it is only research/forward-validation.

## Files produced

- `orb_backtest/results/ssrn_prop_research_sources.csv` — raw source corpus.
- `orb_backtest/results/ssrn_prop_research_intake_decision.md` — this memo.

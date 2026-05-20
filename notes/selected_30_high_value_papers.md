# Selected 30 High-Value Papers for Prop Strategy Research


This file is the filtered Stage 1–3 intake list from the 221-record SSRN/Crossref corpus. These are the first papers to collect as PDFs / full text before deeper extraction. Selection favors direct usefulness for the strategy tester: XAU/gold, futures/CFDs, intraday behavior, news sentiment, volatility/liquidity/session effects, and no-lookahead feature potential.

## How to use this list

- Put available PDFs into `papers/raw/` using the `paper_id` prefix, e.g. `paper_01_<slug>.pdf`.
- Extract each PDF into `papers/extracted/<paper_id>_<slug>.md` using `templates/paper_extraction_template.md`.
- Keep `metadata/paper_scores.csv` updated after full-paper review.
- Only promote to `handoff/ready_for_strategy_tester/` after lookahead/data risks are clear.

## Selected papers

### 01. Intraday Seasonality in Efficiency, Liquidity, Volatility and Volume: Platinum and Gold Futures in Tokyo and New York
- Paper ID: `paper_01`
- Year: 2017
- DOI: `10.2139/ssrn.3021533`
- URL: https://doi.org/10.2139/ssrn.3021533
- Buckets: `gold_xau;intraday_momentum_reversal;volatility_liquidity_session`
- Candidate path: `candidate/regime_or_session_filter`
- Priority score: 55

### 02. Intraday Momentum in Chinese Commodity Futures Markets
- Paper ID: `paper_02`
- Year: 2020
- DOI: `10.2139/ssrn.3577431`
- URL: https://doi.org/10.2139/ssrn.3577431
- Buckets: `intraday_momentum_reversal;volatility_liquidity_session;commodity_trend`
- Candidate path: `candidate/regime_or_session_filter`
- Priority score: 54

### 03. Time Series Momentum and Reversal: Intraday Information from Realized Semivariance
- Paper ID: `paper_03`
- Year: 2020
- DOI: `10.2139/ssrn.3584014`
- URL: https://doi.org/10.2139/ssrn.3584014
- Buckets: `intraday_momentum_reversal`
- Candidate path: `candidate/regime_or_session_filter`
- Priority score: 50

### 04. Forecasting Intraday Volatility: Evidence from China Gold Futures Market
- Paper ID: `paper_04`
- Year: 2023
- DOI: `10.2139/ssrn.4359812`
- URL: https://doi.org/10.2139/ssrn.4359812
- Buckets: `gold_xau;intraday_momentum_reversal;volatility_liquidity_session`
- Candidate path: `candidate/regime_or_session_filter`
- Priority score: 49

### 05. Liquidity and Volatility in the Chinese Commodity Futures Market: Evidence from Intraday Data
- Paper ID: `paper_05`
- Year: 2015
- DOI: `10.2139/ssrn.2626040`
- URL: https://doi.org/10.2139/ssrn.2626040
- Buckets: `intraday_momentum_reversal;volatility_liquidity_session;commodity_trend`
- Candidate path: `candidate/regime_or_session_filter`
- Priority score: 48

### 06. Intraday time‐series momentum: Evidence from China
- Paper ID: `paper_06`
- Year: 2020
- DOI: `10.1002/fut.22084`
- URL: https://doi.org/10.1002/fut.22084
- Buckets: `intraday_momentum_reversal;volatility_liquidity_session;commodity_trend`
- Candidate path: `candidate/regime_or_session_filter`
- Priority score: 47
- Note: Abstract This study conducts an investigation of intraday time‐series momentum across four Chinese commodity futures contracts: copper, steel, soybean, and soybean meal. Our results indicate that the first half‐hour return positively predicts the last half‐hour return across a...

### 07. News Sentiment and Commodity Futures Investing
- Paper ID: `paper_07`
- Year: 2024
- DOI: `10.2139/ssrn.4870724`
- URL: https://doi.org/10.2139/ssrn.4870724
- Buckets: `gold_xau;news_sentiment;commodity_trend`
- Candidate path: `candidate/news_overlay`
- Priority score: 47

### 08. Novel and Old News Sentiment in Commodity Futures Markets
- Paper ID: `paper_08`
- Year: 2024
- DOI: `10.2139/ssrn.4755296`
- URL: https://doi.org/10.2139/ssrn.4755296
- Buckets: `gold_xau;news_sentiment;commodity_trend`
- Candidate path: `candidate/news_overlay`
- Priority score: 47

### 09. Momentum Strategies in Futures Markets and Trend-following Funds
- Paper ID: `paper_09`
- Year: 2012
- DOI: `10.2139/ssrn.1968996`
- URL: https://doi.org/10.2139/ssrn.1968996
- Buckets: `intraday_momentum_reversal;commodity_trend;mean_reversion_pairs`
- Candidate path: `candidate/regime_or_session_filter`
- Priority score: 47

### 10. Reversal, Momentum and Intraday Returns
- Paper ID: `paper_10`
- Year: 2017
- DOI: `10.2139/ssrn.2991183`
- URL: https://doi.org/10.2139/ssrn.2991183
- Buckets: `intraday_momentum_reversal`
- Candidate path: `candidate/regime_or_session_filter`
- Priority score: 46

### 11. Is There an Intraday Momentum Effect in Commodity Futures and Options: Evidence from the Chinese Market
- Paper ID: `paper_11`
- Year: 2024
- DOI: `10.2139/ssrn.4688712`
- URL: https://doi.org/10.2139/ssrn.4688712
- Buckets: `intraday_momentum_reversal;volatility_liquidity_session;commodity_trend`
- Candidate path: `candidate/regime_or_session_filter`
- Priority score: 45

### 12. Market Sentiment in Commodity Futures Returns
- Paper ID: `paper_12`
- Year: 2012
- DOI: `10.2139/ssrn.1934397`
- URL: https://doi.org/10.2139/ssrn.1934397
- Buckets: `gold_xau;news_sentiment;commodity_trend`
- Candidate path: `candidate/news_overlay`
- Priority score: 45

### 13. Predicting Intraday Trading Volume with News Sentiment: An Analysis of U.S. Airline Stocks
- Paper ID: `paper_13`
- Year: 2025
- DOI: `10.2139/ssrn.5534038`
- URL: https://doi.org/10.2139/ssrn.5534038
- Buckets: `intraday_momentum_reversal;news_sentiment`
- Candidate path: `candidate/news_overlay`
- Priority score: 45

### 14. Gold Silver Pair Trading -Mean Reversion Strategy Using Machine Learning
- Paper ID: `paper_14`
- Year: 2025
- DOI: `10.22541/au.176523297.71168178/v1`
- URL: https://doi.org/10.22541/au.176523297.71168178/v1
- Buckets: `gold_xau;news_sentiment;volatility_liquidity_session;mean_reversion_pairs`
- Candidate path: `candidate/news_overlay`
- Priority score: 44
- Note: The gold-silver relationship has long served as a benchmark for relative-value and meanreversion trading in commodity markets. This study develops a quantitative framework that integrates classical cointegration analysis with modern machine learning (ML) techniques to enhance ...

### 15. Cross-Market Intraday Time-Series Momentum
- Paper ID: `paper_15`
- Year: 2024
- DOI: `10.2139/ssrn.4765613`
- URL: https://doi.org/10.2139/ssrn.4765613
- Buckets: `intraday_momentum_reversal;volatility_liquidity_session`
- Candidate path: `candidate/regime_or_session_filter`
- Priority score: 44

### 16. Market Intraday Momentum in Japan: Evidence from the Nikkei Stock Index
- Paper ID: `paper_16`
- Year: 2024
- DOI: `10.2139/ssrn.4816793`
- URL: https://doi.org/10.2139/ssrn.4816793
- Buckets: `intraday_momentum_reversal;volatility_liquidity_session`
- Candidate path: `candidate/regime_or_session_filter`
- Priority score: 44

### 17. Trend Following, Risk Parity and Momentum in Commodity Futures
- Paper ID: `paper_17`
- Year: 2012
- DOI: `10.2139/ssrn.2126813`
- URL: https://doi.org/10.2139/ssrn.2126813
- Buckets: `intraday_momentum_reversal;commodity_trend;mean_reversion_pairs`
- Candidate path: `candidate/regime_or_session_filter`
- Priority score: 42

### 18. Time-Series Momentum in the Chinese Commodity Futures Market
- Paper ID: `paper_18`
- Year: 2019
- DOI: `10.2139/ssrn.3311479`
- URL: https://doi.org/10.2139/ssrn.3311479
- Buckets: `intraday_momentum_reversal;commodity_trend`
- Candidate path: `candidate/regime_or_session_filter`
- Priority score: 42

### 19. Scheduled FOMC Statements and Cryptocurrency Trading Activity: Intraday Evidence from a 24/7 Market
- Paper ID: `paper_19`
- Year: 2026
- DOI: `10.2139/ssrn.6299551`
- URL: https://doi.org/10.2139/ssrn.6299551
- Buckets: `intraday_momentum_reversal;news_sentiment;volatility_liquidity_session`
- Candidate path: `candidate/news_overlay`
- Priority score: 42
- Note: We study how scheduled U.S. monetary policy communication affects cryptocurrency markets in a continuous-trading setting. Combining 41 scheduled FOMC meeting statements (January 2021–January 2026) with hourly BTC–USD and ETH–USD data, we document sharp, concentrated jumps in b...

### 20. News Sentiment in the Gold Futures Market
- Paper ID: `paper_20`
- Year: 2013
- DOI: `10.2139/ssrn.2309868`
- URL: https://doi.org/10.2139/ssrn.2309868
- Buckets: `gold_xau;news_sentiment`
- Candidate path: `candidate/news_overlay`
- Priority score: 41

### 21. Commodity Futures Trading Strategies:  Trend-Following and Calendar Spreads
- Paper ID: `paper_21`
- Year: 2017
- DOI: `10.2139/ssrn.2942340`
- URL: https://doi.org/10.2139/ssrn.2942340
- Buckets: `intraday_momentum_reversal;commodity_trend;mean_reversion_pairs`
- Candidate path: `candidate/regime_or_session_filter`
- Priority score: 41

### 22. Partially Overlapping Time Series: A New Model for Volatility Dynamics in Commodity Futures
- Paper ID: `paper_22`
- Year: 2011
- DOI: `10.2139/ssrn.711386`
- URL: https://doi.org/10.2139/ssrn.711386
- Buckets: `intraday_momentum_reversal;volatility_liquidity_session;commodity_trend`
- Candidate path: `candidate/regime_or_session_filter`
- Priority score: 41

### 23. Momentum Strategies in Commodity Futures Markets
- Paper ID: `paper_23`
- Year: 2011
- DOI: `10.2139/ssrn.702281`
- URL: https://doi.org/10.2139/ssrn.702281
- Buckets: `intraday_momentum_reversal;commodity_trend`
- Candidate path: `candidate/regime_or_session_filter`
- Priority score: 40

### 24. Factor Momentum in Commodity Futures Markets
- Paper ID: `paper_24`
- Year: 2024
- DOI: `10.2139/ssrn.4726027`
- URL: https://doi.org/10.2139/ssrn.4726027
- Buckets: `intraday_momentum_reversal;commodity_trend`
- Candidate path: `candidate/regime_or_session_filter`
- Priority score: 40

### 25. Adaptive Time Series Momentum: An Objective Benchmark for Systematic Trend-Following Strategies
- Paper ID: `paper_25`
- Year: 2016
- DOI: `10.2139/ssrn.2772047`
- URL: https://doi.org/10.2139/ssrn.2772047
- Buckets: `intraday_momentum_reversal;commodity_trend`
- Candidate path: `candidate/regime_or_session_filter`
- Priority score: 39

### 26. The Impact of Futures Trading on Intraday Spot Volatility and Liquidity: Evidence from Bitcoin Market
- Paper ID: `paper_26`
- Year: 2018
- DOI: `10.2139/ssrn.3094647`
- URL: https://doi.org/10.2139/ssrn.3094647
- Buckets: `intraday_momentum_reversal;volatility_liquidity_session`
- Candidate path: `candidate/regime_or_session_filter`
- Priority score: 39

### 27. Investor Sentiment in Gold and Gold Futures Market: Evidence from Chatgpt-Generated Sentiment Index
- Paper ID: `paper_27`
- Year: 2024
- DOI: `10.2139/ssrn.4877214`
- URL: https://doi.org/10.2139/ssrn.4877214
- Buckets: `gold_xau;news_sentiment`
- Candidate path: `candidate/news_overlay`
- Priority score: 39

### 28. Long Memory and Periodicity in Intraday Volatility of Stock Index Futures
- Paper ID: `paper_28`
- Year: 2011
- DOI: `10.2139/ssrn.1460625`
- URL: https://doi.org/10.2139/ssrn.1460625
- Buckets: `intraday_momentum_reversal;volatility_liquidity_session`
- Candidate path: `candidate/regime_or_session_filter`
- Priority score: 38

### 29. Market microstructure of FT-SE 100 index futures: An intraday empirical analysis
- Paper ID: `paper_29`
- Year: 1999
- DOI: `10.1002/(sici)1096-9934(199902)19:1<31::aid-fut2>3.0.co;2-h`
- URL: https://doi.org/10.1002/(sici)1096-9934(199902)19:1<31::aid-fut2>3.0.co;2-h
- Buckets: `intraday_momentum_reversal;news_sentiment;volatility_liquidity_session`
- Candidate path: `candidate/news_overlay`
- Priority score: 37
- Note: This article examines the market microstructure of the FT-SE Index futures market by analyzing the intraday patterns of bid-ask spreads and trading activity. The patterns are remarkably different from those of stock and options markets because of the futures market's open outc...

### 30. Intraday Time Series Momentum: International Evidence
- Paper ID: `paper_30`
- Year: 2019
- DOI: `10.2139/ssrn.3460965`
- URL: https://doi.org/10.2139/ssrn.3460965
- Buckets: `intraday_momentum_reversal`
- Candidate path: `candidate/regime_or_session_filter`
- Priority score: 37

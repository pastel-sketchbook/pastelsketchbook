---
type: video
videoId: P-QVC5lOMbU
category: finance
tags: [curiosity]
views: 3
date: 2026-06-03T11:00:02Z
summarized: 2026-06-03T23:20:00.000Z
---

# The Architecture of Insurance Pricing

> [finance](../finance.md) · 3 views · Jun 3, 2026
> [Watch on YouTube](https://youtu.be/P-QVC5lOMbU)

## Summary

A walkthrough of modern actuarial ratemaking that decomposes insurance pricing into frequency, severity, and pure-premium models and shows why Generalized Linear Models (GLMs) — fit via Iteratively Reweighted Least Squares — remain the regulator-friendly workhorse of the industry. The talk explores the Tweedie variance spectrum (Poisson at p=1, gamma at p=2, compound Poisson-gamma in between) and contrasts GLMs with ML approaches like gradient boosting that increasingly ride on top for feature engineering and residual modeling.

## Key Takeaways

- The fundamental insurance equation balances profit/risk margin, expenses, and expected claims cost against premium revenue, with insolvency on one side and lost market share on the other.
- Risk segmentation differentiates customers using line-specific factors (driver age and vehicle for auto, mortality and health metrics for life, demographics and property characteristics for health/property) to prevent cross-subsidization and stay regulator-compliant.
- GLMs decompose into three plug-in components — random (distribution family from the exponential family), systematic (linear predictor η = Xβ), and link function (log link enables multiplicative rating tables) — fit via IRLS until convergence.
- The Tweedie sweet spot 1 < p < 2 yields the compound Poisson-gamma distribution that models claim frequency and severity simultaneously, which is why Tweedie GLMs dominate pure-premium modeling.
- Production diagnostics rely on lift curves and Gini/Lorenz curves for segmentation power, deviance and Pearson residuals for fit, exposure-weighted residuals for fairness, and VIF for multicollinearity between rating factors.

## Topics Covered

`generalized linear models` · `tweedie distribution` · `iteratively reweighted least squares` · `frequency and severity modeling` · `pure premium` · `multiplicative rating tables` · `actuarial diagnostics` · `risk segmentation` · `ai actuarial pricing`

## Tags

[curiosity](../tags/curiosity.md)

## Related Videos

- [The Strategic Guide to Annuities](https://youtu.be/UGQ-ItKwJNw) — Finance · 38 views · May 28, 2026 · [Details](UGQ-ItKwJNw.md) (shared: `premium` · `risk`)
- [SOMA: Unifying Parametric Human Body Models](https://youtu.be/yZLe26ZkBT4) — Finance · 31 views · Aug 2, 2026 · [Details](yZLe26ZkBT4.md) (shared: `linear` · `models`)
- [The 2026 Barbell Strategy](https://youtu.be/bn-Nvmxgur8) — Finance · 33 views · Feb 17, 2026 · [Details](bn-Nvmxgur8.md) (shared: `risk`)
- [An Ambitious Ascent](https://youtu.be/MDNRiJN7aEg) — Finance · 11 views · Dec 29, 2025 · [Details](MDNRiJN7aEg.md) (shared: `risk`)
- [The Mystery of the Nickel Coke](https://youtu.be/l9UUqD2Bz2E) — Finance · 15 views · Apr 10, 2026 · [Details](l9UUqD2Bz2E.md) (shared: `pricing`)

---
*Auto-generated on Jun 3, 2026. Back to [finance](../finance.md) · [index](../index.md).*

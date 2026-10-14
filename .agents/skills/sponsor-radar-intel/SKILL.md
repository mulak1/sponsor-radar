---
name: sponsor-radar-intel
description: Deterministic media-buying intelligence skill for SponsorRadar (#2). Provides exact formulas for Podcast/Newsletter/YouTube CPM estimation, 3x-Renewal Velocity ROI Scoring, Promo-Code Attribution Decay, Transcript Ad-Read Entity Extraction, and Outbound Sponsorship Pitch Readiness.
---

# SponsorRadar Intelligence Skill (`sponsor-radar-intel`)

Use this skill whenever calculating sponsorship spend, grading creator renewal velocity, extracting sponsor metadata from ad-read transcripts/newsletters, or generating data-backed outbound sponsorship pitches.

---

## 1. Deterministic CPM & Monthly Spend Formulas

### A. Effective Placement Cost (Podcast & YouTube)
$$\text{Placement Cost} = \left(\frac{\text{Verified 30-Day Views or Downloads}}{1,000}\right) \times \text{Base CPM} \times M_{\text{position}} \times M_{\text{niche}}$$

Where:
- **Position Multiplier ($M_{\text{position}}$)**:
  - `Pre-Roll (15–30s)`: $0.80$
  - `Mid-Roll Host-Read (60–90s)`: $1.25$
  - `Post-Roll (15–30s)`: $0.45$
  - `Title / Exclusive Simulcast`: $1.60$
- **Niche Authority Multiplier ($M_{\text{niche}}$)**:
  - `B2B SaaS / DevTools / AI / Fintech / Executive`: $1.45$ (Typical effective CPM: $\$42 - \$85$)
  - `Health / Biohacking / Performance`: $1.25$ (Typical effective CPM: $\$32 - \$55$)
  - `General Business / Startups`: $1.15$ (Typical effective CPM: $\$28 - \$45$)
  - `General Consumer / Entertainment`: $0.85$ (Typical effective CPM: $\$15 - \$25$)

### B. Newsletter Effective Open CPM (eCPM)
$$\text{Newsletter Slot Cost} = \left(\frac{\text{Subscribers} \times \text{Verified Open Rate}}{1,000}\right) \times \text{Open eCPM} \times M_{\text{slot}}$$
- Primary Top Deep-Dive ($M_{\text{slot}} = 1.30$), Mid-Issue Native Block ($M_{\text{slot}} = 1.00$), Quick-Link Classified ($M_{\text{slot}} = 0.35$).

---

## 2. 3x-Renewal Velocity Score ($S_{\text{renewal}} \in [0, 100]$)

To separate high-converting sponsor partnerships from failed 1-off tests, calculate the **3x-Renewal Velocity Score**:

$$S_{\text{renewal}} = \min\left(100, \;\; 35 \cdot \ln(1 + N_{\text{flights}}) + 25 \cdot I(\text{Flights} \ge 3) + 20 \cdot C_{\text{consistency}} + 20 \cdot A_{\text{attribution}}\right)$$

Where:
- $N_{\text{flights}}$: Total verified sponsorship appearances between the Brand and Show/Newsletter.
- $I(\text{Flights} \ge 3)$: Indicator function ($1$ if $N_{\text{flights}} \ge 3$, else $0$) capturing the **3x-Renewal Threshold**.
- $C_{\text{consistency}} \in [0, 1]$: Cadence regularity across consecutive months/quarters.
- $A_{\text{attribution}} \in [0, 1]$: Attribution tracking rigor ($1.0$ if dedicated vanity URL + custom promo code + UTM parameter are active; $0.5$ if only link or code; $0.2$ if brand awareness mention only).

**Classification Bands**:
- **80–100 (`3x+ PROVEN WINNER`)**: Verified profitable unit economics. Direct-response CAC is clearing internal thresholds.
- **55–79 (`2x SCALING FLIGHT`)**: Second test flight or multi-episode test package in progress.
- **0–54 (`1x TEST / UNPROVEN`)**: Single test placement; high churn probability if not renewed within 45 days.

---

## 3. Promo-Code Attribution Decay & Direct-Response Lift

Estimated direct conversions from an ad-read decay exponentially after publication day $t_0$:
$$V(t) = V_0 \cdot e^{-\lambda t}$$
- **Newsletter $\lambda \approx 0.65\text{ day}^{-1}$**: 82% of clicks occur within 48 hours of send.
- **Podcast $\lambda \approx 0.08\text{ day}^{-1}$**: Long-tail evergreen listenership; 60% of conversions happen in Days 1–14, 40% across Days 15–90.
- **YouTube Integration $\lambda \approx 0.04\text{ day}^{-1}$**: Algorithmic evergreen tail continues generating promo redemptions 6–12 months post-upload.

---

## 4. Outbound Sponsorship Pitch Readiness Formula

When generating an outbound cold email pitch from a creator/agency to a sponsor brand:
1. **Cite Proof of Category Spend**: Reference the exact shows/newsletters where the brand has already renewed $\ge 3\times$ (proving they have active budget and working attribution).
2. **Quantify Audience Overlap & CPM Arbitrage**: Show how the pitching creator offers a lower effective CPM or higher technical/executive concentration than their current $3\times$ anchor show.
3. **Propose a De-Risked 3-Flight Pilot**: Pitch a structured 3-insertion test flight with dedicated vanity slug + custom promo code and a mid-roll host-read guarantee.

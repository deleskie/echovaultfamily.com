# Photo Care (Enhance + Pro Restoration)

This document is meant to be both:
- **Marketing-ready copy** you can use on the website or in sales emails, and
- **A reference spec** for how our photo enhancement and restoration system works behind the scenes.

EchoVault photo care is designed to feel warm and trustworthy: we help families clean up and restore pictures without turning them into something they’re not. **The original image is never overwritten.**

---

## 1) What we offer (in plain language)

### 1.1 Everyday corrections (included)
These are the gentle fixes most people want for scans and old prints:
- Brighten dark photos, soften harsh glare, and balance contrast
- Gentle color balancing (so skin tones look natural again)
- Light clean-up (tiny specks, small scratches, mild grain)
- Straighten and crop

This is a “cleaner, clearer” pass—not a makeover.

### 1.2 Pro Restoration (credit-based)
Some photos need more than a quick clean-up: tears, heavy scratches, missing corners, or very low-resolution images that need careful rebuilding. Pro Restoration is for that deeper work.

We use modern restoration tools to speed up the careful work, and **a human reviews every delivered result**. It runs in the background, and you’ll see clear progress from start to finish.

---

## 2) How credits work (simple and predictable)

- **1 credit = 1 photo**
- Pro Restoration uses credits; everyday corrections do not.
- If the exact same restoration has already been created for that photo, we reuse it rather than re-processing it.

### 2.1 Included trial credits
- **Gift**: 5 Pro Restoration credits (one-time trial)
- **Legacy**: 5 Pro Restoration credits (one-time trial)
- **Heirloom**: Pro Restoration included by default, plus an allowance (see entitlements below)

---

## 3) Credit packs (for families with bigger archives)

Credit packs are finite, metered add-ons (not a subscription).

- **Pack A:** $29.99 for 100 credits (valid for 12 months)
- **Pack B:** $39.99 for 200 credits (no expiration)

---

## 4) Trust posture (what we will and won’t do)

- **Your original stays unchanged.** Enhancements and restorations create a new version you can toggle on/off.
- **No “plastic face” defaults.** Face-focused restoration is optional and off by default.
- **Transparent limits.** Pro Restoration has daily/monthly caps to prevent surprise usage or runaway compute.
- **Human review.** Every Pro Restoration result is checked before it’s considered done.

---

## 5) The product spec (reference)

**Status:** Build spec (agent-ready)
**Scope:** Photo uploads / collateral viewer
**Goal:** Offer basic photo enhancement to everyone, and Pro Restore (heavy restoration/upscale) as a tier-gated and/or paid credit pack feature with hard cost controls.
**Non-goal:** Replace original images or create unlimited, unbounded compute.

### 5.1 Feature levels

**Level A — Auto Enhance (Basic)**
- Available to all tiers (Gift/Legacy/Heirloom)
- CPU-friendly corrections:
  - auto exposure/brightness/contrast
  - simple white balance
  - shadow lift/highlight clamp (basic)
  - mild denoise + sharpen
  - rotate/straighten (optional)
- Designed for “too dark/too bright” quick fixes
- Must be fast and cheap

**Level B — Pro Restore (heavy restoration)**
- Available to Heirloom by default
- Gift/Legacy get a small free trial (5 lifetime credits total)
- Heavy compute operations:
  - restoration + upscale (Real-ESRGAN / SwinIR class)
  - optional face restoration (GFPGAN / CodeFormer) as a separate toggle
- Always runs async (queue), cached, and credit-metered

### 5.2 Tier & pricing rules

**Default entitlements**
- Gift:
  - Auto Enhance: unlimited (or very high daily cap)
  - Pro Restore: 5 free credits total (trial)
- Legacy:
  - Auto Enhance: unlimited
  - Pro Restore: 5 free credits total (trial)
- Heirloom:
  - Auto Enhance: unlimited
  - Pro Restore included allowance (choose one):
    - Option 1: 50 credits/month
    - Option 2: 200 credits/year
  - Still enforce a daily cap for infra sanity

**Restoration packs (paid add-on)**
- Pack A: $29.99 for 100 credits, valid 12 months (billing key: `photo_restore_pack_100`)
- Pack B: $39.99 for 200 credits, no expiry (billing key: `photo_restore_pack_200`)

**Hard caps (ethical + cost safety)**
- Daily Pro Restore cap: 25/day (configurable)
- Monthly cap for non-Heirloom: 200/month (configurable)
- Heirloom cap can be higher, but never unlimited

### 5.3 UX requirements (high level)

Add an “Enhance” section with two actions:

**Auto Enhance (Basic)**
- Immediate/near-immediate
- Toggle: Original | Enhanced

**Pro Restore**
- If user has credits: show “Pro Restore” with remaining credits
- If no credits: show “Buy restoration pack”
- Modal options:
  - Restore level: 2x or 4x (default 2x)
  - Face restore: off by default (warn: may alter subtle details)
- Status: queued → processing → ready
- Toggle includes Original | Enhanced | Pro Restored

**Labels (trust posture)**
- “Enhanced for clarity (original unchanged)”
- “Restored (original unchanged)”

### 5.4 Caching (non-negotiable)
Never re-run the same transformation twice.

Cache key:
- `(original_asset_id, preset_id, model_version, params_hash)`

If cached variant exists:
- return it instantly
- do not spend credits again (recommended)


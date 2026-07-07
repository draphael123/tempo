# TEMPO — Medication Rhythm Companion

A gentle, accessibility-first web app for people living with **Parkinson's disease**. TEMPO helps keep levodopa (and other) doses on schedule, captures how you feel between doses with one tap, and turns it into a clear report you can hand to your neurologist.

**Live:** _(added after deploy)_

## Why

For Parkinson's, medication timing is treatment. A levodopa dose taken 30–60 minutes late can mean hours of "OFF" time — stiffness, slowness, freezing. Neurologists tune doses based on *when* your OFF periods happen relative to *when* you take your pills. Most people track this on paper, badly. TEMPO makes it one tap.

## What it does

- **Next-dose countdown** — a large ring and a single oversized "I took it" button. Doses gone more than 4 hours stale quietly become "missed" instead of nagging.
- **One-tap symptom journal** — ON · Wearing off · OFF · Dyskinesia, timestamped. Every action has a 12-second UNDO instead of confirm dialogs.
- **Day timeline** — a 24-hour ribbon showing how you felt, with marks for each dose actually taken.
- **Doctor's report** — 7 / 14 / 30-day summary: % of time ON vs OFF, dose adherence and average lateness, an automatic "your OFF periods cluster around 2 PM" pattern hint, and a print button.
- **Reminders** — in-app alert + chime, plus OS notifications that fire even when the app is closed (on browsers supporting the Notification Triggers API; falls back gracefully elsewhere).
- **Installable PWA** — add to home screen, works offline.
- **Private by design** — all data stays in your browser (localStorage). Nothing is sent anywhere. Export / import a JSON backup any time.

## Accessibility

Built to work on the user's *worst* hour, not their best:

- [Atkinson Hyperlegible](https://www.brailleinstitute.org/freefont/) body type, designed for maximum character recognition
- Touch targets 60–118 px; no drag gestures, no double-taps
- High-contrast warm palette; `prefers-reduced-motion` respected
- Destructive actions require a deliberate second press

## Tech

Single-page vanilla HTML/CSS/JS. No build step, no dependencies, no backend. A small service worker provides offline caching and schedules dose notifications.

## Try it with sample data

Settings → **Meds** tab → *Try it with sample data* → loads 14 realistic days so you can see the Day view and Report populated immediately.

---

> TEMPO is a personal tracking aid, not a medical device. Always follow your care team's instructions.

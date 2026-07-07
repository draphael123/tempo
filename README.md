# TEMPO — Medication Rhythm Companion

A gentle, accessibility-first web app for people living with **Parkinson's disease**. TEMPO helps keep levodopa (and other) doses on schedule, captures how you feel between doses with one tap, and turns it into a clear report you can hand to your neurologist.

**Live:** https://tempo-amber-five.vercel.app

## Why

For Parkinson's, medication timing is treatment. A levodopa dose taken 30–60 minutes late can mean hours of "OFF" time — stiffness, slowness, freezing. Neurologists tune doses based on *when* your OFF periods happen relative to *when* you take your pills. Most people track this on paper, badly. TEMPO makes it one tap.

## What it does

- **Next-dose countdown** — a large ring and a single oversized "I took it" button. Doses gone more than 4 hours stale quietly become "missed" instead of nagging.
- **One-tap symptom journal** — ON · Wearing off · OFF · Dyskinesia, timestamped. After a tap you can optionally add **symptom tags** (tremor, freezing, stiffness…) and a **note you can dictate by voice**. Every action has a 12-second UNDO instead of confirm dialogs.
- **Meals & extra doses** — log a meal in one tap (dietary protein affects levodopa) and log rescue / as-needed doses taken off-schedule.
- **Day timeline** — a 24-hour ribbon showing how you felt, with marks for each dose taken, extra doses, and meals. Logged dose times are editable.
- **Doctor's report** — 7 / 14 / 30-day summary: % of time ON vs OFF, dose adherence and average lateness, **average time-to-ON** after a dose, **% of doses taken near a meal**, most-noted symptoms, and automatic pattern hints (e.g. "your OFF periods cluster around 6 PM"). One-click **Save as PDF / print** produces a clean report with a dose-log table.
- **Medication management** — scheduled or as-needed meds, plus **pill inventory with refill reminders** ("~5 days left — time to refill").
- **Reminders** — in-app alert + chime, plus OS notifications that fire even when the app is closed (on browsers supporting the Notification Triggers API; falls back gracefully elsewhere).
- **Adjustable text size** and an installable, offline-capable **PWA** (add to home screen).
- **Private by design** — all data stays in your browser (localStorage). Nothing is sent anywhere. Export / import a JSON backup any time.

## Accessibility

Built to work on the user's *worst* hour, not their best:

- [Atkinson Hyperlegible](https://www.brailleinstitute.org/freefont/) body type, designed for maximum character recognition
- Touch targets 60–118 px; no drag gestures, no double-taps
- High-contrast warm palette; `prefers-reduced-motion` respected
- Destructive actions require a deliberate second press

## Mobile app (Android)

TEMPO is also packaged as a native Android app with [Capacitor](https://capacitorjs.com), which reuses the same web code and adds **reliable native dose reminders** that fire even when the app is closed — with no backend, so data stays on the device. See **[BUILD-ANDROID.md](BUILD-ANDROID.md)** for build & run steps. (iOS can use the same project but needs a Mac to build.)

## Tech

Single-page vanilla HTML/CSS/JS for the web/PWA — no build step, no runtime dependencies, no backend. A service worker provides offline caching and schedules web notifications. The native app wraps the same files with Capacitor and swaps in `@capacitor/local-notifications` for on-device reminders.

## Try it with sample data

Settings → **Meds** tab → *Try it with sample data* → loads 14 realistic days so you can see the Day view and Report populated immediately.

---

> TEMPO is a personal tracking aid, not a medical device. Always follow your care team's instructions.

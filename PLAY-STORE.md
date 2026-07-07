# Publishing TEMPO to Google Play (internal testing → production)

Everything you need is in this repo. This guide takes you from the current
project to the app running on real phones via Google Play's **internal testing**
track (no 14-day wait), then optionally to a public listing.

- **App ID:** `com.draphael.tempo`
- **Version:** 1.0.0 (versionCode 1) — in `android/app/build.gradle`
- **Privacy policy URL:** https://tempo-amber-five.vercel.app/privacy
- **Feature graphic:** `store/feature-graphic.png` (1024×500)
- **App icon:** already in the project (512 master at `icon-512.png`)

---

## 1. One-time setup

1. **Install Android Studio** — <https://developer.android.com/studio>. It
   bundles the Java JDK + Android SDK. Let it finish first-run downloads.
2. **Create a Google Play Developer account** — <https://play.google.com/console>
   (one-time $25). A personal account is fine; a registered *organization*
   account skips the 12-tester rule described in step 6.
3. From the project folder: `npm install`.

## 2. Build the web assets into the app

```
npm run sync
```

## 3. Create your signing key (once — keep it forever)

In the `android/app` folder, run (keytool ships with Android Studio's JDK):

```
keytool -genkey -v -keystore tempo-release.keystore -alias tempo -keyalg RSA -keysize 2048 -validity 10000
```

It asks for a password and some details. **Save the keystore file and both
passwords somewhere safe and backed up** — if you lose them you can never update
the app again. (This file is git-ignored on purpose; never commit it.)

## 4. Build the signed release bundle

```
npx cap open android
```

In Android Studio:
1. **Build → Generate Signed Bundle / APK → Android App Bundle → Next**
2. Choose your `tempo-release.keystore`, enter the passwords, alias `tempo`.
3. Build variant: **release** → **Finish**.
4. The bundle appears at `android/app/release/app-release.aab`.

(When prompted, accept **Play App Signing** — Google manages the final signing
key and your keystore above becomes the "upload key.")

## 5. Create the app in Play Console

Play Console → **Create app**:
- App name: **TEMPO: Parkinson's Companion**
- Default language: English (US) · Type: **App** · **Free**
- Accept the declarations.

Then fill in these sections (copy is in section 7 below):
- **Store listing** (name, descriptions, icon, feature graphic, screenshots)
- **Privacy policy**: paste the URL above
- **App content**: Data safety, Content rating, Target audience, Ads (none),
  Government apps (no), Health declaration (see section 8)

## 6. Internal testing (fastest — get it on phones now)

Play Console → **Testing → Internal testing → Create new release**:
1. Upload `app-release.aab`.
2. Release name: `1.0.0`. Add a short "what's new" note.
3. **Save → Review release → Start rollout to Internal testing.**
4. Under **Testers**, add tester emails (up to 100) and copy the **opt-in URL**.
5. Each tester opens the opt-in URL on their phone, taps "Become a tester," then
   installs TEMPO from the Play link. Live within ~an hour.

Internal testing has **no 14-day / 12-tester requirement** — that rule only
applies when you later promote to the **Production** track. To go public, run a
**Closed test** with ≥12 testers opted in for 14 continuous days, then apply for
production access.

---

## 7. Store listing copy (ready to paste)

**App name (≤30 chars):**
```
TEMPO: Parkinson's Companion
```

**Short description (≤80 chars):**
```
Dose reminders, symptom tracking & doctor reports for Parkinson's — private.
```

**Full description (≤4000 chars):**
```
TEMPO helps people living with Parkinson's keep their medications on time, understand how they feel between doses, and walk into every neurology appointment prepared.

Parkinson's medication is all about timing. A dose taken late can mean hours of "off" time. TEMPO makes staying on schedule simple, and turns what you track into a clear picture you can share with your doctor.

MEDICATION TIMING
• A large next-dose countdown and one big "I took it" button
• Reliable reminders that alert you even when the app is closed
• As-needed and rescue doses, plus pill-count refill reminders

HOW YOU FEEL
• One-tap check-ins: On, Wearing off, Off, Dyskinesia
• Optional symptom tags and notes (including voice dictation)
• A daily non-motor check: sleep, mood, dizziness on standing, constipation, fatigue, thinking

MORE THAN A TIMER
• Falls log with a one-tap button
• Finger-tapping and spiral-drawing self-tests that track your movement over time
• A walking-beat metronome to help with freezing of gait
• Exercise tracking with a daily goal and streak
• An emergency medical card for caregivers and paramedics

FOR YOUR DOCTOR
• A printable / PDF report: time in On vs Off, dose timing, time-to-On, and patterns
• Trends over time and a "for your next visit" summary with your questions

PRIVATE BY DESIGN
Everything stays on your device. No account, no analytics, no ads, nothing sent anywhere.

TEMPO is a personal tracking aid, not a medical device. Always follow your care team's instructions.
```

**App category:** Medical (or Health & Fitness)
**Tags:** Parkinson's, medication reminder, symptom tracker, health
**Contact email:** daniel@fountain.net

**Screenshots:** Play needs at least 2 phone screenshots (min 320px, up to
3840px). Easiest way: run TEMPO on your phone or an emulator, load the sample
data (Meds → "Load 14 days of sample data"), and screenshot the Now screen, the
Report, and the Health tab. 4–6 screenshots is ideal.

---

## 8. Data safety & content rating answers

**Data safety form** (Play Console → App content → Data safety):
- Does your app collect or share any user data? **No.**
- All data is stored on-device only; nothing is collected or transmitted.
- (If asked) Data is not shared with third parties; no data is collected.

**Content rating** (IARC questionnaire): category **Reference / News / Educational
or Health**; answer **No** to violence, sexual content, profanity, drugs,
gambling, etc. → rating comes back **Everyone**.

**Target audience:** adults (18+); not designed for or directed at children.

**Health apps declaration:** TEMPO is a wellness/tracking aid, not a medical
device; it does not diagnose or treat. It does not connect to medical hardware.

**Ads:** No ads.

---

## 9. Updating the app later

1. Edit the web app (root files), then `npm run sync`.
2. Bump `versionCode` (to 2, 3, …) and `versionName` in `android/app/build.gradle`.
3. Rebuild the signed AAB (section 4) with the **same keystore**.
4. Upload it as a new release on the same track.

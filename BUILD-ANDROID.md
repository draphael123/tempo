# Building the TEMPO Android app

TEMPO is a web app wrapped with [Capacitor](https://capacitorjs.com). The web
code (`index.html`, `sw.js`, icons) at the repo root is the single source of
truth; `npm run build` copies it into `www/`, and Capacitor packages `www/`
into the native Android project in `android/`.

Inside the native app, TEMPO uses **native local notifications** for dose
reminders — these fire reliably even when the app is closed, and need no
server, so all data stays on the device.

## One-time setup (Windows)

1. **Install Android Studio** — <https://developer.android.com/studio>.
   It bundles the Java JDK and the Android SDK you need (there's nothing else
   to install separately). On first launch let it finish downloading the SDK.
2. **Install Node dependencies** (from this folder):
   ```
   npm install
   ```

## Build & run

```bash
# 1. copy the web app into www/ and sync it into the Android project
npm run sync

# 2. open the project in Android Studio
npx cap open android
```

In Android Studio:
- Let Gradle finish syncing (first time takes a few minutes).
- Plug in an Android phone with **USB debugging** on, or start an emulator
  (Device Manager → create a Pixel).
- Press the green **Run ▶** button. The app installs and launches.

To turn on reminders in the app: **Meds tab → Reminders → Dose notifications**.
Android will ask for notification permission; allow it. Try **"Try a test
reminder"** to confirm.

## Making changes to the app

Edit the files at the repo root (mainly `index.html`), then:
```
npm run sync        # rebuilds www/ and copies into android/
```
and press Run again in Android Studio.

## Producing an installable / store build

- **Shareable test APK:** Android Studio → *Build → Build Bundle(s) / APK(s) →
  Build APK(s)*. The `.apk` can be sideloaded onto any Android phone.
- **Play Store:** *Build → Generate Signed Bundle / APK → Android App Bundle*,
  create a signing key when prompted (keep it safe), and upload the `.aab` to
  the [Play Console](https://play.google.com/console) (one-time $25 developer
  registration).

## iOS (later)

The same project can target iOS, but building an iPhone app **requires a Mac**
with Xcode (or a cloud-Mac build service such as Codemagic/Ionic Appflow).
On a Mac you'd run `npx cap add ios` then `npx cap open ios`. Apple Developer
membership is $99/year.

## Notes / possible refinements

- Reminders currently use Android's `allowWhileIdle` scheduling, which can be
  delayed a few minutes in deep Doze. For to-the-minute alarms we can add the
  exact-alarm permission (has Play Store policy implications — worth a
  deliberate choice).
- Fonts load from Google Fonts over the network; to be fully offline we can
  bundle the font files into `www/`.

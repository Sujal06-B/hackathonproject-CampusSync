<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## CampusSync – Run Locally

This project is a React + Vite app with Firebase Auth/Firestore and an optional Gemini AI assistant.

### Prerequisites

- Node.js (LTS)
- npm

### 1. Install dependencies

```bash
npm install
```

### 2. Optional: Connect Gemini (AI assistant)

Create `.env.local` in the project root and add:

```bash
VITE_API_KEY=your-gemini-api-key
# or
VITE_GEMINI_API_KEY=your-gemini-api-key
```

Without this, the in‑app AI chat runs in safe demo mode with mock responses.

### 3. Optional: Connect Firebase (auth + database)

In Firebase Console, create a web app and copy your config, then put this in `.env.local`:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

- Enable **Email/Password** and **Google** providers in Firebase Authentication.
- Create Firestore collections:
  - `users` – documents keyed by uid.
  - `assignments` – assignment documents.
  - `announcements` – announcement documents.

If these env vars are missing, the app still works in **mock mode** (fake user + dummy data).

### 4. Run the app

```bash
npm run dev
```

Then open the URL Vite prints in the terminal (usually `http://localhost:5173`).

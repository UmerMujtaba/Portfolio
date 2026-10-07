/**
 * Seeds Firestore with portfolio content from seed-payload.json.
 *
 * Usage: npm run seed
 *
 * Prerequisites: enable Firestore in Firebase Console (Build → Firestore Database).
 * If permission-denied on write: temporarily allow write on portfolio/{doc}, re-run,
 * then lock writes again (see README).
 */

import { readFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { initializeApp, getApps, deleteApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

function loadEnvFile(fileName) {
  const filePath = join(__dirname, "..", fileName);
  if (!existsSync(filePath)) return;
  for (const line of readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env.production");

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error("Missing Firebase env vars. Fill .env.local first.");
  process.exit(1);
}

const portfolioSeed = require("./seed-payload.json");

async function main() {
  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  const db = getFirestore(app);

  console.log(`Seeding portfolio/content → project ${firebaseConfig.projectId}…`);

  const write = setDoc(doc(db, "portfolio", "content"), portfolioSeed);
  const timeout = new Promise((_, reject) =>
    setTimeout(
      () =>
        reject(
          new Error(
            "Timed out writing to Firestore. Enable Firestore Database in the Firebase Console, wait a minute, then retry."
          )
        ),
      15000
    )
  );

  await Promise.race([write, timeout]);
  console.log("Done. Open Firestore → portfolio → content to edit anytime.");

  await deleteApp(app);
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err.message || err);
  console.error(`
Checklist:
1. Firebase Console → Build → Firestore Database → Create database
2. Enable API if prompted: https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=${firebaseConfig.projectId}
3. Rules — temporarily allow write to seed:
     match /portfolio/{doc} { allow read, write: if true; }
4. Re-run: npm run seed
5. Lock writes again (allow read only; see README)
`);
  process.exit(1);
});

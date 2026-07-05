// ─────────────────────────────────────────────────────────────────────
// Firebase (Auth + Firestore) — free-forever cloud storage for resumes.
//
// This module is SAFE to import even when Firebase isn't configured:
// if the env vars are missing it simply reports `isConfigured = false`
// and the Resume Builder falls back to localStorage-only.
//
// To enable cloud sync, create a free Firebase project and add these to a
// `.env` file at the project root (see README / setup notes):
//   VITE_FIREBASE_API_KEY=...
//   VITE_FIREBASE_AUTH_DOMAIN=...
//   VITE_FIREBASE_PROJECT_ID=...
//   VITE_FIREBASE_STORAGE_BUCKET=...
//   VITE_FIREBASE_MESSAGING_SENDER_ID=...
//   VITE_FIREBASE_APP_ID=...
// ─────────────────────────────────────────────────────────────────────
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged as fbOnAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

let auth = null;
let db = null;
let provider = null;

if (isConfigured) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  provider = new GoogleAuthProvider();
} else {
  console.info(
    "[firebase] Not configured — Resume Builder will use local storage only. " +
      "Add VITE_FIREBASE_* env vars to enable cross-device cloud sync."
  );
}

/* ── Auth helpers ── */
export function onAuthStateChanged(callback) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return fbOnAuthStateChanged(auth, callback);
}

export async function signInWithGoogle() {
  if (!auth || !provider) throw new Error("Firebase is not configured.");
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export async function signOut() {
  if (auth) await fbSignOut(auth);
}

/* ── Firestore: one resume document per user (collection "resumes") ── */
export async function loadResume(uid) {
  if (!db || !uid) return null;
  const snap = await getDoc(doc(db, "resumes", uid));
  return snap.exists() ? snap.data().data : null;
}

export async function saveResume(uid, data) {
  if (!db || !uid) return;
  await setDoc(doc(db, "resumes", uid), {
    data,
    updatedAt: new Date().toISOString(),
  });
}

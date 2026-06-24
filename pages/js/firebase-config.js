// ============================================================
// SETUP INSTRUCTIONS
// 1. Go to console.firebase.google.com → Create project
// 2. Add a Web App → copy the config object below
// 3. Enable Authentication → Sign-in method → Google
// 4. Enable Firestore Database (start in production mode)
// 5. Replace ADMIN_UID with your own UID (visible after first login on /admin)
// 6. Deploy Firestore rules from firestore.rules
// ============================================================

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc,
  serverTimestamp, query, where, orderBy, getDocs, limit, increment, updateDoc, deleteDoc }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

export const firebaseConfig = {
  apiKey:            "AIzaSyBwG3sa6MOfOIVzf7hBmGxstF7Iq92aF_Y",
  authDomain:        "limesite-1678.firebaseapp.com",
  projectId:         "limesite-1678",
  storageBucket:     "limesite-1678.firebasestorage.app",
  messagingSenderId: "23451639496",
  appId:             "1:23451639496:web:253cee0b0ef778b5e98ffd",
  measurementId:     "G-0QW7YZVKF6"
};

// ⚠️ Replace with your own Firebase UID (shown on /admin page after first login)
export const ADMIN_UID = "REPLACE_WITH_YOUR_FIREBASE_UID";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);

const provider = new GoogleAuthProvider();

// Auth helpers
export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, provider);
  const u = result.user;
  await setDoc(doc(db, 'users', u.uid), {
    uid: u.uid, email: u.email, displayName: u.displayName,
    photoURL: u.photoURL, lastSeen: serverTimestamp()
  }, { merge: true });
  const snap = await getDoc(doc(db, 'users', u.uid));
  if (!snap.data().createdAt) {
    await setDoc(doc(db, 'users', u.uid), { createdAt: serverTimestamp() }, { merge: true });
  }
  return u;
}

export const signOutUser = () => signOut(auth);
export const onAuthChange = cb => onAuthStateChanged(auth, cb);

// Page-view tracker — call once per page load
export async function trackPageView(path) {
  try {
    let country = 'Unknown';
    try {
      const r = await fetch('https://ipapi.co/json/');
      country = (await r.json()).country_name || 'Unknown';
    } catch {}
    await addDoc(collection(db, 'pageviews'), {
      path, country,
      uid: auth.currentUser?.uid || 'anonymous',
      timestamp: serverTimestamp()
    });
  } catch {}
}

// Orders helpers
export async function getUserOrders(uid) {
  const q = query(collection(db, 'orders'), where('uid','==',uid), orderBy('createdAt','desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function placeOrder(uid, email, items, total, shippingInfo) {
  return addDoc(collection(db, 'orders'), {
    uid, email, items, total, status: 'pending',
    shippingInfo, createdAt: serverTimestamp()
  });
}

// Admin: fetch all orders
export async function getAllOrders(limitN = 50) {
  const q = query(collection(db, 'orders'), orderBy('createdAt','desc'), limit(limitN));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// Admin: fetch recent page views
export async function getPageViews(limitN = 500) {
  const q = query(collection(db, 'pageviews'), orderBy('timestamp','desc'), limit(limitN));
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data());
}

// Admin: fetch all users
export async function getAllUsers(limitN = 100) {
  const q = query(collection(db, 'users'), orderBy('createdAt','desc'), limit(limitN));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function updateOrderStatus(orderId, status) {
  await updateDoc(doc(db, 'orders', orderId), { status });
}

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDs-aRT_Cak34j4_rqCZUEOvcDkJmIbPyU",
  authDomain: "hustlehub-43e18.firebaseapp.com",
  projectId: "hustlehub-43e18",
  storageBucket: "hustlehub-43e18.appspot.com",
  messagingSenderId: "965088877538",
  appId: "1:965088877538:android:4ffbe80002aba8c61937bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
const storage = getStorage(app); // ✅ Add this

export { auth, db, storage };
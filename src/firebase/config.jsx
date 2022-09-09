
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBO-jpPKnOrxMoUpdcnAAj2ePRp8jpZmvI",
  authDomain: "mr-rob12.firebaseapp.com",
  projectId: "mr-rob12",
  storageBucket: "mr-rob12.appspot.com",
  messagingSenderId: "803537135627",
  appId: "1:803537135627:web:594e5f9a17b4ebd7713f0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db =getFirestore(app) 
export { db }
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const fireBaseConnectionInstance = () => {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCxLIxdey5iS_cpsCSOpLFtXeh1tU5qEUs",
    authDomain: "blog-web-app-d451f.firebaseapp.com",
    projectId: "blog-web-app-d451f",
    storageBucket: "blog-web-app-d451f.appspot.com",
    messagingSenderId: "208183190226",
    appId: "1:208183190226:web:1bfee4199598b4fa91c30b",
    measurementId: "G-H51EGEKLQ5"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  return { db };
};

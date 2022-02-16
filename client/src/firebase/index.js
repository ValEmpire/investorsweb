// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARYuxXd_aUrbX9rY0y8L9L0s_oKD8FtwM",
  authDomain: "investors-web.firebaseapp.com",
  projectId: "investors-web",
  storageBucket: "investors-web.appspot.com",
  messagingSenderId: "371315254884",
  appId: "1:371315254884:web:3a2612f5d5a4a1dab1a171",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

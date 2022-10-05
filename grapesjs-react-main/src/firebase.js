import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDdpWQDdjg132oWF8_D0Xmgg3hBaq9WSeQ",
  authDomain: "assetuploadformbuilder.firebaseapp.com",
  projectId: "assetuploadformbuilder",
  storageBucket: "assetuploadformbuilder.appspot.com",
  messagingSenderId: "1073112018052",
  appId: "1:1073112018052:web:7741cb6e3bdaa7dacd66d1"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
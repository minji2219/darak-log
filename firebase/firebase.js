import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAAjC2-odAOsXMpw-Q576yEhqXzJBCCZqA",
  authDomain: "react-quill-image.firebaseapp.com",
  projectId: "react-quill-image",
  storageBucket: "react-quill-image.appspot.com",
  messagingSenderId: "703443107591",
  appId: "1:703443107591:web:c7e862ef8574171362cfa2",
  measurementId: "G-ZE6QZENGY2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export default app;

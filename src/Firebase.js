import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDPwxubUrYeSSkG92Jnv6b6V67NIBXFQA",
  authDomain: "reactclub-92e47.firebaseapp.com",
  projectId: "reactclub-92e47",
  storageBucket: "reactclub-92e47.appspot.com",
  messagingSenderId: "654200863042",
  appId: "1:654200863042:web:4d8eb997a033571007b0db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
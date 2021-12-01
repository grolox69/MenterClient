import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAiYhX74vNiTFkZQIWSo9uQAnWp5YOczmU",
  authDomain: "menter-4c0d7.firebaseapp.com",
  projectId: "menter-4c0d7",
  storageBucket: "menter-4c0d7.appspot.com",
  messagingSenderId: "183714532115",
  appId: "1:183714532115:web:20863eefc872a1e0e7a8e6"
};
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
setPersistence(auth, browserSessionPersistence);

export default firebase;

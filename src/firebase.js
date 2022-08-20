import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: ,
  authDomain:,
  projectId: ,
  storageBucket: ",
  messagingSenderId: ,
  appId: ,
  measurementId: 
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default {app, auth}

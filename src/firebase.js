import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyC3UyQsOccCPAgk4Qj1APpu4qtx4ZVs-sc",
  authDomain: "edsd-d3622.firebaseapp.com",
  projectId: "edsd-d3622",
  storageBucket: "edsd-d3622.appspot.com",
  messagingSenderId: "809232203712",
  appId: "1:809232203712:web:d2d7e2d9e7a5a75a6c1225",
  measurementId: "G-5WNF4TZJB2"
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default {app, auth}
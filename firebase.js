import firebase from "firebase"; 
const firebaseConfig = {
    apiKey: "AIzaSyA-YOlYxWzrR049yPXWn3c2r9Q6yH2nUzY",
    authDomain: "whatsapp-4c096.firebaseapp.com",
    projectId: "whatsapp-4c096",
    storageBucket: "whatsapp-4c096.appspot.com",
    messagingSenderId: "871572234081",
    appId: "1:871572234081:web:34386f64994b645b0f2f20"
  };

  const app=!firebase.apps.length?firebase.initializeApp(firebaseConfig):firebase.app();

  const db=app.firestore();
  const auth=app.auth();
  const provider=new firebase.auth.GoogleAuthProvider();
  export {db,auth,provider};
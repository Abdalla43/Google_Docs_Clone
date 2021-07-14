import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC3FRITAsdP6Az9U4WblBYwSxuBbWGEMuI",
    authDomain: "docs-a0de1.firebaseapp.com",
    projectId: "docs-a0de1",
    storageBucket: "docs-a0de1.appspot.com",
    messagingSenderId: "158088335636",
    appId: "1:158088335636:web:22e5b5df39d46a308ab201",
    measurementId: "G-FZHSSGZFWF"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db=app.firestore()

export {db}
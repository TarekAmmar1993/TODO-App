import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDWQrSe3TxSI-u5JlQFEfDaCfrTPMSjfIc",
    authDomain: "todo-app-7f4c9.firebaseapp.com",
    projectId: "todo-app-7f4c9",
    storageBucket: "todo-app-7f4c9.appspot.com",
    messagingSenderId: "364863808817",
    appId: "1:364863808817:web:5162ef032bff1246db7c10"
};

firebase.initializeApp(firebaseConfig)

export default firebase








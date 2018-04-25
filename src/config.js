import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDFlaDKqXwXSTefcKDzMwaF6lns4POBVCw",
    authDomain: "ptcustomer-2d67a.firebaseapp.com",
    databaseURL: "https://ptcustomer-2d67a.firebaseio.com",
    projectId: "ptcustomer-2d67a",
    storageBucket: "ptcustomer-2d67a.appspot.com",
    messagingSenderId: "114699683543",
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth();
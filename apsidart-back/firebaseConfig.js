const admin = require('firebase-admin');

const firebaseConfig = {
    apiKey: "AIzaSyAOdkRCddyARns982Kyi1L1oqg8swINGiI",
    authDomain: "apsidart.firebaseapp.com",
    projectId: "apsidart",
    storageBucket: "apsidart.appspot.com",
    messagingSenderId: "91657463929",
    appId: "1:91657463929:web:01d42a8f3b9fc71075cca8"
}

admin.initializeApp(firebaseConfig);

const db = admin.firestore();

module.exports = { db };

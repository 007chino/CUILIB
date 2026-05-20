// firebase-auth.js — Firebase Authentication setup (CDN compat)

const _FB_CONFIG = {
  apiKey: "AIzaSyBPV0dKVx_yjLF9LVYJMyqG6W8_pOimEfs",
  authDomain: "cuilib.firebaseapp.com",
  projectId: "cuilib",
  storageBucket: "cuilib.firebasestorage.app",
  messagingSenderId: "805209213883",
  appId: "1:805209213883:web:fe8593f43d7373eba4129e"
};

firebase.initializeApp(_FB_CONFIG);
const _auth = firebase.auth();

window.ADMIN_EMAIL = '141002@unsaac.edu.pe';

window.FB_login = (email, pass) =>
  _auth.signInWithEmailAndPassword(email, pass);

window.FB_register = (email, pass, name) =>
  _auth.createUserWithEmailAndPassword(email, pass)
    .then(cred => cred.user.updateProfile({ displayName: name }));

window.FB_logout = () => _auth.signOut();

window.FB_resetPassword = (email) =>
  _auth.sendPasswordResetEmail(email);

window.FB_onAuthChange = (cb) => _auth.onAuthStateChanged(cb);

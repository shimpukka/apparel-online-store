import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: "AIzaSyC0bg-3Si3E7BL6b8Z_-5Ryze1tBm94idc",
	authDomain: "apparel-online-store-db.firebaseapp.com",
	databaseURL: "https://apparel-online-store-db.firebaseio.com",
	projectId: "apparel-online-store-db",
	storageBucket: "apparel-online-store-db.appspot.com",
	messagingSenderId: "72564959411",
	appId: "1:72564959411:web:179ae3fd0f03bc36e628c6"
};

firebase.initializeApp(config);

export const auth = firebase.auth(); //firebaseのauthというメソッドをauthに格納してエクスポートする
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();  // firebase.authのGoogleAuthProviderというクラスにアクセスできるようにする
provider.setCustomParameters( { prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
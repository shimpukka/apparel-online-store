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

// this function creates firestore document from userAuth object and returns userRef object
export const createUserProfileDocument = async (userAuth, additionalData) => {
	if(!userAuth) return;

	const userRef = await firestore.doc(`users/${userAuth.uid}`);
	const userSnapshot = await userRef.get();
	console.log(userSnapshot);

	if(!userSnapshot.exist){ // if the user doesn't exist in firestore yet, then create it
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			})
		} catch(error) {
			console.log('error creating user in firestore', error.message);
		}
	}
	return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth(); //firebaseのauthというメソッドをauthに格納してエクスポートする
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();  // firebase.authのGoogleAuthProviderというクラスにアクセスできるようにする
provider.setCustomParameters( { prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
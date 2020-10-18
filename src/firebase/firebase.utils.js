import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { batch } from 'react-redux';

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

// util function to use only once to tranfer shop data to firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	// create collection using collection key
	const collectionRef = firestore.collection(collectionKey);
	console.log(collectionRef);

	// group 'set' calls together into one big request
	const batch = firestore.batch();
	objectsToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc();  // firebase will gives us new document with some random ID
		// set the value
		batch.set(newDocRef, obj);
	});

	// fire off batch call
	return await batch.commit();
};

// convert collections.doc array into an object with right properties
export const convertCollectonsSnapshotToMap = (collections) => {
	const transformedCollections = collections.docs.map(doc =>{
		const { title, items } = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items
		};
	})
	console.log(transformedCollections);

	// we want to convert this transformedCollection into the object that we want ( {hats: {hats object}, ... } )
	// transformedCollections is an array of objects, by using reduce methos, we make one object that is in the shape above
	// initial accumulator value of reduce method = empty object {}
	return transformedCollections.reduce((accumulator, collectionObj) => {
		accumulator[collectionObj.title.toLowerCase()] = collectionObj;
		return accumulator;
	}, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth(); //firebaseのauthというメソッドをauthに格納してエクスポートする
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();  // firebase.authのGoogleAuthProviderというクラスにアクセスできるようにする
provider.setCustomParameters( { prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
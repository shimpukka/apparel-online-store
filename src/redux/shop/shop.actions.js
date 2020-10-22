import ShopActionTypes from './shop.types';

import { firestore, convertCollectonsSnapshotToMap } from '../../firebase/firebase.utils';

// export const updateCollections  = ( collectionsMap ) => ({
//     type: ShopActionTypes.UPDATE_COLLECTIONS,
//     payload: collectionsMap
// })

// making API calls from redux (action) instead of inside and component
export const fetchCollectionsStart  = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

// this action do the API call,
// using redux-thunk library we can dispatch actions(and update state) inside another action
export const fetchCollectionsStartAsync  = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart()); // dispatch action = update state

		// fetch collection data, when this code gets run for the first time
		collectionRef.get().then(snapshot =>{
			// convert collections.doc array into an object with right properties using util function
			const collectionsMap = convertCollectonsSnapshotToMap(snapshot);
			dispatch(fetchCollectionsSuccess(collectionsMap));
		}).catch(error => dispatch(fetchCollectionsFailure(error.message)));
    }
};
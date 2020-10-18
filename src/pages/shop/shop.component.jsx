import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionPage from '../collection/collection.component';

import CollectionOverview from '../../components/collections-overview/collections-overview.component';

import { firestore, convertCollectonsSnapshotToMap } from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

class ShopPage extends React.Component {
	// pull collections data from firestore
	unsubscribeFromSnapshot = null;

	componentDidMount(){
		const { updateCollections } = this.props;
		const collectionRef = firestore.collection('collections');

		// whenever collectionRef updates or when this code gets run for the first time
		collectionRef.onSnapshot(async snapshot =>{
			// convert collections.doc array into an object with right properties using util function
			const collectionsMap = convertCollectonsSnapshotToMap(snapshot);
			updateCollections(collectionsMap);
		});
	}

	render() {
		const match = this.props;
		return (
			<div className='shop-page'>
				<Route exact path={match.path} component={CollectionOverview} />
				<Route path={`${match.path}/:collectionId`} component={CollectionPage} />
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
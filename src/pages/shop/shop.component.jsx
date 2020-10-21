import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionPage from '../collection/collection.component';

import CollectionOverview from '../../components/collections-overview/collections-overview.component';

import { firestore, convertCollectonsSnapshotToMap } from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

// powered-up version of collectionOverview component that has spinner built-in
const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
	state = {
		loading: true
	};

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

			// when the fetching is complete, change the loading prop to false
			this.setState( { loading: false });
		});
	}

	render() {
		const { match } = this.props;
		const { loading } = this.state;
		return (
			<div className='shop-page'>
				<Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props} />} />
				<Route path={`${match.path}/:collectionId`} 
					render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props}/> } />
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
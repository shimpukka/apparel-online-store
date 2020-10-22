import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPage from '../collection/collection.component';

import CollectionOverview from '../../components/collections-overview/collections-overview.component';

// import { firestore, convertCollectonsSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';

import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

// powered-up version of collectionOverview component that has spinner built-in
const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
	// instead of fetching shop data from this component, fetch inside redux


	// state = {
	// 	loading: true
	// };

	// // pull collections data from firestore
	// unsubscribeFromSnapshot = null;

	componentDidMount(){
		const { fetchCollectionsStartAsync } = this.props;
		fetchCollectionsStartAsync();
	// 	const { updateCollections } = this.props;
	// 	const collectionRef = firestore.collection('collections');

	// 	// fetch collection data, when this code gets run for the first time
	// 	collectionRef.get().then(snapshot =>{
	// 		// convert collections.doc array into an object with right properties using util function
	// 		const collectionsMap = convertCollectonsSnapshotToMap(snapshot);
	// 		updateCollections(collectionsMap);

	// 		// when the fetching is complete, change the loading prop to false
	// 		this.setState( { loading: false });
	// 	});
	}

	render() {
		const { match, isCollectionFetching } = this.props;
		// const { loading } = this.state;
		return (
			<div className='shop-page'>
				<Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={isCollectionFetching} {...props} />} />
				<Route path={`${match.path}/:collectionId`} 
					render={(props) => <CollectionOverviewWithSpinner isLoading={isCollectionFetching} {...props}/> } />
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	isCollectionFetching: selectIsCollectionFetching 
});

const mapDispatchToProps = dispatch => ({
	fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
	// updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

// const collectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview));

// this is equivalant to the one above
const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);


export default CollectionsOverviewContainer;
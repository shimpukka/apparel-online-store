import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';
import { selectShopCollections } from '../../redux/shop/shop.selectors';

import './collections-overview.styles.scss';

const CollectionOverview = ( { collections } ) => (
    <div className='collections-overview'>
        {
            //collections.map(collection => <CollectionPreview title={collection.title} key={collection.id} items={collection.items} />)
            collections.map( ({id, ...collectionProps})  => <CollectionPreview key={id} {...collectionProps} />)
        }
    </div>
);

const mapStateToProps = createStructuredSelector ({
	collections: selectShopCollections
});


export default connect(mapStateToProps)(CollectionOverview);
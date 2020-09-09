import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.scss';

const CollectionPage = ( {match, collection} ) => {
    console.log(match.params.collectionId, collection);
    return (
        <div className='collection'>
            <h2>Collection PAGE</h2>
        </div>
    );
}

// mapStateToProps will get the components own props as the second argument
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);
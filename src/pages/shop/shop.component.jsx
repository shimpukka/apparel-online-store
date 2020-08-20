import React from 'react';
import SHOP_DATA from './shop.data';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';

class ShopPage extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			collections: SHOP_DATA,
		}
	}
	render(){
		const { collections } = this.state; // destructure this.state, pull off collection variable
		console.log(collections);
		return (
			<div className='shop-page'>
			{
				//collections.map(collection => <CollectionPreview title={collection.title} key={collection.id} items={collection.items} />)
				collections.map( ({id, ...collectionProps})  => <CollectionPreview key={id} {...collectionProps} />)
			}
			</div>
		)
	}
}

export default ShopPage;
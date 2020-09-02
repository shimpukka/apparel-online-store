export const addItemToCart = (cartItems, cartItemToAdd) => {
	const existingItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

	// If item already exists in cartItems array
	if(existingItem){
		return cartItems.map(cartItem =>
			cartItem.id === cartItemToAdd.id
			? {...cartItem, quantity: cartItem.quantity + 1 }
			: cartItem
		)
	}

	// If item is added for the first time, add item with the new quantity prop
	return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
}
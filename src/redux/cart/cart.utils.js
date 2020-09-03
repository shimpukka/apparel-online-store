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

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
	const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

	// if the quantity of the item is 1, then cleat it
	if(existingCartItem.quantity === 1){
		return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
	}

	// otherwise, decrease the quantity by one
	return cartItems.map(cartItem => 
		cartItem.id === cartItemToRemove.id
		?
		{
			...cartItem,
			quantity: cartItem.quantity - 1
		}
		:
		cartItem
	)
}
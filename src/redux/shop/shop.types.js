const ShopActionTypes = {
    // UPDATE_COLLECTIONS: 'UPDATE_COLLECTIONS'
    // Instead of doing API calls inside the shop.component, we want to do it inside redux. 
    // For that we define new action types
    FETCH_COLLECTIONS_START : 'FETCH_COLLECTIONS_START',
    FETCH_COLLECTIONS_SUCCESS : 'FETCH_COLLECTIONS_SUCCESS',
    FETCH_COLLECTIONS_FAILURE : 'FETCH_COLLECTIONS_FAILURE',
};

export default ShopActionTypes;
import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

// collection is now in form of an object, we want this transform back into an array
export const selectCollectionForPreview = createSelector(
    [selectShopCollections],
    collections => Object.keys(collections).map(key => collections[key])
)

export const selectCollection = collectionUrlParam => 
    createSelector(
    [selectShopCollections],
    collections => collections[collectionUrlParam]
    )

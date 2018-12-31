import { Product } from "../product";
import * as fromRoot from '../../state/app.state';
import * as store from "@ngrx/store";
import { ProductAction, ProductActionTypes } from "./product.action";

export interface State extends fromRoot.State{
    products: ProductState;
}

export interface ProductState{
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
}

const initialState: ProductState = {
currentProduct : null,
showProductCode : true,
products : []
};

const getProductFeatureState = store.createFeatureSelector<ProductState>('products');

export const getShowProductCode = store.createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getCurrentProduct = store.createSelector(
    getProductFeatureState,
    state => state.currentProduct
);

export const getProduct = store.createSelector(
    getProductFeatureState,
    state => state.products
);

export function reducer(state = initialState, action:ProductAction): ProductState {
    switch (action.type) {

        case ProductActionTypes.ToggleProductCode:
        console.log('existing state'+ JSON.stringify(state));
        console.log('payload'+ action.payload);
        return {
            ...state, showProductCode: action.payload
        };

        case ProductActionTypes.SetCurrentProduct:
        return {
            ...state, currentProduct: {...action.payload}
        }

        case ProductActionTypes.ClearCurrentProduct:
        return {
            ...state, currentProduct: null
        }

        case ProductActionTypes.InitializeCurrentProduct:
        return {
            ...state, currentProduct: {
                id: 0,
                productCode : 'New',
                productName: '',
                description: '',
                starRating: 0
            }
        }

        case ProductActionTypes.LoadSuccess:
        return {
            ...state,
            products: action.payload
        }
        default:
        return state;
    }
}
import { takeEvery, call, put } from "redux-saga/effects";
import api from '../api';

export const types = {
    FETCH_CATEGORIES_REQUESTED: 'FETCH_CATEGORIES_REQUESTED',
    FETCH_CATEGORIES_SUCCEEDED: 'FETCH_CATEGORIES_SUCCEEDED',
    FETCH_CATEGORIES_FAILED: 'FETCH_CATEGORIES_FAILED'
}

export const actions = {
    categoriesFetch : () => ({
        type: types.FETCH_CATEGORIES_REQUESTED,
    }),
    categoriesSucceeded: (categories) => ({
        type: types.FETCH_CATEGORIES_SUCCEEDED,
        categories
    }),
    categoriesFailed: (error) => ({
        type: types.FETCH_CATEGORIES_FAILED,
        error
    }),
}

const initialState = {
    categories: [],
    error: "",
    loading: false
};

export default function reducer(state=initialState, action){
    switch(action.type){
        case types.FETCH_CATEGORIES_REQUESTED:
            return {
                ...state,
               loading: true
            };
        case types.FETCH_CATEGORIES_SUCCEEDED:
            return {
                ...state,
                categories: action.categories,
                loading: false
            };
        case types.FETCH_CATEGORIES_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        default:
            return state;
    }
}

export function* saga(){
    yield takeEvery(types.FETCH_CATEGORIES_REQUESTED,getCategories);
}
 

export function* getCategories(){
    try{
        const response  = yield call(api.callCategories);
        yield put(actions.categoriesSucceeded(response.body));
    }
    catch(error){
        yield put(actions.categoriesFailed("Server Error"));
    } 
}


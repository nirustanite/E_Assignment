import { takeEvery, call, put } from "redux-saga/effects";
import api from '../api';

export const types = {
    FETCH_FAVORITES_REQUESTED: 'FETCH_FAVORITES_REQUESTED',
    FETCH_FAVORITES_SUCCEEDED: 'FETCH_FAVORITES_SUCCEEDED',
    FETCH_FAVORITES_FAILED: 'FETCH_FAVORITES_FAILED',
}

export const actions = {
    favoritesFetch : () => ({
        type: types.FETCH_FAVORITES_REQUESTED,
    }),
    favoritesSucceeded: (favorites) => ({
        type: types.FETCH_FAVORITES_SUCCEEDED,
        favorites
    }),
    favoritesFailed: (error) => ({
        type: types.FETCH_FAVORITES_FAILED,
        error
    }),
}

const initialState = {
    favorites: [],
    error: "",
    loading: false
};

export default function reducer(state=initialState, action){
    switch(action.type){
        case types.FETCH_FAVORITES_REQUESTED:
            return {
                ...state,
               loading: true
            };
        case types.FETCH_FAVORITES_SUCCEEDED:
            return {
                ...state,
                favorites: action.favorites,
                loading: false
            };
        case types.FETCH_FAVORITES_FAILED:
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
    yield takeEvery(types.FETCH_FAVORITES_REQUESTED,getFavoritesData);
}
 

export function* getFavoritesData(){
    try{
        const response  = yield call(api.callFavorites);
        yield put(actions.favoritesSucceeded(response.body));
    }
    catch(error){
        yield put(actions.favoritesFailed("Server Error"));
    } 
}


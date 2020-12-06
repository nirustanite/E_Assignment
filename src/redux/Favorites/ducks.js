import { takeEvery, call, put } from "redux-saga/effects";
import api from '../api';

export const types = {
    FETCH_FAVORITES_REQUESTED: 'FETCH_FAVORITES_REQUESTED',
    FETCH_FAVORITES_SUCCEEDED: 'FETCH_FAVORITES_SUCCEEDED',
    FETCH_FAVORITES_FAILED: 'FETCH_FAVORITES_FAILED',
    SAVE_FAVORITES_REQUESTED: 'SAVE_FAVORITES_REQUESTED',
    SAVE_FAVORITES_SUCCEEDED: 'SAVE_FAVORITES_SUCCEEDED',
    SAVE_FAVORITES_FAILED: 'SAVE_FAVORITES_FAILED',
}

export const actions = {
    getFavorites : () => ({
        type: types.FETCH_FAVORITES_REQUESTED,
    }),
    getFavoritesSucceeded: (favorites) => ({
        type: types.FETCH_FAVORITES_SUCCEEDED,
        favorites
    }),
    getFavoritesFailed: (error) => ({
        type: types.FETCH_FAVORITES_FAILED,
        error
    }),
    saveFavorites: (data) => ({
        type: types.SAVE_FAVORITES_REQUESTED,
        data
    }),
    saveFavoritesSucceeded: (message) => ({
        type: types.SAVE_FAVORITES_SUCCEEDED,
        message
    }),
    saveFavoritesFailed: (error) => ({
        type: types.SAVE_FAVORITES_FAILED,
        error
    })
}

const initialState = {
    favorites: [],
    message: "",
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
        case types.SAVE_FAVORITES_REQUESTED:
            return {
                ...state,
                loading: true
            };
        case types.SAVE_FAVORITES_SUCCEEDED:
            return {
                ...state,
                message: action.message,
                loading: false
            };
        case types.SAVE_FAVORITES_FAILED:
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
    yield takeEvery(types.SAVE_FAVORITES_REQUESTED,saveFavorites);
}
 

export function* getFavoritesData(){
    try{
        const response  = yield call(api.callFavorites);
        yield put(actions.getFavoritesSucceeded(response.body));
    }
    catch(error){
        yield put(actions.favoritesFailed("Server Error"));
    } 
}

export function* saveFavorites(){
    try{
        const response  = yield call(api.callSaveFavorites);
        yield put(actions.saveFavoritesSucceeded(response.body));
    }
    catch(error){
        yield put(actions.saveFavoritesFailed("Server Error"));
    } 
}

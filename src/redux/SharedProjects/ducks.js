import { takeEvery, call, put } from "redux-saga/effects";
import api from '../api';

export const types = {
    FETCH_SHARED_PROJECTS_REQUESTED: 'FETCH_SHARED_PROJECTS_REQUESTED',
    FETCH_SHARED_PROJECTS_SUCCEEDED: 'FETCH_SHARED_PROJECTS_SUCCEEDED',
    FETCH_SHARED_PROJECTS_FAILED: 'FETCH_SHARED_PROJECTS_FAILED'
}

export const actions = {
    sharedProjectsFetch : () => ({
        type: types.FETCH_SHARED_PROJECTS_REQUESTED,
    }),
    sharedProjectsSucceeded: (sharedProjects) => ({
        type: types.FETCH_SHARED_PROJECTS_SUCCEEDED,
        sharedProjects
    }),
    sharedProjectsFailed: (error) => ({
        type: types.FETCH_SHARED_PROJECTS_FAILED,
        error
    }),
}

const initialState = {
    sharedProjects: [],
    error: "",
    loading: false
};

export default function reducer(state=initialState, action){
    switch(action.type){
        case types.FETCH_SHARED_PROJECTS_REQUESTED:
            return {
                ...state,
               loading: true
            };
        case types.FETCH_SHARED_PROJECTS_SUCCEEDED:
            return {
                ...state,
                sharedProjects: action.sharedProjects,
                loading: false
            };
        case types.FETCH_SHARED_PROJECTS_FAILED:
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
    yield takeEvery(types.FETCH_SHARED_PROJECTS_REQUESTED,getSharedProjects);
}
 

export function* getSharedProjects(){
    try{
        const response  = yield call(api.callSharedProjects);
        yield put(actions.sharedProjectsSucceeded(response.body));
    }
    catch(error){
        yield put(actions.sharedProjectsFailed("Server Error"));
    } 
}

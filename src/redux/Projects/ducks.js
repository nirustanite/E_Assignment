import { takeEvery, call, put } from "redux-saga/effects";
import api from '../api';

export const types = {
    FETCH_PROJECTS_REQUESTED: 'FETCH_PROJECTS_REQUESTED',
    FETCH_PROJECTS_SUCCEEDED: 'FETCH_PROJECTS_SUCCEEDED',
    FETCH_PROJECTS_FAILED: 'FETCH_PROJECTS_FAILED'
}

export const actions = {
    projectsFetch : () => ({
        type: types.FETCH_PROJECTS_REQUESTED,
    }),
    projectsSucceeded: (projects) => ({
        type: types.FETCH_PROJECTS_SUCCEEDED,
        projects
    }),
    projectsFailed: (error) => ({
        type: types.FETCH_PROJECTS_FAILED,
        error
    }),
}

const initialState = {
    projects: [],
    error: "",
    loading: false,
};

export default function reducer(state=initialState, action){
    switch(action.type){
        case types.FETCH_PROJECTS_REQUESTED:
            return {
                ...state,
               loading: true
            };
        case types.FETCH_PROJECTS_SUCCEEDED:
            return {
                ...state,
                projects: action.projects,
                loading: false
            };
        case types.FETCH_PROJECTS_FAILED:
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
    yield takeEvery(types.FETCH_PROJECTS_REQUESTED,getProjects);
}
 

export function* getProjects(data){
    try{
        const response  = yield call(api.callProjects, data);
        yield put(actions.projectsSucceeded(response.body));
    }
    catch(error){
        yield put(actions.projectsFailed("Server Error"));
    } 
}


import { combineReducers } from "redux";

import categories from './Categories';
import projects from './Projects';
import sharedProjects from './SharedProjects';
import favorites from './Favorites';

export default combineReducers({
    categories: categories.reducer,
    projects: projects.reducer,
    sharedProjects: sharedProjects.reducer,
    favorites: favorites.reducer
});
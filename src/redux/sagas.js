import { fork, all } from "redux-saga/effects";
import map from "lodash/map";

import categories from './Categories';
import projects from './Projects';
import sharedProjects from './SharedProjects';
import favorites from './Favorites';

const combinedSagas = [
   categories.saga,
   projects.saga,
   sharedProjects.saga,
   favorites.saga
];

export default function* root() {
    yield all(map(combinedSagas, fork));
}
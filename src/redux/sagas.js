import { fork, all } from "redux-saga/effects";
import map from "lodash/map";
import Categories from './Categories';

const combinedSagas = [
   Categories.saga
];

export default function* root() {
    yield all(map(combinedSagas, fork));
}
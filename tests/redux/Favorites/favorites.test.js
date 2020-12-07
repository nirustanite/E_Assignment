import { takeEvery } from 'redux-saga/effects';
import { runSaga } from 'redux-saga';
import Favorites from 'Store/Favorites';
import api from 'Store/api';

//actions
describe('FavoritesStore actions', () => {

    it('should return action to fetch favorites', () => {
        const expectedAction = {
			type: Favorites.types.FETCH_FAVORITES_REQUESTED,
        };

        expect(Favorites.actions.favoritesFetch()).toEqual(expectedAction);
    });


    it("should return action when fetching favorites is succeeded", () => {
        const favorites = [
            {
                id: 1,
                categoryId: 3,
                sharedProjectId: 6,
                type: "Map",
                name: "Shared Map 3",
                status: "Progress",
                date: "02-12-2020",
                owner:"Person 4",
                avatar: "https://react.semantic-ui.com/images/avatar/small/mark.png",
                src: "https://duncan99.files.wordpress.com/2014/08/polygon1.png"
            },
            {
                id: 2,
                categoryId: 1,
                projectId: 5,
                type: "Shape",
                name: "Shape 3",
                status: "Progress",
                date: "30-11-2020",
                owner: "Person 1",
                avatar:"https://react.semantic-ui.com/images/avatar/small/matthew.png",
                src: "https://duncan99.files.wordpress.com/2014/08/polygon1.png"
            }
        ];

        const expectedAction = {
            type: Favorites.types.FETCH_FAVORITES_SUCCEEDED,
            favorites
        };

        expect(Favorites.actions.favoritesSucceeded(favorites)).toEqual(expectedAction);
    });


    it("should return action when fetching favorites is failed", () => {
        const error = "server error";

        const expectedAction = {
            type: Favorites.types.FETCH_FAVORITES_FAILED,
            error
        };

        expect(Favorites.actions.favoritesFailed(error)).toEqual(expectedAction);
    });

});

//reducer
describe('FavoritesStore reducers', () => {
    const MockInitialState = {
        favorites: [],
        error: "",
        loading: false
    }

    it('handle default', () => {
		expect(Favorites.reducer(undefined, {})).toEqual(MockInitialState);
    });

    it('handle FETCH_FAVORITES_REQUESTED', () => {
        const mockState = {
			loading: false,
        };
        
		const expectedResult = {
			loading: true
        };

		expect(Favorites.reducer(mockState, Favorites.actions.favoritesFetch())).toEqual(expectedResult);
    });
    
    it('handle FETCH_FAVORITES_SUCCEEDED', () => {
        const favorites = [
            {
                id: 1,
                categoryId: 3,
                sharedProjectId: 6,
                type: "Map",
                name: "Shared Map 3",
                status: "Progress",
                date: "02-12-2020",
                owner:"Person 4",
                avatar: "https://react.semantic-ui.com/images/avatar/small/mark.png",
                src: "https://duncan99.files.wordpress.com/2014/08/polygon1.png"
            },
            {
                id: 2,
                categoryId: 1,
                projectId: 5,
                type: "Shape",
                name: "Shape 3",
                status: "Progress",
                date: "30-11-2020",
                owner: "Person 1",
                avatar:"https://react.semantic-ui.com/images/avatar/small/matthew.png",
                src: "https://duncan99.files.wordpress.com/2014/08/polygon1.png"
            }
        ];

        const expectedResult = {
            favorites:favorites,
            loading: false,
            error: ""
        };

        expect(Favorites.reducer(undefined, Favorites.actions.favoritesSucceeded(favorites))).toEqual(expectedResult);

    });

    it('handle FETCH_FAVORITES_FAILED', () => {
        const mockState = {
            error: "",
            loading: true
        };

        const error = "server error"

        const expectedResult = {
            error: error,
            loading: false
        };

        expect(Favorites.reducer(mockState, Favorites.actions.favoritesFailed(error))).toEqual(expectedResult)
    });

});

//saga tests

describe('FavoritesStore sagas', () => {
    const genObject = Favorites.saga();

    it("should wait for every FETCH_FAVORITES_REQUESTED action and call getFavorites", () => {
        expect(genObject.next().value)
        .toEqual(takeEvery('FETCH_FAVORITES_REQUESTED', Favorites.getFavoritesData));
    });

    it('should be done on next iteration', () => {
        expect(genObject.next().done).toBeTruthy();
    });
});

describe('FavoritesStore getFavoritesSaga', () => {

    it('should call api and dispatch success action', async () => {

        const dummyFavorites = [
            {
                id: 1,
                categoryId: 3,
                sharedProjectId: 6,
                type: "Map",
                name: "Shared Map 3",
                status: "Progress",
                date: "02-12-2020",
                owner:"Person 4",
                avatar: "https://react.semantic-ui.com/images/avatar/small/mark.png",
                src: "https://duncan99.files.wordpress.com/2014/08/polygon1.png"
            },
            {
                id: 2,
                categoryId: 1,
                projectId: 5,
                type: "Shape",
                name: "Shape 3",
                status: "Progress",
                date: "30-11-2020",
                owner: "Person 1",
                avatar:"https://react.semantic-ui.com/images/avatar/small/matthew.png",
                src: "https://duncan99.files.wordpress.com/2014/08/polygon1.png"
            }
        ];

        const requestFavorites = jest.spyOn(api, 'callFavorites')
          .mockImplementation(() => Promise.resolve({body: dummyFavorites}));

        const dispatched = [];

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, Favorites.getFavoritesData);

        expect(requestFavorites).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([Favorites.actions.favoritesSucceeded(dummyFavorites)]);
        requestFavorites.mockClear();
      });

      it('should call api and dispatch error action', async () => {

        const requestFavorites = jest.spyOn(api, 'callFavorites')
          .mockImplementation(() => Promise.reject({error: "Server Error"}));

        const dispatched = [];

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, Favorites.getFavoritesData);

        expect(requestFavorites).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([Favorites.actions.favoritesFailed("Server Error")]);
        requestFavorites.mockClear();
      });
});
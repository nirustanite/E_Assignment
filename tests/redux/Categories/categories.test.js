import { takeEvery } from 'redux-saga/effects';
import { runSaga } from 'redux-saga';
import Categories from 'Store/Categories';
import api from 'Store/api';

//action tests
describe('CategoriesStore actions', () => {
    it('should return action to fetch categories', () => {
        const expectedAction = {
			type: Categories.types.FETCH_CATEGORIES_REQUESTED,
        };

        expect(Categories.actions.categoriesFetch()).toEqual(expectedAction);
    });

    it("should return action when fetching categories is succeeded", () => {
        const categories = [
            {id: "1", name: "Category 1"},
            {id: "2", name: "Category 2"}
        ];

        const expectedAction = {
            type: Categories.types.FETCH_CATEGORIES_SUCCEEDED,
            categories
        };

        expect(Categories.actions.categoriesSucceeded(categories)).toEqual(expectedAction);
    });

    it("should return action when fetching categories is failed", () => {
        const error = "server error";

        const expectedAction = {
            type: Categories.types.FETCH_CATEGORIES_FAILED,
            error
        };

        expect(Categories.actions.categoriesFailed(error)).toEqual(expectedAction);
    });
});

// reducer tests
describe('CategoriesStore reducers', () => {
    const MockInitialState = {
        categories: [],
        error: "",
        loading: false
    }

    it('handle default', () => {
		expect(Categories.reducer(undefined, {})).toEqual(MockInitialState);
    });

    it('handle FETCH_CATEGORIES_REQUESTED', () => {
        const mockState = {
			loading: false,
        };
        
		const expectedResult = {
			loading: true
        };

		expect(Categories.reducer(mockState, Categories.actions.categoriesFetch())).toEqual(expectedResult);
    });
    
    it('handle FETCH_CATEGORIES_SUCCEEDED', () => {
        const categories = [
            {id: "1", name: "Category 1"},
            {id: "2", name: "Category 2"}
        ];

        const expectedResult = {
            categories: categories,
            loading: false,
            error: ""
        };

        expect(Categories.reducer(undefined, Categories.actions.categoriesSucceeded(categories))).toEqual(expectedResult);

    });

    it('handle FETCH_CATEGORIES_FAILED', () => {
        const mockState = {
            error: "",
            loading: true
        };

        const error = "server error"

        const expectedResult = {
            error: error,
            loading: false
        };

        expect(Categories.reducer(mockState, Categories.actions.categoriesFailed(error))).toEqual(expectedResult)
    });

});

//saga tests

describe('CategoriesStore sagas', () => {
    const genObject = Categories.saga();

    it("should wait for every FETCH_CATEGORIES_REQUESTED action and call getCategories", () => {
        expect(genObject.next().value)
        .toEqual(takeEvery('FETCH_CATEGORIES_REQUESTED', Categories.getCategories));
    });

    it('should be done on next iteration', () => {
        expect(genObject.next().done).toBeTruthy();
    });
});

describe('CategoriesStore getCategoriesSaga', () => {

    it('should call api and dispatch success action', async () => {

        const dummyCategories = [
            {id: "1", name: "Category 1"},
            {id: "2", name: "Category 2"}
        ];

        const requestCategories = jest.spyOn(api, 'callCategories')
          .mockImplementation(() => Promise.resolve({body: dummyCategories}));

        const dispatched = [];

        const result = await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, Categories.getCategories);

        expect(requestCategories).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([Categories.actions.categoriesSucceeded(dummyCategories)]);
        requestCategories.mockClear();
      });

      it('should call api and dispatch error action', async () => {

        const requestCategories = jest.spyOn(api, 'callCategories')
          .mockImplementation(() => Promise.reject({error: "Server Error"}));

        const dispatched = [];

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, Categories.getCategories);

        expect(requestCategories).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([Categories.actions.categoriesFailed("Server Error")]);
        requestCategories.mockClear();
      });
});



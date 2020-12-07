import { takeEvery } from 'redux-saga/effects';
import { runSaga } from 'redux-saga';
import SharedProjects from 'Store/SharedProjects';
import api from 'Store/api';

//actions
describe('SharedProjectsStore actions', () => {

    it('should return action to fetch shared projects', () => {
        const expectedAction = {
			type: SharedProjects.types.FETCH_SHARED_PROJECTS_REQUESTED,
        };

        expect(SharedProjects.actions.sharedProjectsFetch()).toEqual(expectedAction);
    });


    it("should return action when fetching shared projects is succeeded", () => {
        const sharedProjects = [
            {
                id: 1,
                categoryId: 2,
                type: "Map",
                name: "Shared Map 1",
                status: "Uploaded",
                date: "24-02-2020",
                owner: "Person 4",
                avatar: "https://react.semantic-ui.com/images/avatar/small/mark.png",
                src: "https://i.stack.imgur.com/I50Wu.jpg"
            },
            {
                id: 2,
                categoryId: 2,
                type: "Shape",
                name: "Shared Shape 1",
                status: "Progress",
                date: "29-11-2020",
                owner: "Person 4",
                avatar: "https://react.semantic-ui.com/images/avatar/small/mark.png",
                src: "https://duncan99.files.wordpress.com/2014/08/polygon1.png"
            },
        ];

        const expectedAction = {
            type: SharedProjects.types.FETCH_SHARED_PROJECTS_SUCCEEDED,
            sharedProjects
        };

        expect(SharedProjects.actions.sharedProjectsSucceeded(sharedProjects)).toEqual(expectedAction);
    });


    it("should return action when fetching projects is failed", () => {
        const error = "server error";

        const expectedAction = {
            type: SharedProjects.types.FETCH_SHARED_PROJECTS_FAILED,
            error
        };

        expect(SharedProjects.actions.sharedProjectsFailed(error)).toEqual(expectedAction);
    });

});

//reducer
describe('SharedProjectsStore reducers', () => {
    const MockInitialState = {
        sharedProjects: [],
        error: "",
        loading: false
    }

    it('handle default', () => {
		expect(SharedProjects.reducer(undefined, {})).toEqual(MockInitialState);
    });

    it('handle FETCH_PROJECTS_REQUESTED', () => {
        const mockState = {
			loading: false,
        };
        
		const expectedResult = {
			loading: true
        };

		expect(SharedProjects.reducer(mockState, SharedProjects.actions.sharedProjectsFetch())).toEqual(expectedResult);
    });
    
    it('handle FETCH_SHARED_PROJECTS_SUCCEEDED', () => {
        const sharedProjects = [
            {
                id: 1,
                categoryId: 1,
                type: "Map",
                name: "Map 1",
                status: "Uploaded",
                date: "24-01-2020",
                owner: "Person 1",
                avatar:"https://react.semantic-ui.com/images/avatar/small/matthew.png",
                src: "https://i.stack.imgur.com/I50Wu.jpg"
            },
            {
                id: 2,
                categoryId: 1,
                type: "Map",
                name: "Map 2",
                status: "Progress",
                date: "23-01-2020",
                owner: "Person 2",
                avatar:"https://react.semantic-ui.com/images/avatar/small/matthew.png",
                src: "https://i.stack.imgur.com/I50Wu.jpg"
            },
        ];

        const expectedResult = {
            sharedProjects: sharedProjects,
            loading: false,
            error: ""
        };

        expect(SharedProjects.reducer(undefined, SharedProjects.actions.sharedProjectsSucceeded(sharedProjects))).toEqual(expectedResult);

    });

    it('handle FETCH_SHARED_PROJECTS_FAILED', () => {
        const mockState = {
            error: "",
            loading: true
        };

        const error = "server error"

        const expectedResult = {
            error: error,
            loading: false
        };

        expect(SharedProjects.reducer(mockState, SharedProjects.actions.sharedProjectsFailed(error))).toEqual(expectedResult)
    });

});

//saga tests

describe('SharedProjectsStore sagas', () => {
    const genObject = SharedProjects.saga();

    it("should wait for every FETCH_SHARED_PROJECTS_REQUESTED action and call getSharedProjects", () => {
        expect(genObject.next().value)
        .toEqual(takeEvery('FETCH_SHARED_PROJECTS_REQUESTED', SharedProjects.getSharedProjects));
    });

    it('should be done on next iteration', () => {
        expect(genObject.next().done).toBeTruthy();
    });
});

describe('SharedProjectsStore getSharedProjectsSaga', () => {

    it('should call api and dispatch success action', async () => {

        const dummySharedProjects = [
            {
                id: 1,
                categoryId: 1,
                type: "Map",
                name: "Map 1",
                status: "Uploaded",
                date: "24-01-2020",
                owner: "Person 1",
                avatar:"https://react.semantic-ui.com/images/avatar/small/matthew.png",
                src: "https://i.stack.imgur.com/I50Wu.jpg"
            },
            {
                id: 2,
                categoryId: 1,
                type: "Map",
                name: "Map 2",
                status: "Progress",
                date: "23-01-2020",
                owner: "Person 2",
                avatar:"https://react.semantic-ui.com/images/avatar/small/matthew.png",
                src: "https://i.stack.imgur.com/I50Wu.jpg"
            },
        ];

        const requestSharedProjects = jest.spyOn(api, 'callSharedProjects')
          .mockImplementation(() => Promise.resolve({body: dummySharedProjects}));

        const dispatched = [];

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, SharedProjects.getSharedProjects);

        expect(requestSharedProjects).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([SharedProjects.actions.sharedProjectsSucceeded(dummySharedProjects)]);
        requestSharedProjects.mockClear();
      });

      it('should call api and dispatch error action', async () => {

        const requestSharedProjects = jest.spyOn(api, 'callSharedProjects')
          .mockImplementation(() => Promise.reject({error: "Server Error"}));

        const dispatched = [];

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, SharedProjects.getSharedProjects);

        expect(requestSharedProjects).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([SharedProjects.actions.sharedProjectsFailed("Server Error")]);
        requestSharedProjects.mockClear();
      });
});
import { takeEvery } from 'redux-saga/effects';
import { runSaga } from 'redux-saga';
import Projects from 'Store/Projects';
import api from 'Store/api';

//actions
describe('ProjectsStore actions', () => {

    it('should return action to fetch projects', () => {
        const expectedAction = {
			type: Projects.types.FETCH_PROJECTS_REQUESTED,
        };

        expect(Projects.actions.projectsFetch()).toEqual(expectedAction);
    });


    it("should return action when fetching projects is succeeded", () => {
        const projects = [
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

        const expectedAction = {
            type: Projects.types.FETCH_PROJECTS_SUCCEEDED,
            projects
        };

        expect(Projects.actions.projectsSucceeded(projects)).toEqual(expectedAction);
    });


    it("should return action when fetching projects is failed", () => {
        const error = "server error";

        const expectedAction = {
            type: Projects.types.FETCH_PROJECTS_FAILED,
            error
        };

        expect(Projects.actions.projectsFailed(error)).toEqual(expectedAction);
    });

});

//reducer
describe('ProjectsStore reducers', () => {
    const MockInitialState = {
        projects: [],
        error: "",
        loading: false
    }

    it('handle default', () => {
		expect(Projects.reducer(undefined, {})).toEqual(MockInitialState);
    });

    it('handle FETCH_PROJECTS_REQUESTED', () => {
        const mockState = {
			loading: false,
        };
        
		const expectedResult = {
			loading: true
        };

		expect(Projects.reducer(mockState, Projects.actions.projectsFetch())).toEqual(expectedResult);
    });
    
    it('handle FETCH_PROJECTS_SUCCEEDED', () => {
        const projects = [
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
            projects: projects,
            loading: false,
            error: ""
        };

        expect(Projects.reducer(undefined, Projects.actions.projectsSucceeded(projects))).toEqual(expectedResult);

    });

    it('handle FETCH_PROJECTS_FAILED', () => {
        const mockState = {
            error: "",
            loading: true
        };

        const error = "server error"

        const expectedResult = {
            error: error,
            loading: false
        };

        expect(Projects.reducer(mockState, Projects.actions.projectsFailed(error))).toEqual(expectedResult)
    });

});

//saga tests

describe('ProjectsStore sagas', () => {
    const genObject = Projects.saga();

    it("should wait for every FETCH_PROJECTS_REQUESTED action and call getProjects", () => {
        expect(genObject.next().value)
        .toEqual(takeEvery('FETCH_PROJECTS_REQUESTED', Projects.getProjects));
    });

    it('should be done on next iteration', () => {
        expect(genObject.next().done).toBeTruthy();
    });
});

describe('ProjectsStore getProjectsSaga', () => {

    it('should call api and dispatch success action', async () => {

        const dummyProjects = [
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

        const requestProjects = jest.spyOn(api, 'callProjects')
          .mockImplementation(() => Promise.resolve({body: dummyProjects}));

        const dispatched = [];

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, Projects.getProjects);

        expect(requestProjects).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([Projects.actions.projectsSucceeded(dummyProjects)]);
        requestProjects.mockClear();
      });

      it('should call api and dispatch error action', async () => {

        const requestProjects = jest.spyOn(api, 'callProjects')
          .mockImplementation(() => Promise.reject({error: "Server Error"}));

        const dispatched = [];

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, Projects.getProjects);

        expect(requestProjects).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([Projects.actions.projectsFailed("Server Error")]);
        requestProjects.mockClear();
      });
});
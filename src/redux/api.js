import request from 'superagent';
import ConfigData from "ConfigData";
import endpoints from 'Util/endpoints';

const api = {
    callCategories: () => {
        return request.get(`${ConfigData.url}/${endpoints.CATEGORIES}`);
    },
    callProjects: () => {
        return request.get(`${ConfigData.url}/${endpoints.PROJECTS}`);
    },
    callSharedProjects: () => {
        return request.get(`${ConfigData.url}/${endpoints.SHARED_PROJECTS}`);
    },
    callFavorites: () => {
        return request.get(`${ConfigData.url}/${endpoints.FAVORITES}`);
    },
}

export default api;
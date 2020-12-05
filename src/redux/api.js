import request from 'superagent';
import ConfigData from "ConfigData";
import endpoints from 'Util/endpoints';

const api = {
    callCategories: () => {
        return request.get(`${ConfigData.url}/${endpoints.CATEGORIES}`);
    }
}

export default api;
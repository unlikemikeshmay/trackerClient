import config from 'config';
import {authHeader} from '../_helpers';

export const toolService = { 
    getAll
}

function getAll() {
    const requestOptions = {
        method: 'GET',

        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${JSON.parse(localStorage.getItem('user'))}`
        }
    };
    
    return fetch(`${config.apiUrl}/get-tools`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
   
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {https://123moviesca.com/godzilla-king-of-the-monsters-2019/
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
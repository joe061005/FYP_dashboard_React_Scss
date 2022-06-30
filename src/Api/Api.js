//import AsyncStorage from '@react-native-async-storage/async-storage'
//import moment from 'moment'

const api_path = {
    baseURL: 'https://d210-223-19-143-35.ngrok.io/'
}

//let date = moment().format('YYYY-MM-DD');


var api = {
    // Login Page
    login: (props) => {
        var request = {
            method: 'admin/adminLogin',
            params: props
        }

        return post(request)
    },

    logout:  () => {
        var request = {
            method: 'admin/logout'
        }

        return post(request)
    },

    // dashboard page
    getUserData: () => {
        var request = {
            method: 'admin/userDashboard'
        }

        return get(request)
    },

    getInfoData: () => {
        var request = {
            method: 'admin/infoDashboard'
        }

        return get(request)
    },

    getFormData: () => {
        var request = {
            method: 'admin/formDashboard'
        }

        return get(request)
    },

    getGroupData: () => {
        var request = {
            method: 'admin/groupDashboard'
        }

        return get(request)
    },

    // user page
    getAllUser: () => {
        var request = {
            method: 'admin/getAllUser'
        }

        return get(request)
    }


}

async function get(request) {
    return fetch(api_path.baseURL + request.method, {
        method: 'GET',
        credentials: 'include'
    }).then(response => {
        const statusCode = response.status;
        const data = response.json();
        const header = response.headers;
        return Promise.all([statusCode, data, header]);
    })
}

async function post(request) {
    return fetch(api_path.baseURL + request.method, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            request.params
        ),
        credentials: 'include'
        
    }).then(response => {
        const statusCode = response.status;
        const data = response.json();
        const header = response.headers;
        return Promise.all([statusCode, data, header]);
    })
}

async function put(request) {
    return fetch(api_path.baseURL + request.method, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            request.params
        ),
        credentials: 'include'
        
    }).then(response => {
        const statusCode = response.status;
        const data = response.json();
        const header = response.headers;
        return Promise.all([statusCode, data, header]);
    })
}

module.exports = api;

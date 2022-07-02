//import AsyncStorage from '@react-native-async-storage/async-storage'
//import moment from 'moment'

const api_path = {
    baseURL: 'https://2a4a-223-19-143-35.ngrok.io/'
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
    },

    deleteUsers: (props) => {
        var request = {
            method: 'admin/deleteUsers',
            params: props
        }

        return post(request)
    },

    // session page
    getAllSession: () => {
        var request = {
            method: 'admin/getAllSession'
        }

        return get(request)
    },

    deleteSessions: (props) => {
        var request = {
            method: 'admin/deleteSessions',
            params: props
        }

        return post(request)
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

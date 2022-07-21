//import AsyncStorage from '@react-native-async-storage/async-storage'
//import moment from 'moment'

const api_path = {
    baseURL: 'https://24f0-223-19-143-35.ngrok.io/'
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

    logout: () => {
        var request = {
            method: 'admin/logout'
        }

        return post(request)
    },

    // dashboard page
    getAllData: () => {
        var request = {
            method: 'admin/allDashboard'
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

    getUserInfo: (userId) => {
        var request = {
            method: `admin/getUser/${userId}`,
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

    register: (props) => {
        var request = {
            method: 'user/addUser',
            params: props
        }

        return post(request)
    },

    // trail page
    getAllTrail: () => {
        var request = {
            method: 'admin/getAllTrail'
        }

        return get(request)
    },

    getTrailInfo: (trailId) => {
        var request = {
            method: `admin/getTrail/${trailId}`,
        }

        return get(request)
    },

    deleteTrails: (props) => {
        var request = {
            method: 'admin/deleteTrails',
            params: props
        }

        return post(request)
    },


    // info page
    getAllInfo: () => {
        var request = {
            method: 'admin/getAllInfo'
        }

        return get(request)
    },

    deleteInfos: (props) => {
        var request = {
            method: 'admin/deleteInfos',
            params: props
        }

        return post(request)
    },

    // form page
    getAllForm: () => {
        var request = {
            method: 'admin/getAllForm'
        }

        return get(request)
    },

    deleteForms: (props) => {
        var request = {
            method: 'admin/deleteForms',
            params: props
        }

        return post(request)
    },

    // group page
    getAllGroup: () => {
        var request = {
            method: 'admin/getAllGroup'
        }

        return get(request)
    },

    deleteGroups: (props) => {
        var request = {
            method: 'admin/deleteGroups',
            params: props
        }

        return post(request)
    },

    quitGroup: (props) => {
        var request = {
            method: 'admin/quitGroup',
            params: props
        }

        return post(request)
    },

    // location page
    getAllLocation: () => {
        var request = {
            method: 'admin/getAllLocation'
        }

        return get(request)
    },

    deleteLocations: (props) => {
        var request = {
            method: 'admin/deleteLocations',
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

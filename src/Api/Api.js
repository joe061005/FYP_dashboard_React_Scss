import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'

const api_path = {
    baseURL: 'https://abca-223-19-143-35.ngrok.io/'
}

let date = moment().format('YYYY-MM-DD');

var storage = {
    login_data: {},
    cookie: "",
    cookie_ID: ""
}

var api = {
    // Login Page
    login: (props) => {
        var request = {
            method: 'user/login',
            params: props
        }

        return post(request)
    },
    resetUserData: async () => {
        storage.login_data = null;
        storage.cookie = null;

        try {
            await AsyncStorage.removeItem('LOGIN_DATA')
            await AsyncStorage.removeItem('COOKIE')
        } catch (error) {
            console.log("error", error)
        }
    },


}

async function get(request) {
    return fetch(api_path.baseURL + request.method, {
        method: 'GET'
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
        )
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
        )
    }).then(response => {
        const statusCode = response.status;
        const data = response.json();
        const header = response.headers;
        return Promise.all([statusCode, data, header]);
    })
}

module.exports = api;

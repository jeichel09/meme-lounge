import { clearUserData, getUserData } from "../util.js";

let host = 'http://localhost:3030';

async function request(url, method, data) {
    let options = {
        method,
        headers: {}
    };

    if (data != undefined) {
        options.headers['Content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    let userData = getUserData();
    if (userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
        let res = await fetch(host + url, options);

        if (res.ok == false) {
            if (res.status == 403) {
                clearUserData();
            }
            let error = await res.json();
            throw new Error(error.message);
        }
    
        if (res.status == 204) {
            return res;
        } else {
            return res.json();
        } 
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

export async function get(url) {
    return request(url, 'get');
}

export async function post(url, data) {
    return request(url, 'post', data);
}

export async function put(url, data) {
    return request(url, 'put', data);
}

export async function del(url) {
    return request(url, 'delete');
}
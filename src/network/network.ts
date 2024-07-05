import axios from "axios";

export const instanse = axios.create({
    baseURL: 'http://34.107.28.98/api',
    headers: {
        Accept: '*/*',
        "Content-Type": 'application/json'
    }
})


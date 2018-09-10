import axios from 'axios';
import qs from 'qs';
const http = {
    get(url, params) {
        params = params || {};
        return new Promise((resolve, reject) => {
            axios.get(url, { params: params })
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    post(url, params) {
        params = params || {};
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params))
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
};
export default http;

import axios from 'axios';
import qs from 'qs';
axios.defaults.withCredentials = true;
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
    post(url, params, dev) {
        params = params || {};
        return new Promise((resolve, reject) => {
            const param = dev === 'dev' ? params : qs.stringify(params);
            axios.post(url, param)
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
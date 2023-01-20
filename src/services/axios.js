import axios from "axios";

const API_BASE_URL = process.env["VUE_APP_API"];
let token = JSON.parse(localStorage.getItem('JWT'));

export default {
  install(Vue) {
    Vue.prototype.$axios = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    Vue.prototype.$axios.interceptors.response.use(undefined, error => {
      switch (error.response.status) {
        case 401:
            window.location = '/#/login'
            localStorage.removeItem('JWT');
            break
      }
      return Promise.reject(error);
    })

    Vue.prototype.$axios.interceptors.request.use(
      config => {
        config.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('JWT'))}`;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );
  }
};
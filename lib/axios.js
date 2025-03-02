import Axios from "axios";
import Cookies from "js-cookie";

const apiurl = process.env.NEXT_PUBLIC_SITE_URL;

const authRequestInterceptor = (config) => {
    config.headers = config.headers ?? {};
    const token = Cookies.get("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.Accept = "application/json";
    return config;
};

export const axios = Axios.create({ baseURL: apiurl });

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
    (response) => response?.data,

    (error) => {
        console.log(error, "error==>");
        if (error.response?.status === 401) {
            console.log("Unauthorized, redirecting...");
            Cookies.remove("token");
            window.location.replace("/login");
        }
        return Promise.reject(error);
    }
);

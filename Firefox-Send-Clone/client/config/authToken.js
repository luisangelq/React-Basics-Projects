import axiosClient from "./axios";

const authToken = (token) => {
    if (token) {
        axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axiosClient.defaults.headers.common["Authorization"];
    }
}

export default authToken;
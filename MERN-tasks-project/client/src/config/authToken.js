import axiosClient from "./axios";
 
const authToken = token => {
    if (token) {
        // Apply to every request
        axiosClient.defaults.headers.common["x-auth-token"] = token;
    } else {
        // Delete auth header
        delete axiosClient.defaults.headers.common["x-auth-token"];
    }
}

export default authToken;
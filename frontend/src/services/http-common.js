import axios from "axios";

const httpClient = axios.create({
    // eslint-disable-next-line no-undef
    baseURL: process.env.REACT_APP_BASE_API_URL,
    headers: {
        "Content-type": "application/json"
    }
});

export default httpClient;

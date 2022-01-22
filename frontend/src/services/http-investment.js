import axios from "axios";

export default axios.create({
    baseURL: "/api/v1/investments",
    headers: {
        "Content-type": "application/json"
    }
});
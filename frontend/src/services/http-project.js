import axios from "axios";

export default axios.create({
    baseURL: "/api/v1/projects",
    headers: {
        "Content-type": "application/json"
    }
});
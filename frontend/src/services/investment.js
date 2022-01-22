import http from "./http-investment";

class InvestmentDataService {
    getAll(page = 0) {
        return http.get(`?page=${page}`);
    }

    get(id) {
        return http.get(`/id/${id}`);
    }

    find(query, by = "name", page = 0) {
        return http.get(`?${by}=${query}&page=${page}`);
    }

    getTypes(id) {
        return http.get('/type');
    }
}
export default new InvestmentDataService;
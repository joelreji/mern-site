import http from "./http-literature";

class LiteratureDataService {
    getAll(page = 0) {
        return http.get(`?page=${page}`);
    }

    get(id) {
        return http.get(`/id/${id}`);
    }

    find(query, by = "rating", page = 0) {
        return http.get(`?${by}=${query}&page=${page}`);
    }

    getRatings(id) {
        return http.get('/rating');
    }

    getGenres(id) {
        return http.get('/genre');
    }
}
export default new LiteratureDataService
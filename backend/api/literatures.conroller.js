import LiteraturesDAO from "../dao/literaturesDAO.js"

export default class LiteraturesController {
    static async apiGetLiteratures(req, res, next) {
        const literaturesPerPage = req.query.literaturesPerPage ? parseInt(req.query.literaturesPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.rating) {
            filters.rating = req.query.rating
        } else if (req.query.genre) {
            filters.genre = req.query.genre
        }

        const { literatureList, totalNumLiteratures } = await LiteraturesDAO.getLiteratures({
            filters,
            page,
            literaturesPerPage,
        })

        let response = {
            literatures: literatureList,
            page: page,
            filters: filters,
            entries_per_page: literaturesPerPage,
            total_results: totalNumLiteratures,
        }
        res.json(response)
    }

    static async apiGetLiteratureById(req, res, next) {
        try {
            let id = req.params.id || {}
            let literature = await LiteraturesDAO.apiGetLiteratureById(id)
            if (!literature) {
                res.status(404).json({ error: "Literature not found" })
                return
            }
            res.json(literature)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetLiteratureGenres(req, res, next) {
        try {
            let genres = await LiteraturesDAO.getGenres()
            res.json(genres)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetLiteratureRatings(req, res, next) {
        try {
            let ratings = await LiteraturesDAO.getRatings()
            res.json(ratings)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
}
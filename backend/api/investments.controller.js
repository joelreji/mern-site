import InvestmentsDAO from "../dao/investmentsDAO.js"

export default class InvestmentsController {
    static async apiGetInvestments(req, res, next) {
        const investmentsPerPage = req.query.investmentsPerPage ? parseInt(req.query.investmentsPerPage, 10) : 30
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name
        } else if (req.query.type) {
            filters.type = req.query.type
        } else if (req.query.ticker) {
            filters.ticker = req.query.ticker
        }

        const { investmentList, totalNumInvestments } = await InvestmentsDAO.getInvestments({
            filters,
            page,
            investmentsPerPage,
        })

        let response = {
            investments: investmentList,
            page: page,
            filters: filters,
            entries_per_page: investmentsPerPage,
            total_results: totalNumInvestments,
        }
        res.json(response)
    }

    static async apiGetInvestmentById(req, res, next) {
        try {
            let id = req.params.id || {}
            let investment = await InvestmentsDAO.apiGetInvestmentById(id)
            if (!investment) {
                res.status(404).json({ error: "Investment not found" })
                return
            }
            res.json(investment)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetInvestmentTypes(req, res, next) {
        try {
            let types = await InvestmentsDAO.getTypes()
            res.json(types)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
}
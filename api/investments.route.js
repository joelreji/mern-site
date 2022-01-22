import express from "express"
import InvestmentsController from "./investments.controller.js"

const router = express.Router()

router.route("/").get(InvestmentsController.apiGetInvestments)
router.route("/id/:id").get(InvestmentsController.apiGetInvestmentById)
router.route("/type").get(InvestmentsController.apiGetInvestmentTypes)

export default router
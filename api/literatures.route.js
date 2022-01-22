import express from "express"
import LiteraturesController from "./literatures.conroller.js"

const router = express.Router()

router.route("/").get(LiteraturesController.apiGetLiteratures)
router.route("/id/:id").get(LiteraturesController.apiGetLiteratureById)
router.route("/genre").get(LiteraturesController.apiGetLiteratureGenres)
router.route("/rating").get(LiteraturesController.apiGetLiteratureRatings)

export default router
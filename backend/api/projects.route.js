import express from "express"
import ProjectsController from "./projects.controller.js"

const router = express.Router()

router.route("/").get(ProjectsController.apiGetProjects)
router.route("/id/:id").get(ProjectsController.apiGetProjectById)

export default router
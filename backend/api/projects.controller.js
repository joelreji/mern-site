import ProjectsDAO from "../dao/projectsDAO.js"

export default class ProjectsController {
    static async apiGetProjects(req, res, next) {
         const projectsPerPage = req.query.projectsPerPage ? parseInt(req.query.projectsPerPage, 10) : 20
         const page = req.query.page ? parseInt(req.query.page, 10) : 0

        const { projectList, totalNumProjects } = await ProjectsDAO.getProjects({
            page,
            projectsPerPage,
        })

        let response = {
            projects: projectList,
            page: page,
            entries_per_page: projectsPerPage,
            total_results: totalNumProjects,
        }
        res.json(response)
    }

    static async apiGetProjectById(req, res, next) {
        try {
            let id = req.params.id || {}
            let project = await ProjectsDAO.apiGetProjectById(id)
            if (!project) {
                res.status(404).json({ error: "Project not found" })
                return
            }
            res.json(project)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
}
import mongodb from "mongodb"

let projects 
const ObjectId = mongodb.ObjectId

export default class ProjectsDAO {
    static async injectDB(conn) {
        if (projects) {
            return
        }
        try {
            projects = await conn.db(process.env.DB_NAME).collection("projects")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in projectsDAO: ${e}`,
            )
        }
    }

    static async getProjects({
        page = 0,
        projectsPerPage = 20,
    } = {}) {
        let query
        let cursor
        try {
            cursor = await projects.find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { projectList: [], totalNumProjects: 0 }
        }
        const displayCursor = cursor.limit(projectsPerPage).skip(projectsPerPage * page)
        try {
            const projectList = await displayCursor.toArray()
            const totalNumProjects = await projects.countDocuments(query)

            return { projectList, totalNumProjects }
        } catch (e) {
            console.error(`Unable to convert cursor to arrary or problem counting documents, ${e}`)
            return { projectList: [], totalNumProjects: 0 }
        }
    }

    static async apiGetProjectById(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
            ]
            return await projects.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Something went werong in getProjectsById: ${e}`)
        }
    }
}
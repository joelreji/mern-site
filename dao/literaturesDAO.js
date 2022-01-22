import mongodb from "mongodb"

let literatures
const ObjectId = mongodb.ObjectId

export default class LiteraturesDAO {
    static async injectDB(conn) {
        if (literatures) {
            return
        }
        try {
            literatures = await conn.db(process.env.DB_NAME).collection("literatures")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in literaturesDAO: ${e}`,
            )
        }
    }

    static async getLiteratures({
        filters = null,
        page = 0,
        literaturesPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("rating" in filters) {
                query = { "rating": { $eq: filters["rating"] } }
            } else if ("genre" in filters) {
                query = { "genre": { $eq: filters["genre"] } }
            }
        }

        let cursor
        try {
            cursor = await literatures.find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { literatureList: [], totalNumLiteratures: 0 }
        }

        const displayCursor = cursor.limit(literaturesPerPage).skip(literaturesPerPage * page)
        try {
            const literatureList = await displayCursor.toArray()
            const totalNumLiteratures = await literatures.countDocuments(query)
            return { literatureList, totalNumLiteratures }
        } catch (e) {
            console.error(`Unable to convert cursor to arrary or problem counting documents, ${e}`)
            return { literatureList: [], totalNumLiteratures: 0 }
        }
    }

    static async apiGetLiteratureById(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
            ]
            return await literatures.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Something went werong in getLiteratureById: ${e}`)
        }
    }

    static async getGenres() {
        let genres = []
        try {
            genres = await literatures.distinct("genre")
            return genres
        } catch (e) {
            console.error(`Unable to get literature genres, ${e}`)
            return genres
        }
    }

    static async getRatings() {
        let ratings = []
        try {
            ratings = await literatures.distinct("rating")
            return ratings
        } catch (e) {
            console.error(`Unable to get literature ratings, ${e}`)
            return ratings
        }
    }
}
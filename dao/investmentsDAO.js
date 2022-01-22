import mongodb from "mongodb"

let investments
const ObjectId = mongodb.ObjectId

export default class InvestmentsDAO {
    static async injectDB(conn) {
        if (investments) {
            return
        }
        try {
            investments = await conn.db(process.env.DB_NAME).collection("investments")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in investmentsDAO: ${e}`,
            )
        }
    }

    static async getInvestments({
        filters = null,
        page = 0,
        investmentsPerPage = 30,
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } }
            } else if ("type" in filters) {
                query = { "type": { $eq: filters["type"] } }
            } else if ("ticker" in filters) {
                query = { "ticker": { $eq: filters["ticker"] } }
            }
        }

        let cursor
        try {
            cursor = await investments.find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { investmentList: [], totalNumInvestments: 0 }
        }

        const displayCursor = cursor.sort({ quantity: -1 }).limit(investmentsPerPage).skip(investmentsPerPage * page)
        try {
            const investmentList = await displayCursor.toArray()
            const totalNumInvestments = await investments.countDocuments(query)
            return { investmentList, totalNumInvestments }
        } catch (e) {
            console.error(`Unable to convert cursor to arrary or problem counting documents, ${e}`)
            return { investmentList: [], totalNumInvestments: 0 }
        }
    }

    static async apiGetInvestmentById(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
            ]
            return await investments.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Something went werong in getInvestmentById: ${e}`)
        }
    }

    static async getTypes() {
        let typeList = []
        try {
            typeList = await investments.aggregate([
                { $group: { _id: "$type", total: { $sum: "$quantity" } } },
            ]).toArray()

            return { typeList }
        } catch (e) {
            console.error(`Unable to get investments types, ${e}`)
            return { typeList: [] }
        }
    }
}
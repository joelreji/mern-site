import app from "./server.js"
import mongodb from "mongodb"
import dotenv from  "dotenv"
import InvestmentsDAO from "./dao/investmentsDAO.js"
import ProjectsDAO from "./dao/projectsDAO.js"
import LiteraturesDAO from "./dao/literaturesDAO.js"
dotenv.config()

const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 5000

MongoClient.connect(
    process.env.ATLAS_URI,
    {
        maxPoolSize: 50, 
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
).catch(err => {
    console.error(err.stack)
    process.exit(1)
}).then(async client => {
    await InvestmentsDAO.injectDB(client)
    await ProjectsDAO.injectDB(client)
    await LiteraturesDAO.injectDB(client)
    app.listen(port, () =>{
        console.log(`Listening on port ${port}`)
    })
})
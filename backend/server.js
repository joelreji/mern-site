import express from "express";
import cors from "cors";
import investments from "./api/investments.route.js"
import projects from "./api/projects.route.js"
import literatures from "./api/literatures.route.js" 

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/v1/investments", investments)
app.use("/api/v1/projects", projects)
app.use("/api/v1/literatures", literatures)
app.use("*", (req, res) => res.status(404).json({error: "Page not found"}))

export default app;
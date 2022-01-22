import express from "express";
import cors from "cors";
import investments from "./api/investments.route.js"
import projects from "./api/projects.route.js"
import literatures from "./api/literatures.route.js"
import path from "path"

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "frontend", "build")))

app.use("/api/v1/investments", investments)
app.use("/api/v1/projects", projects)
app.use("/api/v1/literatures", literatures)
app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
})

export default app;
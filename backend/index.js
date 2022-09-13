const express = require("express")
const colors = require("colors")
const app = express()
require("dotenv").config()

const PORT = 8080 || process.env.PORT



app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`.bold)
})
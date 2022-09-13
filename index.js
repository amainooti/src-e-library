const express = require("express")
const cors = require("cors")
require("colors")
const app = express()
require("dotenv").config()
const {connectionDB} = require("./config/db")
const PORT = 8080 || process.env.PORT


connectionDB()
// @middlewar
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


// @custom middleware

app.use("/api/users", require("./routes/userRoute"))

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`.bold)
})
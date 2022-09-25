const express = require("express");
const cors = require("cors");
const colors = require("colors");
const app = express();
const fs = require("fs");
require("dotenv").config();
const morgan = require("morgan");
const { connectionDB } = require("./config/db");
const PORT = 8080 || process.env.PORT;

connectionDB();
// @middleware

const accessLogStream = fs.createWriteStream(__dirname + "/logs/access.log", {
  flags: "a",
});
// app.use(morgan("dev", {stream: accessLogStream}));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// @custom middleware

app.use("/api/users", require("./routes/userRoute"));
app.use("/api", require("./routes/documentRoute"));
app.use("/api/admin", require("./routes/adminRoute"));

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`.bold);
});

const express = require("express");
const app = express();
require("dotenv").config();
require("./connection/connection");
const cors = require("cors");
const UserApi = require("./routes/user")
const TaskApi = require("./routes/task")
app.use(cors())

app.use(express.json()); // Initialize Express application

app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend started successfully!" });
});
app.use("/api/v1",UserApi);
app.use("/api/v2",TaskApi);


const PORT = 1000;

app.listen(PORT, () => {
  console.log(`Server is litening at ${PORT}`);
});

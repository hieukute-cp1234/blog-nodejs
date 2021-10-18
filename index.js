const express = require("express");
const cors = require("cors");
const SERVER = require("./constants/server");
const connect = require("./configs/mongoDB");
const route = require("./routes/index");

const app = express();
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};
connect();
app.use(express.json());
app.use(cors(corsOptions));
route(app);

app.listen(SERVER.POST, SERVER.LAN, () => {
  console.log(`Server is running on port:8000`);
});

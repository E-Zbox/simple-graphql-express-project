require("dotenv").config();
const { PORT, DB_URI } = process.env;
require("./database/connect")(DB_URI);

const express = require("express");
// routers
const { userRouter, linkRouter } = require("./routers");

const app = express();

app.use(userRouter);

app.use(linkRouter);

app.listen(PORT, () => console.log("app is listening on port", PORT));

const express = require("express");
const app = express();
// const User = require("./db/db");
const users = require("./routes/users");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", users);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on ${port} ......`));

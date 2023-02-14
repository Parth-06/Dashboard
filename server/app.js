const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
dotenv.config({ path: "./config.env" });
require("./DB/conn");

app.use(express.json());

app.use(require("./router/auth"));
app.use(require("./router/uploadRouter"));
app.use(require("./router/LoginRegiAuth"));
app.use(require("./router/fetchRouter"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listning At ${PORT}`);
});

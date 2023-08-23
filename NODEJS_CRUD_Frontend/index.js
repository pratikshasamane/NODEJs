const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const cors = require("cors");

connectDb();

const app = express();

app.use(cors());

const port = process.env.PORT || 8001;
app.use(express.json());

const userRouter = require("./routes/userRoutes");
app.use("/api", userRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

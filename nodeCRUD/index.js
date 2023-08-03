const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

connectDb();
const app = express();
const port = process.env.PORT || 8001;
app.use(express.json());

const userValidationRouter = require("./routes/userValidationRoutes");
const userRouter = require("./routes/userRoutes");

app.use("/api/validate", userValidationRouter);
app.use("/api", userRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

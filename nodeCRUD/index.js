const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

connectDb();
const app = express();
const port = process.env.PORT || 8001;
app.use(express.json());

const userRouter = require("./routes/userRoutes");
const userValidationRouter = require("./routes/userValidationRoutes");

app.use("/api", userRouter);
app.use("/api/validate", userValidationRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

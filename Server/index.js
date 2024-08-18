const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// const globalErrorHandler = require("./middlewares/errorMiddleware");
require("dotenv").config();
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const errorHandler = require("./utils/errorHandler");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }) 
);
app.options("*", cors());

app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(require("./routes/apiRoutes"));
// app.all("*", (req, res, next) => {
//   next(new errorHandler(404, `Can't find ${req.originalUrl} on this server!`));
// });

// app.use(globalErrorHandler);
connectDB();

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

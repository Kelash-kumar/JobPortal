const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");
const session = require("express-session");
// const globalErrorHandler = require("./middlewares/errorMiddleware");
require("dotenv").config();
const connectDB = require("./config/db");
const app = express();
const port = process.env.PORT || 5000;

// app.use(cors({origin:true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "joportal",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  })
);

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// app.use(globalErrorHandler);
connectDB();
app.use(require('./routes/apiRoutes'))
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

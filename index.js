const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConnect");
const mongoose = require("mongoose");
// Import Routes
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const authRoute = require("./routes/authRoute");
const commentRoute = require("./routes/commentRoute");

// Connect with Database
connectDB();

// Application use Middleware
app.use(logger);
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "/public")));

// Application - root Page
// app.use("/", require("./routes/root"));

// All Route here
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/auth", authRoute);
app.use("/api/comment", commentRoute);

// Not Found Or 404 error Page
// app.all("*", (req, res) => {
//   res.status(404);
//   if (req.accepts("html")) {
//     res.sendFile(path.join(__dirname, "views", "404.html"));
//   } else if (req.accepts("json")) {
//     res.json({ message: "404 Not Found!" });
//   } else {
//     res.type("txt".send("404 Not Found!"));
//   }
// });

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log(`Connected to Server!`);
  app.listen(port, () => console.log(`Server running in port no : ${port}`));
});
mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});

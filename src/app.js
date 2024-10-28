import express from "express";
// Cookie parser is use to deal with the cookies data from the user browser
import cookieParser from "cookie-parser";

// All routes imports
import userRouter from "./Routes/users.route.js";

// Cross-origin resource sharing (CORS) it is mainly used for allowing only the particular  domain which have the access rights.
import cors from "cors";
import bookRouter from "./Routes/books.route.js";

const app = express();

// Configuring the cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);


// Setting the limit of json data to be accepted by the server
app.use(
  express.json({
    limit: "100kb",
  })
);

// Now configuring for the request in which the data is present within the url
app.use(
  express.urlencoded({
    extended: true,
    limit: "100kb",
  })
);

// This is used to access and set the cookies data from the client  side
app.use(cookieParser())

// User route usage
app.use("/api/v1/users", userRouter);

// Book route usage
app.use("/api/v1/books", bookRouter);

export { app };
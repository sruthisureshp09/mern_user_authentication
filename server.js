import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import router from "./routes/api.js";
import session from "express-session";

dotenv.config();
const app = express();
app.set("view engine", "ejs");
const port = process.env.PORT || 3000;
const hostname = process.env.HOST || "localhost";

//Importing mongodb connection
connectDB();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: "secret",
  })
);

//Rendering index page
app.get("/", (req, res) => {
  res.render("index");
});

//Swagger setup
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "DiamondLease Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "DiamondLease",
        url: "https://diamondlease.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local server",
      },
    ],
  },
  apis: ["./controllers/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api/documentation",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

//Application routes
app.use("/api", router);

//Mongoose error handling
app.use(notFound);
app.use(errorHandler);

//Server listen
app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});

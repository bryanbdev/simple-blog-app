import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import methodOverride from "method-override";
import blogRoutes from "./routes/blog.js";

const app = express();
dotenv.config();
// set the view engine to ejs
app.set("view engine", "ejs");

// middleware
app.use(express.json()); // allow express to read JSON files
app.use(express.static("public")); // allow us to use css files
app.use(express.urlencoded({ extended: true })); //parse urlencoded request bodies <-- help read form data on post methods
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use("/", blogRoutes); // handle all blog routes

// mongoDB url
const url = process.env.MONGODB_URL;

mongoose
  .connect(url)
  .then(() => {
    // port number
    const PORT = 5000;
    console.log("DB connected!");
    app.listen(5000, () => {
      console.log(`Server listening to port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

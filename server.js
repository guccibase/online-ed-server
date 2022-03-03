import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import mongoose from "mongoose";
const morgan = require("morgan");
require("dotenv").config();

// Create express app
const app = express();

// Connect db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    // useFindAndModify:false,
    useUnifiedTopology:true,
    // useCreateIndex:true,
})
.then(()=> console.log("**Mongo Connected**"))
.catch((e)=> console.log("DB CONNECTION ERROR => " + e.message))

// Apply middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
    console.log("Used Middlewares");
    next();
})

//routes
readdirSync("./routes").map(r =>
     app.use("/api", require(`./routes/${r}`))
);


// Port

const port = process.env.PORT || 8000;

app.listen(port, ()=> console.log(`Listening on port ${port}`))
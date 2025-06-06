const express = require("express");
require("dotenv").config();
const route = require("./routes/route");
const dbconnect = require("./config/database");
const cors = require("cors");
const cloudinaryConnect = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const logger = require("./config/logger")

const app = express();

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/temp'
}));

app.use(express.json())
app.use(cors());
app.use(morgan('combined'));

app.use("/api/v1", route);

dbconnect();

cloudinaryConnect();

app.listen(process.env.PORT_NO, ()=>{
    console.log(`App started at port no ${process.env.PORT_NO}`);
})

logger.info("server started");
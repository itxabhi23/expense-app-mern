const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path");
const connectDb = require("./config/connectDb");


// config dot env file
dotenv.config();

connectDb();
const app = express();



//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());


app.use("/api/v1/users", require("./routes/userRoute"));
//transectionroutes
app.use("/api/v1/transections",require('./routes/transectionRoutes'));
//static
app.use(express.static(path.join(__dirname,'./client/build')))
app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'));
})
const PORT = 8080 || process.env.PORT;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

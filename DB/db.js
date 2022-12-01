const mongoose = require("mongoose");
const DB=process.env.DB
mongoose.connect(DB,{
    useNewUrlParser:true,
    UseUnifiedTopology:true
},
(()=>{
    console.log("Connected To The DB")
})
)

module.exports = mongoose;
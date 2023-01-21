const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/restuarant').then(()=>{
    console.log("connected to the db")
}).catch((err)=>{
    console.loge(err)
});



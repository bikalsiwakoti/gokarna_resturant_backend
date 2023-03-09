const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://gokarna:gokarna@cluster0.qlljoql.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log("connected to the db")
}).catch((err)=>{
    console.log(err)
});



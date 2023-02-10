const express = require("express")
const conn = require("./src/db/conn")
const path = require("path")
const productRoute = require('./src/routes/product')
const userRoute = require('./src/routes/user')
const tablesRoute = require('./src/routes/tables')
const ordersRoute = require('./src/routes/orders')
const roomsRoute = require('./src/routes/room')
const authUser = require('./src/middleware/authUser')



const app = express();
const port = process.env.PORT || 8000;

app.use(express.json())
app.use(express.urlencoded({extendend: true}))


app.use('/api/product', productRoute);
app.use('/api/user',userRoute);
app.use('/api/tables',tablesRoute);
app.use('/api/orders',ordersRoute);
app.use('/api/rooms',roomsRoute);

// for heroku
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join("gokarna-pos/build"))); 
  app.get("*",(req,res)=> res.sendFile(path.resolve(__dirname,"gokarna-pos","build", "index.html"))) 
}

app.listen(port, () => {
  console.log(`Connecting in a port ${port}`)
})

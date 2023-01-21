const express = require("express")
const conn = require("./src/db/conn")
const path = require("path")
const productRoute = require('./src/routes/product')
const userRoute = require('./src/routes/user')
const tablesRoute = require('./src/routes/tables')
const authUser = require('./src/middleware/authUser')


const app = express();
const port = process.env.PORT || 8000;

app.use(express.json())
app.use(express.urlencoded({extendend: true}))


app.use('/api/product', productRoute);
app.use('/api/user',userRoute);
app.use('/api/tables',tablesRoute);


app.listen(port, () => {
  console.log(`Connecting in a port ${port}`)
})

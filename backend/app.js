const express = require('express')
const app = express();
const productRouter = require('./routes/product.routes.js');
const userRouter = require('./routes/user.routes.js');
const paymentRoute = require("./routes/paymentRoute.js");
const bodyParser = require('body-parser');
const products = require('./db/product')

const cookieParser = require('cookie-parser');
const cors = require('cors');
const { checkAuth } = require('./middleware/auth.js');
const { errorHandler } = require('./middleware/errorHandler.js');


require('dotenv').config();
require('./db/config'); 

app.use(cors({
  origin: "http://localhost:3000",   // frontend origin
  credentials: true                  // cookie allow
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/products', productRouter)

app.use('/api', userRouter)
app.use("/api/payment", paymentRoute);

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));


app.get('/profile', (req,res)=>{
    
})
app.put('/update/:_id', async(req,res)=>{

    const data = await products.updateOne(req.params, {$set : req.body });
    res.send(data)
})

app.use(errorHandler);


app.listen(5500);

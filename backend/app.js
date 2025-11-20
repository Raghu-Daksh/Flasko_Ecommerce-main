const express = require('express')
const app = express();
const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoutes');
const paymentRoute = require("./routes/paymentRoute.js");
const bodyParser = require('body-parser');
const user = require('./db/user');
const products = require('./db/product')

require('dotenv').config();
require('./db/config'); 

const cors = require('cors');
app.use(cors());

app.use(express.json());

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


app.listen(5500);

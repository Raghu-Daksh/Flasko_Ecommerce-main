const express = require("express");
const router = express.Router();
const products = require("../db/product");


router.post("/",async (req,res)=>{
  console.log(req.body);
  
    const data = new products(req.body);
    const result = await data.save();
    res.send(result);
    // console.log(result);
})

router.get("/product_details/:_id", async (req, res) => {
  try {
    const productId = req.params._id;
    res.header("Access-Control-Allow-Origin", "*");
    const productDetails = await products.findOne({ _id: productId });
    res.status(200).json(productDetails);
  } catch (error) {
    res.status(401).json({ message: error });
  }
});
router.get("/search/:key", async (req, res) => {
  try {
    const results = await products.find({
      $or: [
        { brand: { $regex: req.params.key } },
        { category: { $regex: req.params.key } },
        { title: { $regex: req.params.key } },
      ],
    });
    if (results.length > 0) {
      res.send(results);
    } else {
      res.send("No product found");
    }
  } catch (error) {
    res.send("No product found");
  }
});
router.get("/sortedproducts", async (req, res) => {
  // res.send(data)
  const { query } = req.query;
  let data;
  try {
    if (query === "price high to low") {
      data = await products.find().sort({ price: -1 }).exec();
    } else if (query === "price low to high") {
      data = await products.find().sort({ price: 1 }).exec();
    } else if (query === "top ratings") {
      data = await products.find().sort({ rating: -1 }).exec();
    }else {
      data = await products.find();
    }
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
router.get("/", async (req, res) => {
  try {
    const data = await products.find();
    res.header("Access-Control-Allow-Origin","*");
    if (data?.length > 0) {
      res.send(data);
    } else {
      res.send("no product found");
      console.log("error found");
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/search/:key", async (req, res) => {
  console.log(req.params.key);
  try {
    res.header("Access-Control-Allow-Origin", "*");
    let searchResult = await products.find({
      $or: [
        { category: { $regex: req.params.key } },
        { title: { $regex: req.params.key } },
        { brand: { $regex: req.params.key } },
      ],
    });

    if (searchResult.length > 0) {
      res.send(result);
    } else {
      res.send("No product found");
    }
  } catch (error) {}
});
router.get("/filterData", async (req, res) => {
  let minRange = 0;
  try {
    res.header("Access-Control-Allow-Origin", "*");
    let {query} = req.query;
    if(query === 'All'){
      const data = await products.find();
      res.send(data);
    }else if(query<= 9999999){
         let data = await products.find({ price: { $gte: minRange, $lte: query } }).sort({price:-1})
         res.send(data);
    }
    else{
      let searchResult = await products.find({
        $or: [
          { category: { $regex: query } },
          { brand: { $regex: query } },
        ],
      }); 
      if (searchResult.length > 0) {
        res.send(searchResult);
      }
    }
  } catch (error) {
    console.log(error);
  }

  // let data = await products.find({ price: { $gte: minRange, $lte: query } }).sort({price:1})
  // console.log(data);
});


// DELETE all products
router.delete("/delete-all", async (req, res) => {
  try {
    await products.deleteMany({});
    res.json({ message: "All products deleted!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// INSERT multiple products
router.post("/add-many", async (req, res) => {
  try {
    const data = req.body.products;  // array of objects
    const result = await products.insertMany(data);
    res.json({ message: "Products added!", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;

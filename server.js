const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());

// model
mongoose.connect(
  "mongodb://localhost/react-shopping-cart-db",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

const Schema = mongoose.Schema;
const model = mongoose.model;

const Product = model(
  "products",
  new Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    image: String,
    description: String,
    price: Number,
    availableSizes: [String],
  })
);

// controller

app
  .route("/api/products")
  .get(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
  .post(async (req, res) => {
    const savedProduct = await new Product(req.body).save();
    res.send(savedProduct);
  });

app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(
    req.params.id
  );
  res.send(deletedProduct);
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log("serve at http://localhost:3000")
);

// view not their

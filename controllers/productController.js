const express = require("express");
var empCollection = require("../models/singup");
var productModel = require("../models/product");
const uploadUser = require("../middleware/uploadUser");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.render("addproduct", {
    viewtitle: "Infomation user",
  });
});

//add data
app.post("/add", uploadUser.single("image"), async (req, res) => {
  console.log(req.body);
  if (req.body.id == "") {
    //add user
    addRecord(req, res);
    console.log("add user");
    // res.redirect('/user/listUser');
  } else {
    //update user
    updataRecord(req, res);
    console.log("update user");
  }
});

function addRecord(req, res) {
  const u = new productModel(req.body);
  //
  if (req.file) {
    u.image = req.file.filename;
    console.log("Get image");
  }

  try {
    console.log();
    u.save();
    res.render("addproduct.hbs", {
      viewtitle: "ADD USER",
    });
    console.log("Add success");
  } catch (error) {
    res.status(500).send(error);
  }
}

function updataRecord(req, res) {
    productModel
    .findOneAndUpdate({ _id: req.body.id }, req.body, { new: true })
    .then((doc) => {
      res.redirect("/product/list");
    })
    .catch((err) => {
      console.log(err);
      res.render("addproduct", {
        viewtitle: "error updated",
      });
    });
}
// app.get('/list',(req,res)=>{
//     res.render('about',{
//         viewtitle: "LIST USER"
//     });

// });

app.get("/list", (req, res) => {
    productModel.find({}).then((products) => {
    res.render("product", {
        products: products.map((product) => product.toJSON()),
    });
  });
});
app.get('/listAPI', (req, res) => {
    productModel.find({}).then(productApi => {
        res.json(productApi);
    });
  });
//edit
app.get("/edit/:id", (req, res) => {
    productModel
    .findById(req.params.id)
    .then((product) => {
      res.render("addproduct", {
        product: product.toJSON(),
      });
    })
    .catch((err) => {
      res.redirect("");
    });
});

//delete
app.get("/delete/:id", async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id, req.body);
    if (!product) res.status(404).send("no item found");
    else {
      res.redirect("/product/list");
    }
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;

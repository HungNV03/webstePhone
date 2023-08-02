const express = require("express");
const userModel = require("../models/user");
var empCollection = require("../models/singup");
const uploadUser = require("../middleware/uploadUser");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.render("contact", {
    viewtitle: "Infomation user",
  });
});

// app.get("/",(req, res)=>{
//     res.render("addproduct",{
//         viewtitle: "more product",
//     });
// });

//add data
app.post("/add", uploadUser.single("imageURL"), async (req, res) => {
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
  const u = new userModel(req.body);
  //
  if (req.file) {
    u.imageURL = req.file.filename;
    console.log("Get image");
  }

  try {
    console.log();
    u.save();
    res.render("contact.hbs", {
      viewtitle: "ADD USER",
    });
    console.log("Add success");
  } catch (error) {
    res.status(500).send(error);
  }
}

function updataRecord(req, res) {
  userModel
    .findOneAndUpdate({ _id: req.body.id }, req.body, { new: true })
    .then((doc) => {
      res.redirect("/user/list");
    })
    .catch((err) => {
      console.log(err);
      res.render("contact", {
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
  userModel.find({}).then((users) => {
    res.render("about", {
      users: users.map((user) => user.toJSON()),
    });
  });
});

//edit
app.get("/edit/:id", (req, res) => {
  userModel
    .findById(req.params.id)
    .then((user) => {
      res.render("contact", {
        user: user.toJSON(),
      });
    })
    .catch((err) => {
      res.redirect("");
    });
});

//delete
app.get("/delete/:id", async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id, req.body);
    if (!user) res.status(404).send("no item found");
    else {
      res.redirect("/user/list");
    }
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});
//

//signup
app.get("/", (req, res) => {
  res.render("singup");
});

app.post("/signup", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    if (password === cpassword) {
      const empData = new empCollection({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        cpassword: req.body.cpassword,
      });
      const postData = await empData.save();
      res.send(postData);
    } else {
      res.send("password are not mathing..");
    }
  } catch (error) {
    res.send(error);
  }
});

//signin

app.get("/signin", (req, res) => {
  res.render("signin");
});

app.post("/signin", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.passwordlogin;

    const getusername = await empCollection.findOne({ username: username });
    // console.log(getemail.password);
    // res.send(getemail.password);

    if (getusername.password === password) {
      res.render("index");
    } else {
      res.send("password are not matchang...");
    }
  } catch (error) {
    res.send(error);
  }
});



module.exports = app;

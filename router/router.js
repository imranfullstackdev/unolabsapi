const express = require("express");
const router = express.Router();
const USER = require("../USERSCHEMA/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

// FOR ADDING THE DATA
// name;
// email;
// password;
// Bookname,Book;

// ! USE OF MULTER
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/images"); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    console.log(file, "file");
    callBack(null, file.originalname);
  },
});

var upload = multer({
  storage: storage,
});
console.log((storage.filename, "fileee"));

router.use("/uploads", express.static("./public/images"));

router.post("/addUser", upload.single("file"), async (req, res) => {
  console.log(req, "reqqqqqq");
  console.log(req.body);
  console.log(req.file, "file");
  const { name, email, password, Bookname, Book, Authername } = req.body;
  const filename = req.file.originalname;
  const filePath = req.file.path;
  const fileType = req.file.mimetype;
  const filesize = req.file.size;
  if (!name || !email || !password || !Bookname || !Book || !Authername) {
    res.status(403).send({ ERR: "Please Fill All The Data frm backend" });
  }
  const aUser = await USER.findOne({ email });
  if (aUser) {
    res.status(400).send({ err: "USER ALREADY EXIST" });
  } else {
    // hashing the password
    const salt = 10;
    const hassPassword = await bcrypt.hash(password, salt);

    const user = new USER({
      name,
      email,
      password: hassPassword,
      Bookname,
      Book,
      Authername,
      filename,
      filePath,
      fileType,
      filesize,
    });
    user.save();
    res.send({ user });
    console.log("user", user);
  }
});

// For Login

router.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    res.status(400).send({ err: "Please Enter Login Credential" });
  } else {
    const aUser = await USER.findOne({ email });
    console.log(aUser);
    if (aUser) {
      const verifyPassword = await bcrypt.compare(password, aUser.password);
      if (verifyPassword) {
        const token = await jwt.sign({ id: aUser._id }, process.env.SECRETKEY);
        res.send({ ...aUser, token, mess: "User Login Sucesssfully" });
      } else {
        res.status(401).send({ err: "Invalid Credential" });
      }
    } else {
      res.status(400).send({ Err: "Userc Login Failed" });
    }
  }
});

// get all user
router.get("/allUser", async (req, res) => {
  const AllUser = await USER.find();
  res.send(AllUser);
});

// edit user
router.put("/EditUser/:id", async (req, res) => {
  const { id } = req.params;
  const editUser = await USER.findByIdAndUpdate(id, req.body, {
    new: true,
    validator: true,
    upsert: true,
  });
  res.send({ mess: "edited Sucessfully" });
});

// DELETE USER
router.delete("/dlt/:id", async (req, res) => {
  const { id } = req.params;
  const dltUser = await USER.findByIdAndDelete(id);
  res.send({ mess: "deleted Sucessfully" });
});

module.exports = router;

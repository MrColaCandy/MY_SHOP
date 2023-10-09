const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const upload = require("../multer/multer");
const UserSchema = require("../models/UserSchema");
const { default: mongoose } = require("mongoose");
const { sendMail } = require("../mailer/mailer");
const { getContent } = require("../mailer/mail");

const UserRouter = express.Router();

UserRouter.post("/api/verify", async (req, res) => {
  const token = req.body.token;
  if (!token) {
    res.status(401).json({ success: false, message: "Authentication failed!" });
    return;
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  if (!decoded) {
    res.status(401).json({ success: false, message: "Authentication failed!" });
    return;
  }

  const user = await UserSchema.findById(decoded.userId);
  if (!user) {
    res.status(401).json({ success: false, message: "Authentication failed!" });
    return;
  }

  res
    .status(200)
    .cookie("token", token)
    .cookie("name", user.name)
    .cookie("id", user._id)
    .cookie("email", user.email)
    .cookie("image", user.image)
    .json({
      success: true,
      message: "Logged in!",
      decoded,
      token,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        active: user.active,
      },
    });
});
UserRouter.post("/api/register", upload.single("file"), async (req, res) => {
  const data = req.body;
  const file = req.file;

  try {
    const exist = await UserSchema.findOne({ email: data.email });
    if (exist) {
      res
        .status(409)
        .json({ success: false, message: "This email is unavailable!" });
      return;
    }
    const newUser = await UserSchema.create({
      name: data.name,
      email: data.email,
      password: bcrypt.hashSync(data.password, 10),
      image: file.filename,
    });
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    const activationLink = "http://localhost:5000/api/activation/" + token;
    sendMail({
      email: newUser.email,
      subject: "Welcome to MY SHOP " + newUser.name,
      message: getContent(activationLink),
    });
    res.status(201).json({
      success: true,
      message: "To activate your account check your email inbox!",
      token,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      res
        .status(401)
        .json({ success: false, message: err.message.split(":")[2] });
    } else {
      res.status(401).json({ success: false, message: err.message });
    }
  }
});

UserRouter.get("/api/activation/:token", async (req, res) => {
  const token = req.params.token;
  const { userId } = jwt.verify(token, process.env.SECRET_KEY);
  if (!userId) {
    res
      .status(401)
      .json({ success: false, message: "Token is invalid or expired!" });
    return;
  }

  try {
    const user = await UserSchema.findById(userId);
    if (!user) {
      res.status(401).json({ success: false, message: "User not found!" });
      return;
    }
    user.active = true;
    const active = await user.save();
    res
      .status(200)
      .cookie("token", token)
      .cookie("id", active._id)
      .cookie("name", active.name)
      .cookie("email", active.email)
      .cookie("image", active.image)
      .redirect("http://localhost:3000/activation")
      .json({
        success: true,
        message: "Account activated!",
        token,
      });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res
        .status(401)
        .json({ success: false, message: error.message.split(":")[2] });
    } else {
      res.status(401).json({ success: false, message: error.message });
    }
  }
});
UserRouter.post("/api/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(401)
      .json({ success: false, message: "Wrong email or password" });
    return;
  }

  const user = await UserSchema.findOne({ email });
  if (!user) {
    res
      .status(401)
      .json({ success: false, message: "Wrong email or password" });
    return;
  }
  if (!user.active) {
    res.status(401).json({
      success: false,
      message: "Please activate your account!",
      email,
    });
    return;
  }
  if (!bcrypt.compare(password, user.password)) {
    res
      .status(401)
      .json({ success: false, message: "Wrong email or password" });
    return;
  }

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  res
    .status(200)
    .cookie("token", token)
    .cookie("name", user.name)
    .cookie("id", user._id)
    .cookie("email", user.email)
    .cookie("image", user.image)
    .json({
      success: true,
      message: "User logged in!",
      token,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        active: user.active,
      },
    });
});
module.exports = UserRouter;

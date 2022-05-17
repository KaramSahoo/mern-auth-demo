const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { email, password, passwordConfirm } = req.body;

    //__________Validation__________
    if (!email || !password || !passwordConfirm) {
      return res
        .status(400)
        .send({ errorMessage: "Some data is missing/incorrect." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .send({ errorMessage: "Password must be atleast 8 characters long." });
    }

    if (password !== passwordConfirm) {
      return res.status(400).send({ errorMessage: "Passwords don't match. " });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ errorMessage: "The email ID is already in use." });
    }

    //__________Hashing__________
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    // console.log(passwordHash);

    //__________Create new user__________
    const newUser = new User({
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();

    //__________Sign the token__________
    const token = jwt.sign(
      {
        userID: savedUser._id,
        userEmail: savedUser.email,
      },
      process.env.JWT_SECRET
    );

    console.log(token);

    //__________Send the token in a HTTP-only cookie__________
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ errorMessage: "Some data is missing/incorrect." });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).send({ errorMessage: "Wrong email or password." });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!passwordCorrect) {
      return res.status(401).send({ errorMessage: "Wrong email or password." });
    }

    //__________Sign the token__________
    const token = jwt.sign(
      {
        userID: existingUser._id,
        userEmail: existingUser.email,
      },
      process.env.JWT_SECRET
    );

    // console.log(token);

    //__________Send the token in a HTTP-only cookie__________
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send({ message: "Logged in" });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, email: "" });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verified: ", verified);
    res.send({
      status: true,
      email: verified.userEmail,
      userID: verified.userID,
    });
  } catch (error) {
    res.json(false);
  }
});

module.exports = router;

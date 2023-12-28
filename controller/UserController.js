const User = require("../model/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function isValidIndianPhoneNumber(phone) {
  const indianPhoneRegex = /^\d{3}\d{3}\d{4}$/;
  return indianPhoneRegex.test(phone);
}
const RegisterUser = async (req, res) => {
  const { first_name, last_name, email, phone, password, confirm_password } =
    req.body;
  if (!first_name || (!email && !phone) || !password || !confirm_password) {
    return res.status(400).json({ msg: "all fields are required!" });
  }
  if (email) {
    if (!isValidEmail(email)) {
      return res.status(400).json({ msg: "please enter valid Email!" });
    }
    const existing_user = await User.findOne({ email: email });
    if (existing_user) {
      return res
        .status(400)
        .json({ msg: "User with this Email allready Exists!" });
    }
  }
  if (password !== confirm_password) {
    return res
      .status(400)
      .json({ msg: "password and confirm password don't match!" });
  }
  if (phone) {
    if (!isValidIndianPhoneNumber(phone)) {
      return res.status(400).json({ msg: "please enter valid Phone Number!" });
    }
    const existing_user = await User.findOne({ phone: phone });
    if (existing_user) {
      return res
        .status(400)
        .json({ msg: "User with this Phone number allready Exists!" });
    }
  }
  try {
    const hassedPassword = await bcrypt.hash(password, 10);

    const newuser = await new User({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hassedPassword,
      phone: phone,
    });
    const data = await newuser.save();
    return res.status(200).json({ msg: "Sign Up Successfull", data: data });
  } catch (error) {
    return res.status(500).json({ msg: "Error while Sign Up", error: error });
  }
};

const LoginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "username and password are invalid!" });
  }
  const isEmail = isValidEmail(username);
  const isPhone = isValidIndianPhoneNumber(username);

  if (!isEmail && !isPhone) {
    return res
      .status(400)
      .json({ msg: "Invalid email or phone format for the username!" });
  }
  const userQuery = isEmail ? { email: username } : { phone: username };
  const existing_user = await User.findOne(userQuery);
  if (!existing_user) {
    return res
      .status(400)
      .json({ msg: "User with this Email don't Exists, create new account!" });
  }

  try {
    const isValidPassword = await bcrypt.compare(
      password,
      existing_user.password
    );
    if (!isValidPassword) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
    const expirationTime =
      Math.floor(Date.now() / 1000) + 100 * 365 * 24 * 60 * 60;
    const token = jwt.sign(
      {
        userId: existing_user._id,
        first_name: existing_user.first_name,
        last_name: existing_user.last_name,
        email: existing_user.email,
        phone: existing_user.phone,
      },
      process.env.JWTSECUREKEY,
      { expiresIn: expirationTime }
    );
    return res.status(200).json({ msg: "Sign In Successfull", data: token });
  } catch (error) {
    return res.status(500).json({ msg: "Error while Sign Up", error: error });
  }
};

const GetAllUsers = async (req, res) => {
  try {
    const userData = await User.find().select("-password");
    return res
      .status(200)
      .json({ msg: "fetching User Data Successfull", data: userData });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "fetching user Data Failed", error: error });
  }
};
module.exports = { RegisterUser, LoginUser, GetAllUsers };

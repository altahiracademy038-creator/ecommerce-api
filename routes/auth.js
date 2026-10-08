import express from "express"
import { userModel } from "../module/user.js";
import { compare_password, hash_password } from "../helper/bcrypt.js";
import { gen_token } from "../helper/jwt.js";
const route = express.Router()

route.post("/sign-up", async (req, res) => {
  const { name, email, password } = req.body;

  const is_user_exist = await userModel.findOne({ email });
  console.log(is_user_exist);
  if (is_user_exist) {
    return res.json({ message: "user already exist" });
  }

  if (!name || !email || !password) {
    res.json({
      message: "incomlete information",
    });
  }

  const hashed_password = hash_password(password);

  await userModel.create({ name, email, password: hashed_password });
  
  res.json({ message: "user created" });
});

route.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      message: "incomplete information",
    });
  }

  const is_user_exist = await userModel.findOne({ email });

  if (!is_user_exist) {
    return res.json({ message: "user not exist, Please sign-up" });
  }

  const checkpassword = compare_password(password, is_user_exist.password);
  console.log(checkpassword);

  if (!checkpassword) {
    return res.json({ message: "passoword not correct" });
  }

  if (checkpassword) {
    const token = gen_token(is_user_exist.email);
    res.json({ data: is_user_exist, token });
  }
});

export default route
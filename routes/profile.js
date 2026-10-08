import express from "express";
import { verify_token } from "../helper/jwt.js";
import { userModel } from "../module/user.js";
const route = express.Router();

route.get("/", async (req, res) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists
  if (!authHeader) {
    return res.json({
      message: "Authorization header missing",
    });
  }

  // Check Bearer format
  if (!authHeader.startsWith("Bearer ")) {
    return res.json({
      message: "Invalid authorization format",
    });
  }

  // Get token
  const token = authHeader.split(" ")[1];

  const chack_token = verify_token(token);

  // Check token
  if (!chack_token) {
    return res.json({
      message: "Invalid token",
    });
  }

  // Token is correct
  const user = await userModel.findOne({ email: chack_token });

  if (!user) {
    res.json({
      message: "user not exist",
    });
  } else {
    res.json({ data: user });
  }
});

export default route

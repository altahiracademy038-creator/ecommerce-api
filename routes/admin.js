import express from "express";
import { userModel } from "../module/user.js";
import { verify_token } from "../helper/jwt.js";
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

  // Check token

  const chack_token = verify_token(token);

  if (!chack_token) {
    return res.json({
      message: "Invalid token",
    });
  }

  const user = await userModel.find({});

  if (!user) {
    res.json({
      message: "user not exist",
    });
  } else {
    res.json({ data: user });
  }
});

export default route;

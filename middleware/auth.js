import { userModel } from "../module/user.js";
import { verify_token } from "../helper/jwt.js";

export const auth_middleware = async (req, res, next) => {
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

  const email = verify_token(token);

  if (!email) {
    return res.json({
      message: "Invalid token",
    });
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    res.json({
      message: "user not exist",
    });
  } else {
    req.user = user;
    next();
  }
};

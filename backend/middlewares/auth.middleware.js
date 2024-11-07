import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
  // console.log('headers',req.headers);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    console.log("Invalid token");
    return res.status(401).json({ message: "Invalid token", data: token });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    // console.log('decodedToken', decodedToken);
    if (!decodedToken) {
      console.log("Forbidden verification");
      return res
        .status(403)
        .json({ message: "Forbidden verification", data: decodedToken });
    }
    console.log("User verified");
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log("Error verifying", error);
    return res.status(500).json({ message: "Error verifying", data: error });
  }
};

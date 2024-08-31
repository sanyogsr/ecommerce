import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ msg: "Token missing , Please login again" });
    } 
    const decodedInfo = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedInfo && decodedInfo._id && decodedInfo.email) {
      req.user = decodedInfo;
      next();
    } else {
      return res
        .status(403)
        .json({ msg: "Invalid Token , please login again " });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal error occur! Please try again" });
  }
};
export default verifyToken;

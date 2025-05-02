import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "неавторизован - нет токена" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({ message: "неавторизован - токен неправильный" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "неавторизован - нет такого юзера" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("ошибочка вышла", error);
    res.status(500).json({ message: "ошибка сервера" });
  }
};

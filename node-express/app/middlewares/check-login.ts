import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export async function checkLoginMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const xToken = req.cookies["x-token"];

  try {
    // get the user and add it to the req object
    res.locals.user = jwt.verify(xToken, process.env.SECRET_SIGN_KEY!);
  } catch (error) {
    res.clearCookie("x-token");
    res.status(403).send({ message: "Not authorized" });
    return;
  }

  next();
}

import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { loginSchema } from "./schemas";
import { db } from "../../../libs/database";
import { validatePassword } from "../../../libs/database/user/user";

export class AuthController {
  async login(req: Request, res: Response) {
    const data = req.body;

    const validationResult = loginSchema.safeParse(data);

    if (!validationResult.success) {
      res.status(400).send({
        fieldErrors: validationResult.error.flatten().fieldErrors,
      });
      return;
    }

    const validatedData = validationResult.data;

    const dbInstance = await db.get();
    // TODO: get the user in the database
    const user = await dbInstance.collections.users
      .findOne({
        selector: {
          username: validatedData.username,
        },
      })
      .exec();

    if (!user) {
      res.status(403).send("not authorized");
      return;
    }

    try {
      await validatePassword(validatedData.password, user.password);
    } catch (err) {
      res.status(403).send("not authorized");
      return;
    }

    const tokenPayload = { username: user.username, id: user.id };
    const token = jwt.sign(tokenPayload, process.env.SECRET_SIGN_KEY!, {
      expiresIn: 60 * 60,
    });

    res.cookie("x-token", token, {
      httpOnly: true,
    });

    res.status(200).send({ message: "logged in" });
  }
}

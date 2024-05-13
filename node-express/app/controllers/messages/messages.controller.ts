import { Request, Response } from "express";
import { readLines, writeLine } from "../../../libs/file";
import { postMessageSchema } from "./schemas";

const MESSAGE_SEPARATOR = ":";

export class MessagesController {
  async getAll(req: Request, res: Response) {
    const user = res.locals.user;
    let messages: string[] = [];

    try {
      messages = await readLines();
    } catch (err) {}

    // TODO: add filter by user
    const processedMessages = messages
      .filter((msj) => {
        const authorId = msj.split(MESSAGE_SEPARATOR)[0];
        return authorId === `${user.id}`;
      })
      .map((filteredMsj) => {
        const msj = filteredMsj.split(MESSAGE_SEPARATOR)[1];
        return msj;
      });

    res.status(200).send({ messages: processedMessages });
    return;
  }

  async postMessage(req: Request, res: Response) {
    const user = res.locals.user;
    const validationResult = postMessageSchema.safeParse(req.body);

    if (!validationResult.success) {
      res.status(400).send({
        fieldErrors: validationResult.error.flatten().fieldErrors,
      });
      return;
    }

    const { message } = validationResult.data;

    // building the message
    const formattedMessage = `${user.id}${MESSAGE_SEPARATOR}${message}`;
    try {
      await writeLine(formattedMessage);
    } catch (err) {
      res.status(500).send("Error writing the message.");
      return;
    }

    res.status(201).send({ message: "The message was sent successfully." });
  }

  deleteAll(req: Request, res: Response) {}
}

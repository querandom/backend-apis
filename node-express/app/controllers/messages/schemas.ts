import { z } from "zod";

export const postMessageSchema = z.object({
  message: z.string().min(3, {
    message: "message must have at least 3 characters long.",
  }),
});

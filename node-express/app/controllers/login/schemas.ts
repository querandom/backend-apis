import z from "zod";

export const loginSchema = z.object({
  username: z.string({
    required_error: "username must not be empty",
  }),
  password: z.string({
    required_error: "password must not be empty",
  }),
});

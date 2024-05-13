import express from "express";
import dotenv from "dotenv";

dotenv.config();

import Server from "./app";

const app = express();
const port = process.env.PORT || 4000;

// setting up the server
new Server(app);

//For env File
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

// requirements:
// database (in memory)
// JWT to encrypt login data
// endpoints:
// POST /login {user, password} -> set jwt cookie
// GET /messages  -> returns all messages stored in the file
// POST /messages -> write the message in a file
// * prev messages...
// * message + os.EOF
// DELETE /messages -> clear up the message's file

# Node-express API

This is an example of a simple-test API using [`express`](https://expressjs.com/).
The idea was to create some endpoints and middlewares to have an more complete understanding of express and its essentials, write and read from a file and, in-memory databases.
The database is seeded with some dummy users when the DB is accessed.

## Getting started

- Clone this repo,
- Move to the example folder,
- Install dependencies (by running `npm i`),
- Run the project (`npm run dev`),
- The project will run on http://localhost:4000 ([you can customize the PORT](#configurations)).

## Endpoints

POST `/api/login`: Login the a user, if the data it correct, it sets the `x-token` cookie. Body example: `{"username": "test-0", "password": "123"}`
GET `/api/messages`: Returns all messages sent by the already logged user.
POST `/api/messages`: Post a message which is saved in a file.

## Configurations

Using the `.env` file you can customize some features. This is a brief explanation of what you are able to configure:

`PORT`: Application port, by default is `4000`
`MESSAGE_FILE`: The name of the file in which the messages will be allocated. Default `messages.txt`.
`SECRET_SIGN_KEY`: The secret to create the [jwt](https://www.npmjs.com/package/jsonwebtoken).

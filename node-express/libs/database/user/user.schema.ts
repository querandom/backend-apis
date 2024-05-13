import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxJsonSchema,
  toTypedRxJsonSchema,
} from "rxdb";

const userSchemaLiteral = {
  title: "user schema",
  version: 0,
  description: "Describes a user",
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    username: {
      type: "string",
      maxLength: 100,
      minLength: 3,
    },
    password: {
      type: "string",
    },
  },
  required: ["id", "username", "password"],
  // encrypted: ["password"],
  // attachments: {
  //   encrypted: true,
  // },
} as const;
const schemaTyped = toTypedRxJsonSchema(userSchemaLiteral);
export type UserDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;

export const USER_SCHEMA: RxJsonSchema<UserDocType> = userSchemaLiteral;

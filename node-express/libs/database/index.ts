import { RxDatabase, addRxPlugin, createRxDatabase } from "rxdb";
import { getRxStorageMemory } from "rxdb/plugins/storage-memory";

import { USER_SCHEMA } from "./user/user.schema";
import { seedUsers } from "./seed";

const create = async () => {
  if (process.env.NODE_ENV !== "production") {
    await import("rxdb/plugins/dev-mode").then((module) =>
      addRxPlugin(module.RxDBDevModePlugin)
    );
  }

  const rxDb = await createRxDatabase({
    name: "node-database",
    storage: getRxStorageMemory(),
  });

  await rxDb.addCollections({
    users: {
      schema: USER_SCHEMA,
    },
  });

  await seedUsers(rxDb);

  return rxDb;
};

class Database {
  createPromise: RxDatabase | null = null;

  async get() {
    if (!this.createPromise) {
      this.createPromise = await create();
    }

    return this.createPromise;
  }
}

declare global {
  var database: Database | undefined;
}

export const db = globalThis.database || new Database();

if (process.env.NODE_ENV !== "production") globalThis.database = db;

import { RxDatabase } from "rxdb";
import { createPassword } from "./user/user";

const FAKE_USERS_QUANTITY = 5;
const FAKE_USERS_PREFIX = "test-";
const FAKE_USERS_PASSWORD = "123";
const createFakeUsers = async (
  quantity = FAKE_USERS_QUANTITY
): Promise<{ id: string; username: string; password: string }[]> => {
  return Promise.all(
    Array.from({ length: quantity }).map(async (_, idx) => {
      const password = await createPassword("123");
      return {
        id: `${idx}`,
        username: `${FAKE_USERS_PREFIX}${idx}`,
        password,
      };
    })
  );
};

export const seedUsers = async (db: RxDatabase) => {
  const users = await createFakeUsers();

  const { error, success } = await db.collections.users.bulkInsert(users);
  if (error?.length) {
    console.log(`Error seeding`, error);
  }
};

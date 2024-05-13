import bcrypt from "bcrypt";

const saltRounds = 10;
export const createPassword = async (
  plainPassword: string
): Promise<string> => {
  return new Promise((res, rej) => {
    bcrypt.hash(plainPassword, saltRounds, function (err, hash) {
      if (err) {
        rej(err);
      } else {
        res(hash);
      }
    });
  });
};

export const validatePassword = async (
  plainPassword: string,
  hashPassword: string
) => {
  return new Promise((res, rej) => {
    bcrypt.compare(plainPassword, hashPassword, function (err, result) {
      if (err) {
        rej(err);
      } else {
        res(result);
      }
    });
  });
};

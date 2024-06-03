import crypto from "crypto";
import bcrypt from "bcrypt";

export const generatePlainPassword = () => {
  const length = 5;

  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") // convert to hexadecimal format
    .slice(0, length); // return required number of characters
};

export const generateHashPassword = async (pw: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(pw, await bcrypt.genSalt(10));
  return hashedPassword;
};

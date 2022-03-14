import "dotenv/config";

export const JWT_SECRET = (process.env.JWT_SECRET as string) || "";

export default {
  jwt: {
    secret: JWT_SECRET || "",
    expiresIn: "1d",
  },
};

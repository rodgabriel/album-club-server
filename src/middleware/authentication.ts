import "dotenv/config";
import jwt from "jsonwebtoken";

export type JWT_Payload = {
  id: string;
  username: string;
  iat: number;
  exp: number;
};

const generateToken = async (
  params: { id: string; username: string },
  expiresIn: string,
  secret: string
): Promise<string | Error> => {
  try {
    const token = jwt.sign(params, secret, { expiresIn });
    return token;
  } catch (error) {
    return error?.message || error;
  }
};

const decodeToken = (
  token: string,
  secret: string,
  ignoreExpiration = false
): { id: string; username: string } => {
  try {
    const data = jwt.verify(token, secret, { ignoreExpiration });
    return data as { id: string; username: string };
  } catch (error) {
    return error?.message || error;
  }
};

const ensureAuthenticated = (
  token: string
):
  | { isAuth: true; payload: JWT_Payload }
  | { isAuth: false; error: string } => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    return { isAuth: true, payload: payload as JWT_Payload };
  } catch (error) {
    return {
      isAuth: false,
      error: error?.message || "Could not verify authentication.",
    };
  }
};

export { generateToken, decodeToken, ensureAuthenticated };

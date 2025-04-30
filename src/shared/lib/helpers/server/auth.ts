import jwt from "jsonwebtoken";
// /lib/prisma.ts
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
export function signToken(payload: object) {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });
}

export function getToken(request: Request) {
  const authorization = request.headers.get("Authorization");
  if (!authorization) return null;

  const token = authorization.split(" ")[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
  } catch (e) {
    console.log(e);
    return null;
  }
}

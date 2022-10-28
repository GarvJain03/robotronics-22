import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";
import type { User } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body as User;

  if (req.method === "POST") {
    const userWithEmail = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    const userWithUsername = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });
    if (userWithEmail && userWithUsername) {
      res.status(400).json({ error: "User already exists" });
    }
    await prisma.user.createMany({
      data: {
        email: data.email,
        name: data.name,
        username: data.username,
        password: await bcrypt.hash(data.password, 10),
      },
    });

    res.status(200).json({ message: "User created" });
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

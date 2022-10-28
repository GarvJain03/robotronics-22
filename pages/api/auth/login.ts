import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { setCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body as User;
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      return res.status(400).json({
        message: "Account doesn't exist",
      });
    }

    const passwordIsCorrect = await bcrypt.compare(
      data.password,
      user.password
    );
    if (!passwordIsCorrect) {
      return res.status(400).json({
        message: "Username or password is incorrect",
      });
    }

    setCookie("user", user.id, { req, res, maxAge: 60 * 60 * 24 });

    res.status(200).json({ message: "User logged in" });
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

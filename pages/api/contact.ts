// @ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { ContactQuery } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body as Query;

  if (req.method === "POST") {
    if (!data.name || !data.email || !data.message) {
      res.status(400).json({ error: "Something went wrong." });
      return;
    }

    await prisma.contactQuery.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
    });

    console.log(req.body);
    res.status(200).json({ message: "Success" });
  } else {
    res.status(404);
  }
}

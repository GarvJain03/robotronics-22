// @ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { Post } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body as Post;

  if (req.method === "POST") {
    if (
      !data.songTitle ||
      !data.preferences ||
      !data.userId ||
      !data.preferences ||
      !data.price ||
      !data.card
    ) {
      res.status(400).json({ error: "Something went wrong." });
      return;
    }

    await prisma.post.create({
      data: {
        songTitle: data.songTitle,
        preferences: data.preferences,
        userId: data.userId,
        card: JSON.parse(data.card),
        price: parseInt(data.price),
      },
    });

    console.log(req.body);
    res.status(200).json({ message: "Success" });
  } else {
    res.status(404);
  }
}

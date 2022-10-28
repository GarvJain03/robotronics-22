import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import type { Post } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body as Post;
    const post = await prisma.post.update({
      where: { id: data.id },
      data: {
        isApproved: true,
      },
    });

    console.log(post);
    res.status(200).json({ message: "Post approved" });
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

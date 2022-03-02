import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "redis";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { id } = req.query;
  const client = createClient({
    url: process.env.REDIS_URL,
  });
  await client.connect();
  if (!(await client.exists(id))) {
    res.status(404).end();
    return;
  }
  res.setHeader("Content-Type", "text/plain; charset=UTF-8");
  res.status(200).end(await client.get(id as string));
  await client.quit();
}

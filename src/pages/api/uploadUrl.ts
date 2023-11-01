// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import withHandler from "@/libs/server/withHandler";
import { E_CardsType, I_Response } from "@/libs/types";
import type { NextApiRequest, NextApiResponse } from "next";
import writeJson from "@/libs/server/writeJson";

async function handler(req: NextApiRequest, res: NextApiResponse<I_Response>) {
  // console.log("시자악");
  if (!req.body) {
    console.log("!req.body");
    res.status(400).json({ ok: false, data: "Not Body Error" });
    return;
  }

  if (!req.body.url) {
    console.log("!req.body.url");
    res.status(400).json({ ok: false, data: "Not Url Error" });
    return;
  }

  const content = await writeJson(req.body.url, E_CardsType.URL);
  console.log("! content");

  res.status(200).json({ ok: true, data: { ...JSON.parse(content) } });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });

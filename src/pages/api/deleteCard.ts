import withHandler from "@/libs/server/withHandler";
import { I_Response } from "@/libs/types";
import type { NextApiRequest, NextApiResponse } from "next";
import deleteJson from "@/libs/server/deleteJson";

async function handler(req: NextApiRequest, res: NextApiResponse<I_Response>) {
  if (!req.body) {
    console.log("!req.body");
    res.status(400).json({ ok: false, data: { msg: "Not Body Error" } });
    return;
  }

  if (!req.body.key && req.body.key !== 0) {
    console.log("!req.body.key");
    res.status(400).json({ ok: false, data: { msg: "Not Name Error" } });
    return;
  }
  try {
    const content = await deleteJson(req.body.name, req.body.key);

    console.log("! content", content);

    if (content)
      res.status(200).json({ ok: true, data: { msg: "삭제되었어요!😀" } });
    else
      res.status(500).json({
        ok: false,
        data: { msg: "삭제되지 않았어요! 😅" },
      });
  } catch (error) {
    res
      .status(500)
      .json({ ok: false, data: { msg: "서버에서 문제가 생겼어요! 😥" } });
  }
}

export default withHandler({ methods: ["DELETE"], handler, isPrivate: false });

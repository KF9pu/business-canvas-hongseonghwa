import withHandler from "@/libs/server/withHandler";
import { E_CardsType, I_Response } from "@/libs/types";
import type { NextApiRequest, NextApiResponse } from "next";
import updateJson from "@/libs/server/updateJson";

async function handler(req: NextApiRequest, res: NextApiResponse<I_Response>) {
  if (!req.body) {
    console.log("!req.body");
    res.status(400).json({ ok: false, data: { msg: "Not Body Error" } });
    return;
  }

  if (!req.body.url) {
    console.log("!req.body.url");
    res.status(400).json({ ok: false, data: { msg: "Not Url Error" } });
    return;
  }
  try {
    const content = await updateJson(req.body.url, req.body.key);

    if (content)
      res
        .status(200)
        .json({ ok: true, data: { msg: "수정이 완료되었어요!😀", content } });
    else
      res.status(500).json({
        ok: false,
        data: { msg: "같은 URL로는 수정할 수 없어요! 😅" },
      });
  } catch (error) {
    res
      .status(500)
      .json({ ok: false, data: { msg: "서버에서 문제가 생겼어요! 😥" } });
  }
}

export default withHandler({ methods: ["PATCH"], handler, isPrivate: false });

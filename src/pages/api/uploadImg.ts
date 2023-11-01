import withHandler from "@/libs/server/withHandler";
import { E_CardsType, I_Response } from "@/libs/types";
import type { NextApiRequest, NextApiResponse } from "next";
import writeJson from "@/libs/server/writeJson";

async function handler(req: NextApiRequest, res: NextApiResponse<I_Response>) {
  if (!req.body) {
    console.log("!req.body");
    res.status(400).json({ ok: false, error: "Not Body Error" });
    return;
  }

  if (!req.body.img) {
    console.log("!req.body.img");
    res.status(400).json({ ok: false, error: "Not Image Error" });
    return;
  }

  if (!req.body.img || req.body.img === "") {
    console.log("!req.body.img");
    res.status(400).json({ ok: false, error: "Not Image Name Error" });
    return;
  }

  console.log("🚀 upliad img");

  await writeJson(
    req.body.img, // 이미지 파일을 base64 문자열로 변환
    E_CardsType.IMAGE,
    req.body.name
  );

  res.status(200).json({ ok: true });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });

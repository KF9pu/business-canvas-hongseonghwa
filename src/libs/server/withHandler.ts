import { NextApiRequest, NextApiResponse } from "next";
import { I_Response } from "../types";

export type Method = "GET" | "POST" | "DELETE" | "PATCH";

interface ConfigType {
  methods: Method[];
  handler: (
    req: NextApiRequest,
    res: NextApiResponse<I_Response>
  ) => Promise<void>;
  isPrivate?: boolean;
}

export default function withHandler({
  methods,
  isPrivate = true, // 로그인시에만 사용 가능한 api 구분
  handler,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse<I_Response>
  ): Promise<any> {
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }
    // TODO: 시간남으면 간단한 로그인기능
    // if (isPrivate && !req.session.user) {
    //   return res.status(401).json({ ok: false, error: "Login Please!" });
    // }
    try {
      await handler(req, res);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ ok: false, error });
    }
  };
}

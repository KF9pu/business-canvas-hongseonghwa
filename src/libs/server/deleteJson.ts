import fs from "fs/promises";
import path from "path";
import { CACHE_PATH } from "./constants";
import { I_card } from "../types";

export default async function deleteJson(name: string, key: number) {
  const jsonStoragePath = path.join(CACHE_PATH + "/save", "/index.json");

  try {
    const content = await fs.readFile(jsonStoragePath, "utf-8");
    const contentJson: I_card[] = JSON.parse(content);

    // contentJson.filter((item: I_card, idx: number) => item.key !== key);
    const filterJson = await contentJson.filter((item: I_card, idx: number) => {
      console.log("🚀 ~ file: deleteJson.ts:18 ~ filterJson ~ key:", key);

      return item.key !== key;
    });

    // 변경된 JSON을 문자열로 변환
    const resultContent = JSON.stringify(filterJson);

    // 파일에 쓰기
    await fs.writeFile(jsonStoragePath, resultContent, "utf-8");

    return contentJson;
  } catch (error) {
    return null; // 에러 처리
  }
}

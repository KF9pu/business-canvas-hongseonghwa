import fs from "fs/promises";
import path from "path";
import { CACHE_PATH } from "./constants";
import { I_card } from "../types";

export default async function updateNameJson(name: string, key: number) {
  console.log("🚀 ~ file: updateNameJson.ts:7 ~ updateNameJson ~ key:", key);
  const jsonStoragePath = path.join(CACHE_PATH + "/save", "/index.json");

  try {
    const content = await fs.readFile(jsonStoragePath, "utf-8");
    const contentJson: I_card[] = JSON.parse(content);

    const sameContent = contentJson.find(
      (item: I_card, idx: number) => item.key === key
    );

    if (!sameContent) return null;

    if (sameContent.name!.includes(name)) return null; // 변경요청한 url 이 기존과 같은경우

    contentJson.forEach((item: I_card, idx: number) => {
      if (item.key === key) {
        item.name = name;
      }
    });

    // 변경된 JSON을 문자열로 변환
    const resultContent = JSON.stringify(contentJson);

    // 파일에 쓰기
    await fs.writeFile(jsonStoragePath, resultContent, "utf-8");

    return resultContent;
  } catch (error) {
    return null; // 에러 처리
  }
}

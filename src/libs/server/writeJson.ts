import fs from "fs/promises";
import path from "path";
import { CACHE_PATH } from "./constants";
import { E_CardsType } from "../types";

export default async function writeJson(
  url: string,
  type: E_CardsType,
  name?: string
) {
  const jsonStoragePath = path.join(CACHE_PATH + "/save", "/index.json");

  const content = await fs.readFile(jsonStoragePath, "utf-8");
  const contentJson = JSON.parse(content);
  const resultContent = JSON.stringify([
    ...contentJson,
    {
      key:
        contentJson.length === 0
          ? contentJson.length
          : parseInt(contentJson[contentJson.length - 1].key) + 1,
      url: url,
      date: new Date().getTime(),
      type,
      name: name ?? "",
    },
  ]);
  fs.writeFile(jsonStoragePath, resultContent, "utf-8");

  return resultContent;
}

import path from "path";

export const SERVER_URL = "http://localhost:3000/api/";
export const CACHE_PATH =
  process.env.VERCEL === "1" ? path.join("/tmp") : path.join(process.cwd());

import { I_OnlyChildProps } from "@/libs/types";
import { cls } from "hogreed-utils";
import Head from "next/head";
import type { FC } from "react";
import LayoutNav from "./LayoutNav";

const Layout: FC<I_OnlyChildProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>HOME</title>
        <meta name="description" content="business canvas 과제" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={cls(
          "flex justify-center items-center",
          "w-[1200px] h-[800px]",
          "border"
        )}
      >
        <LayoutNav />
        {children}
      </div>
    </>
  );
};
export default Layout;

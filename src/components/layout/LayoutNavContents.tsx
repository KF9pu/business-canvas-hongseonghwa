import { cls } from "hogreed-utils";
import type { FC } from "react";
import savedJson from "../../../save/index.json";
import { I_card } from "@/libs/types";
import LayoutNavContentsCard from "./LayoutNavContentsCard";

interface LayoutNavContentsProps {}

const LayoutNavContents: FC<LayoutNavContentsProps> = ({}) => {
  const cards: I_card[] = savedJson;
  return (
    <div
      className={cls(
        "flex flex-col gap-[8px]",
        "w-full",
        "overflow-y-scroll",
        "p-[8px]"
      )}
    >
      {cards.map((card, idx) => {
        return (
          <div
            className={cls("", "w-full", "border")}
            key={`LayoutNavContentsCard_${idx}`}
          >
            <LayoutNavContentsCard card={card} />
          </div>
        );
      })}
    </div>
  );
};
export default LayoutNavContents;

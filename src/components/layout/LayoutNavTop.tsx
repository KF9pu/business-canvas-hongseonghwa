import type { FC } from "react";

import LayoutNavTopUrl from "./LayoutNavTopUrl";
import LayoutNavTopImg from "./LayoutNavTopImg";
import { cls } from "hogreed-utils";
interface LayoutNavTopProps {}

const LayoutNavTop: FC<LayoutNavTopProps> = ({}) => {
  return (
    <div className={cls("flex justify-around", "border", "py-[12px]")}>
      <LayoutNavTopUrl />
      <LayoutNavTopImg />
    </div>
  );
};
export default LayoutNavTop;

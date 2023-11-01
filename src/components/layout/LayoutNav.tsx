import { type FC } from "react";
import { Flex } from "@chakra-ui/react";
import LayoutNavTop from "./LayoutNavTop";
import LayoutNavContents from "./LayoutNavContents";
import { cls } from "hogreed-utils";

interface LayoutNavProps {}
const LayoutNav: FC<LayoutNavProps> = ({}) => {
  return (
    <div className={cls("flex flex-col", "w-[280px] h-full", "border")}>
      <LayoutNavTop />
      <LayoutNavContents />
    </div>
  );
};
export default LayoutNav;

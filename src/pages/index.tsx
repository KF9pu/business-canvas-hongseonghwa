import Layout from "@/components/layout";
import { cls } from "hogreed-utils";
import useSeletCardStore from "@/libs/client/useSeletCard";
import { E_CardsType } from "@/libs/types";
import { Box, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export default function Home() {
  const { url, name, type, setResetSeletedCard } = useSeletCardStore();
  return (
    <Layout>
      <div
        className={cls(
          "flex flex-col justify-between gap-[4px]",
          "w-[920px] h-full"
        )}
      >
        {type === E_CardsType.NONE ? (
          <></>
        ) : (
          <>
            <div
              className={cls(
                "flex justify-between items-center",
                "h-[60px]",
                "border",
                "px-[12px]"
              )}
            >
              <p className={cls("w-[90%]", "truncate")}>
                {type === E_CardsType.IMAGE ? name : url}
              </p>
              <IconButton
                colorScheme="teal"
                variant={"ghost"}
                aria-label="close"
                icon={<CloseIcon />}
                onClick={() => setResetSeletedCard()}
              />
            </div>
            <div
              className={cls(
                "flex justify-center items-center",
                "w-full h-full",
                "p-[12px]"
              )}
            >
              {type === E_CardsType.URL ? (
                <iframe className={cls("w-full h-full")} src={url} />
              ) : (
                <Box
                  backgroundImage={url}
                  className={cls(
                    "w-full h-full",
                    "bg-contain bg-center bg-no-repeat"
                  )}
                />
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

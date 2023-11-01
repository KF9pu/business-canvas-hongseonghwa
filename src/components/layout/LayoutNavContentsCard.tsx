import useSeletCardStore from "@/libs/client/useSeletCard";
import { E_CardsType, I_card } from "@/libs/types";
import validateUrl from "@/libs/utils/validateUrl";
import { IconButton, useToast } from "@chakra-ui/react";
import { cls, getYoutubeEmbedUrl } from "hogreed-utils";
import { useRef, type FC, useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface LayoutNavContentsCardProps {
  card: I_card;
}

const LayoutNavContentsCard: FC<LayoutNavContentsCardProps> = ({ card }) => {
  const updateUrlRef = useRef<HTMLInputElement>(null);
  const [isInputShow, setIsInputShow] = useState(false);
  const { setSeletCard, setResetSeletedCard } = useSeletCardStore();
  const toast = useToast();

  function deleteCard() {
    if (card.key === undefined) {
      toast({
        title: "Error",
        description: "문제가 있어요! 😫",
        status: "error",
        duration: 2000,
        isClosable: true,
      });

      return;
    }

    const body = JSON.stringify({ key: card.key });
    fetch("/api/deleteCard", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }).then(async res => {
      console.log("🚀 ~ file: useUpdateUrl.tsx:39 ~ updateUrl ~ res:", res);
      const {
        ok,
        data: { msg },
      } = await res.json();

      toast({
        title: ok ? "Success" : "Fail",
        status: ok ? "success" : "error",
        description: `${msg}`,
        duration: 2000,
        isClosable: true,
      });
      setResetSeletedCard();
    });
  }

  function updateName(name: string) {
    if (!name || card.key === undefined) {
      toast({
        title: "Error",
        description: "문제가 있어요! 😫",
        status: "error",
        duration: 2000,
        isClosable: true,
      });

      return;
    }

    const isSame = card.name!.includes(name);
    if (isSame) return;

    const body = JSON.stringify({ name, key: card.key });
    fetch("/api/updateName", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }).then(async res => {
      console.log("🚀 ~ file: useUpdateUrl.tsx:39 ~ updateUrl ~ res:", res);
      const {
        ok,
        data: { msg, content },
      } = await res.json();

      toast({
        title: ok ? "Success" : "Fail",
        status: ok ? "success" : "error",
        description: `${msg}`,
        duration: 2000,
        isClosable: true,
      });

      const updateCard = JSON.parse(content).find(
        (item: I_card) => item.key === card.key
      );
      if (updateCard) setSeletCard(updateCard); // 변경된 url 로 변경
    });
  }

  function updateUrl(url: string) {
    if (!url || card.key === undefined) {
      toast({
        title: "Error",
        description: "문제가 있어요! 😫",
        status: "error",
        duration: 2000,
        isClosable: true,
      });

      return;
    }

    const isSame = card.url.includes(url);
    if (isSame) return;

    const { url: validatedUrl, msg, isValidUrl } = validateUrl(url);
    if (!isValidUrl) {
      toast({
        title: "실패",
        description: `${msg}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });

      return;
    } else {
      const resultUrl = getYoutubeEmbedUrl(validatedUrl!); // youtube url 인경우 `https://www.youtube.com/embed/${id}` 로 변환
      const body = JSON.stringify({ url: resultUrl, key: card.key });
      fetch("/api/updateUrl", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }).then(async res => {
        console.log("🚀 ~ file: useUpdateUrl.tsx:39 ~ updateUrl ~ res:", res);
        const {
          ok,
          data: { msg, content },
        } = await res.json();
        toast({
          title: ok ? "Success" : "Fail",
          status: ok ? "success" : "error",
          description: `${msg}`,
          duration: 2000,
          isClosable: true,
        });
        const updateCard = JSON.parse(content).find(
          (item: I_card) => item.key === card.key
        );
        if (updateCard) setSeletCard(updateCard); // 변경된 url 로 변경
      });
    }
  }

  return (
    <div
      className={cls(
        "w-full",
        "p-[12px]",
        "transition-all duration-300",
        "hover:bg-[rgba(0,128,128,0.3)]",
        "cursor-pointer"
      )}
      onClick={() => {
        setSeletCard(card);
      }}
    >
      <div className={cls("relative", "w-full h-[60px]", "overflow-hidden")}>
        <p
          className={cls(
            "w-full",
            "absolute",
            "truncate",
            isInputShow ? "z-[-1]" : "z-[0]"
          )}
        >
          {card.type === E_CardsType.IMAGE ? card.name : card.url}
        </p>
        <input
          className={cls(
            "absolute",
            "w-full",
            isInputShow ? "z-[0] " : "z-[-1] translate-y-[500px]"
          )}
          ref={updateUrlRef}
          type="text"
          onBlur={e => {
            setIsInputShow(false);
            if (card.type === E_CardsType.URL) updateUrl(e.target.value);
            if (card.type === E_CardsType.IMAGE) updateName(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-end gap-[4px]">
        <IconButton
          colorScheme="teal"
          variant={"ghost"}
          aria-label="edit"
          icon={<EditIcon />}
          className={cls(isInputShow ? "hidden" : "")}
          onClick={e => {
            e.stopPropagation();
            updateUrlRef.current?.focus();

            if (card.type === E_CardsType.URL)
              updateUrlRef.current!.value = card.url;
            if (card.type === E_CardsType.IMAGE)
              updateUrlRef.current!.value = card.name!;
            setIsInputShow(true);
          }}
        />
        <IconButton
          colorScheme="teal"
          variant={"ghost"}
          aria-label="delete"
          icon={<DeleteIcon />}
          onClick={e => {
            e.stopPropagation();
            deleteCard();
          }}
        />
      </div>
    </div>
  );
};
export default LayoutNavContentsCard;

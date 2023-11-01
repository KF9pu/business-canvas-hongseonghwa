import validateUrl from "@/libs/utils/validateUrl";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { cls, getYoutubeEmbedUrl } from "hogreed-utils";
import { useRef, type FC, useState } from "react";
import { delay, from, mergeMap, of } from "rxjs";

interface LayoutNavTopUrlProps {}

const LayoutNavTopUrl: FC<LayoutNavTopUrlProps> = ({}) => {
  const urlRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const [formErrorMessage, setMsg] = useState("");

  function uploadUrl() {
    const url = urlRef.current?.value;
    if (!url) return;
    urlRef.current.value = "";
    const { isValidUrl, msg, url: validatedUrl } = validateUrl(url);
    if (!isValidUrl) return;

    const resultUrl = getYoutubeEmbedUrl(validatedUrl ?? ""); // youtube url 인경우 `https://www.youtube.com/embed/${id}` 로 변환
    const body = JSON.stringify({ url: resultUrl });

    if (!isValidUrl) return; // url 검증이 완료되지 않았으면 리턴
    const shouldFail = Math.random() < 0.2; // 20% 확률로 실패
    if (shouldFail) {
      toast({
        title: "실패",
        description: "20%확률로 성공하지 못했어요",
        status: "warning",
        duration: 1500,
        isClosable: true,
      });
    } else {
      console.log("오니");
      const request = fetch("/api/uploadUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      from([request])
        .pipe(
          mergeMap(req =>
            of(req).pipe(
              delay(Math.floor(Math.random() * (1000 - 300 + 1) + 300)) // 0.3초 딜레이 후 처리
            )
          )
        )
        .subscribe(response => {
          response
            .then(res => {
              return res;
            })
            .then(res => {
              if (res.status === 200) {
                toast({
                  title: "Success",
                  description: "URL 등록에 성공했어요 😊",
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                });
              } else {
                toast({
                  title: "Server Err",
                  description: "URL 등록을 실패했어요 😥",
                  status: "error",
                  duration: 2000,
                  isClosable: true,
                });
              }
            })
            .finally(() => {
              setMsg("");
            });
        });
    }
  }

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            width="125px"
            height={"30px"}
            colorScheme="teal"
            variant="outline"
            boxShadow={"0px 2px 5px 0px rgba(0, 128, 128, 0.2)"}
            isActive={isOpen}
            as={Button}
          >
            {isOpen ? "Close" : "URL 추가"}
          </MenuButton>
          <MenuList padding={"8px 12px"}>
            <FormControl
              variant="floating"
              id="first-name"
              isRequired
              isInvalid
            >
              <Input
                ref={urlRef}
                placeholder=" "
                onBlur={uploadUrl}
                onChange={e => {
                  const { msg } = validateUrl(e.target.value);
                  setMsg(msg);
                }}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    uploadUrl();
                  }
                }}
              />
              <FormLabel>URL</FormLabel>
              <FormHelperText>URL 을 입력해 주세요</FormHelperText>
              <FormErrorMessage>{formErrorMessage}</FormErrorMessage>
            </FormControl>
          </MenuList>
        </>
      )}
    </Menu>
  );
};
export default LayoutNavTopUrl;

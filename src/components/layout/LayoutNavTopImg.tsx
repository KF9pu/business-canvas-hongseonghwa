import { cls } from "hogreed-utils";
import { Subject, concatMap, delay, filter, from, mergeMap } from "rxjs";
import { useRef, type FC, ChangeEvent, useEffect } from "react";
import { Button, Input, Tooltip, useToast } from "@chakra-ui/react";

interface LayoutNavTopImgProps {}

const LayoutNavTopImg: FC<LayoutNavTopImgProps> = ({}) => {
  const imgRef = useRef<HTMLInputElement>(null);
  const subject = new Subject<ChangeEvent<HTMLInputElement>>();
  const toast = useToast();

  useEffect(() => {
    const subscription = subject
      .pipe(
        filter(e => e.target.files !== null), // null 값인 경우 필터링
        mergeMap(e => from(e.target.files!)), // 각 파일을 순차적으로 처리
        concatMap(file =>
          from([file]).pipe(
            delay(Math.floor(Math.random() * (1000 - 300 + 1) + 300)) // 0.3초 딜레이 후 처리
          )
        )
      )
      .subscribe((file: File) => {
        // TODO: 파일 용량 제한 기능 추가
        // const fileSize = file.size; // 파일 크기 (바이트 단위)
        // const maxSizeInBytes = 512 * 1024; // 512MB 제한
        // if (fileSize > maxSizeInBytes) {
        //   console.log("fileSize : ", fileSize);
        //   console.log("파일 크기가 제한을 초과했습니다.");
        //   // return;
        // }
        const reader = new FileReader();

        reader.onload = event => {
          const base64Image = event.target?.result;
          const body = JSON.stringify({
            name: file.name,
            img: base64Image,
          });
          fetch("/api/uploadImg", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body,
          })
            .then(res => res)
            .then(res => {
              if (res.status === 200) {
                toast({
                  title: "성공",
                  description: "",
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                });
              } else {
                toast({
                  title: "실패",
                  description: "",
                  status: "error",
                  duration: 2000,
                  isClosable: true,
                });
              }
            });
        };

        reader.readAsDataURL(file);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <Tooltip label="png & jpg">
      <>
        <Button
          width="125px"
          height={"30px"}
          variant="outline"
          colorScheme="teal"
          onClick={() => imgRef.current?.click()}
        >
          이미지 추가
        </Button>
        <Input
          ref={imgRef}
          id="image_file"
          type="file"
          accept=".png, .jpg"
          display={"none"}
          onChange={e => {
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
              subject.next(e);
            }
          }}
          multiple
        />
      </>
    </Tooltip>
  );
};
export default LayoutNavTopImg;

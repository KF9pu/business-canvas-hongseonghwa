function validateUrl(url: string | undefined) {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  let msg = "";
  let isValidUrl = false;

  if (!url) {
    if (url === "") {
      msg = "";
    }
    msg = "URL 에 문제가 있어요! 😅";
    return { url, msg, isValidUrl };
  }

  if (
    !(
      url.slice(0, 7).includes("http://") ||
      url.slice(0, 8).includes("https://")
    )
  ) {
    msg = "http:// 혹은 https:// 로 시작해야해요! 🤔";
    return { url, msg, isValidUrl };
  }
  if (url.length < 12) {
    msg = "URL 이 너무 짧아요! 😉";
    return { url, msg, isValidUrl };
  }
  if (!urlRegex.test(url)) {
    msg = "올바른 URL이 아니에요! 😂";
    return { url, msg, isValidUrl };
  }

  msg = ""; // 검증이 전부 통과하면 에러 메세지 비워줌
  isValidUrl = true; // 검증을 전부 통과하면 검증 완료
  return { url, msg, isValidUrl };
}
export default validateUrl;

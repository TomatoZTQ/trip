import ZCRequest from "../request/index"

export function getHomeHotSuggests() {
  return ZCRequest.get({
    url: "/home/hotSuggests"
  })
}
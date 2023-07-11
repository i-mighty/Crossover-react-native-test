import { api, responseHandler } from "../api"
import { FYPAnswerRevealRes, FYPFetchRes } from "./types"

export const getFYPItem = async () => {
  const res = await api.apisauce.get<FYPFetchRes>("/for_you")
  return responseHandler(res)
}

export const revealFYPAnswer = async (id: number | string) => {
  const res = await api.apisauce.get<FYPAnswerRevealRes>(`/reveal?id=${id}`)
  return responseHandler(res)
}

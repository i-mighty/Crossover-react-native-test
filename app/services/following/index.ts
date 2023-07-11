import { api, responseHandler } from "../api"
import { FollowingCard } from "./types"

export const getFollowingCard = async () => {
  const res = await api.apisauce.get<FollowingCard>("/following")
  return responseHandler(res)
}

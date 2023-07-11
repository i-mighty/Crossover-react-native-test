import { Instance, SnapshotIn, SnapshotOut, cast, flow, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { FollowingItemModel } from "./FollowingItem"
import Toast from "react-native-toast-message"
import { getFollowingCard } from "app/services/following"
import { FollowingCard } from "app/services/following/types"

/**
 * Model description here for TypeScript hints.
 */
export const FollowingStoreModel = types
  .model("FollowingStore", {
    loaded: types.boolean,
    loading: types.boolean,
    followingItems: types.array(FollowingItemModel),
    selectedItem: types.reference(FollowingItemModel),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    fetchItems: flow(function* () {
      try {
        self.loading = true
        const data = (yield getFollowingCard()) as FollowingCard
        self.followingItems = cast([...self.followingItems, data])
        self.loaded = true
        self.loading = false
      } catch (error) {
        self.loading = false
        Toast.show({
          type: "error",
          text1: error.message,
        })
      }
    }),
  }))

export interface FollowingStore extends Instance<typeof FollowingStoreModel> {}
export interface FollowingStoreSnapshotOut extends SnapshotOut<typeof FollowingStoreModel> {}
export interface FollowingStoreSnapshotIn extends SnapshotIn<typeof FollowingStoreModel> {}
export const createFollowingStoreDefaultModel = () => types.optional(FollowingStoreModel, {})

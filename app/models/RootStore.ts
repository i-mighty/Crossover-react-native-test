import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { FollowingStoreModel } from "./following/FollowingStore"
import { FypStoreModel } from "./fyp/FypStore"
import { FypModel } from "./fyp/Fyp"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  followingStore: types.optional(FollowingStoreModel, {
    loaded: false,
    loading: false,
    followingItems: [],
    selectedItem: 0,
  } as any),
  fypStore: types.optional(FypStoreModel, {
    loading: false,
    loaded: false,
    fypItems: [],
    selectedItem: 0,
  } as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}

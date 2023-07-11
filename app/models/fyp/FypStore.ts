import { Instance, SnapshotIn, SnapshotOut, cast, flow, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { FypModel } from "./Fyp"
import { getFYPItem } from "app/services/fyp"
import { FYPFetchRes } from "app/services/fyp/types"
import Toast from "react-native-toast-message"

/**
 * Model description here for TypeScript hints.
 */
export const FypStoreModel = types
  .model("FypStore", {
    loading: types.boolean,
    loaded: types.boolean,
    fypItems: types.array(FypModel),
    selectedItem: types.reference(FypModel),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    fetchFyp: flow(function* () {
      try {
        self.loading = true
        const data = (yield getFYPItem()) as FYPFetchRes
        self.fypItems = cast([...self.fypItems, { loading: false, ...data }])
        self.loaded = true
        self.loading = false
      } catch (error) {
        self.loading = false
        console.log("====================================")
        console.log("following error", error)
        console.log("====================================")
      }
    }),
  }))

export interface FypStore extends Instance<typeof FypStoreModel> {}
export interface FypStoreSnapshotOut extends SnapshotOut<typeof FypStoreModel> {}
export interface FypStoreSnapshotIn extends SnapshotIn<typeof FypStoreModel> {}
export const createFypStoreDefaultModel = () => types.optional(FypStoreModel, {})

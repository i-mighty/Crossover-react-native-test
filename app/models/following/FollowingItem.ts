import { Instance, SnapshotIn, SnapshotOut, types as t } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const FollowingItemModel = t
  .model("FollowingItem", {
    type: t.string,
    id: t.identifierNumber,
    playlist: t.string,
    flashcard_front: t.string,
    flashcard_back: t.string,
    description: t.string,
    user: t.model({
      name: t.string,
      avatar: t.string,
    }),
  })
  .actions(withSetPropAction)

export interface FollowingItem extends Instance<typeof FollowingItemModel> {}
export interface FollowingItemSnapshotOut extends SnapshotOut<typeof FollowingItemModel> {}
export interface FollowingItemSnapshotIn extends SnapshotIn<typeof FollowingItemModel> {}
export const createFollowingItemDefaultModel = () => t.optional(FollowingItemModel, {})

import { Instance, SnapshotIn, SnapshotOut, cast, flow, types as t } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { revealFYPAnswer } from "app/services/fyp"
import { FYPAnswerRevealRes, FYPFetchRes } from "app/services/fyp/types"
import Toast from "react-native-toast-message"

/**
 * Model description here for TypeScript hints.
 */
export const FypModel = t
  .model("Fyp", {
    loading: t.boolean,
    type: t.string,
    id: t.identifierNumber,
    playlist: t.string,
    description: t.string,
    image: t.string,
    question: t.string,
    options: t.array(
      t.model({
        id: t.string,
        answer: t.string,
      }),
    ),
    correct_options: t.array(
      t.model({
        id: t.string,
        answer: t.string,
      }),
    ),
    user: t.model({
      name: t.string,
      avatar: t.string,
    }),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    fetchAnswer: flow(function* () {
      try {
        self.loading = false
        const data = (yield revealFYPAnswer(self.id)) as FYPAnswerRevealRes
        self.correct_options = cast(data.correct_options)
        self.loading = true
      } catch (error) {
        self.loading = true
        Toast.show({
          type: "error",
          text1: error.message,
        })
      }
    }),
  }))

export interface Fyp extends Instance<typeof FypModel> {}
export interface FypSnapshotOut extends SnapshotOut<typeof FypModel> {}
export interface FypSnapshotIn extends SnapshotIn<typeof FypModel> {}
export const createFypDefaultModel = () => t.optional(FypModel, {})

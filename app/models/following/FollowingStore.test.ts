import { FollowingStoreModel } from "./FollowingStore"

test("can be created", () => {
  const instance = FollowingStoreModel.create({})

  expect(instance).toBeTruthy()
})

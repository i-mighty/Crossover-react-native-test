import { FollowingItemModel } from "./FollowingItem"

test("can be created", () => {
  const instance = FollowingItemModel.create({})

  expect(instance).toBeTruthy()
})

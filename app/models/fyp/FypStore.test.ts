import { FypStoreModel } from "./FypStore"

test("can be created", () => {
  const instance = FypStoreModel.create({})

  expect(instance).toBeTruthy()
})

import { FypModel } from "./Fyp"

test("can be created", () => {
  const instance = FypModel.create({})

  expect(instance).toBeTruthy()
})

import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { HomeTabs } from "app/components"
import { View } from "native-base"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  return (
    <View style={[$root]}>
      <HomeTabs />
    </View>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

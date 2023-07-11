import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { HomeTabs, Screen, Text } from "app/components"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { colors } from "app/theme"
import { useStores } from "app/models"
import { View } from "native-base"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { fypStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const $insetStyles = useSafeAreaInsetsStyle(["top"])
  return (
    <View style={[$root]}>
      <HomeTabs />
    </View>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

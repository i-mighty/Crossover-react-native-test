import * as React from "react"
import {
  Animated,
  Dimensions,
  Pressable,
  StatusBar,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"
import { Box, Center, Stack, Text as NBText, useColorModeValue } from "native-base"
import { SceneMap, SceneRendererProps, TabView } from "react-native-tab-view"
import { Ionicons, FontAwesome } from "@expo/vector-icons"
import { ForYou } from "./TabScene/ForYou"
import { Following } from "./TabScene/Following"
import { wp } from "../theme/responsive"
export interface HomeTabsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */

const initialLayout = {
  width: Dimensions.get("window").width,
}

export const HomeTabs = observer(function HomeTabs(props: HomeTabsProps) {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: "following", title: "Following" },
    { key: "for_you", title: "For You" },
  ])

  const renderScene = SceneMap({
    for_you: () => <ForYou />,
    following: () => <Following />,
  })

  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map((_x, i) => i)
    return (
      <Box
        flexDirection="row"
        position={"absolute"}
        // left={"10"}
        width={wp(100)}
        top={"10"}
        zIndex={50}
        justifyContent={"space-around"}
      >
        <Center size="16">
          <Stack direction="row" space="1">
            <Ionicons name="stopwatch-sharp" size={24} color={colors.palette.neutral500} />
            <NBText color={colors.palette.neutral500} fontSize="md">
              10 min
            </NBText>
          </Stack>
        </Center>
        <Box flexDirection="row" justifyContent={"center"}>
          {props.navigationState.routes.map((route, i) => {
            const opacity = props.position.interpolate({
              inputRange,
              outputRange: inputRange.map((inputIndex) => (inputIndex === i ? 1 : 0.5)),
            })
            const color = index === i ? colors.palette.neutral100 : colors.palette.neutral500
            const borderColor = index === i ? colors.palette.neutral100 : colors.transparent
            return (
              <Pressable
                key={route.key}
                style={{ marginTop: 8, marginHorizontal: 8 }}
                onPress={() => {
                  console.log(i)
                  setIndex(i)
                }}
              >
                <Animated.Text
                  style={{
                    color,
                    opacity,
                    fontSize: 20,
                    fontWeight: "bold",
                    lineHeight: 38,
                  }}
                >
                  {route.title}
                </Animated.Text>
                <Box
                  position={"absolute"}
                  borderBottomWidth="5"
                  borderColor={borderColor}
                  alignItems="center"
                  // m="3"
                  top="1"
                  left="20%"
                  p={5}
                ></Box>
              </Pressable>
            )
          })}
        </Box>
        <Center>
          <FontAwesome name="search" size={24} color={colors.palette.neutral100} />
        </Center>
      </Box>
    )
  }

  return (
    <View style={$container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={{
          flex: 1,
          marginTop: StatusBar.currentHeight,
        }}
      />
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
}

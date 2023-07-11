import * as React from "react"
import { StyleProp, TextStyle, ViewStyle, ImageStyle, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { colors } from "app/theme"
import { Fyp } from "app/models"
import { LinearGradient } from "expo-linear-gradient"
import { Box, Flex, Stack, Text } from "native-base"
import { hp } from "../theme/responsive"
import { useState } from "react"
import _ from "lodash"
import { Image } from "expo-image"
import { PlaylistBar } from "./PlaylistBar"
import { Sidebar, VideoInfo } from "."

const optionIcons = {
  correct: require("../../assets/FYP/thumbs-up.gif"),
  wrong: require("../../assets/FYP/thumbs-down.gif"),
}
export interface ForYouProps {
  item: Fyp
}

/**
 * Describe your component here
 */
export const ForYouItem = observer(function ForYou({ item }: ForYouProps) {
  React.useMemo(() => {
    item.fetchAnswer()
  }, [item.id])
  const NO_WIDTH_SPACE = "​"
  const [selectedOption, setSelectedOption] = useState([])
  const highlight = (string: string) =>
    string.split(" ").map((word, i) => (
      <Text key={i}>
        <Text style={$highlighted}>{word} </Text>
        {NO_WIDTH_SPACE}
      </Text>
    ))

  const optionClicked = (id: string) => {
    setSelectedOption([id])
  }

  const optionState = (id: string) => {
    const correct_options = item.correct_options
    if (selectedOption.includes(id)) {
      if (_.map(correct_options, "id").includes(id)) {
        return "correct"
      } else {
        return "wrong"
      }
    } else {
      return "default"
    }
  }

  const color = (state: string) => {
    switch (state) {
      case "correct":
        return "success.500:alpha.50"
      case "wrong":
        return "error.500:alpha.50"
      case "default":
      default:
        return "white:alpha.50"
    }
  }

  const renderOptions = () => {
    return item.options.map((o, i) => {
      let state = optionState(o.id)
      return (
        <TouchableOpacity
          key={o.id}
          onPress={() => {
            optionClicked(o.id)
          }}
        >
          <Flex
            background={color(state)}
            // p={3}
            justifyContent={"space-between"}
            alignItems="center"
            borderRadius={4}
            flexDir="row"
          >
            <Text
              style={$optionText}
              flex={0.8}
              shadow={4}
              bold
              color={colors.palette.accent100}
              fontSize={"lg"}
              m={3}
            >
              {o.answer}
            </Text>
            {state != "default" && (
              <Image
                source={optionIcons[state]}
                style={[
                  {
                    height: 50,
                    width: 50,
                    // position: "absolute",
                    // right: 0,
                  },
                  state == "wrong" ? $wrongImage : $correctImage,
                ]}
              />
            )}
          </Flex>
        </TouchableOpacity>
      )
    })
  }

  return (
    <Image
      contentFit="cover"
      source={{
        uri: item.image,
      }}
      style={[$image]}
      cachePolicy="disk"
    >
      <LinearGradient style={$image} colors={[colors.palette.neutral700, colors.transparent]}>
        <Box p={4} mt={16}>
          <Text fontSize={"2xl"} fontWeight={"semibold"} color={colors.background}>
            {highlight(item.question)}
          </Text>
        </Box>
        <Flex
          maxHeight={hp(50)}
          justifyContent={"space-between"}
          alignItems={"flex-end"}
          flexDir={"row"}
          px="4"
        >
          <Stack direction="column" space="8" flex={0.9}>
            <Stack direction="column" space="3">
              {renderOptions()}
            </Stack>
            <VideoInfo name={item.user.name} description={item.description} />
          </Stack>
          <Sidebar avatar={item.user.avatar} />
        </Flex>
        <PlaylistBar playlist={item.playlist} />
      </LinearGradient>
    </Image>
  )
})

const $image: ImageStyle = {
  justifyContent: "space-around",
  flex: 1,
}

const $highlighted: TextStyle = {
  backgroundColor: "#000000AA",
  borderRadius: 20,
  padding: 10,
  overflow: "hidden",
}

const $optionText: TextStyle = {
  textShadowColor: "black",
  textShadowRadius: 1,
  textShadowOffset: {
    width: 2,
    height: 2,
  },
}

const $wrongImage: ImageStyle = {
  top: 10,
  transform: [{ rotateY: "180deg" }, { rotateX: "180deg" }],
}

const $correctImage: ImageStyle = {
  top: -5,
  // marginBottom: 10,
}

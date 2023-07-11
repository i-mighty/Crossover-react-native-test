import * as React from "react"
import { observer } from "mobx-react-lite"
import { Flex, Text } from "native-base"
import { wp } from "../theme/responsive"
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons"

export interface PlaylistBarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  playlist?: string
}

/**
 * Describe your component here
 */
export const PlaylistBar = observer(function PlaylistBar(props: PlaylistBarProps) {
  const { playlist } = props

  return (
    <Flex
      flexDir="row"
      position={"absolute"}
      bottom={"0"}
      bg="trueGray.900"
      w={wp(100)}
      px={6}
      py={2}
      justifyContent={"space-between"}
    >
      <Flex flexDir="row">
        <MaterialCommunityIcons name="play-box-multiple" size={24} color="white" />
        <Text fontSize={"md"} bold color="white" ml={4}>
          {playlist}
        </Text>
      </Flex>
      <Feather name="chevron-right" size={24} color="white" />
    </Flex>
  )
})

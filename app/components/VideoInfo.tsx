import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors } from "app/theme"
import { Stack, Text } from "native-base"
import _ from "lodash"
export interface VideoInfoProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  name: string
  description: string
}

/**
 * Describe your component here
 */
export const VideoInfo = observer(function VideoInfo(props: VideoInfoProps) {
  const { name, description } = props

  return (
    <Stack direction="column" space="3">
      <Text color={colors.background} fontSize={"lg"} bold>
        {name}
      </Text>
      <Text color={colors.background} fontSize={"sm"}>
        {description}
      </Text>
    </Stack>
  )
})

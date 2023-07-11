import * as React from "react"
import { StyleProp, ViewStyle, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { colors } from "app/theme"
import { Avatar, Stack, Text, useDisclose } from "native-base"
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons"
import _ from "lodash"

export interface SidebarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  avatar: string
}

/**
 * Describe your component here
 */
export const Sidebar = observer(function Sidebar(props: SidebarProps) {
  const { avatar } = props
  const { isOpen: bookmarked, onToggle: toggleBookmark } = useDisclose()
  const { isOpen: liked, onToggle: toggleLiked } = useDisclose()

  return (
    <Stack direction="column" space="3">
      <Avatar source={{ uri: avatar }} size="lg">
        <Avatar.Badge>
          <Feather name="plus" size={15} color="white" />
        </Avatar.Badge>
      </Avatar>
      <Stack direction="column" space="1" alignItems={"center"}>
        <Pressable onPress={toggleLiked}>
          <Ionicons name="heart" size={48} color={liked ? colors.error : "white"} />
        </Pressable>
        <Text color="white" fontSize={"md"} bold>
          {"5"}
        </Text>
      </Stack>
      <Stack direction="column" space="1" alignItems={"center"}>
        <Ionicons name="heart" size={48} color="white" />
        <Text color="white" fontSize={"md"} bold>
          {"5"}
        </Text>
      </Stack>
      <Stack direction="column" space="1" alignItems={"center"}>
        <Pressable onPress={toggleBookmark}>
          <MaterialCommunityIcons
            name="bookmark"
            size={48}
            color={bookmarked ? colors.error : "white"}
          />
        </Pressable>
        <Text color="white" fontSize={"md"} bold>
          {"12"}
        </Text>
      </Stack>
      <Stack direction="column" space="1" alignItems={"center"}>
        <MaterialCommunityIcons name="share" size={48} color="white" />
        <Text color="white" fontSize={"md"} bold>
          {"17"}
        </Text>
      </Stack>
    </Stack>
  )
})

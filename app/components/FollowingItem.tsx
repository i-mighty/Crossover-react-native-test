import * as React from "react"
import { FlatList, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors } from "app/theme"
import { FollowingItem } from "app/models"
import { hp } from "app/theme/responsive"
import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  ScrollView,
  Stack,
  Text,
  useDisclose,
} from "native-base"
import { Entypo } from "@expo/vector-icons"
import { PlaylistBar, Sidebar, VideoInfo } from "."
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"
export interface FollowingItemProps {
  item: FollowingItem
}

const ratingButtons = [
  {
    value: "1",
    color: "indigo",
  },
  {
    value: "2",
    color: "green",
  },
  {
    value: "3",
    color: "error",
  },
  {
    value: "4",
    color: "yellow",
  },
  {
    value: "5",
    color: "purple",
  },
]

/**
 * Describe your component here
 */
export const FollowingSingleItem = observer(function FollowingSingleItem(
  props: FollowingItemProps,
) {
  const { item } = props
  const { isOpen: backShown, onToggle: toggleBackShown } = useDisclose()
  const [rating, setRating] = useState(null)
  return (
    <LinearGradient
      style={$container}
      colors={[colors.palette.neutral900, colors.palette.secondary500, colors.palette.secondary400]}
    >
      <Flex flex={1} mb={16} p={4} flexDir="row" justifyContent={"flex-end"}>
        <Flex flexDir="column" flex={1} mr={2} justifyContent={"space-between"}>
          <Flex
            flexDir={"column"}
            justifyContent={backShown ? "flex-start" : "center"}
            flex={1}
            mt={24}
          >
            {/* Card Front */}
            <Text fontSize={"2xl"} color={"white"}>
              {item.flashcard_front}
            </Text>
            {backShown && (
              <>
                <Divider my={4} />
                <Stack space="3">
                  <Text color="white" italic>
                    Answer
                  </Text>
                  <ScrollView maxHeight={hp(30)} showsVerticalScrollIndicator={false}>
                    <Text color="white" fontSize="lg">
                      {item.flashcard_back}
                    </Text>
                  </ScrollView>
                  <Stack space={3}>
                    <Text color="white" italic>
                      How well did you know this?
                    </Text>
                    <Stack direction="row" space="3">
                      {rating ? (
                        <Button flex={1} colorScheme={ratingButtons[rating].color}>
                          {ratingButtons[rating].value}
                        </Button>
                      ) : (
                        <FlatList
                          data={ratingButtons}
                          keyExtractor={(val) => val.value}
                          renderItem={({ item, index }) => {
                            return (
                              <Button
                                onPress={() => setRating(index)}
                                size="md"
                                colorScheme={item.color}
                                mr={4}
                                px={4}
                              >
                                {item.value}
                              </Button>
                            )
                          }}
                          horizontal
                        />
                      )}
                    </Stack>
                  </Stack>
                </Stack>
              </>
            )}

            {/* Card Back */}
          </Flex>

          <VideoInfo name={item.user.name} description={item.description} />
        </Flex>
        <Box justifyContent={"flex-end"}>
          <Sidebar avatar={item.user.avatar} />
          <Stack direction="column" space="3" mt={3} alignItems={"center"}>
            <IconButton
              onPress={toggleBackShown}
              size={12}
              borderRadius={"full"}
              variant="solid"
              colorScheme={"coolGray"}
              _icon={{
                as: Entypo,
                name: "cycle",
                size: 6,
                // style: { transform: [{ rotateX: "90deg" }] },
              }}
            />
            <Text textAlign={"center"} color="white" fontSize={"md"} bold>
              Flip
            </Text>
          </Stack>
        </Box>
      </Flex>

      <PlaylistBar playlist={item.playlist} />
    </LinearGradient>
  )
})

const $container: ViewStyle = {
  justifyContent: "space-between",
  flex: 1,
}

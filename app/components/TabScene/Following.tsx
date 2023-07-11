import * as React from "react"
import { FlatList, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors } from "app/theme"
import { useStores } from "app/models"
import { hp } from "app/theme/responsive"
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  IconButton,
  ScrollView,
  Stack,
  Text,
  useDisclose,
} from "native-base"
import { Entypo } from "@expo/vector-icons"
import { FollowingSingleItem } from "../FollowingItem"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"

/**
 * Describe your component here
 */
export const Following = observer(function Following() {
  const { followingStore } = useStores()
  React.useEffect(() => {
    followingStore.fetchItems()
  }, [])

  return (
    <FlatList
      data={followingStore.followingItems}
      keyExtractor={(item, index) => `${item.id.toString()}-${index}`}
      renderItem={({ item }) => (
        <View style={{ flex: 1, height: hp(100) }}>
          <FollowingSingleItem item={item} />
        </View>
      )}
      pagingEnabled
      onEndReached={() => followingStore.fetchItems()}
      onEndReachedThreshold={2}
    />
  )
})

const $container: ViewStyle = {
  justifyContent: "space-between",
  flex: 1,
}

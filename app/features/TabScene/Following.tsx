import * as React from "react"
import { FlatList, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { useStores } from "app/models"
import { hp } from "app/theme/responsive"
import { FollowingSingleItem } from "../../components/FollowingItem"
import { useEffect, useState } from "react"

/**
 * Describe your component here
 */
export const Following = observer(function Following() {
  const { followingStore } = useStores()
  const [items, setItems] = useState([])
  const fetchItems = async () => {
    await followingStore.fetchItems()
    setItems(followingStore.followingItems)
  }
  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <FlatList
      data={items}
      keyExtractor={(item, index) => `${item.id.toString()}-${index}`}
      renderItem={({ item }) => (
        <View style={{ flex: 1, height: hp(100) }}>
          <FollowingSingleItem item={item} />
        </View>
      )}
      pagingEnabled
      onEndReached={() => followingStore.fetchItems()}
      onEndReachedThreshold={2}
      showsVerticalScrollIndicator={false}
    />
  )
})

const $container: ViewStyle = {
  justifyContent: "space-between",
  flex: 1,
}

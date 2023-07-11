import * as React from "react"
import { FlatList, View } from "react-native"
import { observer } from "mobx-react-lite"
import { useStores } from "app/models"
import { hp } from "../../theme/responsive"
import { ForYouItem } from "../../components/ForYouItem"
import { useEffect, useState } from "react"

/**
 * Describe your component here
 */
export const ForYou = observer(function ForYou() {
  const { fypStore } = useStores()
  const [items, setItems] = useState([])
  const fetchItems = async () => {
    await fypStore.fetchFyp()
    setItems(fypStore.fypItems)
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
          <ForYouItem item={item} />
        </View>
      )}
      pagingEnabled
      onEndReached={() => fypStore.fetchFyp()}
      onEndReachedThreshold={1}
      showsVerticalScrollIndicator={false}
    />
  )
})

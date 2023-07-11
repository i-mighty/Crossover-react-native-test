import * as React from "react"
import { FlatList, View } from "react-native"
import { observer } from "mobx-react-lite"
import { useStores } from "app/models"
import { hp } from "../../theme/responsive"
import { ForYouItem } from "../ForYouItem"

/**
 * Describe your component here
 */
export const ForYou = observer(function ForYou() {
  const { fypStore } = useStores()
  React.useEffect(() => {
    fypStore.fetchFyp()
  }, [])
  return (
    <FlatList
      data={fypStore.fypItems}
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

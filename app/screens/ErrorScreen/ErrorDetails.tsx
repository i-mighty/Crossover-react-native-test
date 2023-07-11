import React, { ErrorInfo } from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import {} from "../../components"
import { colors, spacing } from "../../theme"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Button, Text } from "native-base"

export interface ErrorDetailsProps {
  error: Error
  errorInfo: ErrorInfo
  onReset(): void
}

export function ErrorDetails(props: ErrorDetailsProps) {
  return (
    <ScrollView contentContainerStyle={$contentContainer}>
      <View style={$topSection}>
        <MaterialCommunityIcons name="ladybug" size={64} color="black" />
        <Text style={$heading} fontSize="lg" bold>
          Something went wrong!
        </Text>
        <Text>
          This is the screen that your users will see in production when an error is thrown
        </Text>
      </View>

      <ScrollView style={$errorSection} contentContainerStyle={$errorSectionContentContainer}>
        <Text style={$errorContent} fontWeight="bold">
          {`${props.error}`.trim()}
        </Text>
        <Text selectable style={$errorBacktrace}>
          {`${props.errorInfo.componentStack}`.trim()}
        </Text>
      </ScrollView>

      <Button style={$resetButton} onPress={props.onReset}>
        Reset APP
      </Button>
    </ScrollView>
  )
}

const $contentContainer: ViewStyle = {
  alignItems: "center",
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.xl,
  flex: 1,
}

const $topSection: ViewStyle = {
  flex: 1,
  alignItems: "center",
}

const $heading: TextStyle = {
  color: colors.error,
  marginBottom: spacing.md,
}

const $errorSection: ViewStyle = {
  flex: 2,
  backgroundColor: colors.separator,
  marginVertical: spacing.md,
  borderRadius: 6,
}

const $errorSectionContentContainer: ViewStyle = {
  padding: spacing.md,
}

const $errorContent: TextStyle = {
  color: colors.error,
}

const $errorBacktrace: TextStyle = {
  marginTop: spacing.md,
  color: colors.textDim,
}

const $resetButton: ViewStyle = {
  backgroundColor: colors.error,
  paddingHorizontal: spacing.xxl,
}

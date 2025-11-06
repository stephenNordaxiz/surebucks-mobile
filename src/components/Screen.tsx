import { ReactNode } from 'react'
import {
  // Platform,
  StatusBar,
  StyleSheet,
  ViewStyle,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { useThemeStore } from '@/stores/themeStore'
import { useRouter } from 'expo-router'
import { Ionicons, AntDesign } from '@expo/vector-icons'

type ScreenProps = {
  children: ReactNode
  style?: ViewStyle
  bgColor?: string
  headerTitle?: string | React.ReactNode
  showHeader?: boolean
  showBackButton?: boolean
  padded?: boolean
  showInfoButton?: boolean
  onInfoPress?: () => void
  scrollable?: boolean
}

const Screen = ({
  children,
  style,
  bgColor,
  headerTitle,
  showHeader = false,
  showBackButton = false,
  showInfoButton = false,
  padded = false,
  onInfoPress,
  scrollable = false,
}: ScreenProps) => {
  const theme = useThemeStore((s) => s.theme)
  const pref = useThemeStore((s) => s.preference)
  const router = useRouter()

  const Wrapper = scrollable ? ScrollView : View

  return (
    <SafeAreaView
      style={[
        styles.container,
        style,
        {
          paddingHorizontal: padded ? 20 : 0,
          backgroundColor: bgColor ?? theme.background,
        },
      ]}
    >
      <StatusBar
        barStyle={pref === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      {/* Custom Header */}
      {showHeader && (
        <View
          style={[
            styles.header,
            { backgroundColor: bgColor ?? theme.background },
          ]}
        >
          {showBackButton && (
            <TouchableOpacity onPress={() => router.back()} style={styles.iconLeft}>
              <AntDesign name="arrowleft" size={20} color={theme.tertiary} />
            </TouchableOpacity>
          )}
          <Text style={[styles.title, { color: theme.tertiary }]}>
            {typeof headerTitle === 'string' ? headerTitle : headerTitle}
          </Text>
          {showInfoButton ? (
            <TouchableOpacity onPress={onInfoPress} style={styles.iconRight}>
              <Ionicons
                name="information-circle-outline"
                size={22}
                color={theme.tertiary}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconRight} />
          )}
        </View>
      )}

      {/* Screen Content */}
      <Wrapper
        style={{ flex: 1 }}
        contentContainerStyle={scrollable ? { flexGrow: 1 } : undefined}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </Wrapper>
    </SafeAreaView>
  )
}

export default Screen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
    zIndex: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  iconLeft: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
    // paddingHorizontal: 16,
  },
  iconRight: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
    // paddingHorizontal: 16,
  },
})

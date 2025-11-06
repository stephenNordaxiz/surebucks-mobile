/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState, ReactNode } from 'react'
import {
  View,
  ScrollView,
  Animated,
  StyleSheet,
  ViewStyle,
  PanResponder,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
} from 'react-native'

interface Props {
  children: ReactNode
  containerStyle?: ViewStyle
  contentContainerStyle?: ViewStyle
  scrollbarColor?: string
  scrollbarWidth?: number
  snapToSections?: boolean
  fadeScrollbar?: boolean
}

const CustomScrollView = ({
  children,
  containerStyle,
  contentContainerStyle,
  scrollbarColor = 'green',
  scrollbarWidth = 3,
  snapToSections = false,
  fadeScrollbar = false,
}: Props) => {
  const scrollViewRef = useRef<ScrollView>(null)
  const scrollY = useRef(new Animated.Value(0)).current
  const [contentHeight, setContentHeight] = useState(1)
  const [containerHeight, setContainerHeight] = useState(1)
  const [sectionHeights, setSectionHeights] = useState<number[]>([])

  const scrollBarOpacity = useRef(new Animated.Value(1)).current

  // Handle fade in/out
  const fadeInScrollbar = () => {
    if (fadeScrollbar) {
      Animated.timing(scrollBarOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start()
    }
  }

  const fadeOutScrollbar = () => {
    if (fadeScrollbar) {
      Animated.timing(scrollBarOpacity, {
        toValue: 0,
        delay: 1000,
        duration: 400,
        useNativeDriver: false,
      }).start()
    }
  }

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        fadeInScrollbar()
        fadeOutScrollbar()
      },
    }
  )

  const scrollBarHeight = containerHeight * (containerHeight / contentHeight)
  const scrollBarMaxTranslate = containerHeight - scrollBarHeight
  const contentMaxScroll = contentHeight - containerHeight

  const scrollBarTranslateY = scrollY.interpolate({
    inputRange: [0, contentMaxScroll],
    outputRange: [0, scrollBarMaxTranslate],
    extrapolate: 'clamp',
  })

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        fadeInScrollbar()
      },
      onPanResponderMove: (_, gestureState) => {
        const scrollPercentage = gestureState.dy / scrollBarMaxTranslate
        const newScrollY = scrollPercentage * contentMaxScroll
        scrollViewRef.current?.scrollTo({ y: newScrollY, animated: false })
      },
      onPanResponderRelease: () => {
        fadeOutScrollbar()
      },
    })
  ).current

  const handleSnap = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!snapToSections || sectionHeights.length === 0) return
    const currentOffset = e.nativeEvent.contentOffset.y

    let closest = 0
    let minDiff = Infinity
    for (let i = 0; i < sectionHeights.length; i++) {
      const diff = Math.abs(currentOffset - sectionHeights[i])
      if (diff < minDiff) {
        minDiff = diff
        closest = sectionHeights[i]
      }
    }
    scrollViewRef.current?.scrollTo({ y: closest, animated: true })
  }

  const registerSection = (index: number) => (e: LayoutChangeEvent) => {
    const { y } = e.nativeEvent.layout
    setSectionHeights(prev => {
      const updated = [...prev]
      updated[index] = y
      return updated
    })
  }

  return (
    <View style={[{ flexDirection: 'row' }, containerStyle]}>
      <ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={(_, h) => setContentHeight(h)}
        onLayout={e => setContainerHeight(e.nativeEvent.layout.height)}
        onScroll={onScroll}
        onMomentumScrollEnd={handleSnap}
        contentContainerStyle={[{ paddingRight: 10 }, contentContainerStyle]}
      >
        {React.Children.map(children, (child, index) =>
          snapToSections ? (
            <View onLayout={registerSection(index)}>{child}</View>
          ) : (
            child
          )
        )}
      </ScrollView>

      {/* Scrollbar track and thumb */}
      <View style={styles.scrollTrack}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.scrollThumb,
            {
              height: scrollBarHeight,
              width: scrollbarWidth,
              backgroundColor: scrollbarColor,
              opacity: fadeScrollbar ? scrollBarOpacity : 1,
              transform: [{ translateY: scrollBarTranslateY }],
            },
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollTrack: {
    width: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scrollThumb: {
    borderRadius: 4,
    position: 'absolute',
    top: 0,
  },
})

export default CustomScrollView

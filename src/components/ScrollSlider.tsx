/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeType } from '@/constants/theme'
import { useThemeStore } from '@/stores/themeStore'
import React, { useEffect, useRef, useState } from 'react'
import {
	View,
	StyleSheet,
	PanResponder,
	Animated,
	LayoutChangeEvent,
	Pressable,
	GestureResponderEvent,
} from 'react-native'

type Props = {
	total: number
	percent?: number // controlled externally
	initialPercent?: number // fallback if no `percent` is passed
	onChange: (amount: number) => void
}

export default function DraggableAmountSlider({
	total,
	percent,
	initialPercent = 0.3,
	onChange,
}: Props) {
	const theme = useThemeStore((s) => s.theme)
	const styles = createStyles(theme)
	const barWidth = useRef(0)
	const [containerReady, setContainerReady] = useState(false)
	const translateX: any = useRef(new Animated.Value(0)).current

	let gestureStartX = 0

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,
			onPanResponderGrant: () => {
				gestureStartX = translateX.__getValue()
			},
			onPanResponderMove: (_, gestureState) => {
				const x = Math.min(Math.max(0, gestureStartX + gestureState.dx), barWidth.current)
				translateX.setValue(x)
				const newPercent = x / barWidth.current
				onChange(Math.round(total * newPercent))
			},
			onPanResponderRelease: () => {},
		}),
	).current

	const handleBarLayout = (event: LayoutChangeEvent) => {
		barWidth.current = event.nativeEvent.layout.width
		setContainerReady(true)
	}

	const handleTrackPress = (event: GestureResponderEvent) => {
		const tapX = event.nativeEvent.locationX
		const clampedX = Math.min(Math.max(0, tapX), barWidth.current)

		Animated.timing(translateX, {
			toValue: clampedX,
			duration: 150,
			useNativeDriver: false,
		}).start()

		const newPercent = clampedX / barWidth.current
		onChange(Math.round(total * newPercent))
	}

	// 🧠 Initialize or respond to `percent` changes
	useEffect(() => {
		if (!containerReady) return

		const p = percent ?? initialPercent
		const clamped = Math.max(0, Math.min(1, p))
		const x = clamped * barWidth.current

		Animated.timing(translateX, {
			toValue: x,
			duration: 150,
			useNativeDriver: false,
		}).start()

		onChange(Math.round(total * clamped))
	}, [percent, containerReady])

	return (
		<View style={styles.container}>
			<Pressable onPress={handleTrackPress}>
				<View style={styles.sliderContainer} onLayout={handleBarLayout}>
					<View style={styles.track} />
					{/* <Animated.View style={[styles.progress, { width: translateX }]} /> */}
					<Animated.View
						style={[
							styles.progress,
							{
								width: translateX.interpolate({
									inputRange: [0, barWidth.current || 1],
									outputRange: [0, barWidth.current || 1],
									extrapolate: 'clamp',
								}),
							},
						]}
					/>
					<Animated.View
						style={[styles.thumb, { transform: [{ translateX }] }]}
						{...panResponder.panHandlers}
					/>
				</View>
			</Pressable>
		</View>
	)
}

function createStyles(theme: ThemeType) {
	return StyleSheet.create({
		container: {
			paddingVertical: 10,
			// paddingRight:20
		},
		sliderContainer: {
			height: 30,
			justifyContent: 'center',
		},
		track: {
			height: 6,
			backgroundColor: '#ddd',
			borderRadius: 4,
			width: '100%',
			position: 'absolute',
			top: 10,
		},
		progress: {
			height: 6,
			backgroundColor: theme.primary,
			borderRadius: 4,
			position: 'absolute',
			left: 0,
			top: 10,
		},
		thumb: {
			position: 'absolute',
			width: 18,
			height: 18,
			borderRadius: 10,
			backgroundColor: theme.primary,
			top: 4,
			left: -10,
			zIndex: 10,
		},
	})
}

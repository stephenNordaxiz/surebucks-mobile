import { LayoutChangeEvent, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Animated } from 'react-native'
import { SIZES } from '../constants'
import HeaderInput from './HeaderInput'
import HeaderFilterButtons from './HeaderFilterButtons'
import  HeaderLogistics  from './HeaderLogistics'
// import { useThemeStore } from '@/stores/themeStore'

const AnimatedListHeader = ({
	scrollAnimation,
	mapShown,
	setMapShown,
	location,
	availableProperties,
}: {
	scrollAnimation: Animated.Value
	mapShown: boolean
	setMapShown: (bool: boolean) => void
	location: string
	availableProperties: number
}) => {
	// const currentTheme = useThemeStore((s) => s.theme)
	const [offsetAnimation] = useState(new Animated.Value(0))
	const [clampedScroll, setClampedScroll] = useState(
		Animated.diffClamp(
			Animated.add(
				scrollAnimation.interpolate({
					inputRange: [0, 1],
					outputRange: [0, 1],
					extrapolateLeft: 'clamp',
				}),
				offsetAnimation,
			),
			0,
			1,
		),
	)

	const navbarTranslate = clampedScroll.interpolate({
		inputRange: [0, SIZES.headerHeight],
		outputRange: [0, -SIZES.headerHeight],
		extrapolateLeft: 'clamp',
	})
	const onLayout = (event: LayoutChangeEvent) => {
		const { height } = event.nativeEvent.layout
		setClampedScroll(
			Animated.diffClamp(
				Animated.add(
					scrollAnimation.interpolate({
						inputRange: [0, 1],
						outputRange: [0, 1],
						extrapolateLeft: 'clamp',
					}),
					offsetAnimation,
				),
				0,
				height,
			),
		)
	}
	return (
		<Animated.View
			onLayout={onLayout}
			style={[
				styles.container,
				{
					// backgroundColor: currentTheme?.background2,
					transform: [{ translateY: navbarTranslate }],
				},
			]}
		>
			<View style={styles.wrapper}>
				<HeaderInput location={location} />
				<HeaderFilterButtons />
			</View>
			<HeaderLogistics
				mapShown={mapShown}
				setMapShown={setMapShown}
				availableProperties={availableProperties}
			/>
		</Animated.View>
	)
}

export default AnimatedListHeader

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		right: 0,
		left: 0,
		zIndex: 1000,
		height: SIZES.headerHeight,
	},
	wrapper: {
		marginHorizontal: SIZES.listMargin,
	},
})

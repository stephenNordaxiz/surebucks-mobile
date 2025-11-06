/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet, View } from 'react-native'

import images from '@/constants/images'

const SpinnerLoader = ({
	img,
	width,
	height,
	type,
}: {
	img?: any
	width?: number
	height?: number
	type?: boolean
}) => {
	const spinAnim = useRef(new Animated.Value(0)).current

	useEffect(() => {
		const spin = () => {
			spinAnim.setValue(0)
			Animated.loop(
				Animated.timing(spinAnim, {
					toValue: 1,
					duration: 1800, // duration of one rotation
					easing: Easing.linear,
					useNativeDriver: true,
				}),
			).start()
		}

		spin()
	}, [spinAnim])

	const spinInterpolation = spinAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	})

	return (
		<View style={styles.container}>
			<Animated.Image
				source={type ? images?.cSpinner : images?.spinner || img}
				style={{
					width: width || 40,
					height: height || 40,
					transform: [{ rotate: spinInterpolation }],
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1, // or remove if you want it inline
	},
})

export default SpinnerLoader

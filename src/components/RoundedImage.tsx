import { Image, View, StyleSheet } from 'react-native'
import React from 'react'

type RoundedImageProps = {
	img: string | number // Accepts URI string or require()
	width?: number
	height?: number
}

const RoundedImage = ({ img, width = 40, height = 40 }: RoundedImageProps) => {
	const isUri = typeof img === 'string'

	return (
		<View style={[styles.container, { width, height, borderRadius: width / 2 || 20 }]}>
			<Image
				source={isUri ? { uri: img } : img}
				style={{
					width: '100%',
					height: '100%',
					borderRadius: width / 2 || 20,
				}}
				resizeMode="cover"
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		overflow: 'hidden',
		backgroundColor: '#ccc',
	},
})

export default RoundedImage

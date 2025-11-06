import React, { useRef, useState, useEffect } from 'react'
import { View, FlatList, Image, StyleSheet, ViewToken } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { SIZES } from '@/constants'

type Props = {
	images: string[]
}

const ImageCarouselAds = ({ images: initialImages }: Props) => {
	const [images, setImages] = useState(initialImages)
	const [activeIndex, setActiveIndex] = useState(0)
	const [isHidden, setIsHidden] = useState(false) // hide flag
	const flatListRef = useRef<FlatList>(null)
	const indexRef = useRef(0)

	// Restore original state when screen refocuses
	useFocusEffect(
		React.useCallback(() => {
			setImages(initialImages)
			setIsHidden(false)
			setActiveIndex(0)
			indexRef.current = 0
		}, [initialImages]),
	)

	const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
		if (viewableItems.length > 0) {
			const newIndex = viewableItems[0].index ?? 0
			setActiveIndex(newIndex)
			indexRef.current = newIndex
		}
	})

	const viewabilityConfig = useRef({
		itemVisiblePercentThreshold: 50,
	})

	useEffect(() => {
		if (images?.length <= 1) return

		const interval = setInterval(() => {
			const nextIndex = (indexRef.current + 1) % images?.length
			flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true })
			setActiveIndex(nextIndex)
			indexRef.current = nextIndex
		}, 2000)

		return () => clearInterval(interval)
	}, [images?.length])

	// const handleClose = () => {
	// 	if (images.length === 0) return

	// 	const updatedImages = images.filter((_, index) => index !== activeIndex)

	// 	if (updatedImages.length === 0) {
	// 		setIsHidden(true)
	// 		return
	// 	}

	// 	const newIndex = Math.max(0, activeIndex - 1)
	// 	setImages(updatedImages)
	// 	setActiveIndex(newIndex)
	// 	indexRef.current = newIndex
	// }

	if (isHidden || images.length === 0) return null

	return (
		<View style={{ gap: 14, marginTop: 20 }}>
			<FlatList
				ref={flatListRef}
				data={images}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }) => <Image source={item} style={styles.image} />}
				onViewableItemsChanged={onViewableItemsChanged.current}
				viewabilityConfig={viewabilityConfig.current}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	image: {
		width: SIZES.width - 32,
		height: 100,
		resizeMode: 'none',
	},
})

export default ImageCarouselAds

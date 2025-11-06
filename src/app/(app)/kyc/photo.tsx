import { Image, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'

import { nav } from '@/utils/navigationService'
import { BasicInfo, KYCWrapper } from '@/components'
import images from '@/constants/images'
import { SIZES, ThemeType } from '@/constants/theme'
import { useThemeStore } from '@/stores/themeStore'

const PhotoCaptureScreen = () => {
	const theme = useThemeStore((s) => s.theme)
	const styles = createStyles(theme)
	const [loading, setLoading] = useState(false)

	const handlePress = () => {
		try {
			setLoading(true)
			nav('/kyc/capture')
			// setShowCamera(!showCamera)
		} catch (error: unknown) {
			console.log('error', error)
		} finally {
			setLoading(false)
		}
	}
	return (
		<KYCWrapper
			btnText="Take Selfie"
			loading={loading}
			onPress={handlePress}
			step={3}
			title="Face Recognition"
		>
			<View style={styles.container}>
				<View style={styles.content}>
					<View style={styles.outerCircle}>
						<View style={styles.innerCircle}>
							<Image source={images.yusuf} style={styles.image} resizeMode="cover" />
						</View>
					</View>
					<BasicInfo
						icon
						text="A clear and well lit photograph of your face.
You can refer to the example above."
					/>
				</View>
			</View>
		</KYCWrapper>
	)
}

export default PhotoCaptureScreen

function createStyles(theme: ThemeType) {
	return StyleSheet.create({
		container: {},
		content: {
			marginTop: 40,
			gap: 20,
		},
		outerCircle: {
			width: SIZES.width - 40,
			height: SIZES.width - 40,
			borderRadius: 300, // half of width/height
			backgroundColor: '#transparent', // outer circle color
			justifyContent: 'center',
			alignItems: 'center',
			borderWidth: 2,
			borderColor: theme.primary,
		},
		innerCircle: {
			width: '85%', // 100 - (10 * 2)
			height: '85%',
			borderRadius: 200,
			overflow: 'hidden',
		},
		image: {
			width: '100%',
			height: '100%',
		},
	})
}

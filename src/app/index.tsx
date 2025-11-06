import React, { useEffect } from 'react'
import { Image, StatusBar, StyleSheet, View } from 'react-native'
import { useRouter } from 'expo-router'
import * as Font from 'expo-font'

import { useThemeStore } from '@/stores/themeStore'
import { useOnboardingStore } from '@/stores/onboardingStore'
import Fonts from '@/constants/fonts'
import { Spinner } from '@/components'
import { COLORS, SIZES } from '@/constants'
import images from '@/constants/images'
import { nav } from '@/utils/navigationService'

export default function RedirectPage() {
	const router = useRouter()
	const completed = useOnboardingStore((s) => s.completed)
	const loadTheme = useThemeStore((s) => s.loadTheme)

	console.log('completed', completed)

	useEffect(() => {
		const init = async () => {
			console.log('Initializing...')
			await loadTheme()
			console.log('Theme loaded')

			// ✅ Load fonts from your Fonts object
			await Font.loadAsync(Fonts)

			console.log('Fonts loaded')
			setTimeout(() => {
				router.replace('/(onboarding)')
				if (!completed) {
					console.log('Going to onboarding')
					router.replace('/(onboarding)')
				} else {
					console.log('Going to register')
					nav('/login')
				}
			}, 2000)
		}

		init()
	}, [])

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={COLORS.primary} barStyle={'light-content'} />
			<Image source={images.logo} />
			<View style={styles.spinner}>
				<Spinner width={50} height={50} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.primary,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
	},
	spinner: {
		position: 'absolute',
		bottom: 60,
		left: (SIZES.width - 20) / 2,
	},
})

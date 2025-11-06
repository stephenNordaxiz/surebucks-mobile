import { Image, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'

import {
	CModal,
	CustomInput,
	Screen,
	SubmitBtn,
	Title,
} from '@/components'
import { useAuthStore } from '@/stores/authStore'
import { useThemeStore } from '@/stores/themeStore'
import { ThemeType } from '@/constants/theme'
import images from '@/constants/images'
import { nav } from '@/utils/navigationService'
import { hexToRgba } from '@/utils/checker'

const BVNScreen = () => {
	const theme = useThemeStore((s) => s.theme)
	const styles = createStyles(theme)
	const { purpose } = useLocalSearchParams()
	const { updateKyc, kyc } = useAuthStore()
	const [showBvnModal, setShowBvnModal] = useState(false)
	const [loading, setLoading] = useState(false)
	const [bvn, setBvn] = useState('')

	const handlePress = () => {
		setLoading(false)
		setShowBvnModal(true)
	}

	const handleSubmit = () => {
		// console.log('verifybvn')
		updateKyc({ ...kyc, bvn: true })
		nav('/loan/eligible', { purpose })
		setShowBvnModal(false)
	}

	return (
		<Screen showHeader showBackButton padded showInfoButton>
			<View style={styles.container}>
				<View style={styles.content}>
					<View>
						<Title
							text={'BVN Verification'}
							textSize={18}
							textWeight={'600'}
							textstyle={{ marginBottom: 20 }}
						/>
						<CustomInput
							labelColor="black"
							label="BVN"
							value={bvn}
							onChangeText={setBvn}
							type="bvn"
							placeholder="please fill in your BVN"
						/>
					</View>
				</View>
				<SubmitBtn
					disabled={
						purpose.length === 0
							? true
							: loading
								? true
								: kyc?.bvn
									? false
									: bvn?.length < 11
										? true
										: false
					}
					loading={loading}
					onPress={handlePress}
					title={!kyc?.bvn ? 'Validate BVN' : 'Continue'}
					style={styles.button}
				/>
			</View>
			<CModal
				closeModal={() => setShowBvnModal(false)}
				modalVisible={showBvnModal}
				noBtn
				hanger={false}
			>
				<View>
					<View style={{ gap: 10, marginBottom: 10 }}>
						<View style={styles.outerCircle}>
							<Image source={images.successcheck} style={styles.check} />
							<View style={styles.innerCircle}>
								<Image source={images.yusuf} style={styles.image} resizeMode="cover" />
							</View>
						</View>

						<Title text="John Doe" center textSize={20} textWeight={'600'} />
						<Title
							text="BVN information verified. Proceed to next step"
							center
							textColor={hexToRgba('#000', 0.6)}
							textWeight={'400'}
						/>
					</View>

					<SubmitBtn title={'Confirm'} onPress={handleSubmit} style={styles.button} />
				</View>
			</CModal>
		</Screen>
	)
}

export default BVNScreen

function createStyles(theme: ThemeType) {
	return StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'space-between',
		},
		content: {
			marginTop: 10,
			gap: 20,
		},
		outerCircle: {
			width: 80,
			height: 80,
			borderRadius: 300, // half of width/height
			backgroundColor: 'transparent', // outer circle color
			justifyContent: 'center',
			alignItems: 'center',
			borderWidth: 1,
			borderColor: theme.primary,
			alignSelf: 'center',
			position: 'relative',
		},
		check: {
			width: 20,
			height: 20,
			resizeMode: 'contain',
			position: 'absolute',
			right: 0,
			bottom: 0,
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
		button: {
			marginBottom: 20,
		},
	})
}

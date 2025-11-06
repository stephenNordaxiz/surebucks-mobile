import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'

import { OTPInput, Screen, SubmitBtn, Title } from '@/components'

import { hexToRgba } from '@/utils/checker'
import { useThemeStore } from '@/stores/themeStore'
import { goBack, nav } from '@/utils/navigationService'
import { SIZES } from '@/constants'

const ChangePinScreen = () => {
	const theme = useThemeStore((s) => s.theme)
	const [pin, setPin] = useState([])
	const [oldPin, setOldPin] = useState([])
	const [confirmPin, setConfirmPin] = useState([])

	const handlePress = () => {
		nav('/repay/ussddetails')
	}

	return (
		<Screen scrollable padded headerTitle="" showHeader showInfoButton showBackButton>
			<View style={styles.container}>
				<View style={styles.content}>
					<Title text={'Set a new PIN'} textSize={18} textWeight={'600'} />

					<Title
						textSize={14}
						textstyle={{ lineHeight: 20 }}
						text={'Change your PIN by inputting old PIN and setting a new PIN'}
					/>
					<View style={styles.copy}>
						<View style={{ gap: 8 }}>
							<Title text={'Enter Current PIN'} textSize={13} />
							<OTPInput
								label="Enter Current PIN"
								box={4}
								width={(SIZES.width - 40 - 42) / 4}
								handleOTPSet={setOldPin}
								otpSet={oldPin}
							/>
						</View>
						<View style={{ gap: 8 }}>
							<Title text={'Enter New PIN'} textSize={13} />
							<OTPInput
								label="Enter Current PIN"
								box={4}
								width={(SIZES.width - 40 - 42) / 4}
								handleOTPSet={setPin}
								otpSet={pin}
							/>
						</View>
						<View style={{ gap: 8 }}>
							<Title text={'Confirm New PIN'} textSize={13} />
							<OTPInput
								label="Enter Current PIN"
								box={4}
								width={(SIZES.width - 40 - 42) / 4}
								handleOTPSet={setConfirmPin}
								otpSet={confirmPin}
							/>
						</View>
					</View>
				</View>
				<View style={styles.button}>
					<SubmitBtn onPress={handlePress} title={'Confirm'} disabled={!pin} />
					<SubmitBtn
						bgColor="transparent"
						textColor={hexToRgba(theme.tertiary, 0.6)}
						onPress={() => goBack()}
						title={'Cancel'}
					/>
				</View>
			</View>
		</Screen>
	)
}

export default ChangePinScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	content: {
		marginTop: 10,
		gap: 20,
	},
	copy: {
		gap: 20,
		marginTop:10
	},
	button: {
		marginBottom: 30,
	},
})

import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'

import { CustomInput, Screen, SubmitBtn, Title } from '@/components'

import { hexToRgba } from '@/utils/checker'
import { useThemeStore } from '@/stores/themeStore'
import { goBack, nav } from '@/utils/navigationService'

const ChangePasswordScreen = () => {
	const theme = useThemeStore((s) => s.theme)
	const [password, setPassword] = useState('')
	const [oldPassword, setOldPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const handlePress = () => {
		nav('/repay/ussddetails')
	}

	return (
		<Screen scrollable padded headerTitle="" showHeader showInfoButton showBackButton>
			<View style={styles.container}>
				<View style={styles.content}>
					<Title text={'Set a new password'} textSize={18} textWeight={'600'} />

					<Title
						textSize={14}
						textstyle={{ lineHeight: 20 }}
						text={'Change your password by inputting old password and setting a new password'}
					/>
					<View style={styles.copy}>
						<CustomInput
							placeholder="Enter Old password"
							label="Old Password"
							onChangeText={setOldPassword}
							labelColor="black"
							type="password2"
							value={oldPassword}
						/>
						<CustomInput
							placeholder="Enter New password"
							label="New Password"
							onChangeText={setPassword}
							labelColor="black"
							type="password2"
							value={password}
						/>
						<CustomInput
							placeholder="Re Enter password"
							label="Re-enter Password"
							onChangeText={setConfirmPassword}
							labelColor="black"
							type="password2"
							value={confirmPassword}
						/>
					</View>
				</View>
				<View style={styles.button}>
					<SubmitBtn onPress={handlePress} title={'Confirm'} disabled={!password} />
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

export default ChangePasswordScreen

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
		gap: 1,
	},
	button: {
		marginBottom: 30,
	},
})

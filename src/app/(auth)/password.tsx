import { Alert, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { CustomInput, Screen, SubmitBtn, Title } from '@/components'
import { useLocalSearchParams } from 'expo-router'
import { nav } from '@/utils/navigationService'
import { useUniversalModal } from '@/hooks/useUniversalModal'

const PasswordScreen = () => {
	const { from } = useLocalSearchParams()
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const { showSuccess } = useUniversalModal()
	const handleSubmit = () => {
		if (from === 'verify-to-new') {
			nav('/accountcreated')
		} else {
			showSuccess("You're all set!", 'You can now log in with your new passord', () =>
				nav('/login'),
			)
		}
		console.log('submit')
	}
	return (
		<Screen
			padded
			showHeader
			showBackButton
			showInfoButton
			onInfoPress={() =>
				Alert.alert(
					'Info',
					`This is a ${from === 'verify-to-new' ? 'Create a 6-digit password step.' : 'Reset Password step.'}`,
				)
			}
		>
			<View style={styles.container}>
				<View style={{ gap: 8 }}>
					<Title
						text={from === 'verify-to-new' ? 'Create a 6-digit password' : 'Reset Password'}
						textWeight={'600'}
						textSize={18}
					/>
					<Title
						textstyle={{ lineHeight: 20 }}
						text={
							from === 'verify-to-new'
								? 'Let’s secure your account with a unique password'
								: 'Set new password that different from previous one'
						}
						textWeight={'400'}
					/>
					<View style={{ marginTop: 16 }}>
						<CustomInput
							label="New Password"
							value={password}
							placeholder="Enter new password"
							onChangeText={setPassword}
							type="password2"
						/>
						<CustomInput
							label="Confirm Password"
							value={confirmPassword}
							placeholder="Re-enter the new password"
							onChangeText={setConfirmPassword}
							type="password2"
						/>
					</View>
				</View>
				<SubmitBtn onPress={handleSubmit} title={'Continue'} style={styles.button} />
			</View>
		</Screen>
	)
}

export default PasswordScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 16,
		justifyContent: 'space-between',
	},
	button: {
		marginBottom: 20,
	},
})

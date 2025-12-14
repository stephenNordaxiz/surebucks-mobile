import { Alert, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { CustomInput, Screen, SubmitBtn, Title } from '@/components'
import { useLocalSearchParams } from 'expo-router'
import { nav } from '@/utils/navigationService'
import { useUniversalModal } from '@/hooks/useUniversalModal'
import { Modal, ScrollView, Text, TouchableOpacity } from 'react-native'
import { AuthApi } from '@/api/auth.api'
import { useAuthStore } from '@/stores/authStore'

const PasswordScreen = () => {
	const { from, phone, otp } = useLocalSearchParams()
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [showTerms, setShowTerms] = useState(false)
	const { setUser } = useAuthStore()

	const { showSuccess } = useUniversalModal()
	console.log({ from, phone, otp })
	const isCreateFlow = from === 'verify-to-new'

	const handleContinue = () => {
		if (!password || !confirmPassword) {
			Alert.alert('Error', 'All fields are required')
			return
		}

		if (password !== confirmPassword) {
			Alert.alert('Error', 'Passwords do not match')
			return
		}

		if (isCreateFlow && (!firstName || !lastName || !email)) {
			Alert.alert('Error', 'Please complete all fields')
			return
		}

		if (isCreateFlow) {
		setShowTerms(true)
		} else {
			handleSubmit()
		}
	}

	const handleSubmit = async () => {
		try {
			setLoading(true)
			setShowTerms(false)

			if (isCreateFlow) {
				const res =await AuthApi.completeRegistration(
					phone as string,
					otp as string,
					`${firstName.trim()} ${lastName.trim()}`,
					email.trim().toLowerCase(),
					password,
				)
				setUser(res.user)
				setLoading(false)
				nav('/accountcreated')
				return
			}

			// Reset password success flow
			await AuthApi.resetPassword(phone as string, otp as string, password)
			setLoading(false)

			showSuccess("You're all set!", 'You can now log in with your new password', () =>
				nav('/login'),
			)
		} catch (error: any) {
			// console.error('Complete registration error:', error)

			setLoading(false)
			setShowTerms(false)

			Alert.alert(
				'Error',
				error?.response?.data?.message ||
					error?.response?.data?.error ||
					'Failed to complete registration. Please try again.',
			)
		}
	}

	interface TermsModalProps {
		visible: boolean
		onAgree: () => void
		onClose?: () => void
	}

	const TermsModal = ({ visible, onAgree }: TermsModalProps) => {
		return (
			<Modal transparent animationType="slide" visible={visible}>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContainer}>
						<Text style={styles.modalTitle}>Terms and condition</Text>
						<Text style={styles.modalSubtitle}>Last updated on February 2025</Text>

						<View style={styles.divider} />

						<ScrollView style={styles.content}>
							<Text style={styles.sectionTitle}>Onboarding</Text>
							<Text style={styles.text}>
								Applicants must be 18 years or older with a valid BVN, active bank account, and
								verifiable source of income. Previous loan history and credit score may affect
								eligibility status.
							</Text>

							{/* Repeat or map your terms here */}
						</ScrollView>

						<TouchableOpacity style={styles.agreeBtn} onPress={onAgree}>
							<Text style={styles.agreeText}>Agree</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		)
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
					<View style={styles.form}>
						{isCreateFlow && (
							<>
								<CustomInput
									label="First Name"
									value={firstName}
									placeholder="Enter first name"
									onChangeText={setFirstName}
									type="name"
								/>
								<CustomInput
									label="Last Name"
									value={lastName}
									placeholder="Enter last name"
									onChangeText={setLastName}
									type="name"
								/>
								<CustomInput
									label="Email Address"
									value={email}
									placeholder="Enter email address"
									onChangeText={setEmail}
									type="email"
									keyboardTpe="email-address"
								/>
							</>
						)}

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
							placeholder="Re-enter new password"
							onChangeText={setConfirmPassword}
							type="password2"
						/>
					</View>
				</View>
				<SubmitBtn
					onPress={handleContinue}
					title={'Continue'}
					style={styles.button}
					loading={loading}
				/>
			</View>
			<TermsModal visible={showTerms} onAgree={handleSubmit} onClose={() => setShowTerms(false)} />
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
	form: {
		marginTop: 10,
		gap: 10,
	},

	button: {
		marginBottom: 20,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.4)',
		justifyContent: 'center',
		alignItems: 'center',
	},

	modalContainer: {
		width: '90%',
		maxHeight: '80%',
		backgroundColor: '#fff',
		borderRadius: 16,
		padding: 16,
	},

	modalTitle: {
		fontSize: 20,
		fontWeight: '600',
		color: '#1E7F3E',
	},

	modalSubtitle: {
		fontSize: 12,
		color: '#777',
		marginTop: 4,
	},

	divider: {
		height: 1,
		backgroundColor: '#E5E5E5',
		marginVertical: 12,
	},

	content: {
		flexGrow: 0,
	},

	sectionTitle: {
		fontWeight: '600',
		marginBottom: 8,
	},

	text: {
		fontSize: 13,
		lineHeight: 18,
		color: '#444',
		marginBottom: 12,
	},

	agreeBtn: {
		backgroundColor: '#1E7F3E',
		paddingVertical: 14,
		borderRadius: 24,
		alignItems: 'center',
		marginTop: 12,
	},

	agreeText: {
		color: '#fff',
		fontWeight: '600',
		fontSize: 16,
	},
})

import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { OTPInput, Screen, SubmitBtn, Title } from '@/components'
import { useAuthStore } from '@/stores/authStore'
import { formatPhoneNumber } from '@/utils/checker'
import { useLocalSearchParams } from 'expo-router'
import { COLORS } from '@/constants'
import { nav } from '@/utils/navigationService'

const VerifyNumberScreen = () => {
	const phoneDetails = useAuthStore((s) => s.phone)
	const [otp, setOtp] = useState([])
	const [secondsLeft, setSecondsLeft] = useState(120)
	const { from, phone } = useLocalSearchParams()

	useEffect(() => {
		if (secondsLeft === 0) return
		const interval = setInterval(() => {
			setSecondsLeft((prev) => prev - 1)
		}, 1000)
		return () => clearInterval(interval)
	}, [secondsLeft])

	const formatTime = () => {
		const minutes = Math.floor(secondsLeft / 60)
		const seconds = secondsLeft % 60
		const myTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
		return myTime
	}

	const handleSubmit = () => {
		nav('/password', { from: from === 'register' ? 'verify-to-new' : 'verify-to-reset' })
	}
	const handleResend = () => {
		console.log('resend')
	}
	return (
		<Screen
			padded
			showHeader
			showBackButton
			showInfoButton
			onInfoPress={() => Alert.alert('Info', 'This is a verification step.')}
		>
			<View style={styles.container}>
				<View style={{ gap: 8 }}>
					<Title text={'Verify your phone number'} textWeight={'600'} textSize={18} />
					<Title
						textstyle={{ lineHeight: 20 }}
						text={'Kindly input the security code sent to your number'}
						textWeight={'400'}
					/>
					<Title
						textstyle={{ marginTop: -3 }}
						text={
							from === 'register'
								? formatPhoneNumber(phoneDetails?.fullPhoneNumber)
								: formatPhoneNumber(phone)
						}
						textWeight={'500'}
					/>
					<View style={{ marginTop: 16 }}>
						<OTPInput otpSet={otp} handleOTPSet={setOtp} box={6} />
					</View>
					<Pressable disabled={secondsLeft > 0 ? true : false} onPress={handleResend}>
						<Text style={styles.noOtp}>
							{"Didn't receive a code? "}
							<Text style={styles.resend}>{secondsLeft > 0 ? formatTime() + 's' : 'Resend'}</Text>
						</Text>
					</Pressable>
				</View>
				<SubmitBtn onPress={handleSubmit} title={'Continue'} style={styles.button} />
			</View>
		</Screen>
	)
}

export default VerifyNumberScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 16,
		justifyContent: 'space-between',
	},
	button: {
		marginBottom: 20,
	},
	noOtp: {
		marginTop: 2,
	},
	resend: {
		fontSize: 14,
		color: COLORS.primary,
	},
})

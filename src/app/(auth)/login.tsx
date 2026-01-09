import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AuthWrapper, CustomInput, Screen } from '@/components'
import { useAuthStore } from '@/stores/authStore'
import { dialCodeType } from '@/types/dialCode'
import { nav } from '@/utils/navigationService'
import { AuthApi } from '@/api/auth.api'
import { useModalStore } from '@/stores/modalStore'


const LoginScreen = () => {
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState({ phone: '', password: '' })
	const phoneDetails = useAuthStore((s) => s.phone)
	const [ loading, setLoading ] = useState(false)
	// const setUser = useAuthStore((s) => s.setUser)
	const { setUser, setToken } = useAuthStore()
	const showModal = useModalStore((s) => s.showModal)
	

	const [dialCode, setDialCode] = useState<dialCodeType>({
		code: 'NG',
		currency: 'Nigerian Naira',
		currency_code: 'NGN',
		currency_symbol: '₦',
		dial_code: '+234',
		flag: '🇳🇬',
		local_name: 'Nigeria',
		name: 'Nigeria',
	})

	const handleDialCodeChange = (country: dialCodeType) => {
		setDialCode(country)
		// console.log('Selected Country:', country)
	}
	// type Phone = {
	// 	firstName?: string
	// 	dialCode: string
	// 	phoneNumber: string
	// 	fullPhoneNumber: string
	// }
	// const { showError } = useUniversalModal()
	const handleSubmit = async () => {
		console.log('Logging in with:', { phone, password, dialCode })
		try {
			if (!phone) return setError({ ...error, phone: 'Phone Number is required' })
			if (phone.length < 10) return setError({ ...error, phone: 'Invalid Phone Number' })
			if (!password) return setError({ ...error, password: 'Password is required' })
			setLoading(true)
			const fullPhoneNumber = `${dialCode.dial_code}${phone}`
			const res = await AuthApi.login(fullPhoneNumber, password)
			setUser(res.user)
			setToken(res.token)
			setPhone({
				dialCode: dialCode.dial_code,
				phoneNumber: phone,
				fullPhoneNumber: fullPhoneNumber,
			})
			nav('/(app)/tabs/home')
		} catch (error: any) {
			showModal({
				title: 'Login Error',
				description: error.response?.data?.error || 'An unexpected error occurred. Please try again.',
				type: 'error',
				confirmText: 'OK',
			})
		} finally {
			setLoading(false)
	
		}
	}
	
	useEffect(() => {
		if (error?.password || error?.phone)
			setTimeout(() => {
				setError({ phone: '', password: '' })
			}, 4000)
	}, [error])

	return (
		<Screen style={styles.container}>
			<AuthWrapper onPress={handleSubmit} type="login" loading={loading}>
				<View>
					{!phoneDetails && (
						<CustomInput
							label={''}
							value={phone}
							onChangeText={setPhone}
							type={'phone'}
							placeholder={'Enter phone number'}
							onDialCodeChange={handleDialCodeChange}
						/>
					)}

					<CustomInput
						label={''}
						// err={error?.password}
						value={password}
						onChangeText={setPassword}
						type={'password2'}
						placeholder={'Enter valid password'}
					/>
				</View>
			</AuthWrapper>
		</Screen>
	)
}

export default LoginScreen

const styles = StyleSheet.create({
	container: {},
})

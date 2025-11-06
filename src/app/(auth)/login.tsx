import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AuthWrapper, CustomInput, Screen } from '@/components'
import { useAuthStore } from '@/stores/authStore'
import { dialCodeType } from '@/types/dialCode'
import { nav } from '@/utils/navigationService'

const LoginScreen = () => {
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState({ phone: '', password: '' })
	const phoneDetails = useAuthStore((s) => s.phone)
	const setUser = useAuthStore((s) => s.setUser)

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
		console.log('Selected Country:', country)
	}
	// type Phone = {
	// 	firstName?: string
	// 	dialCode: string
	// 	phoneNumber: string
	// 	fullPhoneNumber: string
	// }
	// const { showError } = useUniversalModal()
	const handleSubmit = () => {
		try {
			if (!phone) return setError({ ...error, phone: 'Phone Number is required' })
			if (phone.length < 10) return setError({ ...error, phone: 'Invalid Phone Number' })
			if (!password) return setError({ ...error, password: 'Password is required' })
			if (password.length < 10)
				return setError({ ...error, phone: 'Password must be more than 6 words' })

			setPhone({
				dialCode: dialCode.dial_code,
				phoneNumber: phone,
				id: 'qwerty',
				firstName: 'Yusuf',
			})
			setUser({ name: 'John Doe', email: 'JohnDoe@gmail.com', id: 'qwerty' })
			nav('/(app)/(home)')
		} catch (error: unknown) {
			console.log('err', error)
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
			<AuthWrapper onPress={handleSubmit} type="login">
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

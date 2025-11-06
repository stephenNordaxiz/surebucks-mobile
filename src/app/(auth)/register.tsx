import { Pressable, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { AuthWrapper, CustomInput, Screen, SimpleModal, Title } from '@/components'
import { formatPhoneNumber, normalizePhoneNumber } from '@/utils/checker'
import { useUniversalModal } from '@/hooks/useUniversalModal'
import { useAuthStore } from '@/stores/authStore'
import { nav } from '@/utils/navigationService'
import { dialCodeType } from '@/types/dialCode'
// import { useThemeStore } from '@/stores/themeStore'

const RegisterScreen = () => {
	const [phone, setPhone] = useState('')
	// const theme = useThemeStore((s) => s.theme)
	const phoneDetails = useAuthStore((s) => s.phone)
	const setPhoneNumber = useAuthStore((s) => s.setPhone)
	const [showModal, setShowModal] = useState<boolean>(false)
	const [dialCode, setDialCode] = useState({
		code: 'NG',
		currency: 'Nigerian Naira',
		currency_code: 'NGN',
		currency_symbol: '₦',
		dial_code: '+234',
		flag: '🇳🇬',
		local_name: 'Nigeria',
		name: 'Nigeria',
	})

	const { showError } = useUniversalModal()

	const handleSubmit = () => {
		if (phone.length === 0) {
			showError('Error', 'Phone number required')
			return
		}

		if (dialCode?.dial_code !== '+234') {
			showError('Error', 'Please enter a valid Nigerian number')
			return
		}
		const fullPhone = normalizePhoneNumber(phone, dialCode?.dial_code)
		setPhoneNumber({
			dialCode: dialCode?.dial_code,
			phoneNumber: phone,
			fullPhoneNumber: fullPhone,
		})
		console.log(fullPhone)
		setShowModal(!showModal)
	}
	const handleDialCodeChange = (country: dialCodeType) => {
		setDialCode(country)
		console.log('Selected Country:', country)
	}

	const handleYes = () => {
		setShowModal(false)
		nav('/verify', { from: 'register' })
	}

	const ConfirmationBtn = ({ text, onPress }: { text: string; onPress: () => void }) => {
		return (
			<Pressable
				onPress={onPress}
				style={{
					borderTopWidth: 1,
					borderTopColor: '#ccc',
					height: 44,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Title textSize={16} text={text} textColor="#007AFF" />
			</Pressable>
		)
	}
	return (
		<Screen style={styles.container}>
			<AuthWrapper onPress={handleSubmit} type="register">
				<View>
					<CustomInput
						label={''}
						value={phone}
						onChangeText={setPhone}
						type={'phone'}
						placeholder={'Enter phone number'}
						onDialCodeChange={handleDialCodeChange}
					/>
				</View>
			</AuthWrapper>
			<SimpleModal visible={showModal}>
				<View style={{ gap: 20 }}>
					<View style={{ paddingHorizontal: 20, alignItems: 'center', gap: 20 }}>
						<Title textSize={14} text={'Number Confirmation'} />
						<Title
							textSize={16}
							textWeight={'600'}
							text={formatPhoneNumber(phoneDetails?.fullPhoneNumber)}
						/>
						<Title center textSize={14} text={'Is your phone number above correct?'} />
					</View>
					<View style={{}}>
						<ConfirmationBtn text="Yes" onPress={handleYes} />
						<ConfirmationBtn text="No" onPress={() => setShowModal(false)} />
					</View>
				</View>
			</SimpleModal>
		</Screen>
	)
}

export default RegisterScreen

const styles = StyleSheet.create({
	container: {},
})

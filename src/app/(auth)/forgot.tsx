import { Alert, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { CustomInput, Screen, SubmitBtn, Title } from '@/components'
import { nav } from '@/utils/navigationService'
import { useUniversalModal } from '@/hooks/useUniversalModal'
import { normalizePhoneNumber } from '@/utils/checker'
import { dialCodeType } from '@/types/dialCode'

const ForgotPassScreen = () => {
	const [phone, setPhone] = useState('')
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

		console.log(fullPhone)
		nav('/verify', { from: 'forgot', phone: fullPhone })
	}
	const handleDialCodeChange = (country: dialCodeType) => {
		setDialCode(country)
		console.log('Selected Country:', country)
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
					<Title text={'Forgotten Password'} textWeight={'600'} textSize={18} />
					<Title text={'Complete the information below to reset your'} textWeight={'400'} />
					<Title textstyle={{ marginTop: -1 }} text={'password'} textWeight={'400'} />
					<View style={{ marginTop: 10 }}>
						<CustomInput
							label={'Enter  a phone number'}
							value={phone}
							onChangeText={setPhone}
							type={'phone'}
							placeholder={'Enter phone number'}
							onDialCodeChange={handleDialCodeChange}
						/>
					</View>
				</View>
				<SubmitBtn onPress={handleSubmit} title={'Continue'} style={styles.button} />
			</View>
		</Screen>
	)
}

export default ForgotPassScreen

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

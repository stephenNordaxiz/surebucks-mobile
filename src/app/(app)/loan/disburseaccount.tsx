import { Image, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { CustomInput, Row, Screen, SubmitBtn, Title } from '@/components'
import { useThemeStore } from '@/stores/themeStore'
import images from '@/constants/images'
import { useLoanStore } from '@/stores/loanStore'
import { goBack } from '@/utils/navigationService'

const DisburseAccountScreen = () => {
	const theme = useThemeStore((s) => s.theme)
	const { setAccount } = useLoanStore()
	const [bank, setBank] = useState('')
	const [accountNumber, setAccountNumber] = useState('')

	const handleSubmit = () => {
		setAccount({ bank, firstName: 'John Doe', accountNumber })
		goBack()
	}
	return (
		<Screen showHeader showBackButton padded showInfoButton>
			<View style={styles.container}>
				<View style={styles.content}>
					<Title text={'Manage Bank Account'} textSize={18} textWeight={'600'} />

					<CustomInput
						label="Bank Name"
						labelColor="black"
						value={bank}
						onChangeText={setBank}
						pickerData={[
							{ id: 1, value: 'UBA', label: 'UBA' },
							{ id: 2, value: 'Access Bank', label: 'Access Bank' },
							{ id: 3, value: 'Unity Bank', label: 'Unity Bank' },
						]}
						type="picker"
						placeholder="Choose your bank"
					/>
					<CustomInput
						labelColor="black"
						label="Account Number"
						value={accountNumber}
						onChangeText={setAccountNumber}
						type="account"
						placeholder="Enter 10 digits number"
					/>
					{accountNumber.length > 9 && (
						<Row style={styles.nameCheck}>
							<Title textColor={theme.primary} text={'John Doe'} textWeight={'600'} />
							<Image source={images.successcheck} style={{ width: 12, height: 12 }} />
						</Row>
					)}

					<View style={{ gap: 5 }}>
						<Title text={'Tips'} textSize={14} textWeight={'500'} />
						<Title
							text={`1. Please fill in the information of your own bank account for loan receiving.

2. You account detials are safely protected by SureBucks.`}
							textSize={10}
							textstyle={{ lineHeight: 16 }}
							textWeight={'400'}
						/>
					</View>
				</View>
				<SubmitBtn
					disabled={accountNumber?.length > 9 ? false : true}
					// loading={loading}
					onPress={handleSubmit}
					title={'Continue'}
					style={styles.button}
				/>
			</View>
		</Screen>
	)
}

export default DisburseAccountScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	content: {
		marginTop: 10,
		gap: 20,
	},
	nameCheck: {
		marginTop: -15,
		gap: 6,
		alignItems: 'center',
		alignSelf: 'flex-end',
	},
	button: {
		marginBottom: 20,
	},
})

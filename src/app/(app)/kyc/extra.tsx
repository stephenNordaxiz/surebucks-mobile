import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { BasicInfo, CustomInput, KYCWrapper, Title } from '@/components'
import { nav } from '@/utils/navigationService'
import { nairaSymbol } from '@/utils'
import { useAuthStore } from '@/stores/authStore'

const ExtraInfoScreen = () => {
	const [loading, setLoading] = useState(false)
	const [education, setEducation] = useState('')
	const [marital, setMarital] = useState('')
	const [income, setIncome] = useState('')
	const [relContact1, setRelContact1] = useState('')
	const [fullName1, setFullName1] = useState('')
	const [fullName2, setFullName2] = useState('')
	const [relContact2, setRelContact2] = useState('')
	const [phone1, setPhone1] = useState('')
	const [phone2, setPhone2] = useState('')

	const { updateKyc, kyc } = useAuthStore()

	const handlePress = () => {
		try {
			setLoading(true)
			updateKyc({
				...kyc,
				extra: true,
			})
			nav('/kyc/idcard')
		} catch (error: unknown) {
			console.log('error', error)
		} finally {
			setLoading(false)
		}
	}
	return (
		<KYCWrapper loading={loading} onPress={handlePress} step={1} title="Extra Information">
			<View style={styles.container}>
				<BasicInfo />
				<View style={styles.content}>
						<CustomInput
							type="picker"
							label="Educational Background"
							labelColor="black"
							pickerData={[
								{ id: 1, value: "Bachelor's degree", label: "Bachelor's degree" },
								{ id: 2, value: 'SSCE', label: 'SSCE' },
								{ id: 3, value: "Master's degree", label: "Master's degree" },
							]}
							placeholder="Select Educational Background"
							onChangeText={setEducation}
							value={education}
						/>
						<CustomInput
							type="picker"
							label="Marital Status"
							labelColor="black"
							pickerData={[
								{ id: 1, value: 'Single', label: 'Single' },
								{ id: 2, value: 'Married', label: 'Married' },
							]}
							placeholder="Select Marital Status"
							onChangeText={setMarital}
							value={marital}
						/>

						<CustomInput
							type="picker"
							labelColor="black"
							pickerData={[
								{
									id: 1,
									value: `${nairaSymbol(0)} - ${nairaSymbol(100000)}`,
									label: `${nairaSymbol(0)} - ${nairaSymbol(100000)}`,
								},
								{
									id: 2,
									value: `${nairaSymbol(100001)} - ${nairaSymbol(1000000)}`,
									label: `${nairaSymbol(100001)} - ${nairaSymbol(1000000)}`,
								},
							]}
							label="Monthly Income"
							placeholder="Select income range"
							onChangeText={setIncome}
							value={income}
						/>
							<View style={{ gap: 12 }}>
						<Title
							text={'Relationship Contact'}
							textSize={14}
							textWeight={'600'}
							/>
						<CustomInput
							type="picker"
							labelColor="black"
							pickerData={[
								{ id: 1, value: 'Sister', label: 'Sister' },
								{ id: 2, value: 'Brother', label: 'Brother' },
								{ id: 3, value: 'Son', label: 'Son' },
								{ id: 4, value: 'Daughter', label: 'Daughter' },
								{ id: 5, value: 'Father', label: 'Father' },
								{ id: 6, value: 'Mother', label: 'Mother' },
							]}
							label="Relationship Contact 1"
							placeholder="Select Contact Relationship"
							onChangeText={setRelContact1}
							value={relContact1}
						/>
							</View>
						<CustomInput
							type="default"
							labelColor="black"
							label="Full Name"
							placeholder="Please enter full name"
							onChangeText={setFullName1}
							value={fullName1}
						/>
						<CustomInput
							type="default"
							labelColor="black"
							label="Phone Number"
							placeholder="Please enter phone number"
							onChangeText={setPhone1}
							value={phone1}
						/>
						<CustomInput
							type="picker"
							labelColor="black"
							pickerData={[
								{ id: 1, value: 'Sister', label: 'Sister' },
								{ id: 2, value: 'Brother', label: 'Brother' },
								{ id: 3, value: 'Son', label: 'Son' },
								{ id: 4, value: 'Daughter', label: 'Daughter' },
								{ id: 5, value: 'Father', label: 'Father' },
								{ id: 6, value: 'Mother', label: 'Mother' },
							]}
							label="Relationship Contact 2"
							placeholder="Select Contact Relationship"
							onChangeText={setRelContact2}
							value={relContact2}
						/>
						<CustomInput
							type="default"
							labelColor="black"
							label="Full Name"
							placeholder="Please enter full name"
							onChangeText={setFullName2}
							value={fullName2}
						/>
						<CustomInput
							type="default"
							labelColor="black"
							label="Phone Number"
							placeholder="Please enter phone number"
							onChangeText={setPhone2}
							value={phone2}
						/>
				</View>
			</View>
		</KYCWrapper>
	)
}


export default ExtraInfoScreen

const styles = StyleSheet.create({
	container: {},
	content: {
		marginTop: 10,
		gap: 16,
	},
	button: {
		marginBottom: 20,
	},
})

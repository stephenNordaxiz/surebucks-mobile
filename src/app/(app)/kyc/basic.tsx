import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { nav } from '@/utils/navigationService'
import { BasicInfo, CustomInput, KYCWrapper } from '@/components'
import { useAuthStore } from '@/stores/authStore'

const BasicInfoScreen = () => {
	const [loading, setLoading] = useState(false)
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [middleName, setMiddleName] = useState('')
	const [email, setEmail] = useState('')
	const [gender, setGender] = useState('')
	const [address, setAddress] = useState('')
	const [lga, setLGA] = useState('')

	const { updateKyc, kyc } = useAuthStore()

	const handlePress = () => {
		try {
			setLoading(true)
			updateKyc({
				...kyc,
				basic: true,
			})
			nav('/kyc/extra')
		} catch (error: unknown) {
			console.log('error', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<KYCWrapper loading={loading} onPress={handlePress} step={0} title="Basic Information">
			<View style={styles.container}>
				<BasicInfo />
				<View style={styles.content}>
					<CustomInput
						type="default"
						label="First Name"
						labelColor="black"
						placeholder="please enter your first name"
						onChangeText={setFirstName}
						value={firstName}
					/>
					<CustomInput
						type="default"
						labelColor="black"
						label="Middle Name (Optional)"
						placeholder="please enter your middle name"
						onChangeText={setMiddleName}
						value={middleName}
					/>
					<CustomInput
						type="default"
						labelColor="black"
						label="Last Name"
						placeholder="please enter your last name"
						onChangeText={setLastName}
						value={lastName}
					/>
					<CustomInput
						type="default"
						labelColor="black"
						label="BVN"
						placeholder="Please fill in your BVN"
						onChangeText={setEmail}
						value={email}
					/>
					<CustomInput
						type="picker"
						labelColor="black"
						pickerData={[
							{ id: 1, value: 'Male', label: 'Male' },
							{ id: 2, value: 'Female', label: 'Female' },
						]}
						label="Gender"
						placeholder="Select your gender"
						onChangeText={setGender}
						value={gender}
					/>
					<CustomInput
						type="date"
						labelColor="black"
						label="Date of Birth"
						placeholder="Enter date of birth"
						onChangeText={setEmail}
						value={email}
					/>
					<CustomInput
						type="default"
						labelColor="black"
						label="Residential Address"
						placeholder="Fill in address"
						onChangeText={setAddress}
						value={address}
					/>
					<CustomInput
						type="picker"
						labelColor="black"
						label="State of Residence"
						pickerData={[
							{ id: 1, value: 'Oyo', label: 'Oyo' },
							{ id: 2, value: 'Lagos', label: 'Lagos' },
						]}
						placeholder="Select State"
						onChangeText={setLGA}
						value={lga}
					/>
					<CustomInput
						type="picker"
						labelColor="black"
						label="Residential LGA"
						pickerData={[
							{ id: 1, value: 'Ikeja', label: 'Ikeja' },
							{ id: 2, value: 'Opebi', label: 'Opebi' },
							{ id: 3, value: 'Allen', label: 'Allen' },
							{ id: 4, value: 'Maryland', label: 'Maryland' },
							{ id: 5, value: 'Maryland', label: 'Maryland' },
							{ id: 6, value: 'Maryland', label: 'Maryland' },
							{ id: 7, value: 'Maryland', label: 'Maryland' },
							{ id: 8, value: 'Maryland', label: 'Maryland' },
							{ id: 9, value: 'Maryland', label: 'Maryland' },
							{ id: 0, value: 'Maryland', label: 'Maryland' },
							{ id: 11, value: 'Maryland', label: 'Maryland' },
							{ id: 12, value: 'Maryland', label: 'Maryland' },
							{ id: 13, value: 'Maryland', label: 'Maryland' },
							{ id: 14, value: 'Maryland', label: 'Maryland' },
						]}
						placeholder="Select Address"
						onChangeText={setLGA}
						value={lga}
					/>
				</View>
			</View>
		</KYCWrapper>
	)
}

export default BasicInfoScreen

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
	},
	content: {
		marginTop: 20,
		gap: 16,
	},
})

import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'

import { CustomInput, Screen, SubmitBtn, Title } from '@/components'
import { useAuthStore } from '@/stores/authStore'
import { useThemeStore } from '@/stores/themeStore'
import { ThemeType } from '@/constants/theme'
import { nav } from '@/utils/navigationService'
import { nairaSymbol } from '@/utils'
import { useUniversalModal } from '@/hooks/useUniversalModal'

const LoanEligibleScreen = () => {
	const theme = useThemeStore((s) => s.theme)
	const styles = createStyles(theme)
	const { amount, period, purpose } = useLocalSearchParams()
	const { updateKyc, kyc } = useAuthStore()
	const [loading, setLoading] = useState(false)
	const [incomeSource, setIncomeSource] = useState('')
	const [employStatus, setEmployStatus] = useState('')
	const [incomeRange, setIncomeRange] = useState('')
	const { showPending, showSuccess } = useUniversalModal()

	const handlePress = () => {
		if (!incomeSource) {
			showPending(
				'Not Eligible',
				'Unfortunately, All check list requirements have not been met. Please try again',
			)
		} else {
			showSuccess('Completed', 'You can go ahead and request your first loan', () => handleSubmit())
		}
	}

	const handleSubmit = () => {
		setLoading(true)
		updateKyc({ ...kyc, bvn: true })
		nav('/loan/offer', { amount, period, purpose, incomeRange, incomeSource, employStatus })
		setLoading(false)
	}

	return (
		<Screen showHeader showBackButton padded showInfoButton>
			<View style={styles.container}>
				<View style={styles.content}>
					<Title text={'Eligibility Check'} textSize={18} textWeight={'600'} />
					<View style={{ gap: 16 }}>
						<CustomInput
							labelColor="black"
							label="Income Source"
							value={incomeSource}
							onChangeText={setIncomeSource}
							type="default"
							placeholder="Please enter Income source"
						/>
						<CustomInput
							label="Employment Status"
							labelColor="black"
							pickerData={[
								{ id: 1, value: 'Self Employed', label: 'Self Employed' },
								{ id: 2, value: 'Retired', label: 'Retired' },
								{ id: 3, value: 'Freelancer', label: 'Freelancer' },
							]}
							value={employStatus}
							onChangeText={setEmployStatus}
							type="picker"
							placeholder="Choose Employment Status"
						/>
						<CustomInput
							labelColor="black"
							label="Monthly Income"
							pickerData={[
								{
									id: 1,
									value: `${nairaSymbol(1000)} - ${nairaSymbol(100000)}`,
									label: `${nairaSymbol(1000)} - ${nairaSymbol(100000)}`,
								},
								{
									id: 2,
									value: `${nairaSymbol(100001)} - ${nairaSymbol(1000000)}`,
									label: `${nairaSymbol(100001)} - ${nairaSymbol(1000000)}`,
								},
								{
									id: 3,
									value: `${nairaSymbol(1000001)} and above`,
									label: `${nairaSymbol(1000001)} and above`,
								},
							]}
							value={incomeRange}
							onChangeText={setIncomeRange}
							type="picker"
							placeholder="Please Select income range"
						/>
					</View>
				</View>
				<SubmitBtn
					disabled={loading || !incomeRange ? true : false}
					loading={loading}
					// bgColor={ theme.primary}
					onPress={handlePress}
					title={'Proceed'}
					style={styles.button}
				/>
			</View>
		</Screen>
	)
}

export default LoanEligibleScreen

function createStyles(theme: ThemeType) {
	return StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'space-between',
		},
		content: {
			marginTop: 10,
			gap: 20,
		},
		outerCircle: {
			width: 80,
			height: 80,
			borderRadius: 300, // half of width/height
			backgroundColor: 'transparent', // outer circle color
			justifyContent: 'center',
			alignItems: 'center',
			borderWidth: 1,
			borderColor: theme.primary,
			alignSelf: 'center',
			position: 'relative',
		},
		check: {
			width: 20,
			height: 20,
			resizeMode: 'contain',
			position: 'absolute',
			right: 0,
			bottom: 0,
		},
		innerCircle: {
			width: '85%', // 100 - (10 * 2)
			height: '85%',
			borderRadius: 200,
			overflow: 'hidden',
		},
		image: {
			width: '100%',
			height: '100%',
		},
		button: {
			marginBottom: 20,
		},
	})
}

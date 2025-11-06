import {  StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
	CModal,
	CScrollView,
	CustomInput,
	Demarcator,
	Screen,
	SubmitBtn,
	Title,
} from '@/components'
import { SIZES } from '@/constants'
import { useAuthStore } from '@/stores/authStore'
import { useThemeStore } from '@/stores/themeStore'
import { ThemeType } from '@/constants/theme'
import { nav } from '@/utils/navigationService'

const RequestLoanScreen = () => {
	const theme = useThemeStore((s) => s.theme)
	const styles = createStyles(theme)
	const { updateTerms, kyc } = useAuthStore()
	const [showTerms, setShowTerms] = useState(false)
	const [loading, setLoading] = useState(false)
	const [purpose, setPurpose] = useState('')

	useEffect(() => {
		if (!kyc?.terms) {
			setShowTerms(true)
		}
	}, [kyc?.terms])

	const handleAgree = () => {
		updateTerms({ ...kyc, terms: true })
		setShowTerms(false)
	}
	const handlePress = () => {
		setLoading(false)
		if (!kyc?.bvn) {
			nav('/loan/bvn', { purpose })
		} else {
			console.log('no verifybvn')
			nav('/loan/eligible', { purpose })
		}
	}
	

	return (
		<Screen showHeader showBackButton padded showInfoButton>
			<View style={styles.container}>
				<View style={styles.content}>
					<View>
						<Title
							text={'Request Loan'}
							textSize={18}
							textWeight={'600'}
							textstyle={{ marginBottom: 20 }}
						/>

						<CustomInput
							labelColor="black"
							label="Loan Purpose"
							pickerData={[
								{ id: 1, value: 'Education', label: 'Education' },
								{ id: 2, value: 'Rent', label: 'Rent' },
								{ id: 3, value: 'Technology', label: 'Technology' },
								{ id: 4, value: 'Food', label: 'Food' },
								{ id: 5, value: 'Medical', label: 'Medical' },
								{ id: 6, value: 'Travel', label: 'Travel' },
							]}
							value={purpose}
							onChangeText={setPurpose}
							type="picker"
							placeholder="Please enter loan purpose"
						/>
					</View>
				</View>
				<SubmitBtn
					disabled={purpose.length === 0 ? true : loading ? true : false}
					loading={loading}
					// bgColor={ theme.primary}
					onPress={handlePress}
					title={'Continue'}
					style={styles.button}
				/>
			</View>
			
			<CModal
				closeModal={() => setShowTerms(false)}
				modalVisible={showTerms}
				noBtn
				padded
				hanger={false}
				center
			>
				<View>
					<View style={{ gap: 8 }}>
						<Title text="Terms and condition" textSize={20} textWeight={'600'} />
						<Title text="Last updated on February 2025" textSize={12} textWeight={'400'} />
						<Demarcator
							width={SIZES.width - 24}
							height={1.3}
							color="#07140A66"
							style={{ marginVertical: 5, marginBottom: 5, marginLeft: -24 }}
						/>
					</View>

					<CScrollView
						containerStyle={{ height: SIZES.height / 2 }}
						contentContainerStyle={{ marginVertical: 10 }}
						scrollbarColor={theme.primary}
						scrollbarWidth={5}
					>
						<View>
							<Title
								text="1. Eligibility"
								textSize={12}
								textWeight={'500'}
								textstyle={{ marginBottom: 5 }}
							/>

							<Title
								text="Applicants must be 18 years or older with a valid BVN, active bank account, and verifiable source of income. Previous loan history and credit score may affect eligibility status."
								textSize={10}
								textstyle={{ lineHeight: 20, marginBottom: 10 }}
								textWeight={'300'}
							/>
							<Title
								text="Applicants must be 18 years or older with a valid BVN, active bank account, and verifiable source of income. Previous loan history and credit score may affect eligibility status."
								textSize={10}
								textstyle={{ lineHeight: 20, marginBottom: 10 }}
								textWeight={'300'}
							/>
						</View>

						<View>
							<Title
								text="2. Loan Request"
								textSize={12}
								textWeight={'500'}
								textstyle={{ marginBottom: 5 }}
							/>

							<Title
								text="Applicants must be 18 years or older with a valid BVN, active bank account, and verifiable source of income. Previous loan history and credit score may affect eligibility status."
								textSize={10}
								textstyle={{ lineHeight: 20, marginBottom: 10 }}
								textWeight={'300'}
							/>
							<Title
								text="Applicants must be 18 years or older with a valid BVN, active bank account, and verifiable source of income. Previous loan history and credit score may affect eligibility status."
								textSize={10}
								textstyle={{ lineHeight: 20, marginBottom: 10 }}
								textWeight={'300'}
							/>
						</View>

						<View>
							<Title
								text="3. Repayment interest and Fees"
								textSize={12}
								textWeight={'500'}
								textstyle={{ marginBottom: 5 }}
							/>

							<Title
								text="Applicants must be 18 years or older with a valid BVN, active bank account, and verifiable source of income. Previous loan history and credit score may affect eligibility status."
								textSize={10}
								textstyle={{ lineHeight: 20, marginBottom: 10 }}
								textWeight={'300'}
							/>
							<Title
								text="Applicants must be 18 years or older with a valid BVN, active bank account, and verifiable source of income. Previous loan history and credit score may affect eligibility status."
								textSize={10}
								textstyle={{ lineHeight: 20, marginBottom: 10 }}
								textWeight={'300'}
							/>
						</View>

						<View>
							<Title
								text="4. Disburstment"
								textSize={12}
								textWeight={'500'}
								textstyle={{ marginBottom: 5 }}
							/>

							<Title
								text="Applicants must be 18 years or older with a valid BVN, active bank account, and verifiable source of income. Previous loan history and credit score may affect eligibility status."
								textSize={10}
								textstyle={{ lineHeight: 20, marginBottom: 10 }}
								textWeight={'300'}
							/>
							<Title
								text="Applicants must be 18 years or older with a valid BVN, active bank account, and verifiable source of income. Previous loan history and credit score may affect eligibility status."
								textSize={10}
								textstyle={{ lineHeight: 20, marginBottom: 10 }}
								textWeight={'300'}
							/>
						</View>
					</CScrollView>

					<SubmitBtn title={'I Agree'} onPress={handleAgree} />
				</View>
			</CModal>
		</Screen>
	)
}

export default RequestLoanScreen

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

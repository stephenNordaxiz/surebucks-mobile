/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'

import {
	CardTitle,
	CModal,
	CScrollView,
	// CustomInput,
	CView,
	Demarcator,
	Row,
	Screen,
	ScrollSlider,
	Spinner,
	SubmitBtn,
	Title,
} from '@/components'
import { useThemeStore } from '@/stores/themeStore'
import { SIZES, ThemeType } from '@/constants/theme'
import { nav } from '@/utils/navigationService'
import { nairaSymbol } from '@/utils'
import { generateUUID, getMontserratFontFamily, hexToRgba } from '@/utils/checker'
import { useLoanStore } from '@/stores/loanStore'
import { useLocalSearchParams } from 'expo-router'
// import { add } from '@/utils/dateFormat'

const LoanOfferScreen = () => {
	const theme = useThemeStore((s) => s.theme)
	const { account, addLoan } = useLoanStore()
	const styles = createStyles(theme)
	const { period, purpose, incomeRange, incomeSource, employStatus } = useLocalSearchParams<any>()

	const total = 10000
	const [term, setTerm] = useState('30 Days')
	const [termPercent, setTermPercent] = useState('0.61% daily')
	const [showTerms, setShowTerms] = useState(false)
	const [selectedAmount, setSelectedAmount] = useState(total * 0.3)
	const [loading, setLoading] = useState(false)
	const [agree, setAgree] = useState(false)

	const handleAgree = () => {
		if (!agree) {
			setAgree(true)
		}
		setShowTerms(false)
	}
	const handleSubmit = () => {
		try {
			setLoading(true)
			setTimeout(() => {
				setLoading(false)
				addLoan({
					purpose: purpose || '',
					status: employStatus || '',
					amount: selectedAmount,
					amountDue: selectedAmount + selectedAmount * 0.2,
					paid: false,
					dueDate: new Date('2025-08-22T00:00:00').toDateString() || period || '',
					createdAt: new Date().toDateString(),
					id: generateUUID(),
					incomeRange: incomeRange || '',
					incomeSource: incomeSource || '',
					date: Date.now(),
				})
				nav('/tabs/home')
			}, 4000)
		} catch (error) {
			console.log(error)
		}
	}

	const handleAccount = () => {
		nav('/loan/disburseaccount')
	}

	return (
		<Screen scrollable showHeader showBackButton padded showInfoButton>
			<View style={styles.container}>
				<View style={styles.content}>
					<View style={{ gap: 20 }}>
						<Title text={'Loan Offer'} textSize={18} textWeight={'600'} />
						<CView bgColor={hexToRgba(theme.primary, 0.1)}>
							<Title text={'Choose Amount'} textWeight={'500'} />
							<Title text={nairaSymbol(selectedAmount, 2)} textSize={24} textWeight={'600'} />
							<ScrollSlider
								total={total}
								percent={selectedAmount / total}
								onChange={setSelectedAmount}
							/>
							<Row
								style={{
									alignItems: 'center',
									justifyContent: 'space-between',
									width: SIZES.width - 40 - 40,
								}}
							>
								<SubmitBtn
									onPress={() => setSelectedAmount(total * 0.3)}
									title={nairaSymbol(total * 0.3)}
									outlined={selectedAmount === total * 0.3 ? false : true}
									btnHeight={28}
									borderColor={theme.primary}
									textColor={selectedAmount === total * 0.3 ? 'white' : theme.primary}
									btnWidth={(SIZES.width - 40 - 40 - 15) / 3}
									fontSize={12}
								/>
								<SubmitBtn
									onPress={() => setSelectedAmount(total * 0.5)}
									title={nairaSymbol(total * 0.5)}
									btnHeight={28}
									outlined={selectedAmount === total * 0.5 ? false : true}
									textColor={selectedAmount === total * 0.5 ? 'white' : theme.primary}
									fontSize={12}
									borderColor={theme.primary}
									btnWidth={(SIZES.width - 40 - 40 - 15) / 3}
								/>
								<SubmitBtn
									onPress={() => setSelectedAmount(total)}
									title={nairaSymbol(total)}
									outlined={selectedAmount === total ? false : true}
									textColor={selectedAmount === total ? 'white' : theme.primary}
									btnHeight={28}
									fontSize={12}
									borderColor={theme.primary}
									btnWidth={(SIZES.width - 40 - 40 - 15) / 3}
								/>
							</Row>
						</CView>
						<TouchableOpacity style={{ gap: 5 }}>
							<Title text={'Select loan term'} />
							<Row
								style={{
									padding: 10,
									borderRadius: 16,
									backgroundColor: 'white',
									justifyContent: 'space-between',
								}}
							>
								<Row style={{ gap: 5, alignItems: 'center' }}>
									<Title text={term} textWeight={'500'} />
									<Title text={`(${termPercent})`} textSize={10} />
								</Row>
								<View
									style={{
										width: 20,
										height: 20,
										backgroundColor: hexToRgba(theme.tertiary, 0.2),
										borderRadius: 4,
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<AntDesign name="down" size={13} color={theme.tertiary} />
								</View>
							</Row>
						</TouchableOpacity>

						<View
							style={{
								backgroundColor: hexToRgba(theme.secondary, 0.2),
								paddingVertical: 10,
								alignItems: 'center',
								justifyContent: 'center',
								borderRadius: 16,
							}}
						>
							<Text style={{fontSize:8,fontFamily: getMontserratFontFamily('400') }}>
								You need to pay back{' '}
								<Text style={{ color: theme.primary, fontFamily: getMontserratFontFamily('600') }}>
									₦5,000
								</Text>{' '}
								each installment in 30 days
							</Text>
						</View>

						<CView style={{ gap: 20 }}>
							<Title text={'Loan Details'} textSize={18} textWeight={'600'} />

							<View style={{ gap: 14 }}>
								<CardTitle
									leftTitle="Loan Amount"
									rightTitle={nairaSymbol(selectedAmount)}
									rightWeight="500"
									demarcator
								/>
								<CardTitle
									leftTitle="Duration"
									rightTitle={'30 days'}
									rightWeight="500"
									demarcator
								/>
								<CardTitle
									leftTitle="Interest"
									rightTitle={nairaSymbol(selectedAmount * 0.2) + ' (20%)'}
									rightWeight="500"
									demarcator
								/>
								<CardTitle
									leftTitle="Process Fee"
									rightTitle={nairaSymbol(selectedAmount * 0.01) + ' (1%)'}
									rightWeight="500"
									demarcator
								/>
								<CardTitle
									leftTitle="Total Amount Due"
									rightTitle={nairaSymbol(selectedAmount + selectedAmount * 0.2)}
									rightWeight="500"
									demarcator
								/>
								<CardTitle
									leftTitle="Disbursement Account"
									// rightTitle={"******6789"}
									rightWeight="500"
									icon={
										<Pressable onPress={handleAccount}>
											<Row style={{ gap: 6, alignItems: 'center' }}>
												<Title
													textColor={!account ? 'red' : 'black'}
													textSize={12}
													text={
														!account
															? 'Add Bank Account'
															: '***** ' +
																account?.accountNumber?.substring(account?.accountNumber?.length, 6)
													}
												/>
												<FontAwesome
													name="angle-right"
													size={14}
													color={hexToRgba('#07140A', 0.2)}
												/>
											</Row>
										</Pressable>
									}

									// demarcator
								/>
							</View>
						</CView>
						<CView style={{ gap: 16 }}>
							<Title text={'Total Repayment'} textSize={18} textWeight={'600'} />

							<Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
								<View style={{ gap: 4 }}>
									<Title text={'Due Date'} textSize={10} />
									<Title text={new Date(Date.now()).toDateString()} textWeight={'500'} />
								</View>
								<Title
									text={nairaSymbol(selectedAmount + selectedAmount * 0.2)}
									textSize={20}
									textWeight={'600'}
								/>
							</Row>
						</CView>
						<Pressable onPress={() => setShowTerms(!showTerms)}>
							<Row style={{ gap: 6, alignItems: 'center', marginBottom: 20 }}>
								<MaterialCommunityIcons
									name={agree ? 'checkbox-outline' : 'checkbox-blank-outline'}
									size={14}
									color={agree ? theme.primary : 'black'}
								/>
								<Text style={{ fontSize: 10, fontFamily: getMontserratFontFamily('400') }}>
									I agreed to{' '}
									<Text
										style={{ color: theme.primary, fontFamily: getMontserratFontFamily('500') }}
									>
										SureBucks Loan Contract
									</Text>
								</Text>
							</Row>
						</Pressable>
					</View>
				</View>
				<SubmitBtn
					disabled={!agree ? true : false}
					loading={loading}
					onPress={handleSubmit}
					title={'Apply Now'}
					style={styles.button}
				/>
			</View>
			<CModal
				hanger={false}
				center
				padded
				noBtn
				modalVisible={loading}
				closeModal={() => setLoading(false)}
			>
				<View style={{ paddingVertical: 5, alignItems: 'center', gap: 20 }}>
					<View style={{ height: 60 }}>
						<Spinner type width={65} height={65} />
					</View>
					<Title text={'Processing your request'} textSize={14} center />
					<View
						style={{
							backgroundColor: hexToRgba(theme.secondary, 0.2),
							width: '100%',
							paddingVertical: 12,
							borderRadius: 10,
						}}
					>
						<Title
							textSize={10}
							textstyle={{ lineHeight: 16 }}
							center
							text={`Your loan application is under review.
Please be patient`}
						/>
					</View>
				</View>
			</CModal>
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

export default LoanOfferScreen

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

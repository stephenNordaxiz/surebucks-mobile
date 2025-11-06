/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CView, Row, Screen, SubmitBtn, Title } from '@/components'
import { nairaSymbol } from '@/utils'
import { Ionicons } from '@expo/vector-icons'
import { useLoanStore } from '@/stores/loanStore'
import { useLocalSearchParams } from 'expo-router'
import { getMontserratFontFamily, hexToRgba } from '@/utils/checker'
import { useThemeStore } from '@/stores/themeStore'
import { nav } from '@/utils/navigationService'

const TransferScreen = () => {
	const { loans, updateLoanById } = useLoanStore()
	const theme = useThemeStore((s) => s.theme)
	const { id } = useLocalSearchParams()
	const selectedLoan = loans.filter((x) => x.id === id)
	const [loan, setLoan] = useState(selectedLoan[0])
	// console.log(loans)
	useEffect(() => {
		if (selectedLoan) {
			setLoan(selectedLoan[0])
		}
	}, [selectedLoan])

	const handlePress = () => {
		const loanId: any = id
		updateLoanById(loanId, { paid: true })
		nav('/repay/success')
	}

	return (
		<Screen scrollable padded showHeader showInfoButton showBackButton>
			<View style={styles.container}>
				<View style={styles.content}>
					<Title text={'Pay with Transfer'} textSize={18} textWeight={'600'} />

					<CView style={{ gap: 20 }}>
						<View style={{ gap: 10 }}>
							<Title center text={'Repayment Amount'} />
							<Title
								center
								text={nairaSymbol(+loan?.amountDue, 2)}
								textColor={theme.primary}
								textSize={24}
								textWeight={'600'}
							/>
						</View>
						<CView bgColor={'#113119'} style={{ gap: 20 }}>
							<Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
								<View style={{ gap: 16 }}>
									<View style={{ gap: 6 }}>
										<Title text={'Bank Name'} textWeight={'400'} textColor="white" textSize={10} />
										<Title text={'Wema Bank'} textWeight={'500'} textColor="white" textSize={14} />
									</View>
									<View style={{ gap: 6 }}>
										<Title
											text={'Transfer Account Number'}
											textWeight={'400'}
											textColor="white"
											textSize={10}
										/>
										<Title text={'1234567890'} textWeight={'500'} textColor="white" textSize={14} />
									</View>
									<View style={{ gap: 6 }}>
										<Title
											text={'Beneficiary Name'}
											textWeight={'400'}
											textColor="white"
											textSize={10}
										/>
										<Title
											text={'SureBucks Finance'}
											textWeight={'500'}
											textColor="white"
											textSize={14}
										/>
									</View>
								</View>
								<Pressable style={styles.copy}>
									<Title text="Copy" textSize={10} />
									<Ionicons name="copy-outline" size={9} color="black" />
								</Pressable>
							</Row>
						</CView>
					</CView>

					<View
						style={{
							backgroundColor: hexToRgba(theme.secondary, 0.3),
							borderRadius: 8,
							padding: 16,
						}}
					>
						<Text
							style={{ lineHeight: 14, fontSize: 10, fontFamily: getMontserratFontFamily('400') }}
						>
							You can repay your loan to <Text style={styles.weighted}> SureBucks Finance </Text>
							by transferring money <Text style={styles.weighted}> via mobile bank app</Text> to the
							account number above.
						</Text>
					</View>
				</View>
				<SubmitBtn
					onPress={handlePress}
					title={'I’ve completed the payment'}
					style={{ marginBottom: 30 }}
				/>
			</View>
		</Screen>
	)
}

export default TransferScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	content: {
		marginTop: 10,
		gap: 20,
	},
	copy: {
		backgroundColor: 'white',
		flexDirection: 'row',
		gap: 6,
		borderRadius: 8,
		paddingHorizontal: 8,
		paddingVertical: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	weighted: {
		fontFamily: getMontserratFontFamily('600'),
	},
})

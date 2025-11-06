import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useLocalSearchParams } from 'expo-router'

import { CardTitle, CView, Row, Screen, SubmitBtn, Title } from '@/components'
import { useLoanStore } from '@/stores/loanStore'
import { nairaSymbol } from '@/utils'
import { useThemeStore } from '@/stores/themeStore'
import { getMontserratFontFamily, hexToRgba } from '@/utils/checker'

const LoanDetailScreen = () => {
	const { loans, account } = useLoanStore()
	const theme = useThemeStore((s) => s.theme)
	const { id } = useLocalSearchParams()
	const selectedLoan = loans.filter((x) => x.id === id)
	const [loan, setLoan] = useState(selectedLoan[0])
	const [status, setstatus] = useState('')

	useEffect(() => {
		if (selectedLoan) {
			setLoan(selectedLoan[0])
		}
		if (loan?.paid) {
			setstatus('Paid')
		} else {
			setstatus('Active')
		}
	}, [selectedLoan])

	return (
		<Screen scrollable padded showHeader showInfoButton showBackButton>
			<View style={styles.container}>
				<View style={styles.content}>
					<Title text={loan?.purpose + ' Loan'} textSize={18} textWeight={'600'} />

					<CView style={{ gap: 20 }}>
						<Title text={'Loan Details'} textSize={18} textWeight={'600'} />

						<View style={{ gap: 14 }}>
							<CardTitle
								leftTitle="Loan Amount"
								rightTitle={nairaSymbol(loan?.amount)}
								rightWeight="500"
								demarcator
							/>

							<CardTitle
								leftTitle="Interest"
								rightTitle={nairaSymbol(+loan?.amount * 0.2) + ' (20%)'}
								rightWeight="500"
								demarcator
							/>
							<CardTitle
								leftTitle="Status"
								icon={
									<SubmitBtn
										style={{ alignSelf: 'flex-end', position: 'absolute', right: 0, top: -15 }}
										btnHeight={18}
										textColor={status === 'Active' ? '#B9700A' : '#10862F'}
										btnWidth={46}
										fontSize={8}
										bgColor={
											status === 'Active' ? hexToRgba('#ffa11d', 0.4) : hexToRgba('#1dff47', 0.2)
										}
										title={status}
									/>
								}
								rightWeight="500"
								demarcator
							/>

							<CardTitle
								leftTitle="Repayment Amount"
								rightTitle={nairaSymbol(loan?.amountDue)}
								rightWeight="500"
								demarcator
							/>
							<CardTitle
								leftTitle="Disbursement Date"
								rightTitle={loan?.dueDate}
								rightWeight="500"
								demarcator
							/>
							<CardTitle
								leftTitle="Bank Name"
								rightTitle={account?.bank}
								rightWeight="500"
								demarcator
							/>
							<CardTitle
								leftTitle="Bank Account"
								rightTitle={
									'***** ' + account?.accountNumber?.substring(account?.accountNumber?.length, 6)
								}
								rightWeight="500"
								demarcator
							/>
						</View>
					</CView>
					<View style={{ gap: 10 }}>
						<Title text={'Importance Notice'} textSize={10} textWeight={'500'} />
						<CView style={{ gap: 8 }} bgColor={hexToRgba(theme.secondary, 0.2)}>
							<Row style={{ gap: 4, alignItems: 'center' }}>
								<Ionicons name="warning" size={14} color="#F88A1B" />
								<Title text={'Please Read'} textSize={10} />
							</Row>
							<Text style={{ fontSize: 10, fontFamily: getMontserratFontFamily('300') }}>
								{`Early Repayment: Please note that when you repay your loan before due date, you will still need to pay all the interest on the loan.

Prompt Repayment: It is important that you repay your loan as at when due to maintain a good credit report, enjoy a higher loan amount and lower interest

                                `}
								<Text
									style={{ color: 'red', fontSize: 10, fontFamily: getMontserratFontFamily('300') }}
								>
									{`
If you pay late
`}
								</Text>
								{`
1% rollover fee on overdue amount (charged daily). You may be granted a grace period of 1 day post-due date, during which rollover fee will bot be accrued or collected.
You will be reported to the credit bureaus and this will affect your future loan applications or job employments.`}
							</Text>
						</CView>
					</View>
				</View>
			</View>
		</Screen>
	)
}

export default LoanDetailScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	content: {
		marginTop: 10,
		gap: 20,
	},
})

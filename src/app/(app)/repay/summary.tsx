/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CardTitle, CView, Row, Screen, SubmitBtn, Title } from '@/components'
import { nairaSymbol } from '@/utils'
import { useLoanStore } from '@/stores/loanStore'
import { useLocalSearchParams } from 'expo-router'
import { nav } from '@/utils/navigationService'

const SummaryScreen = () => {
	const { loans, updateLoanById } = useLoanStore()
	const { id, repaymentMethod } = useLocalSearchParams()
	const selectedLoan = loans.filter((x) => x.id === id)
	const [loan, setLoan] = useState(selectedLoan[0])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (selectedLoan) {
			setLoan(selectedLoan[0])
		}
	}, [selectedLoan])
	console.log(repaymentMethod)
	const handlePress = () => {
		setLoading(false)
		const loanId: any = id
		if (repaymentMethod === 'Pay with Transfer') {
			nav('/repay/transfer', { id })
		}
		if (repaymentMethod === 'Pay with Paystack') {
			nav('/repay/success')
			updateLoanById(loanId, { paid: true })
		}
		if (repaymentMethod === 'Pay with USSD') {
			nav('/repay/ussd',{id})
		}
	}
	// const fil = paymentData.filter((x) => x.label === repaymentMethod)

	return (
		<Screen scrollable padded showHeader showInfoButton showBackButton>
			<View style={styles.container}>
				<View style={styles.content}>
					<Title text={'Repayment Loan Summary'} textSize={18} textWeight={'600'} />

					<CView style={{ gap: 20 }}>
						{/* <Title text={'Loan Details'} textSize={18} textWeight={'600'} /> */}

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
								leftTitle="Payment Method"
								icon={
									<Row>
										<Title text={repaymentMethod} />
									</Row>
								}
								rightWeight="500"
								demarcator
							/>

							<CardTitle
								leftTitle="Late Fee"
								rightTitle={nairaSymbol(0)}
								rightWeight="500"
								demarcator
							/>
							<CardTitle
								leftTitle="Total Amount Due"
								rightTitle={nairaSymbol(loan?.amountDue)}
								rightWeight="500"
								demarcator
							/>
						</View>
					</CView>
				</View>
				<SubmitBtn
					disabled={loading}
					loading={loading}
					onPress={handlePress}
					title={'Pay Now'}
					style={styles.button}
				/>
			</View>
		</Screen>
	)
}

export default SummaryScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	content: {
		marginTop: 10,
		gap: 20,
	},
	button: {
		marginBottom: 20,
	},
})

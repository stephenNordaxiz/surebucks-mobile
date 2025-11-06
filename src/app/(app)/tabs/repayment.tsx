/* eslint-disable @typescript-eslint/no-explicit-any */
import { FlatList, Image, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CView, LoanItem, Screen, SubmitBtn, Title } from '@/components'
import images from '@/constants/images'
import { useLoanStore } from '@/stores/loanStore'
import { nav } from '@/utils/navigationService'
import { useAuthStore } from '@/stores/authStore'
import { nairaSymbol } from '@/utils'
import { useThemeStore } from '@/stores/themeStore'
import { hexToRgba } from '@/utils/checker'

const RepaymentScreen = () => {
	const loans = useLoanStore((s) => s.loans)
	const theme = useThemeStore((s) => s?.theme)
	const kyc = useAuthStore((s) => s?.kyc)
	const [paidLoan, setPaidLoan] = useState<any>([])
	const [activeLoan, setActiveLoan] = useState<any>([])
	const handlePress = () => {
		if (kyc?.basic && kyc?.extra && kyc?.doc && kyc?.capture) {
			nav('/loan/request')
		} else {
			nav('/kyc')
		}
	}
	useEffect(() => {
		if (loans) {
			const l1: any = loans.filter((s) => !s.paid)
			setActiveLoan(l1)
			const l2: any = loans.filter((s) => s.paid)
			const slicedL2 = l2?.slice(0, 3)
			setPaidLoan(slicedL2)
		}
	}, [loans])

	const handleRepay = () => {
		nav('/repay', { id: activeLoan[0]?.id })
	}
	return (
		<Screen padded headerTitle="Repayment" showHeader>
			{activeLoan?.length > 0 ? (
				<View>
					<CView style={{ gap: 10 }}>
						<Title text={'Loan Balance'} textWeight={'500'} center />

						<View style={{ gap: 6 }}>
							<Title
								text={nairaSymbol(activeLoan[0]?.amountDue, 2)}
								textColor={theme.primary}
								textSize={28}
								textWeight={'600'}
								center
							/>
							<Title text={'Next Due Date: ' + activeLoan[0]?.dueDate} textWeight={'400'} center />
						</View>

						<SubmitBtn onPress={handleRepay} title={'Repay now'} />
					</CView>
					<Title
						textstyle={{ marginVertical: 20 }}
						text={'Note: The repayment amount will be repaid in order of the due date'}
						textColor={hexToRgba('#000', 0.6)}
					/>

					<View style={{ gap: 4 }}>
						<Title text={'Active Loan'} textWeight={'600'} textSize={14} />
						<View>
							<FlatList
								data={activeLoan}
								showsVerticalScrollIndicator={false}
								keyExtractor={(item) => item?.id}
								renderItem={({ item }) => (
									<LoanItem item={item} onPress={() => nav('/loan/detail', { id: item?.id })} />
								)}
							/>
						</View>
					</View>
					{paidLoan.length > 0 && (
						<View style={{ gap: 4, marginTop: 20 }}>
							<Title text={'Loan History'} textWeight={'600'} textSize={14} />
							<View>
								<FlatList
									data={paidLoan}
									showsVerticalScrollIndicator={false}
									keyExtractor={(item) => item?.id}
									renderItem={({ item }) => (
										<LoanItem item={item} onPress={() => nav('/loan/detail', { id: item?.id })} />
									)}
								/>
							</View>
						</View>
					)}
				</View>
			) : (
				<View style={styles.noLoanContainer}>
					<Image source={images.repayment} style={styles.image} />
					<View style={{ maxWidth: 250, gap: 10, marginVertical: 20 }}>
						<Title text={'No Loan yet'} textSize={22} textWeight={'600'} center />
						<Title
							text={'You can access up to ₦100,000 in just 3 minutes with a low-interest rate'}
							center
							textWeight={'400'}
							textstyle={{ lineHeight: 20 }}
						/>
					</View>
					<SubmitBtn title={'Apply Now'} onPress={handlePress} />
				</View>
			)}
		</Screen>
	)
}

export default RepaymentScreen

const styles = StyleSheet.create({
	noLoanContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
	},
	image: {
		maxWidth: 230,
		width: 210,
		height: 173,
		resizeMode: 'contain',
	},
})

/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import { CView, Row, Screen, SubmitBtn, Title } from '@/components'
import { nairaSymbol } from '@/utils'
import { useLoanStore } from '@/stores/loanStore'
import { getMontserratFontFamily, hexToRgba } from '@/utils/checker'
import { useThemeStore } from '@/stores/themeStore'
import { nav } from '@/utils/navigationService'
import images from '@/constants/images'

type BankType = {
	img: any
	id: number
	name: string
	code: string
}
const bankData = [
	{ id: 1, name: 'Access Bank', code: '*123*567*003#', img: images.accessBank },
	{ id: 2, name: 'Union Bank', code: '*312*567*3303#', img: images.unionBank },
	{ id: 3, name: 'First Bank', code: '*312*567*0233#', img: images.firstBank },
	{ id: 4, name: 'United Bank of Africa', code: '*312*567*3303#', img: images.uba },
]
const USSDDetailScreen = () => {
	const { loans, updateLoanById } = useLoanStore()
	const theme = useThemeStore((s) => s.theme)
	const { id, bankId } = useLocalSearchParams()
	const selectedLoan = loans.filter((x) => x.id === id)
	const [loan, setLoan] = useState(selectedLoan[0])
	const [bank, setBank] = useState<BankType | null>(null)
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

	useEffect(() => {
		const item = bankData.filter((x) => x.id === +bankId)
		if (bankId) {
			setBank(item[0])
		}
	}, [bankId])

	return (
		<Screen scrollable padded showHeader showInfoButton showBackButton>
			<View style={styles.container}>
				<View style={styles.content}>
					<Title text={'Pay with USSD'} textSize={18} textWeight={'600'} />

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
							<View style={{ gap: 10, width: '100%' }}>
								<Title
									text={'Beneficiary Name'}
									textWeight={'400'}
									textColor="white"
									textSize={10}
									center
								/>
								<Title
									text={'SureBucks Finance'}
									textWeight={'500'}
									textColor="white"
									textSize={14}
									center
								/>
							</View>
						</CView>
					</CView>
					<CView>
						<Title text={'Pay with USSD'} textWeight={'500'} textSize={14} />
						<View style={{ marginVertical: 16, gap: 10 }}>
							<Title
								text={'Dial the code below on your mobile phone to complete the payment'}
								textWeight={'400'}
							/>
							<TouchableOpacity
								style={{
									justifyContent: 'space-between',
									alignItems: 'center',
									padding: 16,
									backgroundColor: hexToRgba('#E5E5E5', 0.6),
									borderRadius: 10,
									gap: 10,
								}}
								onPress={() => console.log('!showBank')}
							>
								<Title text={bank?.name} />
								<Row style={{ alignItems: 'center', gap: 10 }}>
									<Title
										text={bank?.code}
										textSize={24}
										textWeight={'600'}
										textColor={theme.primary}
									/>
									<Ionicons name="copy-outline" size={24} color={hexToRgba(theme.tertiary, 0.8)} />
								</Row>
								<Title text={'Tap to call'} textstyle={{}} />
							</TouchableOpacity>
						</View>
					</CView>
					<View></View>
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

export default USSDDetailScreen

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

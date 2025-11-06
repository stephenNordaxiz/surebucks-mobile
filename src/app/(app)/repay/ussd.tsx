/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'

import { CModal, CView, Dropdownitem, Screen, SubmitBtn, Title } from '@/components'
import { nairaSymbol } from '@/utils'
import { useLoanStore } from '@/stores/loanStore'
import { getMontserratFontFamily, hexToRgba } from '@/utils/checker'
import { useThemeStore } from '@/stores/themeStore'
import { goBack, nav } from '@/utils/navigationService'
import images from '@/constants/images'

type BankType = {
	img: any
	id: number
	name: string
	code: string
}
const USSDScreen = () => {
	const { loans } = useLoanStore()
	const theme = useThemeStore((s) => s.theme)
	const { id } = useLocalSearchParams()
	const selectedLoan = loans.filter((x) => x.id === id)
	const [loan, setLoan] = useState(selectedLoan[0])
	const [bank, setBank] = useState<BankType | null>(null)
	const [showBank, setShowBank] = useState<boolean>(false)
	// console.log(loans)
	useEffect(() => {
		if (selectedLoan) {
			setLoan(selectedLoan[0])
		}
	}, [selectedLoan])

	const handlePress = () => {
		nav('/repay/ussddetails', { id, bankId: bank?.id })
	}
	const handleSelect = (item: any) => {
		setBank(item)
		setShowBank(false)
	}
	const bankData = [
        { id: 1, name: 'Access Bank', code: '*123*567*003#', img: images.accessBank },
        { id: 2, name: 'Union Bank', code: '*312*567*3303#', img: images.unionBank },
        { id: 3, name: 'First Bank', code: '*312*567*0233#', img: images.firstBank },
        { id: 4, name: 'United Bank of Africa', code: '*312*567*3303#', img: images.uba },
    ]
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
							<Title text={'Choose your bank to start payment'} textWeight={'400'} />
							<TouchableOpacity
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
									padding: 12,
									backgroundColor: hexToRgba('#E5E5E5', 0.6),
									borderRadius: 10,
								}}
								onPress={() => setShowBank(!showBank)}
							>
								<Title text={bank?.name || 'Select bank'} />
								<AntDesign name="down" size={14} color={hexToRgba(theme.tertiary, 0.2)} />
							</TouchableOpacity>
						</View>
					</CView>
					<View>
						<SubmitBtn onPress={handlePress} title={'Continue'} disabled={!bank?.id} />
						<SubmitBtn
							bgColor="transparent"
							textColor={hexToRgba(theme.tertiary, 0.6)}
							onPress={() => goBack()}
							title={'Cancel'}
							style={{}}
						/>
					</View>
				</View>
			</View>
			<CModal
				hanger={false}
				modalVisible={showBank}
				closeModal={() => setShowBank(false)}
				closable
				noBtn
			>
				<View style={{ gap: 20 }}>
					<Title text="Choose a bank" textWeight={'600'} textSize={18} center />

					<View style={{ gap: 15, marginVertical: 5 }}>
						{bankData?.map((item: BankType) => (
							<Dropdownitem
								handleSelect={handleSelect}
								item={item}
								key={item?.id}
								provider={bank}
							/>
						))}
					</View>
				</View>
			</CModal>
		</Screen>
	)
}

export default USSDScreen

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

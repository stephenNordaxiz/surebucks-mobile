/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useLocalSearchParams } from 'expo-router'

import { ChoosePayMethod, CustomInput, Row, Screen, SubmitBtn, Title } from '@/components'
import { useLoanStore } from '@/stores/loanStore'
import { useThemeStore } from '@/stores/themeStore'
import { SIZES } from '@/constants'
import { hexToRgba } from '@/utils/checker'
import { nav } from '@/utils/navigationService'

const RepayNowScreen = () => {
	const { loans } = useLoanStore()
	const theme = useThemeStore((s) => s.theme)
	const { id } = useLocalSearchParams()
	const selectedLoan: any = loans.filter((x) => x.id === id)
	const [loan, setLoan] = useState(selectedLoan[0])
	const [repayType, setRepayType] = useState('Full Repayment')
	const [amount, setAmount] = useState('')
	const [repaymentMethod, setRepaymentMethod] = useState('')

	console.log(id)
	useEffect(() => {
		if (selectedLoan) {
			setLoan(selectedLoan[0])
		}
	}, [selectedLoan])

	useEffect(() => {
		if (repayType === 'Full Repayment') {
			console.log('object', loan?.amountDue)
			setAmount(loan?.amountDue.toString())
		} else {
			setAmount('')
		}
	}, [repayType])

	const SelectItem = ({
		text,
		bgColor,
		active,
		onPress,
		width,
	}: {
		text: string
		bgColor?: string
		width?: number
		active: boolean
		onPress: () => void
	}) => {
		return (
			<TouchableOpacity onPress={onPress}>
				<Row
					style={{
						width: width || (SIZES.width - 40 - 10) / 2,
						backgroundColor: bgColor || 'white',
						padding: 10,
						gap: 10,
						borderRadius: 5,
						justifyContent: 'space-between',
					}}
				>
					<Title text={text} textColor={active ? theme.tertiary : '#B7BAC2'} />
					<MaterialCommunityIcons
						name={active ? 'check-circle-outline' : 'checkbox-blank-circle-outline'}
						size={14}
						color={active ? theme.primary : hexToRgba(theme.primary, 0.4)}
					/>
				</Row>
			</TouchableOpacity>
		)
	}

	const handlePress = () => {
		nav('/repay/summary', { repaymentMethod, id })
	}

	return (
		<Screen scrollable padded showHeader showInfoButton showBackButton>
			<View style={styles.container}>
				<View style={styles.content}>
					<Title text={loan?.purpose + ' Loan'} textSize={18} textWeight={'600'} />
					<View style={{ gap: 10 }}>
						<Title text={'Repayment Options'} />
						<Row style={{ alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
							<SelectItem
								text={'Part Repayment'}
								active={repayType === 'Part Repayment' ? true : false}
								onPress={() => setRepayType('Part Repayment')}
							/>
							<SelectItem
								text={'Full Repayment'}
								active={repayType === 'Full Repayment' ? true : false}
								onPress={() => setRepayType('Full Repayment')}
							/>
						</Row>
					</View>
					<View style={{}}>
						<CustomInput
							value={amount}
							onChangeText={setAmount}
							placeholder="Enter Amount"
							label="Amount (₦)"
							labelColor="black"
							editable={repayType !== 'Full Repayment' ? true : false}
							type="default"
						/>
						{amount > loan?.amountDue && (
							<Title
								text={'Amount exceeds your outstanding loan'}
								textColor="red"
								textstyle={{ marginTop: -16, marginBottom: 10 }}
							/>
						)}
					</View>
					{
						<View style={{ marginTop: -20 }}>
							<ChoosePayMethod text={repaymentMethod} setSelected={setRepaymentMethod} />
						</View>
					}
				</View>
				<SubmitBtn
					disabled={amount?.length === 0 ? true : repaymentMethod?.length === 0 ? true : amount > loan?.amountDue ? true : false}
					// loading={loading}
					// bgColor={ theme.primary}
					onPress={handlePress}
					title={'Continue'}
					style={styles.button}
				/>
			</View>
		</Screen>
	)
}

export default RepayNowScreen

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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { CModal, CustomInput, Dropdownitem, Screen, SubmitBtn, Title } from '@/components'
import { useThemeStore } from '@/stores/themeStore'
import { AntDesign } from '@expo/vector-icons'
import { nav } from '@/utils/navigationService'
import { hexToRgba } from '@/utils/checker'
import images from '@/constants/images'

type BankType = {
	img: any
	id: number
	name: string
	code: string
}
const AddBankScreen = () => {
	const theme = useThemeStore((s) => s.theme)
	const [bank, setBank] = useState<BankType | null>(null)
	const [showBank, setShowBank] = useState<boolean>(false)
	const [accountNumber, setAccountNumber] = useState<string>('')

	const handleSelect = (item: BankType) => {
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
		<Screen scrollable showInfoButton showBackButton showHeader padded>
			<View style={styles.container}>
				<View style={styles.content}>
					<Title text={'Add your bank account for withdrawals'} textSize={18} textWeight={'600'} />

					<View style={{ marginVertical: 16, gap: 10 }}>
						<Title text={'Bank Name'} textWeight={'400'} />
						<TouchableOpacity
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								paddingHorizontal: 12,
								paddingVertical:20,
								backgroundColor: 'white',
								borderRadius: 10,
							}}
							onPress={() => setShowBank(!showBank)}
						>
							<Title text={bank?.name || 'Select your bank'}textSize={14} />
							<AntDesign name="down" size={16} color={hexToRgba(theme.tertiary, 0.6)} />
						</TouchableOpacity>
					</View>
					<CustomInput
						onChangeText={setAccountNumber}
						value={accountNumber}
						label="Account Number"
						type='default'
						placeholder='Enter your 10 digit number'
					/>
				</View>
				<SubmitBtn
					title={'Add Bank'}
					onPress={() => nav('/tabs/profile')}
					style={{ marginBottom: 30 }}
				/>
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

export default AddBankScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	content: {
		gap: 10,
	},
})

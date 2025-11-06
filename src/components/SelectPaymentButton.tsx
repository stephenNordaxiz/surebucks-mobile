import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'

import { CardBtn, CardTitle, CModal, Title } from '.'
import { useThemeStore } from '@/stores/themeStore'
import { hexToRgba } from '@/utils/checker'
import { paymentData } from '../assets/data/payment'


const SelectPaymentButton = ({
	label,
	text = '',
	setSelected,
}: {
	text?: string
	setSelected: (text: string) => void
	label?: string
}) => {
	const theme = useThemeStore((s) => s.theme)
	const [showModal, setShowModal] = useState(false)

	const handlePress = (item: string) => {
		setSelected(item)
		setShowModal(false)
	}
	const fil = paymentData.filter((x) => x.label === text)

	return (
		<View style={styles.container}>
			<Title text={label || 'Payment Method'} />
			<CardBtn
				iconWidth={32}
				iconHeight={32}
				noIcon={!text}
				img={text ? fil[0].img : null}
				activeBorder="transparent"
				textWeight="500"
				icon={text ? fil[0].icon : null}
				rightIcon={
					text ? (
						<Title text={'change'} textColor={theme.primary} textWeight={'500'} />
					) : (
						<AntDesign name="down" size={16} color={hexToRgba(theme?.tertiary, 0.2)} />
					)
				}
				onPress={() => setShowModal(!showModal)}
				text={text || 'Choose your payment method'}
			/>
			<CModal
				modalVisible={showModal}
				closeModal={() => setShowModal(false)}
				closable
				noBtn
				hanger={false}
			>
				<View style={{ gap: 20 }}>
					<Title
						text="Choose Payment method"
						textColor={theme.tertiary}
						textSize={16}
						textWeight={'600'}
					/>
					<View style={{ gap: 16 }}>
						{paymentData?.map((item) => (
							<CardTitle
								key={item?.id}
								leftTitle={item?.label}
								leftSize={14}
								leftColor={hexToRgba('#000', 0.8)}
								demarcator
								onPress={() => handlePress(item?.label)}
								icon={
									text === item?.label && (
										<FontAwesome5 name="check" size={16} color={theme.primary} />
									)
								}
							/>
						))}
					</View>
				</View>
			</CModal>
		</View>
	)
}

export default SelectPaymentButton

const styles = StyleSheet.create({
	container: {
		gap: 10,
	},
})

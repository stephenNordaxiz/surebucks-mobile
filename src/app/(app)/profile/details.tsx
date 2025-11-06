import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CardTitle, CView, Screen, Title } from '@/components'
import { getMontserratFontFamily } from '@/utils/checker'
import { COLORS } from '@/constants'

const MyDetailsSreen = () => {
	return (
		<Screen headerTitle="My Information" showBackButton showHeader padded>
			<View style={styles.container}>
				<View style={{ gap: 16, marginTop: 10 }}>
					<Title text={'Personal Details'} textSize={14} textWeight={'500'} />
					<CView style={{ gap: 16 }}>
						<CardTitle
							leftTitle="Address"
							icon={<Text style={styles.text}>102 flat 1, district 2 Ikeja, Lagos, Nigeria</Text>}
							demarcator
						/>
						<CardTitle leftTitle="Mobile Number" rightTitle="234123456789" demarcator />
						<CardTitle leftTitle="Date of Birth" rightTitle="01-June-1990" demarcator />
						<CardTitle leftTitle="BVN" rightTitle="0123456789" demarcator />
					</CView>
				</View>
				<View style={{ gap: 16 }}>
					<Title text={'Relationship Details'} textSize={14} textWeight={'500'} />
					<CView style={{ gap: 16 }}>
						<CardTitle leftTitle="Relationship" rightTitle="Brother" demarcator />
						<CardTitle leftTitle="Full Name" rightTitle="John Doe" demarcator />
						<CardTitle
							leftTitle="Address"
							demarcator
							icon={<Text style={styles.text}>102 flat 1, district 2 Ikeja, Lagos, Nigeria</Text>}
						/>
						<CardTitle leftTitle="Mobile Number" rightTitle="234123456789" demarcator />
					</CView>
				</View>
			</View>
		</Screen>
	)
}

export default MyDetailsSreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 20,
	},
	text: {
		maxWidth: '50%',
		color: COLORS.tertiary,
		textAlign: 'right',
		fontSize: 12,
		fontFamily: getMontserratFontFamily('400'),
		lineHeight: 18,
	},
})

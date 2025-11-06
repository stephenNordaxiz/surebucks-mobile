import { StyleSheet, View } from 'react-native'
import React from 'react'
import { CardBtn, Screen, SubmitBtn } from '@/components'
import { useThemeStore } from '@/stores/themeStore'
import { AntDesign } from '@expo/vector-icons'
import { nav } from '@/utils/navigationService'

const BankScreen = () => {
	const theme = useThemeStore((s) => s.theme)
	return (
		<Screen scrollable headerTitle="Payment Method" showBackButton showHeader padded>
			<View style={styles.container}>
				<CardBtn
					text="John Doe"
					expiry="Unity Bank - 1234567890"
					activeBorder="transparent"
					rightIcon={<AntDesign name="right" size={16} color={'black'} />}
					iconWidth={40}
					iconHeight={40}
				/>
				<SubmitBtn
					title={'Add Bank'}
					onPress={() => nav('/profile/addbank')}
					outlined
					textColor={theme.primary}
					borderColor={theme.primary}
				/>
			</View>
		</Screen>
	)
}

export default BankScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

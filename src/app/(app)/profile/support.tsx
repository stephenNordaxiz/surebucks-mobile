import { StyleSheet, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import { CardBtn, Screen } from '@/components'
import { useThemeStore } from '@/stores/themeStore'
import { hexToRgba } from '@/utils/checker'
import { nav } from '@/utils/navigationService'

const SupportScreen = () => {
	const theme = useThemeStore((s) => s.theme)
	return (
		<Screen padded headerTitle="Support Centre" showBackButton showHeader>
			<View style={styles.container}>
				<CardBtn
					bgColorIcon={hexToRgba(theme.primary, 0.2)}
					icon={<MaterialCommunityIcons name="message-text" size={26} color={theme.primary} />}
					text="General Inquiry"
					expiry="Hello there, we’re here help you "
					noRightIcon={false}
					onPress={() => nav('/profile/inquiry')}
				/>
			</View>
		</Screen>
	)
}

export default SupportScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

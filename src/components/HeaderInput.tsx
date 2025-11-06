import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import Row from './Row'
import { useThemeStore } from '@/stores/themeStore'
import { nav } from '@/utils/navigationService'
import { ROUTES } from '@/constants'
import { ThemeType } from '@/constants/theme'

const HeaderInput = ({ location }: { location: string }) => {
	const currentTheme = useThemeStore((s) => s.theme)
const styles = createStyles(currentTheme)
	return (
		<TouchableOpacity style={styles.container} onPress={() => nav(ROUTES.findLocation)}>
			<Row style={{ alignItems: 'center' }}>
				<MaterialCommunityIcons name="magnify" color={currentTheme.primary} size={28} />
				<Text style={styles.text}>{location}</Text>
			</Row>
		</TouchableOpacity>
	)
}
export default HeaderInput
function createStyles(theme: ThemeType) {
	return StyleSheet.create({
	container: {
		padding: 10,
		marginTop: Platform.OS === 'ios' ? 50 : 40,
		borderWidth: 1,
		borderColor: '#d3d3d3',
		borderRadius: 30,
	},
	text: {
		marginLeft: 10,
		textAlign: 'left',
		width: '100%',
		color:theme.primaryText
	},
})
}

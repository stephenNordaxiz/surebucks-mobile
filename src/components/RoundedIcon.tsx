/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet, View } from 'react-native'
import React from 'react'

import { ThemeType } from '@/constants/theme'
import { useThemeStore } from '@/stores/themeStore'

const RoundedIcon = ({ icon, bgColor }: { icon: any; bgColor?: string }) => {
	const theme = useThemeStore((s) => s.theme)
	const styles = createStyles(theme, bgColor)
	return <View style={styles.container}>{icon}</View>
}

export default RoundedIcon

function createStyles(theme: ThemeType, bgColor: string | undefined) {
	return StyleSheet.create({
		container: {
			backgroundColor: bgColor ? bgColor : theme.primary,
			borderRadius: 50,
			width: 40,
			height: 40,
			alignItems: 'center',
			justifyContent: 'center',
		},
	})
}

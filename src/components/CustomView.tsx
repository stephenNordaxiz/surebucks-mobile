import { View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { useThemeStore } from '@/stores/themeStore'

const CustomView = ({
	style,
	children,
	bgColor,
	borderRadius,
}: {
	children: ReactNode
	style?: ViewStyle
	bgColor?: string
	borderRadius?: number
}) => {
	const currentTheme = useThemeStore((s) => s.theme)
	return (
		<View
			style={[
				style,
				{
					padding: 20,
					backgroundColor: bgColor ? bgColor : currentTheme.background1,
					borderRadius: borderRadius ? borderRadius : 20,
				},
			]}
		>
			{children}
		</View>
	)
}

export default CustomView

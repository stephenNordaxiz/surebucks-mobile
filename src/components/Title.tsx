/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text, TextStyle } from 'react-native'
import React from 'react'
import { getMontserratFontFamily } from '@/utils/checker'
import { useThemeStore } from '@/stores/themeStore'

const Title = ({
	text,
	textColor,
	textSize,
	textstyle,
	textWeight,
	onPress,
	center,
}: {
	text: any
	textColor?: string
	textWeight?: any
	textSize?: number
	center?: boolean
	textstyle?: TextStyle | TextStyle[]
	onPress?: () => void
}) => {
	const currentTheme = useThemeStore((s) => s.theme)
	return (
		<Text
			onPress={onPress}
			style={[
				textstyle,
				{
					color: textColor ? textColor : currentTheme.tertiary,
					fontFamily: textWeight ? getMontserratFontFamily(textWeight) : getMontserratFontFamily('400'),
					fontSize: textSize ? textSize : 12,
					textAlign: center ? 'center' : 'auto',
				},
			]}
		>
			{text}
		</Text>
	)
}

export default Title

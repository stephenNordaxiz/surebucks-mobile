import { StyleSheet, View } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather'

import Title from './Title'
import { ThemeType } from '@/constants/theme'
import { useThemeStore } from '@/stores/themeStore'
import Row from './Row'

const BasicInfo = ({
	text,
	bgColor,
	icon,
}: {
	text?: string
	bgColor?: string
	icon?: boolean
}) => {
	const theme = useThemeStore((s) => s.theme)
	const styles = createStyles(theme, bgColor)
	return (
		<View style={styles.container}>
			{icon ? (
				<Row style={{ alignItems: 'center', gap: 10 }}>
					<Feather name="info" size={24} color="black" />
					<Title
						text={
							text ||
							'Your information is processed automatically by system and safely protected by SureBucks'
						}
						textWeight={'500'}
						textstyle={{ lineHeight: 20 }}
					/>
				</Row>
			) : (
				<Title
					text={
						text ||
						'Your information is processed automatically by system and safely protected by SureBucks'
					}
					textWeight={'500'}
					textstyle={{ lineHeight: 20 }}
				/>
			)}
		</View>
	)
}

export default BasicInfo

function createStyles(theme: ThemeType, bgColor: string | undefined) {
	return StyleSheet.create({
		container: {
			borderRadius: 10,
			backgroundColor: bgColor || '#AFD13833',
			padding: 12,
		},
	})
}

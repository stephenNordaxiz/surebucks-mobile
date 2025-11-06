/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Row from './Row'
import { SIZES } from '../constants'

import { useNavigation } from '@react-navigation/native'
import { useThemeStore } from '@/stores/themeStore'

const HeaderLogisticsButton = ({
	label,
	onPress,
	iconName,
	style,
}: {
	label: string
	onPress: () => void
	iconName?: any
	style?: ViewStyle
}) => {
	const currentTheme = useThemeStore((s) => s.theme)

	return (
		<TouchableOpacity onPress={onPress}>
			<Row style={[styles.row, style]}>
				{iconName && (
					<MaterialCommunityIcons name={iconName} size={18} color={currentTheme.lightPrimary} />
				)}
				<Text
					style={[
						styles.buttonText,
						{ fontWeight: 'bold', color: currentTheme.lightPrimary, marginLeft: 5 },
					]}
				>
					{label}
				</Text>
			</Row>
		</TouchableOpacity>
	)
}

const HeaderLogistics = ({
	mapShown,
	setMapShown,
	availableProperties,
}: {
	mapShown: boolean
	setMapShown: (bool: boolean) => void
	availableProperties: number
}) => {
	const currentTheme = useThemeStore((s) => s.theme)
	const navigation = useNavigation()
	const handleMapPress = () => {
		navigation.setOptions({ tabBarStyle: { display: 'flex' } })

		if (mapShown) return setMapShown(false)
		setMapShown(true)
	}

	return (
		<Row style={styles.container}>
			<Row style={styles.row}>
				<MaterialCommunityIcons name="map-marker" size={18} color={currentTheme.primary} />
				<Text style={[styles.buttonText, { color: currentTheme.subTitle }]}>
					{availableProperties ? `${availableProperties} Spaces Available` : `Search Spaces`}
				</Text>
				<HeaderLogisticsButton
					onPress={() => console.log('save')}
					label={'Save'}
					style={{ marginLeft: 10 }}
				/>
			</Row>

			<Row>
				<HeaderLogisticsButton onPress={() => console.log('sort')} label="Sort" iconName={'sort'} />
				{mapShown ? (
					<HeaderLogisticsButton
						onPress={handleMapPress}
						label="List"
						iconName={'format-list-bulleted'}
						style={{ marginLeft: 10 }}
					/>
				) : (
					<HeaderLogisticsButton
						onPress={handleMapPress}
						label="Map"
						iconName={'map-outline'}
						style={{ marginLeft: 10 }}
					/>
				)}
			</Row>
		</Row>
	)
}

export default HeaderLogistics
const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginHorizontal: SIZES.listMargin,
		marginVertical: 5,
	},
	row: {
		alignItems: 'center',
	},
	buttonText: {
		fontSize: 14,
	},
})

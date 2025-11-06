import { StyleSheet, TouchableOpacity, ViewStyle, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import * as Location from 'expo-location'

import { nav } from '@/utils/navigationService'
import { ROUTES } from '@/constants'
import { useThemeStore } from '@/stores/themeStore'
import { useMapStore } from '@/stores/mapStore'
import { ThemeType } from '@/constants/theme'

const CurrentLocationBtn = ({ style }: { style?: ViewStyle }) => {
	const theme = useThemeStore((s) => s.theme)
	const styles = createStyles(theme)
	const setlocationData = useMapStore((s) => s.setLocationData)

	const getLocation = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync()
		if (status !== 'granted') {
			alert('Permission to acess location was denied')
			return
		}
		const location = await Location.getCurrentPositionAsync()
		handleNavigate(location)
	}

	const handleNavigate = (location: Location.LocationObject) => {
		const lat = location.coords.latitude
		const lon = location.coords.longitude
		const boundingBox = [
			(lat - 0.048).toString(),
			(lat + 0.048).toString(),
			(lon - 0.041).toString(),
			(lon + 0.041).toString(),
		]
		setlocationData({
			location: 'Your Current Location',
			lat: lat.toString(),
			lon: lon.toString(),
			boundingBox,
		})
		nav(ROUTES.homeTab, {
			location: 'Your Current Location',
			lat: lat.toString(),
			lon: lon.toString(),
			boundingBox,
		})
	}
	return (
		<View style={[styles.container, style as ViewStyle]}>
			<FontAwesome name="location-arrow" size={30} style={styles.icon} color={theme.primary} />
			<TouchableOpacity onPress={async () => getLocation()}>
				<Text style={styles.text}>Use My Current Location</Text>
			</TouchableOpacity>
		</View>
	)
}

export default CurrentLocationBtn

function createStyles(theme: ThemeType) {
	return StyleSheet.create({
		container: {
			alignItems: 'center',
			flexDirection: 'row',
		},
		icon: {
			marginLeft: 5,
		},
		text: {
			marginLeft: 10,
			fontWeight: '600',
			color: theme.lightPrimary,
		},
	})
}

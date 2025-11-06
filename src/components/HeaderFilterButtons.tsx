/* eslint-disable @typescript-eslint/no-explicit-any */
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useThemeStore } from '@/stores/themeStore'

const HeaderFilterButtons = () => {
	const currentTheme = useThemeStore((s) => s.theme)
	const filterButtons = [
		{ iconName: 'filter-variant', onPress: () => console.log('filter all') },
		{ label: 'Price', onPress: () => console.log('Price') },
		{ label: 'Pets', onPress: () => console.log('Pets') },
		{ label: 'Move-in-date', onPress: () => console.log('Move in') },
		{ label: 'Test1', onPress: () => console.log('test1') },
		{ label: 'Test2', onPress: () => console.log('test2') },
		{ label: 'Test3', onPress: () => console.log('test3') },
		{ label: 'Test4', onPress: () => console.log('test4') },
	]
	return (
		<>
			<FlatList
				data={filterButtons}
				horizontal
				style={{ marginVertical: 10 }}
				showsHorizontalScrollIndicator={true}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }) => {
					if (item.iconName) {
						return (
							<TouchableOpacity
								onPress={item.onPress}
								style={[styles.button, { width: 48, borderColor: currentTheme?.subTitle }]}
							>
								<MaterialCommunityIcons
									style={styles.buttonText}
									name={item.iconName as any}
									size={32}
									color={currentTheme.primary}
								/>
							</TouchableOpacity>
						)
					}
					return (
						<TouchableOpacity
							onPress={item.onPress}
							style={[styles.button, { borderColor: currentTheme?.subTitle }]}
						>
							<Text style={[styles.buttonText, { color: currentTheme.primary }]}>{item.label}</Text>
						</TouchableOpacity>
					)
				}}
			/>
		</>
	)
}

export default HeaderFilterButtons

const styles = StyleSheet.create({
	button: {
		padding: 10,
		borderRadius: 30,
		borderWidth: 1,
		marginHorizontal: 3,
	},
	buttonText: {
		width: '100%',
		padding: 0,
		fontWeight: '600',
		fontSize: 14,
		textAlign: 'center',
	},
})

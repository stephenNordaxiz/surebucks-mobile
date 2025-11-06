/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

const ButtonList = ({
	data,
	header,
	style,
	borderTop,
	marginTop,
}: {
	data: { label: string; onPress: () => void }[]
	header?: string
	style?: ViewStyle | ViewStyle[]
	borderTop?: boolean
	marginTop?: boolean
}) => {
	return (
		<View style={[styles.container, style, { borderTopWidth: borderTop ? 1 : 0 }]}>
			{header && (
				<View style={[styles.headerContainer, { marginTop: marginTop ? 35 : 0 }]}>
					<Text style={styles.headerText}>{header}</Text>
				</View>
			)}
			{data.map((item, index) => (
				<Pressable
					key={index}
					onPress={item.onPress}
					style={({ pressed }) => {
						const arr: any[] = [styles.option, { backgroundColor: pressed ? '#ccc' : '#f2f2f2' }]
						if (index !== data.length - 1) arr.push(styles.container)
						return arr
					}}
				>
					<Text>{item.label}</Text>
				</Pressable>
			))}
		</View>
	)
}

export default ButtonList

const styles = StyleSheet.create({
	container: {
		borderColor: '#ccc',
		borderBottomWidth: 1,
	},
	headerContainer: {
		paddingVertical: 12,
		borderBottomWidth: 1,
		backgroundColor: '#f1f7e5',
		borderBottomColor: '#ccc',
	},
	headerText: {
		fontWeight: '600',
		marginLeft: 18,
	},
	option: {
		paddingVertical: 12,
		paddingHorizontal: 18,
	},
})

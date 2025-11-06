/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import Row from './Row'
import BlackDot from './BlackDot'

const BulletedList = ({
	data,
	heading,
	style,
}: {
	data: string[]
	heading?: string
	style?: ViewStyle | ViewStyle[]
}) => {
	const rows: any[] = []
	for (let i = 0; i < data.length; i++) {
		let component
		if (data.length - i >= 2) {
			component = (
				<Row style={styles.mainRow}>
					<View style={styles.secondaryRow}>
						<BlackDot style={styles.blackDot} />
						<Text style={styles.secondaryText}>{data[i]}</Text>
					</View>
					<View style={styles.secondaryRow}>
						<BlackDot style={styles.blackDot} />
						<Text style={styles.secondaryText}>{data[i + 1]}</Text>
					</View>
				</Row>
			)
		} else {
			component = (
				<Row style={styles.mainRow}>
					<View style={styles.secondaryRow}>
						<BlackDot style={styles.blackDot} />
						<Text style={styles.secondaryText}>{data[i]}</Text>
					</View>
				</Row>
			)
		}
		rows.push(component)
		i++
	}
	return (
		<View style={[style, styles.container]}>
			{heading ? <Text style={styles.heading}>{heading}</Text> : null}
			{rows.map((item, index) => (
				<View key={index} style={styles.rows}>
					{item}
				</View>
			))}
		</View>
	)
}

export default BulletedList

const styles = StyleSheet.create({
	mainRow: {
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	secondaryRow: {
		paddingVertical: 5,
		width: '45%',
		flexDirection: 'row',
	},
	blackDot: {
		alignSelf: 'flex-start',
	},
	secondaryText: {},
	container: {
		paddingHorizontal: 5,
		paddingVertical: 10,
	},
	heading: {
		paddingVertical: 8,
	},
	rows: {},
})

import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

import Row from './Row'

const OrDivider = ({ or, style }: { or?: boolean; style?: ViewStyle }) => {
	if (!or)
		return (
			<Row style={[style as ViewStyle, styles.container]}>
				<View style={styles.fullDivider} />
			</Row>
		)
	return (
		<Row style={[style as ViewStyle, styles.container]}>
			<View style={styles.divider} />
			<Text style={styles.orText}>or</Text>
			<View style={styles.divider} />
		</Row>
	)
}

export default OrDivider

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: 'transparent',
	},
	orText: {
		paddingHorizontal: 10,
		marginTop: -5,
		color: '#d3d3d3',
	},
	divider: {
		borderBottomColor: '#d3d3d3',
		width: '45%',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	fullDivider: {
		borderBottomColor: '#d3d3d3',
		width: '100%',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
})

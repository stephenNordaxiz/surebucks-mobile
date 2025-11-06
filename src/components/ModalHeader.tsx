import { StyleSheet, ViewStyle, Text, View, Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'

import Row from './Row'
import { goBack } from '@/utils/navigationService'

const ModalHeader = ({
	xShown,
	text,
	style,
}: {
	xShown?: boolean
	text?: string
	style?: ViewStyle | ViewStyle[]
}) => {

	if (text) {
		return (
			<Row style={[styles.container, style as ViewStyle]}>
				{xShown ? (
					<MaterialCommunityIcons
						style={styles.x}
						name="close"
						onPress={() => goBack()}
						size={24}
						color={`#ccc`}
					/>
				) : null}
				<Text style={styles.text}>{text}</Text>
			</Row>
		)
	}

	return (
		<View style={[styles.container, style as ViewStyle]}>
			<Pressable style={styles.bar} 	onPress={() => goBack()} />
		</View>
	)
}

export default ModalHeader

const styles = StyleSheet.create({
	x: {
		position: 'absolute',
		alignSelf: 'center',
		left: 10,
	},
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#a4a4a4',
		padding: 15,
	},
	bar: {
		width: 50,
		height: 4,
		borderRadius: 30,
		backgroundColor: '#a4a4a4',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
	},
})

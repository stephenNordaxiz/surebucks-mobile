import { StyleSheet, ViewStyle, Pressable, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { Scores } from '@/types/scores'
import { openURL } from '@/utils'

const ScoreCard = ({ score, style }: { score: Scores; style?: ViewStyle | ViewStyle[] }) => {
	const handlePress = () => {
		const url = 'https://www.redfin.com/how-walk-score-works'
		openURL(url)
	}
	return (
		<Pressable
			onPress={handlePress}
			style={({ pressed }) =>
				pressed ? [styles.container, style, styles.activeBackground] : [styles.container, style]
			}
		>
			<View style={styles.row}>
				<Text style={styles.scoreType}>
					{score.type} Score
					<MaterialCommunityIcons name="registered-trademark" color={'black'} size={16} />
				</Text>
				<Text style={styles.text}>{score.score}</Text>
			</View>
			<Text style={styles.scoreDesc}>{score.description}</Text>
		</Pressable>
	)
}

export default ScoreCard

const styles = StyleSheet.create({
	container: {
		borderRadius: 5,
		borderColor: '#ccc',
		justifyContent: 'space-between',
		width: 250,
		padding: 12,
		borderWidth: 1,
	},
	activeBackground: {
		backgroundColor: '#ccc',
	},
	text: {
		marginLeft: 15,
		fontSize: 20,
		fontWeight: 'bold',
	},
	scoreType: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	row: {
		alignItems: 'center',
		paddingVertical: 15,
		flexDirection: 'row',
	},
	scoreDesc: {
		fontSize: 18,
	},
})

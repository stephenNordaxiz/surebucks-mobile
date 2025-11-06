import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { Review } from '@/types/review'
import Row from './Row'
import Stars from './Stars'
import TextMoreOrLess from './TextMoreOrLess'
import { useThemeStore } from '@/stores/themeStore'

const getFormattedDate = (date: Date) => {
	const dateStr = date.toDateString() // Sat Sep 1 2023
	const dateArr = dateStr.split(' ') // ['Sat', 'Sep', '1', '2023']
	return `${dateArr[1]} ${dateArr[2]} ${dateArr[3]}`
}

export const ReviewCard = ({
	review,
	style,
}: {
	review: Review
	style?: ViewStyle | ViewStyle[]
}) => {
	const theme = useThemeStore((s) => s.theme)
	return (
		<View style={[style, styles.container]}>
			<Row style={styles.row}>
				<Stars score={review.stars} />
				<Text style={{ color: theme.subTitle }}>
					{getFormattedDate(new Date(review.created_at))}
				</Text>
			</Row>
			<Text style={styles.reviewTitle}>{review.title}</Text>
			<TextMoreOrLess initialLine={10} style={styles.reviewBody}>
				{review.body}
			</TextMoreOrLess>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 10,
		paddingVertical: 15,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		width: 300,
		padding: 10,
	},
	row: {
		alignItems: 'center',
		marginBottom: 10,
	},
	scoreText: {
		fontSize: 18,
	},
	reviewTitle: {
		fontSize: 16,
		flexShrink: 1,
		fontWeight: 'bold',
		textTransform: 'capitalize',
		marginBottom: 5,
	},
	reviewBody: {
		// fontSize: 14,
	},
})

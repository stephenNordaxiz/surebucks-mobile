import { ViewStyle } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Row from './Row'
import { useThemeStore } from '@/stores/themeStore'

const Stars = ({ score, style }: { score: number; style?: ViewStyle | ViewStyle[] }) => {
	const theme = useThemeStore((s) => s.theme)
	return (
		<Row style={style}>
			{[1, 2, 3, 4, 5].map((item, index) => {
				const decimalValue = score % 1
				const compareScore = score | 0 // will truncate the decimals

				//should hit all of the stars that need to be filled
				if (score / item >= 1)
					return <MaterialCommunityIcons key={item} name="star" size={24} color={theme.primary} />
				else if (decimalValue > 0 && compareScore === index)
					if (decimalValue > 0.5)
						return (
							<MaterialCommunityIcons
								key={item}
								name="star-half-full"
								size={24}
								color={theme.primary}
							/>
						)
				return (
					<MaterialCommunityIcons key={item} name="star-outline" size={24} color={theme.primary} />
				)
			})}
		</Row>
	)
}
export default Stars

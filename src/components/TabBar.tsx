import { StyleSheet, TouchableOpacity, Text, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import Row from './Row'
import { useThemeStore } from '@/stores/themeStore'
type tabType = {
	title: string
	onPress: () => void
}

const TabBar = ({
	tabs,
	style,
}: {
	tabs: tabType[]
	style?: ViewStyle | ViewStyle[] | undefined
}) => {
	const [activeIndex, setActiveIndex] = useState(0)
	const theme = useThemeStore((s) => s.theme)

	const handlePress = (index: number, func: () => void) => {
		setActiveIndex(index)
		func()
	}

	return (
		<Row style={style}>
			{tabs?.map((item: tabType, index: number) => (
				<TouchableOpacity
					onPress={() => handlePress(index, item.onPress)}
					style={[
						styles.marginRight,
						{
							borderTopColor: activeIndex === index ? theme.primary : '',
							borderTopWidth: activeIndex === index ? 3 : 0,
							paddingTop: activeIndex === index ? 0 : 3,
						},
					]}
					key={item.title}
				>
					<Text
						style={[
							styles.text,
							{
								color: activeIndex === index ? theme.primary : '#ccc',
							},
						]}
					>
						{item.title}
					</Text>
				</TouchableOpacity>
			))}
		</Row>
	)
}

export default TabBar

const styles = StyleSheet.create({
	marginRight: {
		marginRight: 15,
	},
	text: {
		fontSize: 14,
	},
})

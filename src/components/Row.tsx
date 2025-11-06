import React, { ReactNode } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'

type RowProps = {
	children: ReactNode
	// style?: StyleProp<ViewStyle>
	style?: ViewStyle| ViewStyle[]
}

// const Row: React.FC<RowProps> = ({ children, style }) => {
const Row = ({ children, style }:RowProps) => {
	return <View style={[styles.container, style]}>{children}</View>
}

export default Row

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
})

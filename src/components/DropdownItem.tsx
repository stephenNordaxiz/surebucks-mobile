/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image, Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'

import Row from './Row'
import Title from './Title'
import Demarcator from './Demarcator'
import { useThemeStore } from '@/stores/themeStore'

const Dropdownitem = ({
	item,
	provider,
	handleSelect,
}: {
	item: any
	provider: any
	handleSelect: (item: any) => void
}) => {
	const currentTheme = useThemeStore((s) => s.theme)
	return (
		<Pressable
			key={item?.serviceID || item?.id}
			style={{ marginVertical: 3, gap: 5 }}
			onPress={() => handleSelect(item)}
		>
			<Row style={{ alignItems: 'center', gap: 10 }}>
				{item?.icon}
				{item?.img && (
					<Image
						source={item?.img}
						style={{ width: 30, height: 30, borderRadius: 10, resizeMode: 'contain' }}
					/>
				)}
				<Row
					style={{
						justifyContent: 'space-between',
						flex: 1,
					}}
				>
					<Title text={item?.name} textWeight={provider?.name === item?.name ? '600' : '400'} />
					{provider?.name === item?.name && (
						<MaterialIcons name="check" size={20} color={currentTheme.primary} />
					)}
				</Row>
			</Row>
			<Demarcator height={1} style={{ marginTop: 10 }} />
		</Pressable>
	)
}

export default Dropdownitem

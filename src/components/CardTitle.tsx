/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import Row from './Row'
import Title from './Title'
import Demarcator from './Demarcator'
import { COLORS } from '@/constants'

const CardTitle = ({
	leftTitle,
	rightTitle,
	icon,
	editIcon,
	onPress,
	rightColor,
	rightSize,
	leftColor,
	leftSize,
	demarcator,
	gap,
	leftWeight,
	rightWeight,
}: {
	leftTitle: string
	rightTitle?: string
	rightColor?: string
	rightSize?: number
	leftColor?: string
	leftWeight?: string
	rightWeight?: string
	leftSize?: number
	icon?: any
	demarcator?: boolean
	editIcon?: boolean
	gap?: number
	onPress?: () => void
}) => {
	if (demarcator) {
		return (
			<Pressable onPress={onPress} style={{ gap: gap || 10 }}>
				<Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
					<Title
						text={leftTitle}
						textWeight={leftWeight || '500'}
						textSize={leftSize || 12}
						textColor={leftColor || COLORS.lightGray3}
						textstyle={{ maxWidth: '50%' }}
					/>
					{rightTitle && (
						<Title
							text={rightTitle}
							textWeight={rightWeight || '400'}
							textSize={rightSize || 12}
							textColor={rightColor || COLORS.tertiary}
							textstyle={{ maxWidth: '50%' }}
						/>
					)}
					{icon ? (
						icon
					) : editIcon ? (
						<AntDesign onPress={onPress} name="edit" size={20} color={COLORS.lightGray3} />
					) : null}
				</Row>
				<Demarcator height={1} />
			</Pressable>
		)
	}
	return (
		<Pressable onPress={onPress}>
			<Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
				<Title
					text={leftTitle}
					textSize={leftSize || 12}
					textWeight={leftWeight || '400'}
					textColor={leftColor || COLORS.lightGray3}
					textstyle={{ maxWidth: '50%' }}
				/>
				{rightTitle && (
					<Title
						text={rightTitle}
						textWeight={rightWeight || '400'}
						textSize={rightSize || 12}
						textColor={rightColor || COLORS.tertiary}
						textstyle={{ maxWidth: '50%' }}
					/>
				)}
				{icon ? (
					icon
				) : editIcon ? (
					<AntDesign onPress={onPress} name="edit" size={20} color={COLORS.lightGray3} />
				) : null}
			</Row>
		</Pressable>
	)
}

export default CardTitle

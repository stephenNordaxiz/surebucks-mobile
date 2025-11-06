/* eslint-disable @typescript-eslint/no-explicit-any */
import { View } from 'react-native'
import React from 'react'
import Title from '../Title'
import SubmitBtn from '../SubmitBtn'
import Row from '../Row'
import { COLORS } from '@/constants'
import { useThemeStore } from '@/stores/themeStore'

const TwoBtneModal = ({
	title,
	desc,
	btnColor1,
	btnColor2,
	btnTitle1,
	btnTitle2,
	onPress1,
	onPress2,
	onlyBtn1,
	icon,
}: {
	title: string
	desc: string
	btnTitle1: string
	btnTitle2?: string
	onPress1: () => void
	onPress2?: () => void
	btnColor1?: string
	btnColor2?: string
	onlyBtn1?: boolean
	icon?: any
}) => {
	const currentTheme = useThemeStore((s) => s.theme)
	return (
		<View style={{ alignItems: 'center', marginTop: -20, gap: 15 }}>
			{icon}
			<Title text={title} textWeight={'600'} textSize={16} />
			<Title text={desc} textstyle={{ lineHeight: 20 }} center />
			{onlyBtn1 ? (
				<SubmitBtn
					btnHeight={40}
					onPress={onPress1}
					title={btnTitle1}
					fontSize={16}
					bgColor={btnColor1 || COLORS.red0[500]}
				/>
			) : (
				<Row style={{ justifyContent: 'space-around', gap: 10 }}>
					<SubmitBtn
						btnWidth={'43%'}
						btnHeight={40}
						title={btnTitle2}
						outlined
						borderColor={currentTheme.subTitle}
						onPress={onPress2}
						textColor={currentTheme.tertiary}
						fontSize={16}
						bgColor={btnColor2 || currentTheme.tertiary}
					/>
					<SubmitBtn
						btnWidth={'43%'}
						btnHeight={40}
						onPress={onPress1}
						title={btnTitle1}
						fontSize={16}
						bgColor={btnColor1 || COLORS.red0[500]}
					/>
				</Row>
			)}
		</View>
	)
}
export default TwoBtneModal

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

import { COLORS } from '@/constants'
import Row from './Row'
import Demarcator from './Demarcator'
import Title from './Title'
import { useThemeStore } from '@/stores/themeStore'

const CardButton = ({
	text,
	img,
	label,
	onPress,
	bgColorIcon,
	padded,
	icon,
	expiry,
	noIcon,
	noRightIcon = true,
	rightIcon,
	style,
	activeBorder = 'transparent',
	demarcator,
	rounded,
	textWeight,
	textSize,
	textColor,
	iconHeight,
	iconWidth,
	bgColor,
}: {
	text: string
	img?: any
	bgColor?: string
	bgColorIcon?: string
	onPress?: () => void
	label?: string
	iconHeight?: number
	iconWidth?: number
	padded?: boolean
	icon?: ReactNode
	expiry?: string
	activeBorder?: string
	rightIcon?: any
	noIcon?: boolean
	noRightIcon?: boolean
	demarcator?: boolean
	style?: ViewStyle | ViewStyle[]
	rounded?: boolean
	textWeight?: string
	textColor?: string
	textSize?: number
}) => {
	const currentTheme = useThemeStore((s) => s.theme)
	if (noIcon) {
		return (
			<TouchableOpacity
				style={
					padded
						? [
								style,
								styles.cardButton,
								{ padding: 20, backgroundColor: bgColor || currentTheme.background1 },
							]
						: [style, styles.cardButton, { backgroundColor: bgColor || currentTheme.background1 }]
				}
				onPress={onPress}
			>
				{label && <Text style={[styles.cardLabel, { color: currentTheme.subTitle }]}>{label}</Text>}
				<Row
					style={[
						styles.cardButtonWrapper,
						{
							borderColor: activeBorder,
						},
					]}
				>
					<Row style={[styles.cardTextWrapper, { width: '100%', padding: 5 }]}>
						{expiry ? (
							<View style={{ gap: 8, paddingVertical: 8 }}>
								<Title
									text={text}
									textWeight={textWeight || '600'}
									textSize={textSize || 14}
									textColor={textColor || currentTheme.tertiary}
								/>
								<Text
									style={{
										fontSize: 12,
										fontWeight: '400',
										color: currentTheme.subTitle,
									}}
								>
									{expiry}
								</Text>
							</View>
						) : (
							<Title
								text={text}
								textWeight={textWeight || '400'}
								textSize={textSize || 14}
								textColor={textColor || currentTheme.subTitle}
							/>
						)}

						{rightIcon ? (
							rightIcon
						) : (
							<View style={styles.backBtn}>
								<MaterialIcons name="keyboard-arrow-right" size={18} color={currentTheme.primary} />
							</View>
						)}
					</Row>
				</Row>
			</TouchableOpacity>
		)
	}
	return (
		<TouchableOpacity
			style={
				padded
					? [
							style,
							styles.cardButton,
							{ padding: 20, backgroundColor: bgColor || currentTheme.background1 },
						]
					: [style, styles.cardButton, { backgroundColor: bgColor || currentTheme.background1 }]
			}
			onPress={onPress}
		>
			{label && <Text style={[styles.cardLabel, { color: currentTheme.subTitle }]}>{label}</Text>}
			<Row
				style={[
					styles.cardButtonWrapper,
					{
						justifyContent: 'space-between',
						borderColor: activeBorder,
					},
				]}
			>
				<Row style={{ gap: 13, alignItems: 'center' }}>
					{img ? (
						<Image
							source={img}
							style={{ borderRadius: 10, width: 32, height: 32, resizeMode: 'contain' }}
						/>
					) : (
						<View
							style={{
								width: iconWidth || 50,
								height: iconHeight || 50,
								backgroundColor: bgColorIcon || currentTheme.primary,
								borderRadius: rounded ? 1000 : 20,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							{icon ? (
								icon
							) : (
								<Ionicons name="wallet" size={26} color={bgColorIcon || currentTheme.primary} />
							)}
						</View>
					)}
					{expiry ? (
						<View style={{ gap: 6, paddingVertical: 8 }}>
							<Title
								text={text}
								textWeight={textWeight || '600'}
								textSize={textSize || 16}
								textColor={textColor || currentTheme.tertiary}
							/>

							<Text
								style={{
									fontSize: 12,
									fontWeight: '400',
									fontFamily: 'Poppins',
									color: currentTheme.subTitle,
								}}
							>
								{expiry}
							</Text>
						</View>
					) : (
						<Title
							text={text}
							textWeight={textWeight || '400'}
							textSize={textSize || 14}
							textColor={textColor || currentTheme.tertiary}
						/>
					)}
				</Row>
				{noRightIcon && (
					<Row style={styles.cardTextWrapper}>
						{rightIcon ? (
							rightIcon
						) : (
							<View style={styles.backBtn}>
								<MaterialIcons name="keyboard-arrow-right" size={18} color={COLORS.primary} />
							</View>
						)}
					</Row>
				)}
			</Row>
			{demarcator && <Demarcator height={1} style={{ marginTop: 4 }} />}
		</TouchableOpacity>
	)
}

export default CardButton

const styles = StyleSheet.create({
	backBtn: {
		padding: 3,
		backgroundColor: COLORS.lightGray11,
		borderRadius: 50,
		width: 25,
		height: 25,
		marginRight: 8,
	},
	cardLabel: {
		paddingVertical: 6,
		color: COLORS.lightGray3,
		fontSize: 12,
	},
	cardButton: {
		backgroundColor: COLORS.white,
		borderRadius: 20,
	},
	cardButtonWrapper: {
		padding: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: COLORS.lightGray6,
		alignItems: 'center',
		gap: 10,
		width: '100%',
	},
	cardTextWrapper: {
		justifyContent: 'space-between',
		alignItems: 'center',
	},
})

import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import { useNavigation } from "@react-navigation/native";

import ModalView from './Modal'
import { COLORS, SIZES } from '../constants'
import SubmitBtn from './SubmitBtn'
import React, { ReactNode } from 'react'
import Row from './Row'
import { useThemeStore } from '@/stores/themeStore'
import { ThemeType } from '@/constants/theme'

const CustomModal = ({
	modalVisible,
	titleText,
	subTitleText,
	closeModal,

	btnText,
	btnText1,
	btnText2,
	small,
	children,
	onPress,
	btn = true,
	noBtn,
	// btnBgColor1,
	btnBgColor2,
	onPress1,
	onPress2,
	padded,
	hanger = true,
	center,
	closable,
}: {
	modalVisible: boolean
	titleText?: string
	subTitleText?: string

	closeModal: () => void
	onPress?: () => void
	onPress1?: () => void
	onPress2?: () => void
	type?: string
	btnText?: string
	btnText1?: string
	btnText2?: string
	btnBgColor1?: string
	btnBgColor2?: string
	small?: boolean
	children?: ReactNode
	btn?: boolean
	noBtn?: boolean
	btn1?: boolean
	btn2?: boolean
	hanger?: boolean
	center?: boolean
	padded?: boolean
	closable?: boolean
}) => {
	const currentTheme = useThemeStore((s) => s.theme)
	const styles = createStyles(currentTheme)
	// const currentTheme = useSelector(selectTheme); // Directly get the theme from Redux
	// const navigation = useNavigation();
	const backgroundCloseModal = () => {
		if (closable) {
			closeModal()
		}
	}
	const handlePress = () => {
		if (onPress) {
			onPress()
			closeModal()
		}
	}
	const handlePress1 = () => {
		if (onPress1) {
			onPress1()
			closeModal()
		}
	}
	const handlePress2 = () => {
		if (onPress2) {
			onPress2()
			closeModal()
		}
	}
	if (closable) {
		return (
			<ModalView transparent={true} modalVisible={modalVisible}>
				<TouchableOpacity
					activeOpacity={1}
					onPress={backgroundCloseModal}
					style={
						padded
							? [
									styles.modalPadding,
									styles.modalContainer,
									{ justifyContent: center ? 'center' : 'flex-end' },
								]
							: [styles.modalContainer, { justifyContent: center ? 'center' : 'flex-end' }]
					}
				>
					<TouchableOpacity activeOpacity={1} style={[styles.modalView]}>
						<View style={styles.menuWrapper}>
							{hanger && <Pressable style={styles.hanger} onPress={closeModal} />}

							{titleText && (
								<Text style={small ? [styles.modalHeader, { fontSize: 20 }] : styles.modalHeader}>
									{titleText}
								</Text>
							)}
							<View style={{ width: '100%', gap: 6 }}>
								{children}
								{subTitleText && (
									<View style={styles.modalFeaturesContainer}>
										<Text
											style={
												small ? [styles.modalFeatures, { fontSize: 16 }] : styles.modalFeatures
											}
										>
											{subTitleText}
										</Text>
									</View>
								)}
							</View>
							{noBtn ? null : (
								<View style={{ width: '100%' }}>
									{btn ? (
										<SubmitBtn title={btnText} onPress={handlePress} />
									) : (
										<Row
											style={{
												alignItems: 'center',
												gap: 15,
												justifyContent: 'space-between',
											}}
										>
											<View style={{ width: '45%' }}>
												<SubmitBtn
													bgColor={COLORS.lightGray13}
													textColor={COLORS.primary}
													title={btnText1}
													fontSize={16}
													onPress={handlePress1}
												/>
											</View>
											<View style={{ width: '45%' }}>
												<SubmitBtn
													bgColor={btnBgColor2 || COLORS.primary}
													textColor={COLORS.white}
													title={btnText2}
													fontSize={16}
													onPress={handlePress2}
												/>
											</View>
										</Row>
									)}
								</View>
							)}
						</View>
					</TouchableOpacity>
				</TouchableOpacity>
			</ModalView>
		)
	} else {
		return (
			<ModalView transparent={true} modalVisible={modalVisible}>
				<View
					style={
						padded
							? [
									styles.modalPadding,
									styles.modalContainer,
									{ justifyContent: center ? 'center' : 'flex-end' },
								]
							: [styles.modalContainer, { justifyContent: center ? 'center' : 'flex-end' }]
					}
				>
					<View style={styles.modalView}>
						{hanger && <Pressable style={styles.hanger} onPress={closeModal} />}

						{titleText && (
							<Text style={small ? [styles.modalHeader, { fontSize: 20 }] : styles.modalHeader}>
								{titleText}
							</Text>
						)}
						<View style={{ width: '100%', gap: 6 }}>
							{children}
							{subTitleText && (
								<View style={styles.modalFeaturesContainer}>
									<Text
										style={small ? [styles.modalFeatures, { fontSize: 16 }] : styles.modalFeatures}
									>
										{subTitleText}
									</Text>
								</View>
							)}
						</View>
						{noBtn ? null : (
							<View style={{ width: '100%' }}>
								{btn ? (
									<SubmitBtn title={btnText} onPress={handlePress} />
								) : (
									<Row
										style={{
											alignItems: 'center',
											gap: 15,
											justifyContent: 'space-between',
										}}
									>
										<View style={{ width: '45%' }}>
											<SubmitBtn
												bgColor={COLORS.lightGray13}
												textColor={COLORS.primary}
												title={btnText1}
												fontSize={16}
												onPress={handlePress1}
											/>
										</View>
										<View style={{ width: '45%' }}>
											<SubmitBtn
												bgColor={btnBgColor2 || COLORS.primary}
												textColor={COLORS.white}
												title={btnText2}
												fontSize={16}
												onPress={handlePress2}
											/>
										</View>
									</Row>
								)}
							</View>
						)}
					</View>
				</View>
			</ModalView>
		)
	}
}

export default CustomModal

function createStyles(currentTheme: ThemeType) {
	return StyleSheet.create({
		modalContainer: {
			flex: 1,
			backgroundColor: COLORS.modalbg,
			position: 'relative',
		},
		modalPadding: {
			paddingHorizontal: SIZES.padding / 2,
			paddingBottom: 20,
		},
		modalView: {
			backgroundColor: currentTheme.background1,
			borderRadius: 20,
			padding: 25,
			alignItems: 'center',
			shadowColor: '#000',
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 5,
		},
		modalView2: {
			backgroundColor: 'white',
			borderRadius: 20,
			padding: 35,
			alignItems: 'flex-end',
			shadowColor: '#000',
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 5,
		},
		menuWrapper: {
			marginVertical: 10,
			width: '100%',
		},
		closeBtn: {
			alignSelf: 'flex-end',
			marginTop: -15,
		},
		modalHeader: {
			fontSize: 24,
			fontWeight: 'bold',
			textAlign: 'center',
			marginBottom: 10,
			color: COLORS.primary,
		},
		modalsubHeader: {
			fontSize: 16,
			fontFamily: 'Roboto',
			marginTop: 5,
			marginBottom: 10,
		},
		modalFeaturesContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: 20,
		},
		modalFeatures: {
			color: COLORS.gray2,
			fontSize: 18,
			fontWeight: '400',
			fontFamily: 'Urbanist',
			textAlign: 'center',
		},
		modalWrapper: {
			backgroundColor: 'white',
			alignItems: 'center',
			justifyContent: 'center',
		},
		hanger: {
			backgroundColor: currentTheme.background,
			width: 85,
			height: 5,
			borderRadius: 5,
			marginBottom: 10,
		},
	})
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { FlatList, Pressable, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { ReactNode, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

import { useThemeStore } from '@/stores/themeStore'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SIZES } from '@/constants'
import { COLORS, ThemeType } from '@/constants/theme'
import { CView, ImageCarouselAds, LoanItem, RoundedImg, Row, SubmitBtn, Title } from '@/components'
import images from '@/constants/images'
import { greeting } from '@/utils/dateFormat'
import { nairaSymbol } from '@/utils'
import {
	ArrowIcon,
	CashIcon,
	ChartIcon,
	FileCancelIcon,
	FileIcon,
	RegisterIcon,
	TimeChartIcon,
} from '@/constants/icons'
import { useAuthStore } from '@/stores/authStore'
import { nav } from '@/utils/navigationService'
import { useLoanStore } from '@/stores/loanStore'
import { hexToRgba } from '@/utils/checker'

const HomeScreen = () => {
	const kyc = useAuthStore((s) => s?.kyc)
	const theme = useThemeStore((s) => s?.theme)
	const styles = createStyles(theme)
	const { loans } = useLoanStore()
	const [activeLoan, setActiveLoan] = useState<any>([])
	const handleNotify = () => {
		nav('/profile/notifications')
	}
	const handleProfile = () => {
		nav('/tabs/profile')
	}
	
	const handleLoan = () => {
		if (activeLoan?.length > 0) {
			nav('/repay', { id: activeLoan[0]?.id })
		} else {
			if (kyc?.basic && kyc?.extra && kyc?.doc && kyc?.capture) {
				nav('/loan/request')
			} else {
				nav('/kyc')
			}
		}
	}
	// const delLoan = () => {
	// 	removeLoan(loans[0].id)
	// }
	useEffect(() => {
		if (loans) {
			const l1: any = loans.filter((s) => !s.paid)
			setActiveLoan(l1)
			// const l2: any = loans.filter((s) => s.paid)
			// const slicedL2 = l2?.slice(0, 3)
			// setPaidLoan(slicedL2)
		}
	}, [loans])
	const SmallIcon = ({
		text,
		width,
		height,
		onPress,
		bgColor,
		children,
	}: {
		text: string
		width?: number
		height?: number
		bgColor?: string
		children: ReactNode
		onPress?: () => void
	}) => {
		return (
			<Pressable onPress={onPress} style={styles.iconWrapper}>
				<View
					style={[
						styles.icon,
						{
							width: width || 27,
							height: height || 27,
							backgroundColor: bgColor || theme.secondary,
						},
					]}
				>
					{children}
				</View>
				<Title text={text} textSize={8} textWeight={'500'} />
			</Pressable>
		)
	}
	// console.log("he",Platform.OS, SIZES.height)
	const ProcessItems = () => {
		return (
			<View style={styles.process}>
				<Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
					<SmallIcon text={'Paperless Process'}>
						<FileCancelIcon />
					</SmallIcon>
					<SmallIcon text={'0.1% Interest'}>
						<ChartIcon />
					</SmallIcon>
					<SmallIcon text={'Fast Approval'}>
						<TimeChartIcon />
					</SmallIcon>
				</Row>
			</View>
		)
	}
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="light-content" backgroundColor={theme.primary} translucent />
			{/* primary color background */}
			<View style={styles.topHalfBackground} />

			{/* Content above background */}
			<View style={styles.content}>
				<Row style={{ gap: 10, alignItems: 'center', justifyContent: 'space-between' }}>
					<TouchableOpacity onPress={handleProfile} style={styles.notification}>
						<Row style={{ gap: 10, alignItems: 'center' }}>
							<RoundedImg img={images.yusuf} width={38} height={38} />
							<View>
								<Title text={greeting()} textColor="white" />
								<Title
									text={'John Doe'}
									textSize={16}
									textWeight={'600'}
									textColor={theme.secondary}
								/>
							</View>
						</Row>
					</TouchableOpacity>
					<TouchableOpacity onPress={handleNotify} style={styles.notification}>
						<Ionicons name="notifications-outline" size={24} color="white" />
						<View style={[styles.NotifierWrapper, { backgroundColor: COLORS.red0[500] }]} />
					</TouchableOpacity>
				</Row>
				{/* section 2 */}
				<View
					style={{
						backgroundColor: theme.background1,
						padding: 25,
						borderRadius: 20,
						marginTop: 30,
						gap: 6,
					}}
				>
					<Title
						text={activeLoan.length > 0 ? 'Active Loan Balance' : 'You loan limit up to'}
						textWeight={'500'}
						center
					/>
					{activeLoan.length > 0 ? (
						<View style={{ gap: 6 }}>
							<Title
								text={nairaSymbol(activeLoan[0]?.amountDue, 2)}
								textColor={theme.primary}
								textSize={28}
								textWeight={'600'}
								center
							/>
							<Title text={'Due Date: ' + activeLoan[0]?.dueDate} textWeight={'400'} center />
						</View>
					) : (
						<Title text={nairaSymbol(1000000, 2)} textSize={28} textWeight={'600'} center />
					)}
					{/* {activeLoan.length > 0 ? null : <ProcessItems />} */}
					{/* <SubmitBtn onPress={delLoan} title={'Del'} /> */}
					<SubmitBtn
						onPress={handleLoan}
						title={activeLoan?.length > 0 ? 'Repay Loan' : 'Get Loan now'}
					/>
					{loans.length > 1 && <ProcessItems />}
				</View>

				{loans?.length < 2 && (
					<View style={{ marginTop: 20 }}>
						<Row style={{ marginTop: 6, justifyContent: 'space-between' }}>
							<TouchableOpacity style={[styles.bigButton, styles.bigBtn1]}>
								<View>
									<Title text={'0.1%'} textSize={14} textWeight={'600'} />
									<Title text={'Interest'} textSize={10} textWeight={'300'} />
								</View>
								<View style={{ alignSelf: 'flex-end', justifyContent: 'flex-end' }}>
									<ChartIcon width={40} height={40} />
								</View>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.bigButton, styles.bigBtn2]}>
								<View>
									<Title text={'Fast'} textSize={14} textWeight={'600'} />
									<Title text={'Approval'} textSize={10} textWeight={'300'} />
								</View>
								<View style={{ alignSelf: 'flex-end', justifyContent: 'flex-end' }}>
									<TimeChartIcon width={40} height={40} />
								</View>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.bigButton, styles.bigBtn3]}>
								<View>
									<Title text={'Paperless'} textSize={14} textWeight={'600'} />
									<Title text={'Process'} textSize={10} textWeight={'300'} />
								</View>
								<View style={{ alignSelf: 'flex-end', justifyContent: 'flex-end' }}>
									<FileCancelIcon width={40} height={40} />
								</View>
							</TouchableOpacity>
						</Row>
					</View>
				)}

				{/* <View style={{ marginVertical: 20 }}>
					<Title text={'Quick Links'} textWeight={'600'} textColor={theme.tertiary} />
					<Row style={{ marginTop: 6, justifyContent: 'space-between' }}>
						<TouchableOpacity style={styles.bigButton}>
							<WithdrawIcon />
							<Title text={'Withdraw'} textSize={11} textWeight={'500'} center />
						</TouchableOpacity>
						<TouchableOpacity style={styles.bigButton2}>
							<TransferIcon />
							<Title text={'Transfer'} textSize={11} textWeight={'500'} center />
						</TouchableOpacity>
					</Row>
				</View> */}

				{loans?.length > 0 ? (
					<View style={{ gap: 8, marginTop: 20 }}>
						<Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
							<Title text={'Loan History'} textWeight={'600'} textColor={theme.tertiary} />
							<Title
								text={'See all'}
								textWeight={'400'}
								textColor={theme.tertiary}
								textSize={10}
								onPress={() => nav('/loan/history')}
								textstyle={{ textDecorationLine: 'underline' }}
							/>
						</Row>

						<FlatList
							data={loans?.slice(0, 2).sort((a, b) => b.date - a.date)}
							showsVerticalScrollIndicator={false}
							keyExtractor={(item) => item?.id}
							renderItem={({ item }) => (
								<LoanItem item={item} onPress={() => nav('/loan/detail', { id: item?.id })} />
							)}
						/>
					</View>
				) : (
					<CView style={{ marginTop: 20 }}>
						<Title text={'Application Process'} textWeight={'600'} textColor={theme.tertiary} />

						<Row style={{ alignItems: 'center', justifyContent: 'space-around', marginTop: 16 }}>
							<SmallIcon text="Register" bgColor="#236A3533">
								<RegisterIcon />
							</SmallIcon>
							<ArrowIcon />
							<SmallIcon text="Complete Your KYC" bgColor="#F8921E1A">
								<FileIcon />
							</SmallIcon>
							<ArrowIcon />
							<SmallIcon text="Get Money" bgColor="#612BDD1A">
								<CashIcon />
							</SmallIcon>
						</Row>
					</CView>
				)}
				<ImageCarouselAds images={[images.promo, images.promo]} />
			</View>
		</SafeAreaView>
	)
}

export default HomeScreen

function createStyles(theme: ThemeType) {
	return StyleSheet.create({
		container: {
			flex: 1,
		},
		topHalfBackground: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			height: SIZES.height > 820 ? SIZES.height / 3.4 : SIZES.height / 3, // cover half screen
			backgroundColor: theme.primary, // blue
			zIndex: -1, // behind content
			borderBottomLeftRadius: 50,
			borderBottomRightRadius: 50,
		},
		content: {
			flex: 1,
			// paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10,
			paddingTop: 10,
			paddingHorizontal: 20,
		},
		notification: {
			position: 'relative',
		},
		NotifierWrapper: {
			position: 'absolute',
			top: 0,
			right: 0,
			width: 7,
			height: 7,
			borderRadius: 50,
		},
		process: {
			paddingVertical: 10,
			paddingHorizontal: 20,
			backgroundColor: '#AFD1381A',
			marginTop: 10,
			borderRadius: 10,
		},

		bigButton: {
			paddingVertical: 14,
			paddingHorizontal: 12,
			borderRadius: 10,
			justifyContent: 'space-between',

			height: 115,
			width: SIZES.width / 3 - 20,
			gap: 6,
		},
		bigBtn1: {
			backgroundColor: hexToRgba(theme.secondary, 0.2),
		},
		bigBtn2: {
			backgroundColor: '#ACFFAC4D',
		},
		bigBtn3: {
			backgroundColor: 'white',
		},
		iconBtn: {
			width: 33.5,
			height: 33.5,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 8,
		},
		iconWrapper: {
			justifyContent: 'center',
			alignItems: 'center',
			gap: 6,
		},
		icon: {
			borderRadius: 20,
			alignItems: 'center',
			justifyContent: 'center',
		},
	})
}

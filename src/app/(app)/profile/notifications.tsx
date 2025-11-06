import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'

import { Row, Screen, SubmitBtn, Title } from '@/components'
import images from '@/constants/images'
import { nav } from '@/utils/navigationService'
import { useThemeStore } from '@/stores/themeStore'

import { COLORS, ThemeType } from '@/constants/theme'
import { getMontserratFontFamily, hexToRgba } from '@/utils/checker'
// import { formatNotificationDateTime } from '@/utils/dateFormat'

const NotificationScreen = () => {
	const theme = useThemeStore((s) => s?.theme)
	const styles = createStyles(theme)
	const [noti, setNoti] = useState<boolean>(false)

	const handlePress = () => {
		nav('/tabs/home')
	}

	const NotificationCard = ({
		notificationTitle,
		notificationDesc,
		// notificationAction,
		time,
		// read,
		// onPress,
	}: {
		notificationTitle: string
		notificationDesc: string
		time: string
		// notificationAction?: string;
		// read: boolean
		// onPress?: () => void
	}) => {
		const [read, setRead] = useState(false)
		// Directly get the theme from Redux
		return (
			<TouchableOpacity style={styles.card} onPress={() => setRead(!read)}>
				{/* <TouchableOpacity style={styles.card} onPress={onPress}> */}
				<Row style={styles.row}>
					<Text style={styles.accountSubText}>{notificationTitle}</Text>
					<View
						style={[
							styles.copyIcon,
							{
								backgroundColor: read
									? hexToRgba(theme.primary, 0.2)
									: hexToRgba(theme.secondary, 0.2),
							},
						]}
					>
						<Title text={read ? 'Unread' : 'Read'} textSize={10} textWeight={'300'} />
					</View>
				</Row>
				<View>
					<View style={{ gap: 10 }}>
						<Text style={styles.accountText}>{notificationDesc}</Text>
						{/* <Text style={styles.accountText}>{notificationAction}</Text> */}
						<Row style={styles.row}>
							<Text style={styles.time}>{time}</Text>
							<Row style={{ alignItems: 'center', gap: 2 }}>
								<Title textSize={10} textWeight={'500'} textColor={theme.primary} text={'View'} />
								<AntDesign name="right" size={10} color={theme.primary} />
							</Row>
						</Row>
					</View>
				</View>
				<View style={styles.demarcator} />
			</TouchableOpacity>
		)
	}
	return (
		<Screen
			scrollable={noti ? true : false}
			showBackButton
			padded
			headerTitle="Notifications"
			showHeader
		>
			{noti ? (
				<View style={{ gap: 20, marginTop: 16 }}>
					<NotificationCard
						notificationTitle={'Congratulations! Your loan is ready.'}
						notificationDesc={"We're happy to tell you, your loan have been approved. "}
						time={'08:34am - Jun 8, 2025'}
					/>
					<NotificationCard
						notificationTitle={'Loan payment successful!'}
						notificationDesc={'Your loan payment was successful. Keep up the great work'}
						time={'08:34am - Jun 8, 2025'}
					/>
				</View>
			) : (
				<View style={styles.noLoanContainer}>
					<Image source={images.repayment} style={styles.image} />
					<View style={{ maxWidth: 250, gap: 10, marginVertical: 20 }}>
						<Title
							text={'No New Notification'}
							onPress={() => setNoti(!noti)}
							textSize={22}
							textWeight={'600'}
							center
						/>
						<Title
							text={'When you have a new messages, you’ll see them here'}
							center
							textWeight={'400'}
							textstyle={{ lineHeight: 20 }}
						/>
					</View>
					<SubmitBtn title={'Go Home'} onPress={handlePress} />
				</View>
			)}
		</Screen>
	)
}

export default NotificationScreen

function createStyles(theme: ThemeType) {
	return StyleSheet.create({
		noLoanContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			paddingHorizontal: 20,
		},
		image: {
			maxWidth: 230,
			width: 210,
			height: 173,
			resizeMode: 'contain',
		},
		card: {
			borderRadius: 20,
			gap: 14,
		},
		row: {
			alignItems: 'center',
			justifyContent: 'space-between',
		},
		copyIcon: {
			paddingHorizontal: 8,
			paddingVertical: 3,
			borderRadius: 8,
			alignItems: 'center',
			justifyContent: 'center',
		},
		text: {
			fontSize: 16,
			fontFamily: getMontserratFontFamily('400'),
			marginVertical: 20,
		},
		accountSubText: {
			fontSize: 12,
			color: theme.tertiary,
			fontFamily: getMontserratFontFamily('600'),
		},
		accountText: {
			color: theme.tertiary,
			fontSize: 10,
			fontFamily: getMontserratFontFamily('400'),
		},
		title: {
			fontSize: 16,
			fontFamily: getMontserratFontFamily('600'),
			textAlign: 'center',
		},
		desc: {
			fontSize: 12,
			fontFamily: getMontserratFontFamily('500'),
			textAlign: 'center',
		},
		time: {
			fontSize: 11,
			fontFamily: getMontserratFontFamily('500'),
			color: COLORS.lightGray3,
		},
		demarcator: {
			height: 1,
			width: '100%',
			backgroundColor: COLORS.lightGray1,
			alignSelf: 'center',
			marginVertical: 4,
		},
	})
}

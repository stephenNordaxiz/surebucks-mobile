import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import React, { ReactNode, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
	AntDesign,
	FontAwesome,
	FontAwesome6,
	Ionicons,
	MaterialCommunityIcons,
} from '@expo/vector-icons'

import { useThemeStore } from '@/stores/themeStore'
import { SIZES, ThemeType } from '@/constants/theme'
import { CardBtn, CModal, CView, Title, TwoBtnModal } from '@/components'
import images from '@/constants/images'
import { nav } from '@/utils/navigationService'
import { useLoanStore } from '@/stores/loanStore'
import { useAuthStore } from '@/stores/authStore'

const ProfileScreen = () => {
	const theme = useThemeStore((s) => s?.theme)
	const styles = createStyles(theme)
	const { clearAll } = useLoanStore()
	const { clearAll: clearUser } = useAuthStore()
	const [showModal, setShowModal] = useState<boolean>(false)
	const [delModal, setDelModal] = useState<boolean>(false)

	type ProfileType = {
		id: number
		icon: ReactNode
		text: string
		nav: string
	}
	const handleLogOut = () => {
		try {
			clearAll()
			clearUser()
		} catch (error) {
			console.log(error)
		} finally {
			setShowModal(false)
		}
	}
	const handleNav = (item: ProfileType) => {
		if (item?.nav === 'delete') {
			setDelModal(!delModal)
		} else if (item?.nav === 'logout') {
			setShowModal(!showModal)
		} else {
			nav(item?.nav)
		}
	}
	
	const data1 = [
		{
			id: 1,
			icon: <FontAwesome6 name="download" size={24} color={theme.primary} />,
			text: 'Other Information',
			nav: '/profile/details',
		},
		{
			id: 2,
			icon: <FontAwesome6 name="credit-card" size={20} color={theme.primary} />,
			text: 'Payment Method',
			nav: '/profile/bank',
		},
	]
	const data2 = [
		{
			id: 1,
			icon: <FontAwesome name="bell-o" size={24} color={theme.primary} />,
			text: 'Notification',
			nav: '/profile/notifications',
		},
		{
			id: 2,
			icon: <MaterialCommunityIcons name="shield-lock-outline" size={24} color={theme.primary} />,
			text: 'Security Setting',
			nav: '/profile/security',
		},
		{
			id: 3,
			icon: <AntDesign name="customerservice" size={24} color={theme.primary} />,
			text: 'Support Centre',
			nav: '/profile/support',
		},
		{
			id: 4,
			icon: <FontAwesome6 name="trash-can" size={20} color={theme.primary} />,
			text: 'Delete Account',
			nav: 'delete',
		},
		{
			id: 5,
			icon: <MaterialCommunityIcons name="logout" size={24} color={theme.primary} />,
			text: 'Logout',
			nav: 'logout',
		},
	]

	return (
		<SafeAreaView style={styles.container}>
			{/* primary color background */}
			<View style={styles.topHalfBackground} />

			{/* Content above background */}
			<View style={styles.content}>
				<Title text={'Profile'} textColor="white" textSize={20} textWeight={'600'} center />
				<View style={styles.imageWrapper}>
					<Image source={images.yusuf} style={styles.image} />
					<Ionicons name="camera-outline" size={18} color="black" style={styles.icon} />
				</View>
				<View style={{ gap: 6 }}>
					<Title text={'John Doe'} textColor="black" textSize={25} textWeight={'600'} center />
					<Title text={'LJohn@gmail.com'} textSize={14} center />
					<Pressable style={styles.button}>
						<Title text={'Edit Profile'} textColor="white" textWeight={'600'} />
					</Pressable>
				</View>
				<View style={{ flex: 1, marginBottom: -30 }}>
					<ScrollView
						style={{ flex: 1 }}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ gap: 20, paddingBottom: 20 }}
					>
						<CView>
							{data1?.map((item: ProfileType) => (
								<CardBtn
									key={item?.id}
									text={item?.text}
									bgColorIcon="transparent"
									icon={item?.icon}
									demarcator
									textSize={14}
									iconWidth={30}
									iconHeight={30}
									activeBorder="transparent"
									onPress={() => nav(item?.nav)}
									rightIcon={<AntDesign name="right" size={14} color={theme.tertiary} />}
								/>
							))}
						</CView>
						<CView>
							{data2?.map((item: ProfileType) => (
								<CardBtn
									key={item?.id}
									text={item?.text}
									bgColorIcon="transparent"
									icon={item?.icon}
									demarcator
									textSize={14}
									iconWidth={30}
									iconHeight={30}
									activeBorder="transparent"
									onPress={() => handleNav(item)}
									rightIcon={<AntDesign name="right" size={14} color={theme.tertiary} />}
								/>
							))}
						</CView>
					</ScrollView>
				</View>
				<CModal
					noBtn
					modalVisible={delModal}
					center
					padded
					closable
					closeModal={() => setDelModal(false)}
				>
					<TwoBtnModal
						title="Delete Account"
						desc="You are about to delete your account. 
This action cannot be undone.
Are you sure you want to proceed?"
						btnTitle1="Delete"
						btnTitle2="Cancel"
						onPress1={() => setDelModal(false)}
						onPress2={() => setDelModal(false)}
					/>
				</CModal>
				<CModal
					center
					noBtn
					padded
					modalVisible={showModal}
					// closable
					closeModal={() => setShowModal(false)}
				>
					<TwoBtnModal
						title="Logout"
						desc="Are you sure you want to logout?"
						btnTitle1="Logout"
						btnTitle2="Cancel"
						onPress1={handleLogOut}
						onPress2={() => setShowModal(false)}
					/>
				</CModal>
			</View>
		</SafeAreaView>
	)
}

export default ProfileScreen

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
			height: SIZES.height / 6, // cover half screen
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
			gap: 16,
		},
		image: {
			width: '100%',
			height: '100%',
			borderRadius: 50,
			resizeMode: 'contain',
		},
		imageWrapper: {
			width: 85,
			height: 85,
			borderRadius: 50,
			alignSelf: 'center',
			position: 'relative',
		},
		icon: {
			position: 'absolute',
			right: 5,
			bottom: 0,
		},
		button: {
			backgroundColor: theme.primary,
			alignSelf: 'center',
			paddingHorizontal: 10,
			borderRadius: 6,
			paddingVertical: 3,
		},
	})
}

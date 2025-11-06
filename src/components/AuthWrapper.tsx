import { Image, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'

import { useThemeStore } from '@/stores/themeStore'
import { SIZES, ThemeType } from '@/constants/theme'
import images from '@/constants/images'
import Title from './Title'
import { useAuthStore } from '@/stores/authStore'
import { SubmitBtn } from '.'
import { nav } from '@/utils/navigationService'

const AuthWrapper = ({
	children,
	type,
	onPress,
	loading,
}: {
	children: ReactNode
	loading?: boolean
	type?: string
	onPress?: () => void
}) => {
	const theme = useThemeStore((s) => s.theme)
	const phoneDetails = useAuthStore((s) => s.phone)
	const clearPhoneDetails = useAuthStore((s) => s.clearPhone)
	const styles = createStyles(theme)

	const handleNav = () => {
		if (type === 'register') {
			nav('/login')
		}
		if (type === 'login' && phoneDetails) {
			clearPhoneDetails()
		}
		if (type === 'login' && !phoneDetails) {
			nav('/register')
		}
	}

	return (
		<View style={{}}>
			<View style={styles.container}>
				<Image source={images.authImage} />
			</View>
			<View style={styles.contentContainer}>
				<View style={{}}>
					<View style={{ gap: 10 }}>
						<Title
							text={
								type === 'login' && !phoneDetails
									? 'Login'
									: type === 'login' && phoneDetails
										? `Welcome back, ${phoneDetails?.firstName || ''}`
										: 'Register'
							}
							textWeight={'600'}
							textSize={18}
						/>
						{type === 'login' && !phoneDetails ? null : (
							<Title
								text={
									type === 'login'
										? 'Login to your account'
										: 'Use the phone number attached to your BVN for the best experience'
								}
								textWeight={'400'}
								textSize={12}
								textstyle={{ lineHeight: 20 }}
							/>
						)}
					</View>
					<View style={{ marginTop: 16 }}>{children}</View>
					{type === 'login' && (
						<Title
							onPress={() => nav('/forgot')}
							text={'Forgot password?'}
							textWeight={'500'}
							textColor={theme.primary}
							textstyle={{ textDecorationLine: 'underline', marginTop: 6 }}
						/>
					)}
				</View>
				<View
					style={{
						gap: 10,
						alignItems: 'center',
					}}
				>
					<SubmitBtn
						disabled={loading}
						loading={loading}
						title={type === 'register' ? 'Get OTP' : 'Login'}
						onPress={onPress}
					/>
					<Text onPress={handleNav}>
						{type === 'register' ? 'Have an account? ' : phoneDetails ? 'Not you? ' : 'New user? '}
						<Text style={{ color: theme.primary }}>
							{type === 'register' ? 'Log In' : phoneDetails ? 'Switch account' : 'Sign up'}
						</Text>
					</Text>
				</View>
			</View>
		</View>
	)
}

export default AuthWrapper

function createStyles(theme: ThemeType) {
	return StyleSheet.create({
		container: {
			// flex: 1,
			alignItems: 'center',
			backgroundColor: theme.primary,
			borderBottomLeftRadius: 50,
			borderBottomRightRadius: 50,
			height: SIZES.height / 2.4,
			width: SIZES.width,
		},
		contentContainer: {
			marginTop: 20,
			paddingHorizontal: 20,
			position: 'relative',
			justifyContent: 'space-between',
			height: SIZES.height / 2.3,
		},
	})
}

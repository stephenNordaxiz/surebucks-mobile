import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { Screen, SubmitBtn, Title } from '@/components'
import images from '@/constants/images'
import { nav } from '@/utils/navigationService'
import { useAuthStore } from '@/stores/authStore'
import { SIZES } from '@/constants'

const WelcomeAboardScreen = () => {
	const setUser = useAuthStore((s) => s.setUser)
	const updatePhone = useAuthStore((s) => s.updatePhone)
	const handleSubmit = () => {
		updatePhone({ firstName: 'Yusuf' })
		setUser({ name: 'John Doe', email: 'JohnDoe@gmail.com', id: 'qwerty' })
		nav('/(app)/(home)')
	}
	return (
		<Screen style={styles.container}>
			<View style={styles.container}>
				<View style={styles.content}>
					<Image
						source={images.successcheck}
						style={{ width: 192, height: 202, alignSelf: 'center' }}
					/>
					<View style={{ gap: 16, alignItems: 'center' }}>
						<Title text={'Account Created!'} textSize={24} textWeight={'600'} />
						<View style={{ gap: 5, alignItems: 'center' }}>
							<Title
								textWeight={'400'}
								center
								text={'Your account has been created successfully.'}
							/>
							<Title textWeight={'400'} center text={'Click Proceed to login to your account '} />
						</View>
					</View>
				</View>
			</View>
			<View style={styles.buttonContainer}>
				<SubmitBtn onPress={handleSubmit} title={'Proceed'} />
			</View>
		</Screen>
	)
}

export default WelcomeAboardScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
		position: 'relative',
	},
	content: {
		gap: 30,
	},
	buttonContainer: {
		paddingHorizontal: 20,

		marginBottom: 20,
		width: SIZES.width,
	},
})

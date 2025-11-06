import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'

import { Screen, SubmitBtn, Title } from '@/components'
import images from '@/constants/images'
import { nav } from '@/utils/navigationService'

const RepaySuccessScreen = () => {
	// const theme = useThemeStore((s) => s.theme)
	const handlePress = (item: string) => {
		nav(item)
	}
	return (
		<Screen padded>
			<View style={styles.container}>
				<Image source={images.successcheck} style={styles.image} />
				<View style={{ gap: 16 }}>
					<Title text={'Repayment Successful!'} textWeight={'600'} textSize={20} center />
					<View style={{ gap: 6 }}>
						<Title center text={'Your loan repayment has been confirmed. '} />
						<Title center text={'Thank you for staying on track. '} />
					</View>
				</View>
				<View style={{ width: '100%' }}>
					<SubmitBtn
						title={'Back Home'}
						onPress={() => handlePress('/tabs/home')}
						icon={<Entypo name="home" size={20} color={'white'} />}
					/>
				</View>
			</View>
		</Screen>
	)
}

export default RepaySuccessScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 30,
	},
	image: {
		width: 200,
		height: 200,
		resizeMode: 'contain',
	},
})

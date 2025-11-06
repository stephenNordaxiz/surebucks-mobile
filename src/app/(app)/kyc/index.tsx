import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { CardBtn, Screen, SubmitBtn, Title } from '@/components'
import {
	FontAwesome,
	FontAwesome6,
	MaterialIcons,
	MaterialCommunityIcons,
} from '@expo/vector-icons'
import { nav } from '@/utils/navigationService'
import { useAuthStore } from '@/stores/authStore'
const KycScreen = () => {
	const kyc = useAuthStore((s) => s?.kyc)
	const kycData = [
		{
			id: 1,
			text: 'Basic information',
			icon: <MaterialIcons name="message" size={20} color={'white'} />,
			active: kyc?.basic,
			route: '/kyc/basic',
		},
		{
			id: 2,
			text: 'Extra information',
			icon: <FontAwesome6 name="file-circle-plus" size={20} color="white" />,
			active: kyc?.extra,
			route: '/kyc/extra',
		},
		{
			id: 3,
			text: 'ID Card/ Photo upload',
			icon: <MaterialCommunityIcons name="card-account-details-outline" size={20} color="white" />,
			active: kyc?.doc,
			route: '/kyc/idcard',
		},
		{
			id: 4,
			text: 'Selfie Capture',
			icon: <MaterialCommunityIcons name="camera-iris" size={20} color="white" />,
			active: kyc?.capture,
			route: '/kyc/photo',
		},
	]

	return (
		<Screen showHeader showBackButton showInfoButton padded>
			<View style={styles.container}>
				<View style={styles.content}>
					<View style={{ gap: 6 }}>
						<Title text={'Complete KYC'} textSize={18} textWeight={'600'} />
						<Title
							text={'Complete the verification below to get started'}
							textColor="#07140ACC"
							textWeight={'500'}
						/>
					</View>
					<ScrollView contentContainerStyle={{ gap: 20 }}>
						{kycData?.map((item) => (
							<CardBtn
								textWeight="500"
								key={item?.id}
								iconHeight={42}
								iconWidth={42}
								activeBorder="transparent"
								padded={false}
								bgColor={item?.active ? '#236A351A' : 'white'}
								rightIcon={<FontAwesome name="angle-right" size={24} color="black" />}
								icon={item?.icon}
								onPress={() => nav(item?.route)}
								text={item?.text}
							/>
						))}
					</ScrollView>
				</View>
				<SubmitBtn title={'Submit'} style={styles.button} />
			</View>
		</Screen>
	)
}

export default KycScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	content: {
		marginTop: 10,
		gap: 20,
	},
	button: {
		marginBottom: 20,
	},
})

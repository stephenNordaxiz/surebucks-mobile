import { StyleSheet, View } from 'react-native'
import React from 'react'
import { CardBtn, CView, Screen } from '@/components'
import { AntDesign, Fontisto, MaterialIcons } from '@expo/vector-icons'
import { hexToRgba } from '@/utils/checker'
import { useThemeStore } from '@/stores/themeStore'
import { nav } from '@/utils/navigationService'

const SecurityScreen = () => {
	const theme = useThemeStore((s) => s.theme)
	return (
		<Screen showBackButton showHeader padded headerTitle="Security Setting">
			<View style={styles.container}>
				<CView style={{ gap: 8 }}>
					<CardBtn
						demarcator
						text="Change Password"
						activeBorder="transparent"
						iconWidth={40}
						iconHeight={40}
						bgColorIcon={hexToRgba('#38f38c', 0.1)}
						onPress={() => nav('/profile/password')}
						icon={<MaterialIcons name="key" size={22} color={theme.primary} />}
						rightIcon={<AntDesign name="right" size={16} color={'black'} />}
					/>
					<CardBtn
						demarcator
						text="Change Pin"
						activeBorder="transparent"
						iconWidth={40}
						iconHeight={40}
						bgColorIcon={hexToRgba('#38f38c', 0.1)}
						onPress={() => nav('/profile/pin')}
						icon={<Fontisto name="locked" size={18} color={theme.primary} />}
						rightIcon={<AntDesign name="right" size={16} color={'black'} />}
					/>
				</CView>
			</View>
		</Screen>
	)
}

export default SecurityScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent:"space-between"
	},
})

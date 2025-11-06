import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import UniversalModal from '@/components/modals/UniversalModal'

export default function RootLayout() {
	return (
		<SafeAreaProvider style={styles.container}>
			<StatusBar style="auto" />
			<Stack screenOptions={{ headerShown: false }} />
			<UniversalModal />
		</SafeAreaProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

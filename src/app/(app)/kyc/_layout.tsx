import { Stack } from 'expo-router'
import React from 'react'

export default function KYCLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				animation: 'slide_from_right',
			}}
		>
			{/* Basic Info Screen */}
			<Stack.Screen name="basic" options={{ animation: 'fade' }} />

			{/* KYC Screen */}
			<Stack.Screen name="index" options={{}} />

			{/* Extra Info Screen */}
			<Stack.Screen name="extra" options={{ animation: 'fade' }} />

			{/* Extra Info Screen */}
			<Stack.Screen name="idcard" options={{ animation: 'fade' }} />

			{/* Photo Screen */}
			<Stack.Screen name="photo" options={{ animation: 'fade' }} />
			{/* Photo Screen */}
			<Stack.Screen name="capture" options={{ animation: 'fade' }} />
		</Stack>
	)
}

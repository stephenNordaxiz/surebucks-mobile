import { Stack } from 'expo-router'
import React from 'react'

export default function LoanLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				animation: 'slide_from_right',
			}}
		>
			{/* Loan Request Screen */}
			<Stack.Screen name="request" options={{}} />
			{/* Loan Eligibility Check Screen */}
			<Stack.Screen name="eligible" options={{}} />
			{/* Loan Offer Screen */}
			<Stack.Screen name="offer" options={{}} />
		</Stack>
	)
}

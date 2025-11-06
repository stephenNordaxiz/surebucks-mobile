import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { useThemeStore } from '@/stores/themeStore'
import { Platform } from 'react-native'

export default function TabLayout() {
	const theme = useThemeStore((s) => s.theme)
	return (
		<Tabs
			screenOptions={() => ({
				tabBarActiveTintColor: theme.primary,
				tabBarInactiveTintColor: '#07140A99',
				headerShown: false,
				tabBarStyle: {
					paddingBottom: Platform.OS === 'ios' ? 20 : 8, // iOS needs more padding for safe area
					paddingTop: 8,
					height: 75, // remove fixed height
					borderTopWidth: 0.5,
					borderTopColor: '#ccc', // optional: visible top border
				},
			})}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: 'Home',
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="repayment"
				options={{
					title: 'Repayment',
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons name={focused ? 'receipt' : 'receipt-outline'} size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	)
}

import React, { useEffect } from 'react'
import { Stack, useRouter } from 'expo-router'
import { useAuthStore } from '@/stores/authStore'

export default function AuthLayout() {
	const user = useAuthStore((s) => s.user)
	const router = useRouter()
console.log("user",user)
	useEffect(() => {
		if (user) {
			router.replace('/(app)/tabs/home')
		}
	}, [user])

	return <Stack screenOptions={{ headerShown: false }} />
}

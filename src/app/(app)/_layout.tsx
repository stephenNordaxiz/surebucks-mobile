import React, { useEffect } from 'react'
import { Stack, useRouter } from 'expo-router'
import { useAuthStore } from '@/stores/authStore'

export default function ProtectedLayout() {
	const user = useAuthStore((s) => s.user)
	const router = useRouter()
	// console.log('user', user)
	useEffect(() => {
		if (!user) {
			router.replace('/login')
		}
	}, [user])

	return <Stack screenOptions={{ headerShown: false }} />
}

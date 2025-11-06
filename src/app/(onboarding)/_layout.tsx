import { Stack } from 'expo-router'
import React, { useEffect } from 'react'

import { useOnboardingStore } from '@/stores/onboardingStore'
import { nav } from '@/utils/navigationService'

export default function OnboardingLayout() {
	const completed = useOnboardingStore((s) => s.completed)

	useEffect(() => {
		if (completed) {
			nav('/login')
		}
	}, [completed])

	return <Stack screenOptions={{ headerShown: false }} />
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Appearance, ColorSchemeName } from 'react-native'
import { darkTheme, lightTheme, ThemeType } from '@/constants/theme'
// import { lightTheme, darkTheme, ThemeType } from "../theme"; // Adjust import path

type ThemePreference = 'light' | 'dark' | 'system'

type ThemeState = {
	theme: ThemeType
	preference: ThemePreference
	setPreference: (pref: ThemePreference) => void
	toggleTheme: () => void
	loadTheme: () => Promise<void>
}

const THEME_PREF_KEY = 'APP_THEME_PREFERENCE'

export const useThemeStore = create<ThemeState>((set, get) => {
	let unsubscribe: (() => void) | undefined

	const applyTheme = (pref: ThemePreference) => {
		const resolveTheme = (scheme: ColorSchemeName): ThemeType => {
			return scheme === 'dark' ? darkTheme : lightTheme
		}

		if (pref === 'system') {
			const systemScheme = Appearance.getColorScheme() || 'light'
			set({ theme: resolveTheme(systemScheme), preference: 'system' })

			if (!unsubscribe) {
				unsubscribe = Appearance.addChangeListener(({ colorScheme }: any) => {
					const scheme = colorScheme || 'light'
					set({ theme: resolveTheme(scheme) })
				}).remove
			}
		} else {
			const selectedTheme = pref === 'dark' ? darkTheme : lightTheme
			set({ theme: selectedTheme, preference: pref })

			if (unsubscribe) {
				unsubscribe()
				unsubscribe = undefined
			}
		}
	}

	return {
		theme: resolveInitialTheme(),
		preference: 'system',

		setPreference: async (pref: ThemePreference) => {
			await AsyncStorage.setItem(THEME_PREF_KEY, pref)
			applyTheme(pref)
		},

		toggleTheme: () => {
			const current = get().preference
			const next: ThemePreference =
				current === 'light' ? 'dark' : current === 'dark' ? 'system' : 'light'
			get().setPreference(next)
		},

		loadTheme: async () => {
			const stored = await AsyncStorage.getItem(THEME_PREF_KEY)
			const pref: ThemePreference =
				stored === 'dark' || stored === 'light' || stored === 'system' ? stored : 'system'
			applyTheme(pref)
		},
	}
})

// Helper for first load
function resolveInitialTheme(): ThemeType {
	const scheme = Appearance.getColorScheme() || 'light'
	return scheme === 'dark' ? darkTheme : lightTheme
}

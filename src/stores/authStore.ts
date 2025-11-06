/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createAsyncStorageAdapter } from '@/utils/asyncStorageAdapter'

type User = {
	id: string
	name: string
	email: string
}
type Kyc = {
	basic: boolean
	extra: boolean
	doc: boolean
	capture: boolean
	terms: boolean
	bvn: boolean
}

type Phone = {
	firstName?: string
	dialCode: string
	phoneNumber: string
	fullPhoneNumber: string
}

type AuthState = {
	user: User | null
	phone: Phone | null
	kyc: Kyc | null
	setUser: (user: User) => void
	setPhone: (phone: Phone) => void
	updatePhone: (data: Partial<Phone>) => void
	updateKyc: (data: Partial<Kyc>) => void
	updateTerms: (data: Partial<Kyc>) => void
	clearUser: () => void
	clearPhone: () => void
	clearAll: () => void
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			phone: null,
			kyc: null,
			setUser: (user) => set({ user }),
			setPhone: (phone) => set({ phone }),
			updatePhone: (data: any) =>
				set((state) => ({
					phone: { ...state.phone, ...data },
				})),
			updateKyc: (data: any) =>
				set((state) => ({
					kyc: { ...state.kyc, ...data },
				})),
			updateTerms: (data: any) =>
				set((state) => ({
					kyc: { ...state.kyc, ...data },
				})),
			clearUser: () => set({ user: null }),
			clearPhone: () => set({ phone: null }),
			clearAll: () => set({ user: null, phone: null }),
			// clearAll: () => set({ user: null, phone: null, kyc:null }),
		}),
		{
			name: 'auth-storage',
			storage: createAsyncStorageAdapter<AuthState>(),
		},
	),
)

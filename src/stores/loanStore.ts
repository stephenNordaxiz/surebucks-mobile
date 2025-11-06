/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createAsyncStorageAdapter } from '@/utils/asyncStorageAdapter'
import { generateUUID } from '@/utils/checker'

type Loan = {
	id: string
	purpose: string
	status: string
	amount: string | number
	amountDue: string | number
	paid: boolean
	incomeRange: string
	incomeSource: string
	dueDate?: any
	createdAt?: any
	date?: any
}

type Account = {
	firstName: string
	accountNumber: string
	bank: string
}

type LoanState = {
	loans: Loan[]
	account: Account | null
	singleLoan: Loan | null

	addLoan: (loan: Loan) => void
	updateLoanById: (id: string, data: Partial<Loan>) => void
	removeLoan: (id: string) => void
	clearLoans: () => void

	setSingleLoan: (loan: Loan) => void
	clearSingleLoan: () => void

	setAccount: (account: Account) => void
	updateAccount: (data: Partial<Account>) => void
	clearAccount: () => void

	clearAll: () => void
}

export const useLoanStore = create<LoanState>()(
	persist(
		(set) => ({
			loans: [],
			account: null,
			singleLoan: null,

			addLoan: (loan) =>
				set((state) => {
					const newLoan: Loan = {
						...loan,
						id: generateUUID(), // or uuidv4()
					}
					return {
						loans: [...state.loans, newLoan],
					}
				}),

			updateLoanById: (id, data) =>
				set((state) => ({
					loans: state.loans.map((loan) => (loan.id === id ? { ...loan, ...data } : loan)),
				})),

			removeLoan: (id) =>
				set((state) => ({
					loans: state.loans.filter((loan) => loan.id !== id),
				})),

			clearLoans: () => set({ loans: [] }),

			setSingleLoan: (loan) => set({ singleLoan: loan }),
			clearSingleLoan: () => set({ singleLoan: null }),

			setAccount: (account) => set({ account }),

			updateAccount: (data) =>
				set((state) => ({
					account: state.account ? { ...state.account, ...data } : null,
				})),

			clearAccount: () => set({ account: null }),

			clearAll: () => set({ loans: [], account: null, singleLoan: null }),
		}),
		{
			name: 'loan-storage',
			storage: createAsyncStorageAdapter<LoanState>(),
		},
	),
)

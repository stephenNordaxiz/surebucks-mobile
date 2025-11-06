import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import { LoanItem, Screen, Title } from '@/components'
import { useLoanStore } from '@/stores/loanStore'
import { nav } from '@/utils/navigationService'

const LoanHistoryScreen = () => {
	const loans = useLoanStore((s) => s.loans)
	return (
		<Screen padded showHeader showInfoButton showBackButton>
			<View style={styles.container}>
				<View style={styles.content}>
					<View style={{ gap: 8 }}>
						<Title text={'History'} textSize={18} textWeight={'600'} />

						<FlatList
							data={loans?.sort((a, b) => b?.date - a?.date)}
							showsVerticalScrollIndicator={false}
							keyExtractor={(item) => item?.id}
							renderItem={({ item }) => (
								<LoanItem item={item} onPress={() => nav('/loan/detail', { id: item?.id })} />
							)}
						/>
					</View>
				</View>
			</View>
		</Screen>
	)
}

export default LoanHistoryScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	content: {
		marginTop: 10,
		gap: 20,
	},
})

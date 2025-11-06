import { StyleSheet, View } from 'react-native'
import React, { ReactNode } from 'react'
import Screen from './Screen'
import SubmitBtn from './SubmitBtn'
import Title from './Title'
import StepProgress from './StepProgress'
type kycProps = {
	title: string
	children: ReactNode
	step: number
	onPress?: () => void
	loading?: boolean
	btnText?: string
}

const KYCWrapper = ({ title, children, step, onPress, loading, btnText }: kycProps) => {
	return (
		<Screen scrollable showHeader showBackButton showInfoButton padded>
			<View style={styles.container}>
				<View style={styles.content}>
					<View style={{ gap: 6 }}>
						<Title text={title} textSize={18} textWeight={'600'} />
						<StepProgress
							steps={['Start', 'KYC', 'Pay', 'Done']}
							currentStep={step}
							showLabels={false} // optional
						/>
						<View>{children}</View>
					</View>
				</View>

				<SubmitBtn
					disabled={loading}
					loading={loading}
					onPress={onPress}
					title={btnText || 'Next'}
					style={styles.button}
				/>
			</View>
		</Screen>
	)
}

export default KYCWrapper

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	content: {
		marginTop: 10,
		gap: 20,
	},
	button: {
		marginBottom: 20,
	},
})

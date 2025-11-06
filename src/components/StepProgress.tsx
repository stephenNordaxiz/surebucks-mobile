import { ThemeType } from '@/constants/theme'
import { useThemeStore } from '@/stores/themeStore'
import React from 'react'
import { View, Text, StyleSheet, ViewStyle } from 'react-native'

type StepProgressProps = {
	steps: string[]
	currentStep: number // starts from 0
	showLabels?: boolean
	containerStyle?: ViewStyle
}

const StepProgress = ({
	steps,
	currentStep,
	showLabels = true,
	containerStyle,
}: StepProgressProps) => {
	const theme = useThemeStore((s) => s.theme)
	const styles = createStyles(theme)
	return (
		<View style={[styles.container, containerStyle]}>
			{steps.map((label, index) => {
				const isActive = index === currentStep
				const isCompleted = index < currentStep

				return (
					<React.Fragment key={index}>
						<View style={styles.stepWrapper}>
							<View
								style={[
									styles.circle,
									isActive && styles.activeCircle,
									isCompleted && styles.completedCircle,
								]}
							>
								<Text style={[styles.stepText, (isActive || isCompleted) && styles.stepTextActive]}>
									{index + 1}
								</Text>
							</View>

							{showLabels && <Text style={styles.label}>{label}</Text>}
						</View>

						{/* Connector (line between steps) */}
						{index !== steps.length - 1 && (
							<View
								style={[
									styles.connector,
									isCompleted ? styles.connectorCompleted : styles.connectorPending,
								]}
							/>
						)}
					</React.Fragment>
				)
			})}
		</View>
	)
}

export default StepProgress

function createStyles(theme: ThemeType) {
	return StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			paddingHorizontal: 16,
			width: '100%',
			flexWrap: 'nowrap',
		},
		stepWrapper: {
			alignItems: 'center',
			flexShrink: 0,
		},
		circle: {
			width: 36,
			height: 36,
			borderRadius: 18,
			borderWidth: 1,
			borderColor: theme.primary,
			backgroundColor: 'transparent',
			justifyContent: 'center',
			alignItems: 'center',
		},
		activeCircle: {
			backgroundColor: theme.secondary,
		},
		completedCircle: {
			backgroundColor: theme.primary,
		},
		stepText: {
			color: theme.primary,
			fontWeight: 'bold',
		},
		stepTextActive: {
			color: '#fff',
		},
		label: {
			marginTop: 4,
			fontSize: 12,
			color: '#333',
			textAlign: 'center',
			width: 60,
		},
		connector: {
			flex: 1,
			height: 2,
			marginHorizontal: 4,
			backgroundColor: '#ccc',
		},
		connectorCompleted: {
			backgroundColor: theme.primary,
		},
		connectorPending: {
			backgroundColor: '#ccc',
		},
	})
}

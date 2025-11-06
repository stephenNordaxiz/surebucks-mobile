/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { CameraView, useCameraPermissions } from 'expo-camera'
// import * as FaceDetector from 'expo-face-detector'

import { CModal, Screen, StepProgress, SubmitBtn, Title } from '@/components'
import { SIZES } from '@/constants'
import { useThemeStore } from '@/stores/themeStore'
// import images from '@/constants/images'
import { ThemeType } from '@/constants/theme'
import images from '@/constants/images'
import { nav } from '@/utils/navigationService'
import { useAuthStore } from '@/stores/authStore'

const CapturephotoScreen = () => {
	const theme = useThemeStore((s) => s.theme)
	const styles = createStyles(theme)
	const [hasPermission, requestPermission] = useCameraPermissions()
	const [step, setStep] = useState<'approach' | 'blink' | 'smile' | 'done'>('approach')

	const { updateKyc, kyc } = useAuthStore()

	// const [hasApproached, setHasApproached] = useState(false)
	// const [hasBlinked, setHasBlinked] = useState(false)
	// const [hasSmiled, setHasSmiled] = useState(false)
	// const [faces, setFaces] = useState<FaceDetector.FaceFeature[]>([])

	// const [status, setStatus] = useState()

	const cameraRef = useRef<any>(null)

	useEffect(() => {
		const request = async () => {
			if (hasPermission?.status !== 'granted') {
				await requestPermission()
			}
		}
		request()
	}, [hasPermission])
	// const handleFaceDetection = ({ faces }: { faces: FaceDetector.FaceFeature[] }) => {
	// 	if (faces.length === 0) return
	// 	const face = faces[0]

	// 	// STEP 1: Move close to the camera
	// 	if (step === 'approach') {
	// 		const { width, height } = face.bounds.size
	// 		const faceArea = width * height

	// 		if (faceArea > 200000) {
	// 			// setHasApproached(true)
	// 			setStep('blink')
	// 		}
	// 	}

	// 	// STEP 2: Blink Detection
	// 	if (
	// 		step === 'blink' &&
	// 		face.leftEyeOpenProbability !== undefined &&
	// 		face.rightEyeOpenProbability !== undefined
	// 	) {
	// 		const leftClosed = face.leftEyeOpenProbability < 0.2
	// 		const rightClosed = face.rightEyeOpenProbability < 0.2

	// 		if (leftClosed && rightClosed) {
	// 			// setHasBlinked(true)
	// 			setStep('smile')
	// 		}
	// 	}

	// 	// STEP 3: Smile Detection
	// 	if (step === 'smile' && face.smilingProbability !== undefined) {
	// 		if (face.smilingProbability > 0.7) {
	// 			// setHasSmiled(true)
	// 			setStep('done')
	// 		}
	// 	}
	// }
	useEffect(() => {
		let interval: any // NodeJS.Timeout

		if (hasPermission?.status === 'granted' && cameraRef.current) {
			interval = setInterval(async () => {
				try {
					// Take photo every 1.5 seconds
					const photo = await cameraRef?.current?.takePictureAsync({ skipProcessing: true })

					// const result = await FaceDetector.detectFacesAsync(photo.uri, {
					// 	mode: FaceDetector.FaceDetectorMode.fast,
					// 	detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
					// 	runClassifications: FaceDetector.FaceDetectorClassifications.all,
					// })

					// if (result.faces.length > 0) {
					// 	handleFaceDetection({ faces: result.faces })
					// }
				} catch (err) {
					console.warn('Face detection error:', err)
				}
			}, 1500)
		}

		return () => {
			if (interval) clearInterval(interval)
		}
	}, [hasPermission, step])

	const steps = ['approach', 'blink', 'smile', 'done']

	const handlePress = () => {
		const currentIndex = steps.indexOf(step)
		const nextStep: any = steps[(currentIndex + 1) % steps.length]
		setStep(nextStep)
	}
	const handleNav = () => {
			updateKyc({
				...kyc,
				capture: true,
			})
		nav('/loan/request')
		setStep('blink')
	}

	return (
		<Screen showHeader showBackButton showInfoButton padded>
			<View style={styles.container}>
				{step === 'approach' && (
					<Title
						text={'Kindly move your face into the frame 📸'}
						center
						textSize={18}
						textWeight={'600'}
					/>
				)}
				{step === 'blink' && (
					<Title text={'Please blink your eyes 👀'} center textSize={18} textWeight={'600'} />
				)}
				{step === 'smile' && (
					<Title text={'Now smile 😄'} center textSize={18} textWeight={'600'} />
				)}
				{step === 'done' && (
					<Title text={'Verification complete ✅'} center textSize={18} textWeight={'600'} />
				)}
				<View style={styles.content}>
					<View style={styles.outerCircle}>
						<View style={styles.innerCircle}>
							{/* {step === 'done' ? (
								<CameraView
									ref={cameraRef}
									style={StyleSheet.absoluteFillObject}
									facing={'front'}
									// onFacesDetected={handleFaceDetection} // ✅ correct
									// faceDetectorSettings={{
									// 	mode: FaceDetector.FaceDetectorMode.fast,
									// 	detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
									// 	runClassifications: FaceDetector.FaceDetectorClassifications.all,
									// }}
								/>
							) : ( */}
								<Image source={images.yusuf} style={styles.image} resizeMode="cover" />
							{/* )} */}
						</View>
					</View>
					<View style={{ marginVertical: 20, gap: 10 }}>
						<StepProgress
							currentStep={
								step === 'approach'
									? 1
									: step === 'blink'
										? 2
										: step === 'smile'
											? 3
											: step === 'done'
												? 4
												: 0
							}
							showLabels={false}
							steps={['1', '2', '3', '4']}
						/>
						<TouchableOpacity
							onPress={handlePress}
							style={{
								width: 70,
								height: 70,
								borderRadius: 70,
								backgroundColor: '#D9D9D9',
								alignSelf: 'center',
							}}
						/>
					</View>
				</View>
			</View>
			<CModal
				hanger={false}
				modalVisible={step === 'done'}
				noBtn
				closeModal={() => console.log('close modal')}
			>
				<View style={{ alignItems: 'center', gap: 10 }}>
					<Image
						source={images.successcheck}
						style={{ width: 66, height: 70, resizeMode: 'contain', alignSelf: 'center' }}
					/>
					<Title text={'Success'} textWeight={'600'} textSize={20} />
					<Title
						text={'You can go ahead and request your first loan'}
						textColor="#00000099"
						textWeight={'500'}
					/>
					<SubmitBtn onPress={handleNav} title={'Proceed'} />
				</View>
			</CModal>
		</Screen>
	)
}

export default CapturephotoScreen

function createStyles(theme: ThemeType) {
	return StyleSheet.create({
		container: {},
		content: {
			marginTop: 40,
			gap: 20,
		},
		outerCircle: {
			width: SIZES.width - 40,
			height: SIZES.width - 40,
			borderRadius: 300, // half of width/height
			backgroundColor: '#transparent', // outer circle color
			justifyContent: 'center',
			alignItems: 'center',
			borderWidth: 2,
			borderColor: theme.primary,
		},
		innerCircle: {
			width: '85%', // 100 - (10 * 2)
			height: '85%',
			borderRadius: 200,
			overflow: 'hidden',
		},
		image: {
			width: '100%',
			height: '100%',
		},
	})
}

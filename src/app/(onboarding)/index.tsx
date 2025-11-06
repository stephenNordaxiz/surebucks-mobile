/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	View,
	Text,
	StatusBar,
	StyleSheet,
	Animated,
	useWindowDimensions,
	FlatList,
	Image,
} from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { SubmitBtn } from '@/components'
import { SIZES, ThemeType } from '@/constants/theme'
import { getMontserratFontFamily } from '@/utils/checker'
import { useThemeStore } from '@/stores/themeStore'
import images from '@/constants/images'
import { nav } from '@/utils/navigationService'
import { useOnboardingStore } from '@/stores/onboardingStore'

const onboardData = [
	{
		id: 0,
		title: 'Quick Cash Access',
		subTitle: 'Get approved in minutes and receive funds directly to your account today.',
		img: images.onboard1,
	},
	{
		id: 1,
		title: 'Flexible Repayment',
		subTitle: 'Choose payment plans that fit your budget with transparent terms.',
		img: images.onboard2,
	},
	{
		id: 2,
		title: 'Secure Application',
		subTitle: 'Your information is protected with bank-level security.',
		img: images.onboard3,
	},
]

export default function Onboarding() {
	const theme = useThemeStore((s) => s.theme)
	const styles = createStyles(theme)
	const setCompleted = useOnboardingStore((s) => s.setCompleted)
	

	// const handleFinish = () => {
	// 	// setCompleted(true)
	// 	router.replace('/login')
	// }

	const { width } = useWindowDimensions()
	const scrollX = useRef(new Animated.Value(0)).current
	const slidesRef = useRef<any>(null)
	const [currentIndex, setcurrentIndex] = useState(0)

	const viewableItemsChange = useRef(({ viewableItems }: { viewableItems: any }) => {
		setcurrentIndex(viewableItems[0].index)
	}).current

	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

	const scrollTo = () => {
		if (currentIndex < onboardData?.length - 1) {
			slidesRef?.current.scrollToIndex({
				index: currentIndex + 1,
			})
		} else {
			//save to
			setCompleted(true)
			nav('/login')
		}
	}

	const OnboardingItem = ({ item }: { item: any }) => {
		return (
			<View style={[styles.onboardingItem, { width }]}>
				<Image source={item?.img} style={styles?.image} />
				<View style={styles.textContainer}>
					<Text style={styles?.title}>{item?.title}</Text>
					<Text style={styles?.subTitle}>{item?.subTitle}</Text>
				</View>
			</View>
		)
	}

	const TextContainer = () => {
		return (
			<View style={styles.othersContainer}>
				{/* <Paginator data={data} scrollX={scrollX} /> */}
				<NextButton scrollTo={scrollTo} />
				<NextButton type scrollTo={scrollTo} />
			</View>
		)
	}

	const PaginatorTop = ({ data, scrollX }: { data: any[]; scrollX: Animated.Value }) => {
		const { width } = useWindowDimensions()

		return (
			<View style={styles.paginatorTop}>
				{data.map((_, i) => {
					const inputRange = [(i - 1) * width, i * width, (i + 1) * width]

					const opacity = scrollX.interpolate({
						inputRange,
						outputRange: [0.2, 1, 0.2],
						extrapolate: 'clamp',
					})

					return (
						<Animated.View
							key={i}
							style={[
								styles.dotTop,
								{
									width: (SIZES.width - 30) / 3,
									opacity,
								},
							]}
						/>
					)
				})}
			</View>
		)
	}

	const NextButton = ({ scrollTo, type }: { scrollTo: () => void; type?: boolean }) => {
		return (
			<View style={{ width, paddingHorizontal: 30 }}>
				{!type ? (
					<SubmitBtn
						onPress={scrollTo}
						borderColor={theme?.primary}
						outlined
						title={onboardData?.length - 1 === currentIndex ? 'Log In' : 'Next'}
						textColor={theme.primary}
						btnRadius={40}
						style={{ justifyContent: 'center', alignItems: 'center' }}
					/>
				) : (
					<SubmitBtn
						onPress={() => nav('/register')}
						bgColor={theme?.primary}
						title={'Get Started'}
						textColor={'white'}
						btnRadius={40}
						style={{ justifyContent: 'center', alignItems: 'center' }}
					/>
				)}
			</View>
		)
	}
	return (
		<SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
			<StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />

			<View style={{ flex: 0.8 }}>
				{/* <Logo center /> */}
				<PaginatorTop data={onboardData} scrollX={scrollX} />
				<FlatList
					onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
						useNativeDriver: false,
					})}
					onViewableItemsChanged={viewableItemsChange}
					viewabilityConfig={viewConfig}
					scrollEventThrottle={32}
					data={onboardData}
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => <OnboardingItem item={item} />}
					keyExtractor={(item) => item?.id.toString()}
					bounces={false}
					horizontal
					ref={slidesRef}
				/>
			</View>
			<View style={{ flex: 0.1, justifyContent: 'center', width }}>
				<TextContainer />
			</View>
		</SafeAreaView>
	)
}

function createStyles(theme: ThemeType) {
	return StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
		},
		onboardingItem: {
			alignItems: 'flex-start',
			paddingVertical: 30,
		},
		othersContainer: {
			paddingBottom: 20,
			alignItems: 'center',
		},
		textContainer: {
			// alignItems: 'flex-start',
			marginVertical: 20,
			paddingHorizontal: 30,
		},
		title: {
			fontFamily: getMontserratFontFamily('700'),
			fontSize: 24,
			marginBottom: 10,
			// textAlign: 'left',
			color: theme.primary,
		},
		subTitle: {
			fontFamily: getMontserratFontFamily('400'),
			fontSize: 16,
			color: theme.tertiary,
			textAlign: 'left',
			lineHeight: 20,
			marginBottom: 5,
		},
		image: {
			alignSelf: 'center',
			width: SIZES.width - 60,
			maxWidth: 230,
			lineHeight: 24,
			height: SIZES.width - 60,
			resizeMode: 'contain',
		},
		paginator: {
			flexDirection: 'row',
			marginTop: 20,
			marginBottom: 10,
		},
		dot: {
			height: 10,
			borderRadius: 5,
			marginHorizontal: 8,
		},
		paginatorTop: {
			width: '100%',
			flexDirection: 'row',
			justifyContent: 'center', // center dots
			alignItems: 'center',
			paddingHorizontal: 12, // respect parent padding
			marginTop: 16,
		},
		dotTop: {
			borderColor: theme.tertiary,
			borderWidth: 1,
			height: 8,
			borderRadius: 5,
			backgroundColor: theme.secondary,
			marginHorizontal: 4, // spacing between dots
		},
		nextButton: {
			justifyContent: 'center',
			alignItems: 'center',
			flex: 1,
		},
		button: {
			position: 'absolute',
			borderRadius: 100,
			padding: 20,
		},
	})
}

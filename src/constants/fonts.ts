/* eslint-disable @typescript-eslint/no-require-imports */
const Fonts = {
	MontserratThin: require('../assets/fonts/Montserrat-Thin.ttf'),
	MontserratThinItalic: require('../assets/fonts/Montserrat-ThinItalic.ttf'),
	MontserratLight: require('../assets/fonts/Montserrat-Light.ttf'),
	MontserratExtraLight: require('../assets/fonts/Montserrat-ExtraLight.ttf'),
	MontserratExtraLightItalic: require('../assets/fonts/Montserrat-ExtraLightItalic.ttf'),
	MontserratLightItalic: require('../assets/fonts/Montserrat-LightItalic.ttf'),
	MontserratMediumItalic: require('../assets/fonts/Montserrat-MediumItalic.ttf'),
	MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
	MontserratBlack: require('../assets/fonts/Montserrat-Black.ttf'),
	MontserratBlackItalic: require('../assets/fonts/Montserrat-BlackItalic.ttf'),
	MontserratBold: require('../assets/fonts/Montserrat-Bold.ttf'),
	MontserratExtraBold: require('../assets/fonts/Montserrat-ExtraBold.ttf'),
	MontserratExtraBoldItalic: require('../assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
	MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
	MontserratSemiBoldItalic: require('../assets/fonts/Montserrat-SemiBoldItalic.ttf'),
	MontserratBoldItalic: require('../assets/fonts/Montserrat-BoldItalic.ttf'),
	Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
}

export type FontFamily = keyof typeof Fonts

export default Fonts

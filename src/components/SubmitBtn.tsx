/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TextStyle,
	TouchableOpacity,
	ViewStyle,
} from 'react-native'
import { COLORS } from '../constants'
import React, { ReactNode } from 'react'
import Row from './Row'
import { getMontserratFontFamily, hexToRgba } from '@/utils/checker'
import { useThemeStore } from '@/stores/themeStore'

const SubmitBtn = ({
  title,
  textColor,
  bgColor,
  outlined,
  disabled,
  borderWidth,
  onPress,
  style,
  textStyle,
  loading,
  btnWidth,
  btnHeight,
  icon,
  fontSize,
  center,
  btnRadius,
  fontFamily,
  borderColor,
}: {
  title?: any
  textColor?: string
  bgColor?: string
  outlined?: boolean
  disabled?: boolean
  borderWidth?: number
  btnHeight?: any
  onPress?: () => void
  style?: ViewStyle
  textStyle?: TextStyle
  loading?: boolean
  btnWidth?: any
  fontSize?: number
  btnRadius?: number
  icon?: ReactNode
  center?: boolean
  fontFamily?: string
  borderColor?: string
}) => {
  const currentTheme = useThemeStore((s) => s.theme)
  const txtcolor = textColor ? textColor : COLORS.white

  // Apply 60% opacity if loading or disabled
  const resolvedBg = bgColor || currentTheme.primary
  const backcolor =
    loading || disabled ? hexToRgba(resolvedBg, 0.6) : resolvedBg

  const bordWidth = borderWidth ? borderWidth : 1

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        style,
        {
          width: btnWidth ?? '100%',
          marginTop: 12,
          height: btnHeight ?? 46,
          borderColor: outlined ? borderColor : COLORS.white,
          borderWidth: outlined ? bordWidth : 0,
          backgroundColor: outlined ? 'transparent' : backcolor,
          borderRadius: btnRadius ?? 40,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.white} />
      ) : icon ? (
        <Row
          style={[
            !center ? styles.checker : styles.checker,
            { justifyContent: 'center' },
          ]}
        >
          {icon}
          <Text
            style={[
              textStyle,
              {
                fontFamily: fontFamily || getMontserratFontFamily('600'),
                fontSize: fontSize || 14,
                color: txtcolor,
                textAlign: 'center',
              },
            ]}
          >
            {title}
          </Text>
        </Row>
      ) : (
        <Text
          style={[
            textStyle,
            {
              fontFamily: fontFamily || getMontserratFontFamily('600'),
              fontSize: fontSize || 14,
              color: txtcolor,
              textAlign: 'center',
            },
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default SubmitBtn

const styles = StyleSheet.create({
	checker: {
		gap: 10,
		alignItems: 'center',
	},
})

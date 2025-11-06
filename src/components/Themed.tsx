/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from 'react-native';
import React from"react"
// import Colors from '../constants/Colors';



export function Text() {
  // const { style, lightColor, darkColor, ...otherProps } = props;
  // const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText  />;
}

export function View() {
  // const { style, lightColor, darkColor, ...otherProps } = props;
  // const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView />;
}

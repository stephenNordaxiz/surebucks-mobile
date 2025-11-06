import { Platform, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser"
import * as AppleAuthentication from "expo-apple-authentication"

import { Text, View } from './Themed';
import { AppleLogo, FacebookLogo, GoogleLogo } from '../logos';

WebBrowser.maybeCompleteAuthSession();

export const FacebookButton = ({
    text,
    onPress,
    style,
}:{
    text: string;
    onPress: () => void;
    style?: ViewStyle;
}) => {
  return (
    <TouchableOpacity style={[styles.button, {backgroundColor: "#3b5998"}, style]} onPress={onPress}>
      <FacebookLogo style={styles.buttonLogo}/>
      <Text style={[styles.buttonText, {color: "white"}]}>{text}</Text>
    </TouchableOpacity>
  )
}

export const GoogleButton = ({
    text,
    onPress,
    style,
}:{
    text: string;
    onPress: () => void;
    style?: ViewStyle;
}) => {
  return (
    <TouchableOpacity style={[styles.button, {backgroundColor: "white"}, style]} onPress={onPress}>
      <GoogleLogo style={styles.buttonLogo}/>
      <Text style={[styles.buttonText, {color: "#36454f"}]}>{text}</Text>
    </TouchableOpacity>
  )
}

export const AppleButton = ({
    type,
    onPress,
}:{
    type: "sign-in" | "sign-up";
    onPress: () => void;
}) => {
  if(Platform.OS !== "ios") return null;
  if(!AppleAuthentication.isAvailableAsync()) return null;

  return (
    <AppleAuthentication.AppleAuthenticationButton
        buttonType={type === "sign-in" ? AppleAuthentication.AppleAuthenticationButtonType.CONTINUE : AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
        cornerRadius={5}
        style={styles.appleButton}
        onPress={onPress}
    />
  )
}


const styles = StyleSheet.create({
    button:{
        display: "flex",
        width: "100%",
        height: 50,
        borderRadius: 5,
        flexDirection: "row",
    },
    buttonLogo:{
        marginLeft: 10,
        marginTop: 1,
        fontSize:20,
    },
    buttonText:{
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 15,
        marginLeft: 40,
    },
    appleButton:{
        width: "100%",
        height: 50,
    }
})
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import * as Clipboard from "expo-clipboard";

import { COLORS, SIZES } from "../constants";
import { getMontserratFontFamily } from "@/utils/checker";
import { useThemeStore } from "@/stores/themeStore";

interface OTPInputProps {
  otpSet: string[];
  handleOTPSet: (otp: string[]) => void;
  box?: number;
  label?: string;
  width?: number;
  check?: boolean;
  highlightText?: boolean;
  textSize?: number;
  textWeight?: string;
}

const OTPInput = ({
  otpSet,
  handleOTPSet,
  box = 6,
  width,
  label,
  check,
  highlightText,
  textSize,
  textWeight,
}: OTPInputProps) => {
  const inputsRef = useRef<any>([]);
  const currentTheme = useThemeStore((s) => s.theme);

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [selectColor, setSelectColor] = useState<any>(COLORS.lightGray3);

  const array = Array.from({ length: box }, (_, index) => index);

  const changeOTP = (value: string, index: number) => {
    const updated = [...otpSet];
    updated[index] = value;

    handleOTPSet(updated);

    // Move focus
    if (value) {
      inputsRef.current[index + 1]?.focus();
    } else {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const observePressIn = async () => {
    const txt = await Clipboard.getStringAsync();
    if (!txt) return;

    if (txt.length === box && !isNaN(Number(txt))) {
      const arr = txt.split("");
      handleOTPSet(arr);
      inputsRef.current[box - 1]?.focus();

      await Clipboard.setStringAsync(""); // clear paste
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
    setSelectColor(COLORS.secondary);
  };

  const handleBlur = () => {
    setSelectColor(COLORS.lightGray3);
  };

  return (
    <View style={{ justifyContent: "center" }}>
      {highlightText && (
        <Text
          style={{
            paddingVertical: 20,
            color: currentTheme.tertiary,
            fontFamily: "Montserrat",
            fontSize: 18,
          }}
        >
          {label}
        </Text>
      )}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {array.map((index) => (
          <View key={index}>
            <TextInput
              style={{
                height: SIZES.width / 8,
                width: width ? width : SIZES.width / 8,
                borderWidth: 1,
                borderRadius: 8,
                padding: 10,
                color: currentTheme.tertiary,
                borderColor:
                  focusedIndex === index ? selectColor : currentTheme.subTitle,
                textAlign: "center",
                backgroundColor: currentTheme.background1,
                fontSize: textSize ?? (check ? 18 : 16),
                fontFamily: textWeight
                  ? getMontserratFontFamily(textWeight)
                  : getMontserratFontFamily("400"),
              }}
              inputMode="numeric"
              selectTextOnFocus={true}
              maxLength={1}
              onPressIn={observePressIn}
              onChangeText={(e) => changeOTP(e, index)}
              value={otpSet[index] ?? ""}
              keyboardType="number-pad"
              returnKeyType="send"
              secureTextEntry={check}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              ref={(r) => {
                inputsRef.current[index] = r;
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default OTPInput;

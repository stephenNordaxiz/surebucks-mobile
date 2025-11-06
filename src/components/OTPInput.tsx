/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import * as Clipboard from "expo-clipboard";

import { COLORS, SIZES } from "../constants";
import { getMontserratFontFamily } from "@/utils/checker";
import { useThemeStore } from "@/stores/themeStore";

const OTPInput = ({
  check,
  width,
  label,
  otpSet,
  highlightText,
  handleOTPSet,
  box,
  textSize,
  textWeight,
}: {
  otpSet: string[];
  box?: number;
  label?: string;
  width?: number;
  handleOTPSet: (text: any) => void;
  check?: boolean;
  highlightText?: boolean;
  textSize?: number;
  textWeight?: string;
}) => {
  const inputsRef = useRef<any>([]);
  const [focusOn, setFocusOn] = useState(0);
  const currentTheme = useThemeStore((s) => s.theme);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [selectColor, setSelectColor] = useState<any>(COLORS.lightGray3);

  const changeOTP = async (value: string, index: number) => {
    handleOTPSet({ ...otpSet, [index]: `${value}` });

    if (!value) {
      setFocusOn(index - 1);
      inputsRef.current[index - 1]?.focus();
    } else {
      setFocusOn(index + 1);
      inputsRef.current[index + 1]?.focus();
    }
  };

  const observePressIn = async () => {
    const text = await Clipboard.getStringAsync();
    const splitText = text.split(""); // replaces split("", text)

    if (splitText.length > 5 && !isNaN(Number(text))) {
      const obj: any = {};
      splitText.forEach((txt, idx) => {
        obj[idx] = String(txt);
      });

      handleOTPSet({ ...otpSet, ...obj });
      setFocusOn(5);
      inputsRef.current[6]?.focus();
      await Clipboard.setStringAsync("");
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
    setSelectColor(COLORS.secondary);
  };

  const handleBlur = () => {
    setSelectColor(COLORS.lightGray3);
  };

  const array = Array.from({ length: box || 6 }, (_, index) => index);

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
        {array.map((index) => {
          return (
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
                value={otpSet?.[index] ?? null} // replaces pathOr(null, [index], otpSet)
                keyboardType="number-pad"
                secureTextEntry={check}
                autoFocus={focusOn === index}
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
                ref={(r) => {
                  inputsRef.current[index] = r;
                }}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default OTPInput;



/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Animated,
  Easing,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { SIZES } from "@/constants";

const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"];
const dialPadSize = SIZES.width * 0.2;

const DialPad = ({
  onPress,
  setIsVisible,
  isVisible,
  btnBgColor,
  btnTextColor,
  height,
}: {
  onPress: (item: any) => void;
  setIsVisible: (item: boolean) => void;
  isVisible: boolean;
  btnBgColor?: string;
  btnTextColor?: string;
  height?: any;
}) => {
  const animatedValues = React.useRef(
    new Map(dialPad.map((item) => [item, new Animated.Value(0)]))
  ).current;
  const animatePress = (item: any) => {
    const anim = animatedValues.get(item);
    if (!anim) return;

    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start(() => {
      // Reset
      Animated.timing(anim, {
        toValue: 0,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }).start();
    });
  };

  const handlePress = (item: any) => {
    animatePress(item);

    if (item === "") {
      setIsVisible(!isVisible);
    } else {
      onPress(item);
    }
  };

  return (
    <View style={{ height: height || 400 }}>
      <FlatList
        data={dialPad}
        numColumns={3}
        style={{ flexGrow: 1 }}
        keyExtractor={(_, index) => index.toString()}
        scrollEnabled={false}
        columnWrapperStyle={{ gap: 20 }}
        contentContainerStyle={{ gap: 20 }}
        renderItem={({ item }) => {
          const animatedValue = animatedValues.get(item);
          const backgroundColor = animatedValue
            ? animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [btnBgColor || "#FFFFFF33", "#AAAAAA55"],
              })
            : btnBgColor || "#FFFFFF33";

          return (
            <TouchableOpacity onPress={() => handlePress(item)}>
              <Animated.View
                style={{
                  width: (SIZES.width - 40 - 40) / 3,
                  height: dialPadSize * 0.7,
                  borderRadius: dialPadSize / 4,
                  backgroundColor,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item === "del" ? (
                  <Ionicons
                    name="backspace-outline"
                    size={dialPadSize / 3}
                    color={btnTextColor || "white"}
                  />
                ) : item === "" ? (
                  <Ionicons
                    name={!isVisible ? "eye" : "eye-off"}
                    size={dialPadSize / 3}
                    // onPress={() => setIsVisible(!isVisible)}
                    color={btnTextColor || "white"}
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: dialPadSize / 4,
                      color: btnTextColor || "white",
                    }}
                  >
                    {item}
                  </Text>
                )}
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default DialPad;

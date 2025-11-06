import { View, ViewStyle } from "react-native";
import React from "react";
import { COLORS } from "@/constants";

const Demarcator = ({
  width,
  height,
  color,
  style,
}: {
  style?: ViewStyle | ViewStyle[];
  width?: any;
  height?: any;
  color?: string;
}) => {
  return (
    <View
      style={[
        style,
        {
          width: width ? width : "100%",
          backgroundColor: color ? color : COLORS.lightGray1,
          height: height ? height : "100%",
          borderRadius: 10,
        },
      ]}
    />
  );
};

export default Demarcator;

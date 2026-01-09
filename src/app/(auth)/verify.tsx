import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { OTPInput, Screen, SubmitBtn, Title } from "@/components";
import { useAuthStore } from "@/stores/authStore";
import { formatPhoneNumber } from "@/utils/checker";
import { useLocalSearchParams } from "expo-router";
import { COLORS } from "@/constants";
import { nav } from "@/utils/navigationService";
import { AuthApi } from "@/api/auth.api";
import { useModalStore } from '@/stores/modalStore'

const VerifyNumberScreen = () => {
  const phoneDetails = useAuthStore((s) => s.phone);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(1800);
  const [loading, setLoading] = useState(false);
  const { from, phone, otpCode } = useLocalSearchParams();
  const showModal = useModalStore((s) => s.showModal)


  // Convert array to single string
  const getOtpString = () => otp.join("");

  useEffect(() => {
    if (secondsLeft === 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSubmit = async () => {
    const otpValue = getOtpString();

    if (otpValue.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      const phoneToVerify =
        from === "register"
          ? phoneDetails?.fullPhoneNumber || ""
          : (phone as string);

      // console.log("Verifying OTP:", phoneToVerify, otpValue);

       await AuthApi.verifyOtp(phoneToVerify, otpValue);
      nav("/password", {
        from: from === "register" ? "verify-to-new" : "verify-to-reset",
        phone: phoneToVerify,
        otp: otpValue,
      });
    } catch (error: any) {

      showModal({
        title: 'Verification Failed',
        description: error?.response?.data?.error || error?.message || "An error occurred during verification.",
        type: 'error',
        confirmText: 'Try Again',
      })
        
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const phoneToSend =
        from === "register"
          ? phoneDetails?.fullPhoneNumber
          : phone;

      await AuthApi.requestOtp(phoneToSend as string);
      setSecondsLeft(1800);
      Alert.alert("Success", "OTP has been resent");
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.error || "Failed to resend OTP"
      );
    }
  };

  return (
    <Screen
      padded
      showHeader
      showBackButton
      showInfoButton
      onInfoPress={() =>
        Alert.alert("Info", "This is a verification step.")
      }
    >
      <View style={styles.container}>
        <View style={{ gap: 8 }}>
          <Title
            text={"Verify your phone number"}
            textWeight={"600"}
            textSize={18}
          />

          <Title
            textstyle={{ lineHeight: 20 }}
            text={"Kindly input the security code sent to your number"}
            textWeight={"400"}
          />

          <Title
            textstyle={{ marginTop: -3 }}
            text={
              from === "register"
                ? formatPhoneNumber(phoneDetails?.fullPhoneNumber)
                : formatPhoneNumber(phone)
            }
            textWeight={"500"}
          />

          <View style={{ marginTop: 16 }}>
            <OTPInput
              otpSet={otp}
              handleOTPSet={setOtp}
              box={6}
            />
          </View>

          <Pressable
            disabled={secondsLeft > 0}
            onPress={handleResend}
          >
            <Text style={styles.noOtp}>
              {"Didn't receive a code? "}
              <Text style={styles.resend}>
                {secondsLeft > 0 ? formatTime() + "s" : "Resend"}
              </Text>
            </Text>
          </Pressable>
          <View style={{backgroundColor: 'red', borderRadius: 8, padding: 10, marginTop: 10}}>
            <Text style={{color: 'white', fontSize: 20
            }}>DEMO: Use code {otpCode} </Text>
          </View>
        </View>

        <SubmitBtn
          onPress={handleSubmit}
          title={"Continue"}
          style={styles.button}
          loading={loading}
          disabled={loading || getOtpString().length < 6}
        />
      </View>
    </Screen>
  );
};

export default VerifyNumberScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    justifyContent: "space-between",
  },
  button: {
    marginBottom: 20,
  },
  noOtp: {
    marginTop: 2,
  },
  resend: {
    fontSize: 14,
    color: COLORS.primary,
  },
});

import * as Notifications from "expo-notifications";

export const sendNotification = async (
  expoPushToken: Notifications.ExpoPushToken,
  title: string,
  msg: string
) => {
  console.log("Sending push notification...");

  // notification message
  const message = {
    to: expoPushToken?.data,
    sound: "default",
    title,
    body: msg,
  };
  try {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.log(error)
  }
};

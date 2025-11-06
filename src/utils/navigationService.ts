/* eslint-disable @typescript-eslint/no-explicit-any */
// src/utils/navigationService.ts
import { router } from "expo-router";

export function nav(path: string, params?: Record<string, any>) {
  router.push({ pathname: path, params });
}

export function replaceNav(path: string, params?: Record<string, any>) {
  router.replace({ pathname: path, params });
}

export function goBack() {
  router.back();
}

export function resetNav(path: string, params?: Record<string, any>) {
  router.replace({ pathname: path, params });
  // Expo Router doesn't have a direct reset like CommonActions.reset
  // You may handle reset manually via layout structure
}

export function popToTop() {
  // Expo Router doesn't expose popToTop directly
  // You can simulate it with router.replace("/") or the top route
  router.replace("/");
}

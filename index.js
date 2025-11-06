/* eslint-disable no-undef */
// index.tsx
import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';
import React from 'react';

const App = () => {
  const ctx = require.context('./src/app', true, /.*/);
  return <ExpoRoot context={ctx} />;
};

registerRootComponent(App);

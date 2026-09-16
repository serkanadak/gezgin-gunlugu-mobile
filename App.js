import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { JournalProvider } from './src/state/JournalContext';
import RootNavigator from './src/navigation/RootNavigator';
import SyncNotice from './src/components/SyncNotice';
import { colors } from './src/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <JournalProvider>
        <StatusBar style="dark" />
        {/* Veri başka bir pencerede güncellendiğinde uyarı HER ekranda görünsün. */}
        <View style={{ flex: 1, backgroundColor: colors.bg }}>
          <RootNavigator />
          <SyncNotice floating />
        </View>
      </JournalProvider>
    </SafeAreaProvider>
  );
}

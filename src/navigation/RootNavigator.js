import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TripsScreen from '../screens/TripsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NewTripScreen from '../screens/NewTripScreen';
import TripDetailScreen from '../screens/TripDetailScreen';
import ChecklistScreen from '../screens/ChecklistScreen';
import RouteScreen from '../screens/RouteScreen';
import AddStopScreen from '../screens/AddStopScreen';
import DiscoveryHubScreen from '../screens/DiscoveryHubScreen';
import AddDiscoveryScreen from '../screens/AddDiscoveryScreen';
import DiscoveryDetailScreen from '../screens/DiscoveryDetailScreen';
import ItineraryScreen from '../screens/ItineraryScreen';
import DayNotesScreen from '../screens/DayNotesScreen';
import ExpensesScreen from '../screens/ExpensesScreen';
import ExpenseReportScreen from '../screens/ExpenseReportScreen';
import AlbumScreen from '../screens/AlbumScreen';
import VideoScriptScreen from '../screens/VideoScriptScreen';
import { colors } from '../theme';
import { t } from '../i18n';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.bg,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    primary: colors.primary,
  },
};

const TAB_ICONS = { Seyahatler: '🧭', Ayarlar: '⚙️' };
const TAB_LABELS = { Seyahatler: t('nav.trips'), Ayarlar: t('nav.settings') };

function icon(routeName) {
  return ({ color }) => <Text style={{ fontSize: 18, color }}>{TAB_ICONS[routeName]}</Text>;
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarIcon: icon(route.name),
        tabBarLabel: TAB_LABELS[route.name] || route.name,
      })}
    >
      <Tab.Screen name="Seyahatler" component={TripsScreen} options={{ title: t('nav.trips') }} />
      <Tab.Screen name="Ayarlar" component={SettingsScreen} options={{ title: t('nav.settings') }} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTitleStyle: { color: colors.text },
          headerTintColor: colors.primary,
        }}
      >
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="NewTrip" component={NewTripScreen} options={{ title: t('nav.newTrip') }} />
        <Stack.Screen name="TripDetail" component={TripDetailScreen} options={{ title: t('nav.trip') }} />
        <Stack.Screen name="Checklist" component={ChecklistScreen} options={{ title: t('nav.checklist') }} />
        <Stack.Screen name="Route" component={RouteScreen} options={{ title: t('nav.route') }} />
        <Stack.Screen name="AddStop" component={AddStopScreen} options={{ title: t('nav.addStop') }} />
        <Stack.Screen name="DiscoveryHub" component={DiscoveryHubScreen} options={{ title: t('nav.discoveryHub') }} />
        <Stack.Screen name="AddDiscovery" component={AddDiscoveryScreen} options={{ title: t('nav.addDiscovery') }} />
        <Stack.Screen name="DiscoveryDetail" component={DiscoveryDetailScreen} options={{ title: t('nav.discovery') }} />
        <Stack.Screen name="Itinerary" component={ItineraryScreen} options={{ title: t('plan.title') }} />
        <Stack.Screen name="DayNotes" component={DayNotesScreen} options={{ title: t('day.title') }} />
        <Stack.Screen name="Expenses" component={ExpensesScreen} options={{ title: t('nav.expenses') }} />
        <Stack.Screen name="ExpenseReport" component={ExpenseReportScreen} options={{ title: t('nav.expenseReport') }} />
        <Stack.Screen name="Album" component={AlbumScreen} options={{ title: t('nav.album') }} />
        <Stack.Screen name="VideoScript" component={VideoScriptScreen} options={{ title: t('nav.videoScript') }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

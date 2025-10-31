// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';
import { useAuth } from '@/contexts/authcontexts';
import { useEffect } from 'react';
import { router } from 'expo-router';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

// // Material Icons
// import { MaterialIcons } from '@expo/vector-icons';
// <MaterialIcons name="home" size={size} color={color} />

// // FontAwesome
// import { FontAwesome } from '@expo/vector-icons';
// <FontAwesome name="home" size={size} color={color} />

// // MaterialCommunityIcons
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// <MaterialCommunityIcons name="home" size={size} color={color} />

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !session) {
      router.replace('/(auth)/login');
    }
  }, [session, isLoading]);

  if (isLoading || !session) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="house" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Comunidade',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="user-group" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="service"
        options={{
          title: 'Serviços',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="hand-holding-heart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="sliders" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
        tabBarLabelStyle: {
          marginTop: 6,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "GradientText",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="gradient"
              size={focused ? 28 : 24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="CircularCarousel"
        options={{
          title: "CircularCarousel",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="view-carousel"
              size={focused ? 28 : 24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="StickerDnD"
        options={{
          title: "StickerDnD",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="drag-indicator"
              size={focused ? 28 : 24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Skia"
        options={{
          title: "Skia",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="graphic-eq"
              size={focused ? 28 : 24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="3DCarousel"
        options={{
          title: "3DCarousel",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="3d-rotation"
              size={focused ? 24 : 22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

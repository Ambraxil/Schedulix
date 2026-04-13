import React from "react";
import { View } from "react-native";
import { usePathname } from "expo-router";
import NavIcon from "./NavIcon";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 14,
        backgroundColor: "#0f172a",
        borderTopWidth: 1,
        borderTopColor: "#1e293b",
      }}
    >
      <NavIcon icon="home-outline" label="Home" active={pathname === "/"} link="/" />
      <NavIcon icon="checkmark-circle-outline" label="Tasks" active={pathname === "/tasks"} link="/tasks" />
      <NavIcon icon="repeat-outline" label="Habits" active={pathname === "/habits"} link="/habits" />
      <NavIcon icon="settings-outline" label="Settings" active={pathname === "/settings"} link="/settings" />
    </View>
  );
}
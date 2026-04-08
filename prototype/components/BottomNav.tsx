import React from "react";
import { View } from "react-native";
import NavIcon from "./NavIcon";

export default function BottomNav() {
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
      <NavIcon icon="home-outline" label="Dashboard" active />
      <NavIcon icon="checkmark-circle-outline" label="Tasks" />
      <NavIcon icon="calendar-outline" label="Calendar" />
      <NavIcon icon="repeat-outline" label="Habits" />
      <NavIcon icon="settings-outline" label="Settings" />
    </View>
  );
}
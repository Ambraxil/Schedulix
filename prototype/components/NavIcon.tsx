import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NavIcon({ icon, label, active }: any) {
  return (
    <TouchableOpacity style={{ alignItems: "center" }}>
      <Ionicons
        name={icon}
        size={22}
        color={active ? "#3b82f6" : "#64748b"}
      />
      <Text
        style={{
          color: active ? "#3b82f6" : "#64748b",
          fontSize: 12,
          marginTop: 4,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
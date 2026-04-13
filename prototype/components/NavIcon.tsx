import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function NavIcon({ icon, label, active, link }: any) {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={{ alignItems: "center" }}
      onPress={() => link && router.push(link)}
    >
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
import React from "react";
import { View, Text } from "react-native";
import { priorityColor } from "../utils/priorityColor";

export default function CalendarItem({ item }: any) {
  const start = new Date(item.start);
  const end = new Date(item.end);

  const durationMin = Math.round((end.getTime() - start.getTime()) / 60000);

  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: 18,
      }}
    >
      <View style={{ width: 90 }}>
        <Text style={{ color: "#94a3b8" }}>
          {start.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: "#1e293b",
          borderRadius: 14,
          padding: 16,
          borderLeftWidth: 4,
          borderLeftColor: priorityColor(item.priority),
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 4,
          }}
        >
          {item.title}
        </Text>

        <Text style={{ color: "#94a3b8" }}>{durationMin}m</Text>
      </View>
    </View>
  );
}
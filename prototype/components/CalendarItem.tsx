import React, { useState } from "react";
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from "react-native";
import { priorityColor } from "../utils/priorityColor";

// Enable LayoutAnimation for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function CalendarItem({ item }: any) {
  const [expanded, setExpanded] = useState(false);

  const start = new Date(item.start);
  const end = new Date(item.end);
  const durationMin = Math.round((end.getTime() - start.getTime()) / 60000);

  const handlePress = () => {
    // Animate the expansion/collapse
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={{ marginBottom: 18 }}
    >
      <View style={{ flexDirection: "row" }}>
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

          {expanded && item.description && (
            <Text style={{ color: "#cbd5e1", marginBottom: 4 }}>
              {item.description}
            </Text>
          )}

          <Text style={{ color: "#94a3b8" }}>{durationMin}m</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
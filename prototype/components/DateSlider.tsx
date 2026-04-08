import React, { useMemo } from "react";
import { ScrollView, TouchableOpacity, Text, View } from "react-native";

interface Props {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export default function DateSlider({ selectedDate, onSelectDate }: Props) {
  const days = useMemo(() => {
    const arr: Date[] = [];
    const today = new Date();

    for (let i = -3; i <= 3; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      arr.push(d);
    }

    return arr;
  }, []);

  const isSameDay = (a: Date, b: Date) =>
    a.toDateString() === b.toDateString();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginBottom: 20 }}
    >
      {days.map((date) => {
        const selected = isSameDay(date, selectedDate);

        return (
          <TouchableOpacity
            key={date.toISOString()}
            onPress={() => onSelectDate(date)}
            style={{
              marginRight: 14,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 14,
                borderRadius: 12,
                backgroundColor: selected ? "#2563eb" : "#0f172a",
              }}
            >
              <Text
                style={{
                  color: selected ? "white" : "#94a3b8",
                  fontSize: 12,
                }}
              >
                {date.toLocaleDateString("en-US", { weekday: "short" })}
              </Text>

              <Text
                style={{
                  color: selected ? "white" : "#e2e8f0",
                  fontSize: 16,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {date.getDate()}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
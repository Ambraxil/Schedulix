import React, { useMemo, useEffect, useRef } from "react";
import { FlatList, TouchableOpacity, Text, View } from "react-native";

interface Props {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export default function DateSlider({ selectedDate, onSelectDate }: Props) {
  const days = useMemo(() => {
    const arr: Date[] = [];
    const today = new Date();

    // 180 days in the past to 180 days in the future (~6 months)
    for (let i = -180; i <= 180; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      arr.push(d);
    }

    return arr;
  }, []);

  const flatListRef = useRef<FlatList>(null);

  // Find the index of the selected date whenever it changes
  const currentIndex = useMemo(() => {
    return days.findIndex(
      (d) => d.toDateString() === selectedDate.toDateString()
    );
  }, [days, selectedDate]);

  const mounted = useRef(false);

  useEffect(() => {
    if (currentIndex !== -1 && flatListRef.current) {
      // Small timeout for initial render to ensure FlatList is ready
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: currentIndex,
          animated: mounted.current,
          viewPosition: 0.5,
        });
        mounted.current = true;
      }, mounted.current ? 0 : 100);
    }
  }, [currentIndex]);

  const isSameDay = (a: Date, b: Date) =>
    a.toDateString() === b.toDateString();

  return (
    <FlatList
      ref={flatListRef}
      data={days}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginBottom: 20, flexGrow: 0, minHeight: 60 }}
      keyExtractor={(item) => item.toISOString()}
      initialScrollIndex={currentIndex !== -1 ? currentIndex : 0}
      getItemLayout={(_, index) => ({
        length: 64, // 50 width + 14 marginRight
        offset: 64 * index,
        index,
      })}
      renderItem={({ item }) => {
        const selected = isSameDay(item, selectedDate);

        return (
          <TouchableOpacity
            onPress={() => onSelectDate(item)}
            style={{
              marginRight: 14,
              alignItems: "center",
              width: 50, // fixing width to help with getItemLayout
            }}
          >
            <View
              style={{
                width: "100%",
                paddingVertical: 10,
                borderRadius: 12,
                backgroundColor: selected ? "#2563eb" : "#0f172a",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: selected ? "white" : "#94a3b8",
                  fontSize: 12,
                }}
              >
                {item.toLocaleDateString("en-US", { weekday: "short" })}
              </Text>

              <Text
                style={{
                  color: selected ? "white" : "#e2e8f0",
                  fontSize: 16,
                  fontWeight: "600",
                  textAlign: "center",
                  marginTop: 2,
                }}
              >
                {item.getDate()}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}
import React, { useMemo, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";

import CalendarItem from "../components/CalendarItem";
import BottomNav from "../components/BottomNav";
import DateSlider from "../components/DateSlider";

import { initialItems } from "../data/calendarItems";

export default function App() {
  const [events] = useState(initialItems);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // filter by selected day
  const filteredEvents = useMemo(() => {
    return events.filter(
      (event) =>
        new Date(event.start).toDateString() ===
        selectedDate.toDateString()
    );
  }, [events, selectedDate]);

  // sort by time of day
  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort(
      (a, b) =>
        new Date(a.start).getTime() -
        new Date(b.start).getTime()
    );
  }, [filteredEvents]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#020617",
      }}
    >
      <View style={{ flex: 1, paddingHorizontal: 18 }}>
        {/* Header */}
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Text
            style={{
              color: "white",
              fontSize: 22,
              fontWeight: "700",
            }}
          >
            Schedulix
          </Text>

          <Text style={{ color: "#94a3b8", marginTop: 6 }}>
            Good Morning
          </Text>
        </View>

        {/* Date Slider */}
        <DateSlider
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {/* Calendar Items */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {sortedEvents.map((item) => (
            <CalendarItem key={item.id} item={item} />
          ))}
        </ScrollView>
      </View>

      <BottomNav />
    </SafeAreaView>
  );
}
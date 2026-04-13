import React, { useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useFocusEffect } from "expo-router";

import CalendarItem from "../components/CalendarItem";
import BottomNav from "../components/BottomNav";
import DateSlider from "../components/DateSlider";
import Timeline from "../components/Timeline";

import { initialItems } from "../data/calendarItems";

export default function Home() {
  const router = useRouter();

  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Refresh whenever screen comes back into focus
  useFocusEffect(
    useCallback(() => {
      setEvents([...initialItems]);
    }, [])
  );

  const filteredEvents = useMemo(() => {
    return events.filter(
      (event: any) =>
        new Date(event.start).toDateString() ===
        selectedDate.toDateString()
    );
  }, [events, selectedDate]);

  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort(
      (a: any, b: any) =>
        new Date(a.start).getTime() -
        new Date(b.start).getTime()
    );
  }, [filteredEvents]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#020617" }}>
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

        {/* Timeline View */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120, paddingTop: 10 }}>
          <Timeline events={sortedEvents} />
        </ScrollView>
      </View>

      {/* Floating + Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push("/create-task")}
      >
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 140,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  plus: {
    fontSize: 32,
    color: "#020617",
    lineHeight: 36,
    fontWeight: "700",
  },
});
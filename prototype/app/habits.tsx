import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";

const DUMMY_HABITS = [
  {
    id: "1",
    title: "Read 30 Minutes",
    schedule: "Daily at 8:00 PM",
    duration: "30 mins",
    streak: 12,
    done: true,
    color: "#10b981", // Green
  },
  {
    id: "2",
    title: "Morning Meditation",
    schedule: "Daily at 7:00 AM",
    duration: "15 mins",
    streak: 8,
    done: true,
    color: "#10b981", // Green
  },
  {
    id: "3",
    title: "Workout Session",
    schedule: "Mon, Wed, Fri at 6:00 PM",
    duration: "45 mins",
    streak: 15,
    done: false,
    color: "#3b82f6", // Blue
  },
  {
    id: "4",
    title: "Review Learning Notes",
    schedule: "Daily at 9:00 PM",
    duration: "20 mins",
    streak: 5,
    done: false,
    color: "#f59e0b", // Yellow/Orange
  },
  {
    id: "5",
    title: "Journal Writing",
    schedule: "Daily at 10:00 PM",
    duration: "10 mins",
    streak: 3,
    done: false,
    color: "#8b5cf6", // Purple
  },
];

export default function Habits() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Habits</Text>
          <Text style={styles.headerSubtitle}>Stay consistent, Rishabh</Text>
        </View>
        <TouchableOpacity style={styles.addBtnTop}>
          <Feather name="plus" size={20} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {DUMMY_HABITS.map((habit) => (
          <TouchableOpacity
            key={habit.id}
            activeOpacity={0.8}
            style={[styles.card, { borderLeftColor: habit.color }]}
          >
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{habit.title}</Text>
              <Text style={styles.cardSchedule}>{habit.schedule}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardDuration}>{habit.duration}</Text>
                <Text style={styles.cardStreak}>🔥 {habit.streak} day streak</Text>
              </View>
            </View>
            <View style={styles.cardAction}>
              {habit.done ? (
                <View style={styles.checkedCircle}>
                  <Feather name="check" size={16} color="white" />
                </View>
              ) : null}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Floating Add Habits Button */}
      <View style={styles.floatingBtnWrapper}>
        <TouchableOpacity style={styles.addHabitsBtn}>
          <Text style={styles.addHabitsTxt}>+ Add Habits</Text>
        </TouchableOpacity>
      </View>

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020617",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerSubtitle: {
    color: "#64748b",
    fontSize: 14,
  },
  addBtnTop: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120, // Leave space for floating button
    gap: 16,
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 14,
    padding: 16,
    borderLeftWidth: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardSchedule: {
    color: "#94a3b8",
    fontSize: 13,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardDuration: {
    color: "#94a3b8",
    fontSize: 13,
  },
  cardStreak: {
    color: "#f59e0b",
    fontSize: 13,
    fontWeight: "600",
  },
  cardAction: {
    width: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  checkedCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#10b981",
    justifyContent: "center",
    alignItems: "center",
  },
  floatingBtnWrapper: {
    position: "absolute",
    bottom: 90, // Above BottomNav (which is usually ~70-80px tall)
    left: 20,
    right: 20,
  },
  addHabitsBtn: {
    backgroundColor: "#3b82f6",
    height: 54,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addHabitsTxt: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});

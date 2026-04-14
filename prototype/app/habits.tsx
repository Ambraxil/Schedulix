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
import { useRouter } from "expo-router";
import BottomNav from "../components/BottomNav";
import { initialHabits } from "../data/habits";

export default function Habits() {
  const router = useRouter();
  const habits = initialHabits;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Habits</Text>
          <Text style={styles.headerSubtitle}>Stay consistent, Rishabh</Text>
        </View>
        <TouchableOpacity
          style={styles.addBtnTop}
          onPress={() => router.push("/create-habit")}
        >
          <Feather name="plus" size={20} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {habits.map((habit) => (
          <TouchableOpacity
            key={habit.id}
            activeOpacity={0.8}
            onPress={() => router.push({ pathname: "/habit/[id]", params: { id: habit.id } })}
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
        <TouchableOpacity
          style={styles.addHabitsBtn}
          onPress={() => router.push("/create-habit")}
        >
          <Text style={styles.addHabitsTxt}>+ Add Habits</Text>
        </TouchableOpacity>
      </View>

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#020617" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerLeft: { flex: 1 },
  headerTitle: { color: "white", fontSize: 26, fontWeight: "bold", marginBottom: 4 },
  headerSubtitle: { color: "#64748b", fontSize: 14 },
  addBtnTop: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 120, gap: 16 },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 14,
    padding: 16,
    borderLeftWidth: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  cardInfo: { flex: 1 },
  cardTitle: { color: "white", fontSize: 16, fontWeight: "600", marginBottom: 4 },
  cardSchedule: { color: "#94a3b8", fontSize: 13, marginBottom: 12 },
  cardFooter: { flexDirection: "row", alignItems: "center", gap: 12 },
  cardDuration: { color: "#94a3b8", fontSize: 13 },
  cardStreak: { color: "#f59e0b", fontSize: 13, fontWeight: "600" },
  cardAction: { width: 40, alignItems: "flex-end", justifyContent: "center" },
  checkedCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#10b981",
    justifyContent: "center",
    alignItems: "center",
  },
  floatingBtnWrapper: { position: "absolute", bottom: 90, left: 20, right: 20 },
  addHabitsBtn: {
    backgroundColor: "#3b82f6",
    height: 54,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  addHabitsTxt: { color: "white", fontSize: 16, fontWeight: "700" },
});

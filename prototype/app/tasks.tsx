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
import { initialItems } from "../data/calendarItems";
import { priorityColor } from "../utils/priorityColor";

export default function Tasks() {
  const router = useRouter();
  const tasks = initialItems;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Tasks</Text>
          <Text style={styles.headerSubtitle}>Here's your agenda</Text>
        </View>
        <TouchableOpacity
          style={styles.addBtnTop}
          onPress={() => router.push("/create-task")}
        >
          <Feather name="plus" size={20} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {tasks.map((task: any) => {
          const start = new Date(task.start);
          const end = new Date(task.end);
          const durationMin = Math.round(
            (end.getTime() - start.getTime()) / 60000
          );

          return (
            <TouchableOpacity
              key={task.id}
              activeOpacity={0.8}
              onPress={() => router.push(`/task/${task.id}`)}
              style={[
                styles.card,
                { borderLeftColor: priorityColor(task.priority) },
              ]}
            >
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{task.title}</Text>
                <Text style={styles.cardSchedule}>
                  {start.toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  •{" "}
                  {start.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardDuration}>{durationMin} mins</Text>
                  <Text style={styles.cardPriority}>{task.priority} Priority</Text>
                </View>
              </View>
              <View style={styles.cardAction}>
                {task.isDone ? (
                  <View style={styles.checkedCircle}>
                    <Feather name="check" size={16} color="white" />
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Floating Add Task Button */}
      <View style={styles.floatingBtnWrapper}>
        <TouchableOpacity
          style={styles.addHabitsBtn}
          onPress={() => router.push("/create-task")}
        >
          <Text style={styles.addHabitsTxt}>+ Add Task</Text>
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
  cardPriority: {
    color: "#cbd5e1",
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

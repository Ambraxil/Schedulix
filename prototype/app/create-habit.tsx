import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import BottomNav from "../components/BottomNav";
import { initialHabits } from "../data/habits";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444", "#ec4899"];

export default function CreateHabit() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [repeat, setRepeat] = useState("");
  const [repeatEvery, setRepeatEvery] = useState("Day");
  const [notes, setNotes] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleAutoSchedule = () => {
    if (!title.trim()) {
      Alert.alert("Missing Field", "Please enter a habit title.");
      return;
    }
    if (!duration.trim()) {
      Alert.alert("Missing Field", "Please enter a duration.");
      return;
    }
    if (!repeat.trim() || isNaN(Number(repeat)) || Number(repeat) <= 0) {
      Alert.alert("Invalid Repeat", "Please enter a valid number of repetitions.");
      return;
    }

    const repeatNum = Number(repeat);
    const scheduleLabel =
      repeatEvery === "Day"
        ? repeatNum === 1
          ? "Daily"
          : `${repeatNum}x per day`
        : repeatEvery === "Week"
          ? repeatNum === 1
            ? "Weekly"
            : `${repeatNum}x per week`
          : repeatNum === 1
            ? "Monthly"
            : `${repeatNum}x per month`;

    const newHabit = {
      id: Date.now().toString(),
      title: title.trim(),
      duration: duration.trim(),
      repeat,
      repeatEvery,
      notes: notes.trim(),
      streak: 0,
      done: false,
      schedule: scheduleLabel,
      color: selectedColor,
    };

    initialHabits.push(newHabit);

    Alert.alert("Habit Created!", `"${title}" has been added to your habits.`, [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Feather name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Habit</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Title */}
          <Text style={styles.label}>Task Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter task title"
            placeholderTextColor="#64748b"
            value={title}
            onChangeText={setTitle}
          />

          {/* Duration */}
          <Text style={styles.label}>Duration (minutes)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 30 mins"
            placeholderTextColor="#64748b"
            value={duration}
            onChangeText={setDuration}
          />

          {/* Repeat count */}
          <Text style={styles.label}>Repeat (How many times)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 3"
            placeholderTextColor="#64748b"
            value={repeat}
            onChangeText={setRepeat}
            keyboardType="numeric"
          />

          {/* Repeat Every */}
          <Text style={styles.label}>Repeat every</Text>
          <View style={styles.toggleRow}>
            {["Day", "Week", "Month"].map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => setRepeatEvery(option)}
                style={[
                  styles.toggleBtn,
                  repeatEvery === option && styles.toggleBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.toggleText,
                    repeatEvery === option && styles.toggleTextActive,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Color picker */}
          <Text style={styles.label}>Color</Text>
          <View style={styles.colorRow}>
            {COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => setSelectedColor(color)}
                style={[
                  styles.colorDot,
                  { backgroundColor: color },
                  selectedColor === color && styles.colorDotSelected,
                ]}
              >
                {selectedColor === color && (
                  <Feather name="check" size={14} color="white" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Notes */}
          <Text style={styles.label}>Notes (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add any additional notes..."
            placeholderTextColor="#64748b"
            value={notes}
            onChangeText={setNotes}
            multiline
          />

          {/* Submit */}
          <TouchableOpacity style={styles.scheduleBtn} onPress={handleAutoSchedule}>
            <Text style={styles.scheduleBtnText}>Auto-Schedule Habit</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  label: {
    color: "#cbd5e1",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 18,
  },
  input: {
    backgroundColor: "#1e293b",
    color: "white",
    fontSize: 15,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
  },
  textArea: {
    height: 110,
    paddingVertical: 14,
    textAlignVertical: "top",
  },
  toggleRow: {
    flexDirection: "row",
    gap: 12,
  },
  toggleBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e293b",
  },
  toggleBtnActive: {
    backgroundColor: "#3b82f6",
  },
  toggleText: {
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: "600",
  },
  toggleTextActive: {
    color: "white",
  },
  colorRow: {
    flexDirection: "row",
    gap: 14,
    marginTop: 4,
  },
  colorDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  colorDotSelected: {
    borderWidth: 3,
    borderColor: "white",
  },
  scheduleBtn: {
    backgroundColor: "#3b82f6",
    height: 54,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  scheduleBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});

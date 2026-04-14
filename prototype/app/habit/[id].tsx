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
import { useLocalSearchParams, useRouter } from "expo-router";
import BottomNav from "../../components/BottomNav";
import { initialHabits } from "../../data/habits";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444", "#ec4899"];

export default function HabitDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const habitIndex = initialHabits.findIndex((h) => h.id === id);
  const habit = habitIndex !== -1 ? initialHabits[habitIndex] : null;

  // All hooks before early return
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(habit?.title ?? "");
  const [duration, setDuration] = useState(habit?.duration ?? "");
  const [repeat, setRepeat] = useState(habit?.repeat ?? "1");
  const [repeatEvery, setRepeatEvery] = useState(habit?.repeatEvery ?? "Day");
  const [notes, setNotes] = useState(habit?.notes ?? "");
  const [selectedColor, setSelectedColor] = useState(habit?.color ?? COLORS[0]);
  const [isDone, setIsDone] = useState(habit?.done ?? false);

  if (!habit) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={[styles.backBtn, { margin: 20 }]} onPress={() => router.back()}>
          <Feather name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={{ color: "white", textAlign: "center", marginTop: 50 }}>
          Habit not found
        </Text>
      </SafeAreaView>
    );
  }

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert("Missing Field", "Please enter a habit title.");
      return;
    }

    const repeatNum = Number(repeat);
    const scheduleLabel =
      repeatEvery === "Day"
        ? repeatNum === 1 ? "Daily" : `${repeatNum}x per day`
        : repeatEvery === "Week"
        ? repeatNum === 1 ? "Weekly" : `${repeatNum}x per week`
        : repeatNum === 1 ? "Monthly" : `${repeatNum}x per month`;

    initialHabits[habitIndex] = {
      ...initialHabits[habitIndex],
      title: title.trim(),
      duration: duration.trim(),
      repeat,
      repeatEvery,
      notes: notes.trim(),
      color: selectedColor,
      schedule: scheduleLabel,
    };

    Alert.alert("Saved!", "Habit updated successfully.", [
      { text: "OK", onPress: () => setIsEditing(false) },
    ]);
  };

  const handleDelete = () => {
    Alert.alert("Delete Habit", `Are you sure you want to delete "${habit.title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          initialHabits.splice(habitIndex, 1);
          router.back();
        },
      },
    ]);
  };

  const handleToggleDone = () => {
    const newStatus = !isDone;
    setIsDone(newStatus);
    initialHabits[habitIndex].done = newStatus;
    if (newStatus && initialHabits[habitIndex].streak !== undefined) {
      initialHabits[habitIndex].streak += 1;
    }
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
          <Text style={styles.headerTitle}>
            {isEditing ? "Edit Habit" : "Habit Details"}
            {!isEditing && isDone ? "  ✅" : ""}
          </Text>
          <TouchableOpacity style={styles.rightBtn} onPress={() => setIsEditing(!isEditing)}>
            <Text style={styles.headerRightTxt}>{isEditing ? "Cancel" : "Edit"}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Streak badge */}
          {!isEditing && (
            <View style={[styles.streakBadge, { borderColor: selectedColor }]}>
              <Text style={styles.streakText}>🔥 {habit.streak} day streak</Text>
            </View>
          )}

          <Text style={styles.label}>Habit Title</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.inputDisabled]}
            value={title}
            onChangeText={setTitle}
            editable={isEditing}
            placeholderTextColor="#64748b"
          />

          <Text style={styles.label}>Duration</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.inputDisabled]}
            value={duration}
            onChangeText={setDuration}
            editable={isEditing}
            placeholderTextColor="#64748b"
          />

          <Text style={styles.label}>Repeat (How many times)</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.inputDisabled]}
            value={repeat}
            onChangeText={setRepeat}
            editable={isEditing}
            keyboardType="numeric"
            placeholderTextColor="#64748b"
          />

          <Text style={styles.label}>Repeat every</Text>
          <View style={styles.toggleRow}>
            {["Day", "Week", "Month"].map((option) => (
              <TouchableOpacity
                key={option}
                disabled={!isEditing}
                onPress={() => setRepeatEvery(option)}
                style={[
                  styles.toggleBtn,
                  repeatEvery === option && styles.toggleBtnActive,
                  !isEditing && { opacity: 0.7 },
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

          {isEditing && (
            <>
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
            </>
          )}

          <Text style={styles.label}>Notes (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea, !isEditing && styles.inputDisabled]}
            value={notes}
            onChangeText={setNotes}
            editable={isEditing}
            multiline
            placeholder="Add any additional notes..."
            placeholderTextColor="#64748b"
          />

          {isEditing ? (
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
                <Text style={styles.deleteBtnTxt}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveBtnTxt}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.doneBtn, { backgroundColor: isDone ? "#1e293b" : "#10b981" }]}
              onPress={handleToggleDone}
            >
              <Text style={styles.saveBtnTxt}>
                {isDone ? "Undo Mark as Done" : "Mark as Done"}
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617" },
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
  headerTitle: { color: "white", fontSize: 18, fontWeight: "700" },
  rightBtn: { paddingHorizontal: 10, paddingVertical: 6 },
  headerRightTxt: { color: "#94a3b8", fontSize: 14, fontWeight: "500" },
  content: { paddingHorizontal: 20, paddingBottom: 100 },
  streakBadge: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginTop: 8,
    marginBottom: 4,
  },
  streakText: { color: "#f59e0b", fontSize: 14, fontWeight: "600" },
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
  inputDisabled: { opacity: 0.8 },
  textArea: { height: 110, paddingVertical: 14, textAlignVertical: "top" },
  toggleRow: { flexDirection: "row", gap: 12 },
  toggleBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e293b",
  },
  toggleBtnActive: { backgroundColor: "#3b82f6" },
  toggleText: { color: "#94a3b8", fontSize: 14, fontWeight: "600" },
  toggleTextActive: { color: "white" },
  colorRow: { flexDirection: "row", gap: 14, marginTop: 4 },
  colorDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  colorDotSelected: { borderWidth: 3, borderColor: "white" },
  actionRow: { flexDirection: "row", gap: 16, marginTop: 32 },
  deleteBtn: {
    flex: 1,
    backgroundColor: "#ef4444",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  saveBtn: {
    flex: 2,
    backgroundColor: "#3b82f6",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  doneBtn: {
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  deleteBtnTxt: { color: "white", fontSize: 15, fontWeight: "700" },
  saveBtnTxt: { color: "white", fontSize: 15, fontWeight: "700" },
});

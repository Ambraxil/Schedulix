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
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import BottomNav from "../../components/BottomNav";
import { initialItems } from "../../data/calendarItems";

export default function TaskDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const task = initialItems.find((item) => item.id === id);

  // Compute derived values safely (empty strings if task not found)
  const start = task ? new Date(task.start) : null;
  const end = task ? new Date(task.end) : null;
  const durationMs = start && end ? end.getTime() - start.getTime() : 0;
  const durHours = Math.floor(durationMs / 3600000);
  const durMins = Math.round((durationMs % 3600000) / 60000);
  const durationStr = durHours > 0
    ? `${durHours} Hour${durHours > 1 ? "s" : ""}${durMins > 0 ? ` ${durMins} Min` : ""}`
    : `${durMins} Min`;
  const deadlineStr = start
    ? start.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "";

  // All hooks must be called unconditionally before any early return
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task?.title ?? "");
  const [duration, setDuration] = useState(durationStr);
  const [deadline, setDeadline] = useState(deadlineStr);
  const [priority, setPriority] = useState(task?.priority ?? "Medium");
  const [notes, setNotes] = useState(task?.description ?? "");
  const [isDone, setIsDone] = useState(!!(task as any)?.isDone);

  // Now safe to early return after all hooks
  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Feather name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={{ color: "white", textAlign: "center", marginTop: 50 }}>
          Task not found
        </Text>
      </SafeAreaView>
    );
  }

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleToggleDone = () => {
    const newStatus = !isDone;
    setIsDone(newStatus);
    (task as any).isDone = newStatus;
  };

  const renderPriority = (level: string) => {
    const active = priority === level;
    return (
      <TouchableOpacity
        key={level}
        disabled={!isEditing}
        onPress={() => setPriority(level)}
        style={[
          styles.priorityBtn,
          active ? styles.priorityActive : styles.priorityInactive,
        ]}
      >
        <Text
          style={[
            styles.priorityText,
            active ? styles.priorityTextActive : styles.priorityTextInactive,
          ]}
        >
          {level}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Feather name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isEditing ? "Edit Task" : "Task Details"}
            {!isEditing && isDone ? "  ✅" : ""}
          </Text>
          <TouchableOpacity onPress={handleEditToggle} style={styles.rightBtn}>
            <Text style={styles.headerRightTxt}>
              {isEditing ? "Cancel" : "Edit"}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.label}>Task Title</Text>
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

          <Text style={styles.label}>Deadline</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.inputDisabled]}
            value={deadline}
            onChangeText={setDeadline}
            editable={isEditing}
            placeholderTextColor="#64748b"
          />

          <Text style={styles.label}>Priority</Text>
          <View style={styles.priorityRow}>
            {["Low", "Medium", "High"].map(renderPriority)}
          </View>

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
              <TouchableOpacity style={styles.deleteBtn}>
                <Text style={styles.deleteBtnTxt}>Delete Task</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn}>
                <Text style={styles.saveBtnTxt}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={[styles.saveBtn, { backgroundColor: isDone ? "#1e293b" : "#10b981" }]}
                onPress={handleToggleDone}
              >
                <Text style={styles.saveBtnTxt}>
                  {isDone ? "Undo Mark as Done" : "Mark as Done"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
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
  rightBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  headerRightTxt: {
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
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
  inputDisabled: {
    opacity: 0.8,
  },
  textArea: {
    height: 120,
    paddingVertical: 16,
    textAlignVertical: "top",
  },
  priorityRow: {
    flexDirection: "row",
    gap: 12,
  },
  priorityBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  priorityActive: {
    backgroundColor: "#3b82f6",
  },
  priorityInactive: {
    backgroundColor: "#1e293b",
  },
  priorityText: {
    fontSize: 14,
    fontWeight: "600",
  },
  priorityTextActive: {
    color: "white",
  },
  priorityTextInactive: {
    color: "#94a3b8",
  },
  actionRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 32,
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: "#ff0000",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "#3b82f6",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBtnTxt: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
  saveBtnTxt: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
});

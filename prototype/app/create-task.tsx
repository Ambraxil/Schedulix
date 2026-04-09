import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { initialItems } from "../data/calendarItems";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [duration, setDuration] = useState("30");

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) setDate(selectedDate);
  };

  const handleAddTask = () => {
    // ===== REQUIRED FIELD VALIDATION =====
    if (!title.trim()) {
      Alert.alert("Missing Field", "Task title is required.");
      return;
    }

    if (!description.trim()) {
      Alert.alert("Missing Field", "Description is required.");
      return;
    }

    if (!duration.trim()) {
      Alert.alert("Missing Field", "Duration is required.");
      return;
    }

    const durationNum = parseInt(duration);

    if (isNaN(durationNum) || durationNum <= 0) {
      Alert.alert("Invalid Duration", "Enter a valid duration in minutes.");
      return;
    }

    const start = new Date(date);
    const end = new Date(start.getTime() + durationNum * 60000);

    // ===== CONFLICT CHECK =====
    const conflict = initialItems.some((item) => {
      const itemStart = new Date(item.start);
      const itemEnd = new Date(item.end);

      return start < itemEnd && end > itemStart;
    });

    if (conflict) {
      Alert.alert("Conflict", "This time slot is already taken.");
      return;
    }

    // ===== ADD TASK =====
    initialItems.push({
      id: Date.now().toString(),
      title,
      description,
      start: start.toISOString(),
      end: end.toISOString(),
      priority,
    });

    Alert.alert("Success", "Task added!");

    // reset fields
    setTitle("");
    setDescription("");
    setDuration("30");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#020617" }}>
        <View style={{ padding: 20 }}>
          <Text style={{ color: "white", fontSize: 22, marginBottom: 20 }}>
            Create Task
          </Text>

          <Text style={{ color: "#94a3b8" }}>Task Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter task title"
            placeholderTextColor="#94a3b8"
            style={{
              backgroundColor: "#1e293b",
              color: "white",
              padding: 14,
              borderRadius: 10,
              marginTop: 6,
              marginBottom: 20,
            }}
          />

          <Text style={{ color: "#94a3b8" }}>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            placeholderTextColor="#94a3b8"
            multiline
            style={{
              backgroundColor: "#1e293b",
              color: "white",
              padding: 14,
              borderRadius: 10,
              marginTop: 6,
              marginBottom: 20,
              minHeight: 60,
              textAlignVertical: "top",
            }}
          />

          <Text style={{ color: "#94a3b8", marginBottom: 10 }}>
            Set Date & Time
          </Text>
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={{
              backgroundColor: "#1e293b",
              padding: 14,
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            <Text style={{ color: "white" }}>
              {date.toLocaleString([], {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={onChangeDate}
            />
          )}

          <Text style={{ color: "#94a3b8" }}>Duration (minutes)</Text>
          <TextInput
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
            style={{
              backgroundColor: "#1e293b",
              color: "white",
              padding: 14,
              borderRadius: 10,
              marginTop: 6,
              marginBottom: 20,
            }}
          />

          <Text style={{ color: "#94a3b8", marginBottom: 10 }}>
            Priority
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {["Low", "Medium", "High"].map((p) => (
              <TouchableOpacity
                key={p}
                onPress={() => setPriority(p)}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: priority === p ? "#3b82f6" : "#1e293b",
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            onPress={handleAddTask}
            style={{
              backgroundColor: "#3b82f6",
              padding: 16,
              borderRadius: 12,
              marginTop: 30,
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Add Task
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
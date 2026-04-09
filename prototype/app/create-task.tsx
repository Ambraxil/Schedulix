import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

export default function CreateTask() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Create Task Page</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },
});
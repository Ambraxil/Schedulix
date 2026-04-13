import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { priorityColor } from "../utils/priorityColor";

import { useRouter } from "expo-router";

interface TimelineProps {
  events: any[];
}

const HOUR_HEIGHT = 65; // Height of one hour in pixels
const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function Timeline({ events }: TimelineProps) {
  const router = useRouter();

  // Sort events so they appear chronologically if multiple in one hour
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  return (
    <View style={styles.container}>
      {HOURS.map((hour) => {
        // Find events that start in this specific hour
        const hourEvents = sortedEvents.filter((event) => {
          return new Date(event.start).getHours() === hour;
        });

        return (
          <View key={hour} style={styles.hourRow}>
            {/* The time label column */}
            <Text style={styles.hourText}>
              {`${hour.toString().padStart(2, "0")}:00`}
            </Text>

            {/* The right content column */}
            <View style={styles.rightLayout}>
              <View style={styles.hourLine} />

              {/* Render events that start in this block */}
              <View style={styles.eventsWrapper}>
                {hourEvents.map((event) => {
                  const start = new Date(event.start);
                  const end = new Date(event.end);
                  
                  return (
                    <TouchableOpacity
                      key={event.id}
                      activeOpacity={0.8}
                      onPress={() => router.push(`/task/${event.id}`)}
                      style={[
                        styles.eventBlock,
                        {
                          borderLeftColor: priorityColor(event.priority),
                        },
                      ]}
                    >
                      <Text style={styles.eventTitle}>
                        {event.title}
                        {event.isDone ? "  ✅" : ""}
                      </Text>
                      <Text style={styles.eventTime}>
                        {start.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {end.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
                      {event.description ? (
                        <Text style={styles.eventDesc} numberOfLines={2}>
                          {event.description}
                        </Text>
                      ) : null}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
  },
  hourRow: {
    flexDirection: "row",
    minHeight: HOUR_HEIGHT,
  },
  hourText: {
    color: "#94a3b8",
    width: 60,
    fontSize: 12,
    fontWeight: "500",
    textAlign: "right",
    paddingRight: 10,
    marginTop: -8, // Centers the text on the line
  },
  rightLayout: {
    flex: 1,
  },
  hourLine: {
    height: 1,
    backgroundColor: "#1e293b", // Slate 800
    width: "100%",
  },
  eventsWrapper: {
    paddingLeft: 10,
    paddingRight: 18,
    paddingTop: 10,
    paddingBottom: 10,
    gap: 10, // space between events in the same hour
  },
  eventBlock: {
    backgroundColor: "#1e293b",
    borderRadius: 14,
    padding: 12,
    borderLeftWidth: 4,
  },
  eventTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  eventTime: {
    color: "#cbd5e1",
    fontSize: 12,
  },
  eventDesc: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 4,
  },
});

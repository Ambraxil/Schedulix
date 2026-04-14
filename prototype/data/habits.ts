export interface Habit {
  id: string;
  title: string;
  duration: string;
  repeat: string;        // how many times
  repeatEvery: string;   // "Day" | "Week" | "Month"
  notes: string;
  streak: number;
  done: boolean;
  schedule: string;      // human-readable schedule label
  color: string;
}

export const initialHabits: Habit[] = [
  {
    id: "1",
    title: "Read 30 Minutes",
    duration: "30 mins",
    repeat: "1",
    repeatEvery: "Day",
    notes: "",
    streak: 12,
    done: true,
    schedule: "Daily at 8:00 PM",
    color: "#10b981",
  },
  {
    id: "2",
    title: "Morning Meditation",
    duration: "15 mins",
    repeat: "1",
    repeatEvery: "Day",
    notes: "",
    streak: 8,
    done: true,
    schedule: "Daily at 7:00 AM",
    color: "#10b981",
  },
  {
    id: "3",
    title: "Workout Session",
    duration: "45 mins",
    repeat: "3",
    repeatEvery: "Week",
    notes: "",
    streak: 15,
    done: false,
    schedule: "Mon, Wed, Fri at 6:00 PM",
    color: "#3b82f6",
  },
  {
    id: "4",
    title: "Review Learning Notes",
    duration: "20 mins",
    repeat: "1",
    repeatEvery: "Day",
    notes: "",
    streak: 5,
    done: false,
    schedule: "Daily at 9:00 PM",
    color: "#f59e0b",
  },
  {
    id: "5",
    title: "Journal Writing",
    duration: "10 mins",
    repeat: "1",
    repeatEvery: "Day",
    notes: "",
    streak: 3,
    done: false,
    schedule: "Daily at 10:00 PM",
    color: "#8b5cf6",
  },
];

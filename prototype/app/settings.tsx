import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import BottomNav from "../components/BottomNav";

interface SettingItemProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  hasBorder?: boolean;
  onPress?: () => void;
}

export default function Settings() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Auth guard in _layout.tsx redirects to /sign-in automatically
    } catch (error: any) {
      Alert.alert("Sign Out Failed", error.message);
    }
  };

  const SettingItem = ({
    icon,
    title,
    subtitle,
    rightElement,
    hasBorder = true,
    onPress,
  }: SettingItemProps) => {
    return (
      <TouchableOpacity
        activeOpacity={onPress ? 0.7 : 1}
        onPress={onPress}
        style={styles.itemWrapper}
      >
        <View style={[styles.itemContainer, hasBorder && styles.borderBottom]}>
          <View style={styles.iconContainer}>
            <Feather name={icon} size={18} color="#94a3b8" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>{title}</Text>
            {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
          </View>
          <View style={styles.rightElementContainer}>
            {rightElement || (
              <Feather name="chevron-right" size={20} color="#475569" />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>ACCOUNT</Text>
        <View style={styles.cardContainer}>
          <SettingItem
            icon="user"
            title="Profile"
            subtitle="Rishabh • rishabh@email.com"
          />
          <SettingItem icon="lock" title="Change Password" hasBorder={false} />
        </View>

        <Text style={styles.sectionTitle}>PREFERENCES</Text>
        <View style={styles.cardContainer}>
          <SettingItem
            icon="bell"
            title="Notifications"
            rightElement={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: "#334155", true: "#3b82f6" }}
              />
            }
          />
          <SettingItem
            icon="calendar"
            title="Calendar Synchronization"
            subtitle="Google connected"
          />
          <SettingItem
            icon="moon"
            title="Dark Mode"
            hasBorder={false}
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: "#334155", true: "#3b82f6" }}
              />
            }
          />
        </View>

        <Text style={styles.sectionTitle}>SUPPORT</Text>
        <View style={styles.cardContainer}>
          <SettingItem icon="help-circle" title="Help Center" />
          <SettingItem icon="star" title="Rate App" />
          <SettingItem icon="info" title="About" hasBorder={false} />
        </View>

        <TouchableOpacity 
          style={styles.signOutButton}
          onPress={handleSignOut}
        >
          <Feather name="log-out" size={20} color="#ef4444" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020617",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100, // padding so nothing gets clipped by bottom nav
  },
  sectionTitle: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
    marginTop: 20,
    letterSpacing: 0.5,
  },
  cardContainer: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    overflow: "hidden",
  },
  itemWrapper: {
    backgroundColor: "#1e293b",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  itemTitle: {
    color: "#f8fafc",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  itemSubtitle: {
    color: "#94a3b8",
    fontSize: 13,
  },
  rightElementContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginLeft: 10,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e293b",
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 24,
  },
  signOutText: {
    color: "#ef4444",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
  },
});

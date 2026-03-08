import { View, Text, StyleSheet, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface StatusBarProps extends ViewProps {
  time?: string;
  blurBackground?: boolean;
}

export default function StatusBar({
  time = "9:41",
  blurBackground = false,
  style,
  ...props
}: StatusBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        blurBackground && styles.blurBackground,
        { paddingTop: insets.top },
        style,
      ]}
      {...props}
    >
      {/* Time */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{time}</Text>
      </View>

      {/* Status Icons Container */}
      <View style={styles.statusContainer}>
        {/* Battery */}
        <Text style={styles.batteryIcon}>🔋</Text>

        {/* WiFi */}
        <Text style={styles.statusIcon}>◈</Text>

        {/* Signal Strength */}
        <Text style={styles.signalIcon}>●●●●</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "transparent",
    height: 44,
  },
  blurBackground: {
    // Frosted glass effect with backdrop blur
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  timeContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1f2024",
    letterSpacing: -0.165,
    fontFamily: "SF Pro Text",
  },
  statusContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  batteryIcon: {
    fontSize: 12,
    color: "#1f2024",
  },
  statusIcon: {
    fontSize: 14,
    color: "#1f2024",
  },
  signalIcon: {
    fontSize: 11,
    color: "#1f2024",
    letterSpacing: 1,
  },
});

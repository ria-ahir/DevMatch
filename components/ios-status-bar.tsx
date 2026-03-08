import React from 'react';
import { StyleSheet, View, Text, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface StatusBarProps extends ViewProps {
  time?: string;
  showBlur?: boolean;
}

export default function IOSStatusBar({ time = '9:41', showBlur = true, style, ...props }: StatusBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        showBlur && styles.blurred,
        {
          paddingTop: insets.top,
          minHeight: 44 + insets.top,
        },
        style,
      ]}
      {...props}
    >
      {/* Time */}
      <Text style={styles.time}>{time}</Text>

      {/* Status Icons (Signal, WiFi, Battery) */}
      <View style={styles.statusIcons}>
        <Text style={styles.statusText}>●●●●</Text>
        <Text style={styles.statusText}>◈</Text>
        <Text style={styles.statusText}>🔋</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  blurred: {
    backgroundColor: 'rgba(248, 249, 254, 0.8)',
  },
  time: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2024',
    letterSpacing: -0.165,
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    color: '#1f2024',
  },
});

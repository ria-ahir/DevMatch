import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps extends ViewProps {
  children?: React.ReactNode;
  height?: number;
}

export default function PurpleHeader({ children, height = 115, style, ...props }: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: insets.top,
          minHeight: height + insets.top,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4e2c9e',
    width: '100%',
  },
});

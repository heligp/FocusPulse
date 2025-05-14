// src/components/AppCard.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import type { ImageSourcePropType } from 'react-native';

type AppCardProps = {
  appName: string;
  packageName: string;
  icon: ImageSourcePropType;
  onRemove: (pkg: string) => void;
};

export function AppCard({
  appName,
  packageName,
  icon,
  onRemove,
}: AppCardProps) {
  return (
    <View style={styles.card}>
      <Image source={icon} style={styles.icon} />
      <View style={styles.info}>
        <Text style={styles.title}>{appName}</Text>
        <Text style={styles.sub}>{packageName}</Text>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => onRemove(packageName)}
      >
        <Text style={styles.btnText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  sub: {
    fontSize: 12,
    color: '#666',
  },
  btn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#e74c3c',
    borderRadius: 4,
  },
  btnText: {
    color: '#fff',
    fontSize: 12,
  },
});

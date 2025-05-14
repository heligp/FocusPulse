// src/components/RuleForm.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import type { Application } from 'react-native-device-info';
import { TimeRangePicker } from './TimeRangePicker';

type RuleFormProps = {
  onSave: (pkg: string, start: Date, end: Date) => void;
};

export function RuleForm({ onSave }: RuleFormProps) {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPkg, setSelectedPkg] = useState<string>('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  useEffect(() => {
    DeviceInfo.getInstalledApplications()
      .then(list => {
        setApps(list.filter(a => a.system === false));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.label}>Selecciona una app:</Text>
      <FlatList
        data={apps}
        keyExtractor={a => a.bundleId}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.appRow,
              item.bundleId === selectedPkg && styles.appRowSelected,
            ]}
            onPress={() => setSelectedPkg(item.bundleId)}
          >
            <Text>{item.appName}</Text>
          </TouchableOpacity>
        )}
      />
      <TimeRangePicker
        start={start}
        end={end}
        onChange={(s, e) => { setStart(s); setEnd(e); }}
      />
      <Button
        title="Guardar regla"
        disabled={!selectedPkg}
        onPress={() => onSave(selectedPkg, start, end)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontWeight: '600', margin: 16 },
  appRow: {
    padding: 12,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  appRowSelected: {
    backgroundColor: '#dfe6e9',
  },
});

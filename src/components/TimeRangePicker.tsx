// src/components/TimeRangePicker.tsx
import React, { useState } from 'react';
import { View, Text, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

type TimeRangePickerProps = {
  start: Date;
  end: Date;
  onChange: (start: Date, end: Date) => void;
};

export function TimeRangePicker({ start, end, onChange }: TimeRangePickerProps) {
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const onStartChange = (_: DateTimePickerEvent, date?: Date) => {
    setShowStart(Platform.OS === 'ios');
    if (date) onChange(date, end);
  };

  const onEndChange = (_: DateTimePickerEvent, date?: Date) => {
    setShowEnd(Platform.OS === 'ios');
    if (date) onChange(start, date);
  };

  const format = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text>Inicio:</Text>
        <Button title={format(start)} onPress={() => setShowStart(true)} />
      </View>
      <View style={styles.row}>
        <Text>Fin:</Text>
        <Button title={format(end)} onPress={() => setShowEnd(true)} />
      </View>

      {showStart && (
        <DateTimePicker
          value={start}
          mode="time"
          display="spinner"
          onChange={onStartChange}
        />
      )}
      {showEnd && (
        <DateTimePicker
          value={end}
          mode="time"
          display="spinner"
          onChange={onEndChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
});

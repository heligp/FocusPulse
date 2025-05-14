// src/screens/Home.tsx
import React from 'react';
import {View, FlatList, Button, StyleSheet, Text} from 'react-native';
import {useRules, Rule} from '../hooks/useRules';

export default function Home({navigation}: any) {
  const {rules, removeRule} = useRules();

  return (
    <View style={styles.container}>
      {rules.length === 0 && (
        <Text style={styles.empty}>No tienes reglas aún.</Text>
      )}
      <FlatList
        data={rules}
        keyExtractor={r => r.id}
        renderItem={({item}: {item: Rule}) => (
          <View style={styles.ruleRow}>
            <Text style={styles.ruleText}>
              {item.pkg} ({item.start}–{item.end})
            </Text>
            <Button
              title="Eliminar"
              onPress={() => removeRule(item.id)}
            />
          </View>
        )}
      />
      <Button
        title="Añadir bloqueo"
        onPress={() => navigation.navigate('AddRule')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  empty: {textAlign: 'center', marginTop: 20, color: '#666'},
  ruleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  ruleText: {flex: 1},
});

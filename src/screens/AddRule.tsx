// src/screens/AddRule.tsx
import React from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import {useRules, Rule} from '../hooks/useRules';
import {RuleForm} from '../components/RuleForm';

export default function AddRule({navigation}: any) {
  const {addRule} = useRules();

  const handleSave = (pkg: string, start: Date, end: Date) => {
    try {
      addRule({
        id: pkg + start.getTime(),
        pkg,
        start: start.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
        end: end.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
      });
      navigation.goBack();
    } catch (e: any) {
      if (e.message === 'LIMIT_EXCEEDED') {
        Alert.alert(
          'Límite alcanzado',
          'Desbloquea reglas ilimitadas en Pro.',
          [{text: 'Ir a Pro'}]
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <RuleForm onSave={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});


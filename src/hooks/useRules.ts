// src/hooks/useRules.ts
import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Blocker from '../services/blocker';

export type Rule = {
  id: string;
  pkg: string;
  start: string;
  end: string;
};

type Store = {
  rules: Rule[];
  addRule: (rule: Rule) => void;
  removeRule: (id: string) => void;
};

export const useRules = create<Store>((set, get) => ({
  rules: [],
  addRule: rule => {
    const rules = get().rules;
    if (rules.length >= 5) throw new Error('LIMIT_EXCEEDED');
    const newList = [...rules, rule];
    persist(newList);
    set({rules: newList});
  },
  removeRule: id => {
    const newList = get().rules.filter(r => r.id !== id);
    persist(newList);
    set({rules: newList});
  },
}));

async function persist(rules: Rule[]) {
  await AsyncStorage.setItem('rules', JSON.stringify(rules));
  // actualiza servicio nativo
  Blocker.updateBlocked(rules.map(r => r.pkg));
}

// Carga inicial
AsyncStorage.getItem('rules').then(s => {
  if (s) useRules.setState({rules: JSON.parse(s)});
});

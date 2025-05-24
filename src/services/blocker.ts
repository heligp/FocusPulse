// src/services/blocker.ts
import { NativeModules } from 'react-native';

type BlockerNative = {
  /** Actualiza lista de paquetes bloqueados */
  updateBlocked(apps: string[]): void;
  /** Abre la pantalla de accesibilidad, etc. (ejemplo) */
  openAccessibilitySettings(): void;
};

export default NativeModules.Blocker as BlockerNative;

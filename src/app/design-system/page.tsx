'use client';
import { DesignSystem } from '../../screens/DesignSystem';
import { useTheme } from '../../App';
export default function Page() {
  return <DesignSystem theme={useTheme()} />;
}

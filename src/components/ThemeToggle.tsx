'use client';

import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const Icon = theme === 'system' ? Monitor : resolvedTheme === 'dark' ? Moon : Sun;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={cn(
        'w-10 h-10 rounded-xl flex items-center justify-center transition-all',
        'bg-[var(--surface)] border border-[var(--border-light)]',
        'hover:border-[var(--primary)] hover:text-[var(--primary)]',
        'text-[var(--text-muted)]'
      )}
      aria-label="Toggle theme"
    >
      <Icon size={18} />
    </motion.button>
  );
}

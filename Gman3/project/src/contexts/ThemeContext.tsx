import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

    interface ThemeContextType {
      isDark: boolean;
      toggleTheme: () => void;
    }

    const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

    export function ThemeProvider({ children }: { children: ReactNode }) {
      const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
          const savedTheme = localStorage.getItem('theme');
          return savedTheme === 'dark' && window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
      });

      useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      }, [isDark]);

      const toggleTheme = () => {
        setIsDark(!isDark);
      };

      return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
          {children}
        </ThemeContext.Provider>
      );
    }

    export function useTheme() {
      const context = useContext(ThemeContext);
      if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
      }
      return context;
    }

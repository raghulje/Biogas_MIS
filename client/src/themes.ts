import { createTheme } from '@mui/material/styles';

export const themePresets = {
  professional: {
    key: 'professional',
    name: 'Professional (Blue-Green)',
    palette: {
      primary: { main: '#1f6e8c', light: '#57a3c6', dark: '#164d63' },
      secondary: { main: '#588f45', light: '#7fb56a', dark: '#3f6b33' },
      background: { default: '#f6f7f9', paper: '#ffffff' },
      text: { primary: '#28323a', secondary: '#5b6570' },
    },
  },
  classic: {
    key: 'classic',
    name: 'Classic (Blue)',
    palette: {
      primary: { main: '#2879b6', light: '#1D9AD4', dark: '#235EAC' },
      secondary: { main: '#7dc244', light: '#139B49', dark: '#139B49' },
      background: { default: '#f8f9fa', paper: '#ffffff' },
      text: { primary: '#333842', secondary: '#58595B' },
    },
  },
  slate: {
    key: 'slate',
    name: 'Slate (Gray)',
    palette: {
      primary: { main: '#2c3e50', light: '#3b5569', dark: '#1f2a33' },
      secondary: { main: '#95a5a6', light: '#b0bfc0', dark: '#7e8f90' },
      background: { default: '#f4f6f8', paper: '#ffffff' },
      text: { primary: '#222831', secondary: '#4b5563' },
    },
  },
  emerald: {
    key: 'emerald',
    name: 'Emerald (Green)',
    palette: {
      primary: { main: '#116b4a', light: '#389b70', dark: '#0b4b34' },
      secondary: { main: '#9ad29a', light: '#c6edc6', dark: '#78b878' },
      background: { default: '#f7fbf7', paper: '#ffffff' },
      text: { primary: '#123f2b', secondary: '#3e5a48' },
    },
  },
  charcoal: {
    key: 'charcoal',
    name: 'Charcoal (Dark)',
    palette: {
      primary: { main: '#1b2b34', light: '#334953', dark: '#0f1a1f' },
      secondary: { main: '#6b7280', light: '#9aa0a8', dark: '#4a4f56' },
      background: { default: '#f5f7f8', paper: '#ffffff' },
      text: { primary: '#0f1720', secondary: '#475569' },
    },
  },
};

export function createAppTheme(presetKey = 'professional') {
  const preset = (themePresets as any)[presetKey] || themePresets.professional;
  return createTheme({
    palette: {
      primary: preset.palette.primary,
      secondary: preset.palette.secondary,
      background: preset.palette.background,
      text: preset.palette.text,
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            boxShadow: 'none',
            '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
          },
        },
      },
    },
  });
}


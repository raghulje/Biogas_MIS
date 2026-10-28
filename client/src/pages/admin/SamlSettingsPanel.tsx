import { useEffect, useState } from 'react';
import { Alert, Box, Button, Chip, CircularProgress, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const apiBase = import.meta.env.DEV
  ? '/api'
  : (import.meta.env.VITE_API_URL || `${window.location.origin}/api`);

type SamlConfig = {
  enabled?: boolean;
  idp_configured?: boolean;
  metadata_url?: string;
  portal_fields?: Record<string, string>;
};

export default function SamlSettingsPanel() {
  const { enqueueSnackbar } = useSnackbar();
  const [config, setConfig] = useState<SamlConfig | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get<SamlConfig>(`${apiBase}/auth/saml/config`)
      .then((response) => setConfig(response.data))
      .catch(() => setError('Could not load SAML configuration.'));
  }, []);

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!config) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress size={28} /></Box>;

  return (
    <Box>
      <Typography sx={{ color: '#5c6770', mb: 2, maxWidth: 760 }}>
        Paste these values into RefexOne. The Home URL is what opens when someone clicks the app, and it starts sign-in directly. Name ID is the email address. Sign the assertion, and leave the response unsigned.
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        <Chip size="small" label={config.enabled ? 'SSO enabled' : 'SSO disabled'} color={config.enabled ? 'success' : 'default'} />
        <Chip size="small" label={config.idp_configured ? 'IdP configured' : 'IdP not configured'} color={config.idp_configured ? 'success' : 'warning'} />
        {config.metadata_url ? (
          <Button size="small" href={config.metadata_url} target="_blank" rel="noreferrer">SP metadata XML</Button>
        ) : null}
      </Box>
      <Box sx={{ display: 'grid', gap: 1.5 }}>
        {Object.entries(config.portal_fields || {}).map(([label, value]) => (
          <Box key={label} sx={{ p: 1.5, borderRadius: '12px', border: '1px solid rgba(23, 162, 180,0.16)', bgcolor: '#f8fbfd' }}>
            <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#25313c', mb: 0.75 }}>{label}</Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography component="code" sx={{ flex: 1, fontSize: 13, wordBreak: 'break-all', color: '#17a2b4' }}>{value}</Typography>
              <Button
                size="small"
                variant="outlined"
                onClick={() => {
                  void navigator.clipboard.writeText(value);
                  enqueueSnackbar('Copied', { variant: 'success' });
                }}
              >
                Copy
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

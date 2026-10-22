import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

export const pageBannerBackground =
  'radial-gradient(circle at 78% 0%, rgba(255,255,255,0.22), transparent 32%), linear-gradient(105deg, #2879b6 0%, #3a9ad4 58%, #7dbfe4 100%)';

export function PageBanner({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <Box
      className="aos-fade-down"
      sx={{
        mb: 2.5,
        px: { xs: 2, sm: 2.75 },
        py: { xs: 2, sm: 2.25 },
        borderRadius: '18px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
        background: pageBannerBackground,
        boxShadow: '0 12px 28px rgba(40, 121, 182, 0.22)',
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: '#fff',
            fontSize: { xs: '1.35rem', sm: '1.75rem' },
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ mt: 0.45, color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: 500 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {children}
    </Box>
  );
}

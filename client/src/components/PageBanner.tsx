import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { sceneForPath } from '../scenes';

export const pageBannerBackground = '#ffffff';

export function PageBanner({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  const location = useLocation();
  const scene = sceneForPath(location.pathname);

  return (
    <Box
      className="aos-fade-down scene-header"
      style={{ ['--scene' as string]: `url("${scene}")` }}
      sx={{
        mb: 2.5,
        px: { xs: 2, sm: 2.75 },
        py: { xs: 2, sm: 2.35 },
        minHeight: { sm: 108 },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Box className="p2p-banner-bubbles" aria-hidden="true">
        <i /><i /><i /><i /><i />
      </Box>
      <Box sx={{ minWidth: 0, position: 'relative', zIndex: 1, maxWidth: { md: '62%' } }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: '#07111f',
            fontSize: { xs: '1.35rem', sm: '1.7rem' },
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ mt: 0.5, color: '#64748b', fontSize: 14, fontWeight: 550 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {children && <Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>}
    </Box>
  );
}

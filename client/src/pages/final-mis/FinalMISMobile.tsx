import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Accordion, AccordionSummary, AccordionDetails, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { misService } from '../../services/misService';

export default function FinalMISMobile() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<any | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      // Fetch dashboard-style summary for last month as mobile quick view
      const params = { period: 'month' };
      const d = await misService.getDashboardData(params);
      setSummary(d?.summary || null);
    } catch (e) {
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Final MIS (Mobile)</Typography>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600 }}>Overall Production</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Card variant="outlined" sx={{ mb: 1 }}>
            <CardContent>
              <Typography variant="caption">Total Raw Biogas</Typography>
              <Typography variant="h6">{(summary?.totalRawBiogas ?? 0).toFixed(2)} m³</Typography>
            </CardContent>
          </Card>
          <Card variant="outlined" sx={{ mb: 1 }}>
            <CardContent>
              <Typography variant="caption">CBG Produced</Typography>
              <Typography variant="h6">{(summary?.totalCBGProduced ?? 0).toFixed(2)} kg</Typography>
            </CardContent>
          </Card>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600 }}>Fertilizer & Availability</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Card variant="outlined" sx={{ mb: 1 }}>
            <CardContent>
              <Typography variant="caption">FOM Produced</Typography>
              <Typography variant="h6">{(summary?.totalFOMProduced ?? 0).toFixed(2)} kg</Typography>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="caption">Avg Availability</Typography>
              <Typography variant="h6">{(summary?.avgPlantAvailability ?? 0).toFixed(2)}%</Typography>
            </CardContent>
          </Card>
        </AccordionDetails>
      </Accordion>

      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" color="text.secondary">Tap any section to expand for details.</Typography>
      </Box>
    </Box>
  );
}


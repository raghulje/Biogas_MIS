
import {
  Typography,
  TextField,
  Grid,
  Box,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';

interface Props {
  selectedEntry?: any;
  isReadOnly: boolean;
}

export default function OtherSections({ isReadOnly }: Props) {
  const { register } = useFormContext();

  const sectionStyle = {
    mb: 2,
    borderRadius: '12px !important',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    border: '1px solid #e0e0e0',
    backgroundColor: '#fff',
  };

  const headerStyle = {
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #e0e0e0',
    minHeight: '56px',
    display: 'flex',
    alignItems: 'center',
    px: 2,
  };

  return (
    <>
      {/* Fertilizer */}
      <Box sx={sectionStyle}>
        <Box sx={headerStyle}>
          <Typography sx={{ fontWeight: 600, color: '#333' }}>Fertilizer</Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="FOM Produced" type="number" {...register('fertilizer.fomProduced')} disabled={isReadOnly} /></Grid>
            <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Inventory" type="number" {...register('fertilizer.inventory')} disabled={isReadOnly} /></Grid>
            <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Sold" type="number" {...register('fertilizer.sold')} disabled={isReadOnly} /></Grid>
            <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Weighted Average" type="number" {...register('fertilizer.weightedAverage')} disabled={isReadOnly} /></Grid>
            <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Revenue" type="number" {...register('fertilizer.revenue1')} disabled={isReadOnly} /></Grid>
            <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Lagoon Liquid Sold" type="number" {...register('fertilizer.lagoonLiquidSold')} disabled={isReadOnly} /></Grid>
            <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Revenue (Liquid)" type="number" {...register('fertilizer.revenue2')} disabled={isReadOnly} /></Grid>
            <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Loose FOM Sold" type="number" {...register('fertilizer.looseFomSold')} disabled={isReadOnly} /></Grid>
            <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Revenue (Loose)" type="number" {...register('fertilizer.revenue3')} disabled={isReadOnly} /></Grid>
          </Grid>
        </Box>
      </Box>

      {/* Utilities */}
      <Box sx={sectionStyle}>
        <Box sx={headerStyle}>
          <Typography sx={{ fontWeight: 600, color: '#333' }}>Utilities and Power</Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Electricity Consumption (KWH)" type="number" {...register('utilities.electricityConsumption')} disabled={isReadOnly} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Specific Power Consumption" type="number" {...register('utilities.specificPowerConsumption')} disabled={isReadOnly} /></Grid>
          </Grid>
        </Box>
      </Box>

      {/* Manpower */}
      <Box sx={sectionStyle}>
        <Box sx={headerStyle}>
          <Typography sx={{ fontWeight: 600, color: '#333' }}>Manpower</Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Refex SREL" type="number" {...register('manpower.refexSrelStaff')} disabled={isReadOnly} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Third Party" type="number" {...register('manpower.thirdPartyStaff')} disabled={isReadOnly} /></Grid>
          </Grid>
        </Box>
      </Box>

      {/* Plant Availability */}
      <Box sx={sectionStyle}>
        <Box sx={headerStyle}>
          <Typography sx={{ fontWeight: 600, color: '#333' }}>Plant Availability</Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Working Hours" type="number" {...register('plantAvailability.workingHours')} disabled={isReadOnly} /></Grid>
            <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Scheduled Downtime" type="number" {...register('plantAvailability.scheduledDowntime')} disabled={isReadOnly} /></Grid>
            <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Unscheduled Downtime" type="number" {...register('plantAvailability.unscheduledDowntime')} disabled={isReadOnly} /></Grid>
            <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Total Availability" type="number" {...register('plantAvailability.totalAvailability')} disabled={isReadOnly} /></Grid>
          </Grid>
        </Box>
      </Box>

      {/* HSE */}
      <Box sx={sectionStyle}>
        <Box sx={headerStyle}>
          <Typography sx={{ fontWeight: 600, color: '#333' }}>Health, Safety & Environment (HSE)</Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4} md={3}><TextField fullWidth label="Safety LTI" type="number" {...register('hse.safetyLti')} disabled={isReadOnly} /></Grid>
            <Grid item xs={6} sm={4} md={3}><TextField fullWidth label="Near Misses" type="number" {...register('hse.nearMisses')} disabled={isReadOnly} /></Grid>
            <Grid item xs={6} sm={4} md={3}><TextField fullWidth label="First Aid" type="number" {...register('hse.firstAid')} disabled={isReadOnly} /></Grid>
            <Grid item xs={6} sm={4} md={3}><TextField fullWidth label="Reportable Incidents" type="number" {...register('hse.reportableIncidents')} disabled={isReadOnly} /></Grid>
            <Grid item xs={6} sm={4} md={3}><TextField fullWidth label="MTI" type="number" {...register('hse.mti')} disabled={isReadOnly} /></Grid>
            <Grid item xs={6} sm={4} md={3}><TextField fullWidth label="Other Incidents" type="number" {...register('hse.otherIncidents')} disabled={isReadOnly} /></Grid>
            <Grid item xs={6} sm={4} md={3}><TextField fullWidth label="Fatalities" type="number" {...register('hse.fatalities')} disabled={isReadOnly} /></Grid>
          </Grid>
        </Box>
      </Box>

      {/* Remarks */}
      <Box sx={sectionStyle}>
        <Box sx={headerStyle}>
          <Typography sx={{ fontWeight: 600, color: '#333' }}>Remarks</Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <TextField
            fullWidth
            label="Breakdown Reason / Other Remarks"
            multiline
            rows={4}
            {...register('remarks')}
            disabled={isReadOnly}
          />
        </Box>
      </Box>
    </>
  );
}

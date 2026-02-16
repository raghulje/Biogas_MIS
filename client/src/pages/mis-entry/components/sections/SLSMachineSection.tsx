
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

export default function SLSMachineSection({ isReadOnly }: Props) {
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
    <Box sx={sectionStyle}>
      <Box sx={headerStyle}>
        <Typography sx={{ fontWeight: 600, color: '#333' }}>SLS Machine</Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Water Consumption" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('slsMachine.waterConsumption')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Poly Electrolyte" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('slsMachine.polyElectrolyte')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Solution" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('slsMachine.solution')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Slurry Feed" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('slsMachine.slurryFeed')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Wet Cake Production" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('slsMachine.wetCakeProduction')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Wet Cake TS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('slsMachine.wetCakeTs')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Wet Cake VS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('slsMachine.wetCakeVs')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Liquid Produced" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('slsMachine.liquidProduced')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Liquid TS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('slsMachine.liquidTs')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Liquid VS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('slsMachine.liquidVs')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Liquid Sent to Lagoon" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('slsMachine.liquidSentToLagoon')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

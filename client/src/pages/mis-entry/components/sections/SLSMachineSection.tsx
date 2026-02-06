
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Grid,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useFormContext } from 'react-hook-form';

interface Props {
  selectedEntry?: any;
  isReadOnly: boolean;
}

export default function SLSMachineSection({ isReadOnly }: Props) {
  const { register } = useFormContext();

  return (
    <Accordion
      sx={{
        mb: 2,
        borderRadius: '12px !important',
        '&:before': { display: 'none' },
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        border: '1px solid #e0e0e0',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: '#666' }} />}
        sx={{
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #e0e0e0',
          minHeight: '56px',
        }}
      >
        <Typography sx={{ fontWeight: 600, color: '#333' }}>SLS Machine</Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ p: 3, backgroundColor: '#fff' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Water Consumption" type="number" {...register('slsMachine.waterConsumption')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Poly Electrolyte" type="number" {...register('slsMachine.polyElectrolyte')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Solution" type="number" {...register('slsMachine.solution')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Slurry Feed" type="number" {...register('slsMachine.slurryFeed')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Wet Cake Production" type="number" {...register('slsMachine.wetCakeProduction')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Wet Cake TS %" type="number" {...register('slsMachine.wetCakeTs')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Wet Cake VS %" type="number" {...register('slsMachine.wetCakeVs')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Liquid Produced" type="number" {...register('slsMachine.liquidProduced')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Liquid TS %" type="number" {...register('slsMachine.liquidTs')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Liquid VS %" type="number" {...register('slsMachine.liquidVs')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Liquid Sent to Lagoon" type="number" {...register('slsMachine.liquidSentToLagoon')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

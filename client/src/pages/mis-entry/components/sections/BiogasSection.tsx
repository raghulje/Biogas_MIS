
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

export default function BiogasSection({ isReadOnly }: Props) {
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
      {/* Raw Biogas */}
      <Box sx={sectionStyle}>
        <Box sx={headerStyle}>
          <Typography sx={{ fontWeight: 600, color: '#333' }}>Raw Biogas</Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="Digester 01 Gas" type="number" {...register('rawBiogas.digester01Gas')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="Digester 02 Gas" type="number" {...register('rawBiogas.digester02Gas')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="Digester 03 Gas" type="number" {...register('rawBiogas.digester03Gas')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="Total Raw Biogas" type="number" {...register('rawBiogas.totalRawBiogas')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="RBG Flared" type="number" {...register('rawBiogas.rbgFlared')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="Gas Yield" type="number" {...register('rawBiogas.gasYield')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Raw Biogas Quality */}
      <Box sx={sectionStyle}>
        <Box sx={headerStyle}>
          <Typography sx={{ fontWeight: 600, color: '#333' }}>
            Raw Biogas Quality
          </Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="CH4 %" type="number" {...register('rawBiogasQuality.ch4')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="CO2 %" type="number" {...register('rawBiogasQuality.co2')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="H2S ppm" type="number" {...register('rawBiogasQuality.h2s')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="O2 %" type="number" {...register('rawBiogasQuality.o2')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="N2 %" type="number" {...register('rawBiogasQuality.n2')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Compressed Biogas */}
      <Box sx={sectionStyle}>
        <Box sx={headerStyle}>
          <Typography sx={{ fontWeight: 600, color: '#333' }}>
            Compressed Biogas
          </Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="Produced (kg)" type="number" {...register('compressedBiogas.produced')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="CH4 %" type="number" {...register('compressedBiogas.ch4')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="CO2 %" type="number" {...register('compressedBiogas.co2')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="H2S ppm" type="number" {...register('compressedBiogas.h2s')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="O2 %" type="number" {...register('compressedBiogas.o2')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="N2 %" type="number" {...register('compressedBiogas.n2')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="Conversion Ratio" type="number" {...register('compressedBiogas.conversionRatio')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="CH4 Slippage" type="number" {...register('compressedBiogas.ch4Slippage')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="CBG Stock" type="number" {...register('compressedBiogas.cbgStock')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="CBG Sold" type="number" {...register('compressedBiogas.cbgSold')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Compressors */}
      <Box sx={sectionStyle}>
        <Box sx={headerStyle}>
          <Typography sx={{ fontWeight: 600, color: '#333' }}>
            Compressors
          </Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Compressor 1 Hours" type="number" {...register('compressors.compressor1Hours')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Compressor 2 Hours" type="number" {...register('compressors.compressor2Hours')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Total Hours" type="number" {...register('compressors.totalHours')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

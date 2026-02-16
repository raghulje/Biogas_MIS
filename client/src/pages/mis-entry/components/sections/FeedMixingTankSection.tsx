
import React from 'react';
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

export default function FeedMixingTankSection({ isReadOnly }: Props) {
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
        <Typography sx={{ fontWeight: 600, color: '#333' }}>Feed Mixing Tank</Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        {/* Cow Dung Feed */}
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#555' }}>
          Cow Dung Feed
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Qty" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.cowDungFeed.qty')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="TS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.cowDungFeed.ts')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="VS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.cowDungFeed.vs')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
        </Grid>

        {/* Pressmud Feed */}
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#555' }}>
          Pressmud Feed
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Qty" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.pressmudFeed.qty')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="TS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.pressmudFeed.ts')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="VS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.pressmudFeed.vs')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
        </Grid>

        {/* Permeate Feed */}
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#555' }}>
          Permeate Feed
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Qty" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.permeateFeed.qty')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="TS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.permeateFeed.ts')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="VS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.permeateFeed.vs')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
        </Grid>

        {/* Water Feed */}
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#555' }}>
          Water Feed
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Water Qty" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.waterQty')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
        </Grid>

        {/* Feed Mixing Tank Slurry */}
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#555' }}>
          Feed Mixing Tank Slurry
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="Total Slurry" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.slurry.total')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="Slurry TS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.slurry.ts')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="Slurry VS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.slurry.vs')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="pH" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.slurry.ph')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

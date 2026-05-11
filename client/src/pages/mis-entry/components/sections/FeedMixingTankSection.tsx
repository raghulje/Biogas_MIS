
import React, { useMemo } from 'react';
import {
  Typography,
  TextField,
  Grid,
  Box,
} from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';

interface Props {
  selectedEntry?: any;
  isReadOnly: boolean;
}

export default function FeedMixingTankSection({ isReadOnly }: Props) {
  const { register, control } = useFormContext();

  const fmt = useWatch({ control, name: 'feedMixingTank' });
  const totals = useMemo(() => {
    const n = (v: any) => Number(v || 0);
    const getQty = (path: any) => n(path?.qty);
    const getTs = (path: any) => n(path?.ts);
    const getVs = (path: any) => n(path?.vs);

    const items = [
      { qty: getQty(fmt?.pressmudFeed), ts: getTs(fmt?.pressmudFeed), vs: getVs(fmt?.pressmudFeed) },
      { qty: getQty(fmt?.cowDungFeed), ts: getTs(fmt?.cowDungFeed), vs: getVs(fmt?.cowDungFeed) },
      { qty: getQty(fmt?.permeateFeed), ts: getTs(fmt?.permeateFeed), vs: getVs(fmt?.permeateFeed) },
      { qty: n(fmt?.waterQty), ts: n(fmt?.waterTs), vs: n(fmt?.waterVs) },
      { qty: getQty(fmt?.pulpFeed), ts: getTs(fmt?.pulpFeed), vs: getVs(fmt?.pulpFeed) },
      { qty: getQty(fmt?.maggieFeed), ts: getTs(fmt?.maggieFeed), vs: getVs(fmt?.maggieFeed) },
      { qty: getQty(fmt?.otherFeedSubstrate), ts: getTs(fmt?.otherFeedSubstrate), vs: getVs(fmt?.otherFeedSubstrate) },
    ];

    const totalQty = items.reduce((sum, it) => sum + n(it.qty), 0);
    const weightedTs = totalQty > 0 ? items.reduce((sum, it) => sum + n(it.qty) * n(it.ts), 0) / totalQty : 0;
    const weightedVs = totalQty > 0 ? items.reduce((sum, it) => sum + n(it.qty) * n(it.vs), 0) / totalQty : 0;

    return { totalQty, weightedTs, weightedVs };
  }, [fmt]);

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
        {/* Pressmud Feed (moved to first row) */}
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
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="TS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.waterTs')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="VS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.waterVs')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
        </Grid>

        {/* Pulp */}
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#555' }}>
          Pulp
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Qty" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.pulpFeed.qty')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="TS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.pulpFeed.ts')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="VS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.pulpFeed.vs')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
        </Grid>

        {/* Maggie */}
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#555' }}>
          Maggie
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Qty" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.maggieFeed.qty')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="TS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.maggieFeed.ts')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="VS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.maggieFeed.vs')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
        </Grid>

        {/* Other Feed Substrate */}
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#555' }}>
          Other Feed Substrate
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Qty" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.otherFeedSubstrate.qty')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="TS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.otherFeedSubstrate.ts')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="VS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('feedMixingTank.otherFeedSubstrate.vs')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          </Grid>
        </Grid>

        {/* Total row (computed) */}
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#2563EB' }}>
          Total
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Total Qty" type="number" value={totals.totalQty.toFixed(2)} disabled={true} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', bgcolor: '#f8f9fa' } }} />
          </Grid>
          {/* Total TS% and Total VS% are not needed for now */}
          {/* <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Total TS %" type="number" value={totals.weightedTs.toFixed(2)} disabled={true} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', bgcolor: '#f8f9fa' } }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Total VS %" type="number" value={totals.weightedVs.toFixed(2)} disabled={true} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', bgcolor: '#f8f9fa' } }} />
          </Grid> */}
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

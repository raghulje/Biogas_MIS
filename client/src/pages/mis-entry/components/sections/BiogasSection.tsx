
import {
  Typography,
  TextField,
  Grid,
  Box,
  Button,
  IconButton,
  MenuItem,
} from '@mui/material';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import { customerService } from '../../../../services/customerService';

interface Props {
  selectedEntry?: any;
  isReadOnly: boolean;
}

export default function BiogasSection({ isReadOnly }: Props) {
  const { register, control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "cbgSales"
  });

  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    customerService.getCustomers({ status: 'active' }).then(setCustomers).catch(console.error);
  }, []);

  // Calculate total sold whenever cbgSales changes
  const cbgSales = watch('cbgSales');
  useEffect(() => {
    const total = (cbgSales || []).reduce((sum: number, item: any) => sum + (parseFloat(item.quantity) || 0), 0);
    setValue('compressedBiogas.cbgSold', total);
  }, [cbgSales, setValue]);

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
              <TextField fullWidth label="Digester 01 Gas" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('rawBiogas.digester01Gas')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="Digester 02 Gas" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('rawBiogas.digester02Gas')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="Digester 03 Gas" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('rawBiogas.digester03Gas')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="Total Raw Biogas" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('rawBiogas.totalRawBiogas')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="RBG Flared" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('rawBiogas.rbgFlared')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="Gas Yield" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('rawBiogas.gasYield')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
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
              <TextField fullWidth label="CH4 %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('rawBiogasQuality.ch4')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="CO2 %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('rawBiogasQuality.co2')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="H2S ppm" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('rawBiogasQuality.h2s')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="O2 %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('rawBiogasQuality.o2')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="N2 %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('rawBiogasQuality.n2')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
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
              <TextField fullWidth label="Produced (kg)" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('compressedBiogas.produced')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="CH4 %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('compressedBiogas.ch4')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="CO2 %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('compressedBiogas.co2')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="H2S ppm" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('compressedBiogas.h2s')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="O2 %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('compressedBiogas.o2')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="N2 %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('compressedBiogas.n2')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="Conversion Ratio" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('compressedBiogas.conversionRatio')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="CH4 Slippage" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('compressedBiogas.ch4Slippage')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="CBG Stock" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('compressedBiogas.cbgStock')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="CBG Sold" type="number" inputProps={{ step: 'any', inputMode: 'decimal', readOnly: true }} {...register('compressedBiogas.cbgSold')} disabled={true} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', bgcolor: '#f5f5f5' } }} />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mt: 2, p: 2, border: '1px dashed #e0e0e0', borderRadius: '8px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>CBG Sales Detail</Typography>
                  {!isReadOnly && (
                    <Button
                      startIcon={<AddCircleIcon />}
                      variant="outlined"
                      size="small"
                      onClick={() => append({ customerId: '', quantity: '' })}
                    >
                      Add Sale
                    </Button>
                  )}
                </Box>
                {fields.map((field, index) => (
                  <Grid container spacing={2} key={field.id} sx={{ mb: 2, alignItems: 'center' }}>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name={`cbgSales.${index}.customerId`}
                        control={control}
                        defaultValue=""
                        render={({ field: controllerField }) => (
                          <TextField
                            select
                            fullWidth
                            label="Customer"
                            value={controllerField.value || ''}
                            onChange={controllerField.onChange}
                            disabled={isReadOnly}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                          >
                            {customers.map((c) => (
                              <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Quantity (kg)"
                        type="number"
                        inputProps={{ step: 'any' }}
                        {...register(`cbgSales.${index}.quantity`)}
                        disabled={isReadOnly}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                      />
                    </Grid>
                    {!isReadOnly && (
                      <Grid item xs={12} sm={2}>
                        <IconButton onClick={() => remove(index)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                ))}
                {fields.length === 0 && (
                  <Typography variant="body2" color="textSecondary" align="center">No sales entries added.</Typography>
                )}
              </Box>
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
              <TextField fullWidth label="Compressor 1 Hours" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('compressors.compressor1Hours')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Compressor 2 Hours" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('compressors.compressor2Hours')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Total Hours" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} {...register('compressors.totalHours')} disabled={isReadOnly} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}


import React from 'react';
import {
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  IconButton,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useFormContext, useFieldArray } from 'react-hook-form';

interface Props {
  digesters?: any[];
  isReadOnly: boolean;
  onAddDigester?: () => void;
  onRemoveDigester?: (id: number) => void;
}

export default function DigestersSection({ isReadOnly }: Props) {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "digesters"
  });

  const handleAddDigester = () => {
    const newId = fields.length > 0 ? Math.max(...fields.map((f: any) => f.id || 0)) + 1 : 1;
    append({
      id: newId,
      name: `Digester ${String(newId).padStart(2, '0')}`,
      feeding: {}, discharge: {}, characteristics: {}, health: {}
    });
  };

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
        <Typography sx={{ fontWeight: 600, color: '#333' }}>Digesters</Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        {!isReadOnly && (
          <Box sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddDigester}
              sx={{ textTransform: 'none', borderRadius: '8px' }}
            >
              Add Digester
            </Button>
          </Box>
        )}

        {fields.length > 0 ? (
          fields.map((digester, index) => (
            <Card
              key={digester.id}
              sx={{
                mb: 2,
                borderRadius: '12px',
                border: '1px solid #e0e0e0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>

                    <TextField
                      variant="standard"
                      {...register(`digesters.${index}.name`)}
                      InputProps={{ disableUnderline: isReadOnly, style: { fontSize: '1.25rem', fontWeight: 600 } }}
                      disabled={isReadOnly}
                    />
                  </Typography>

                  {!isReadOnly && fields.length > 1 && (
                    <IconButton
                      onClick={() => remove(index)}
                      size="small"
                      sx={{ color: '#d32f2f', backgroundColor: 'rgba(211, 47, 47, 0.08)' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>

                {/* Feeding Data */}
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#555' }}>Feeding Data</Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Total Slurry Feed" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} size="small" {...register(`digesters.${index}.feeding.totalSlurryFeed`)} disabled={isReadOnly} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Avg TS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} size="small" {...register(`digesters.${index}.feeding.avgTs`)} disabled={isReadOnly} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Avg VS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} size="small" {...register(`digesters.${index}.feeding.avgVs`)} disabled={isReadOnly} />
                  </Grid>
                </Grid>

                {/* Discharge Data */}
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#555' }}>Discharge Data</Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Total Slurry Out" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} size="small" {...register(`digesters.${index}.discharge.totalSlurryOut`)} disabled={isReadOnly} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Avg TS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} size="small" {...register(`digesters.${index}.discharge.avgTs`)} disabled={isReadOnly} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Avg VS %" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} size="small" {...register(`digesters.${index}.discharge.avgVs`)} disabled={isReadOnly} />
                  </Grid>
                </Grid>

                {/* Characteristics */}
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#555' }}>Slurry Characteristics</Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {[
                    { label: 'Lignin', key: 'lignin' },
                    { label: 'VFA', key: 'vfa' },
                    { label: 'Alkalinity', key: 'alkalinity' },
                    { label: 'VFA:ALK Ratio', key: 'vfaAlkRatio' },
                    { label: 'Ash', key: 'ash' },
                    { label: 'Density', key: 'density' },
                    { label: 'pH', key: 'ph' },
                    { label: 'Temperature', key: 'temperature' },
                    { label: 'Pressure', key: 'pressure' },
                    { label: 'Slurry Level', key: 'slurryLevel' },
                  ].map(({ label, key }) => (
                    <Grid item xs={6} sm={4} md={3} key={key}>
                      <TextField fullWidth label={label} type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} size="small" {...register(`digesters.${index}.characteristics.${key}`)} disabled={isReadOnly} />
                    </Grid>
                  ))}
                </Grid>

                {/* Health Monitoring */}
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#555' }}>Health Monitoring</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={4} md={3}>
                    <TextField fullWidth label="HRT" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} size="small" {...register(`digesters.${index}.health.hrt`)} disabled={isReadOnly} />
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <TextField fullWidth label="VS Destruction" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} size="small" {...register(`digesters.${index}.health.vsDestruction`)} disabled={isReadOnly} />
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <TextField fullWidth label="OLR" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} size="small" {...register(`digesters.${index}.health.olr`)} disabled={isReadOnly} />
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <TextField fullWidth label="Balloon Level" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} size="small" {...register(`digesters.${index}.health.balloonLevel`)} disabled={isReadOnly} />
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <TextField fullWidth select label="Agitator Condition" defaultValue="OK" size="small" {...register(`digesters.${index}.health.agitatorCondition`)} disabled={isReadOnly}>
                      <MenuItem value="OK">OK</MenuItem>
                      <MenuItem value="Not OK">Not OK</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <TextField fullWidth label="Foaming Level" type="number" inputProps={{ step: 'any', inputMode: 'decimal' }} size="small" {...register(`digesters.${index}.health.foamingLevel`)} disabled={isReadOnly} />
                  </Grid>
                </Grid>

              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">No digesters available.</Typography>
        )}
      </Box>
    </Box>
  );
}

import {
  Typography,
  TextField,
  Grid,
  Box,
  Button,
  IconButton,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import { customerService } from '../../../../services/customerService';
import { useAuth } from '../../../../context/AuthContext';
import { useSnackbar } from 'notistack';

const SELLING_PRODUCTS = ['CBG', 'FOM', 'LFOM'] as const;

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { hasPermission } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const canCreateCustomer = hasPermission('customer', 'create');

  const [customers, setCustomers] = useState<any[]>([]);
  const cbgSalesRows = watch('cbgSales') || [];

  const [addCustomerOpen, setAddCustomerOpen] = useState(false);
  const [addCustomerType, setAddCustomerType] = useState<string>('CBG');
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerEmail, setNewCustomerEmail] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [addCustomerSaving, setAddCustomerSaving] = useState(false);

  const fetchCustomers = () => {
    customerService.getCustomers({ status: 'active' }).then(setCustomers).catch(console.error);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // When loading existing entry: set customerType from customer for each row
  useEffect(() => {
    if (customers.length === 0 || !Array.isArray(cbgSalesRows)) return;
    cbgSalesRows.forEach((row: any, index: number) => {
      if (row.customerId && !row.customerType) {
        const customer = customers.find((c: any) => Number(c.id) === Number(row.customerId));
        if (customer?.type) setValue(`cbgSales.${index}.customerType`, customer.type);
      }
    });
  }, [customers, cbgSalesRows?.length, setValue]);

  // Calculate total sold whenever cbgSales changes
  const cbgSales = watch('cbgSales');
  useEffect(() => {
    const total = (cbgSales || []).reduce((sum: number, item: any) => sum + (parseFloat(item.quantity) || 0), 0);
    setValue('compressedBiogas.cbgSold', total);
  }, [cbgSales, setValue]);

  const openAddCustomer = (type: string) => {
    setAddCustomerType(type);
    setNewCustomerName('');
    setNewCustomerEmail('');
    setNewCustomerPhone('');
    setAddCustomerOpen(true);
  };

  const handleAddNewCustomer = async () => {
    if (!newCustomerName.trim()) return;
    setAddCustomerSaving(true);
    try {
      await customerService.createCustomer({
        name: newCustomerName.trim(),
        type: addCustomerType,
        email: newCustomerEmail.trim() || undefined,
        phone: newCustomerPhone.trim() || undefined,
        status: 'active',
      });
      fetchCustomers();
      setAddCustomerOpen(false);
      enqueueSnackbar('Customer added successfully', { variant: 'success' });
    } catch (err: any) {
      console.error(err);
    } finally {
      setAddCustomerSaving(false);
    }
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
              <Box
                sx={{
                  mt: 2,
                  p: { xs: 2, sm: 3 },
                  borderRadius: '16px',
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: '#2879b6',
                    mb: 2.5,
                    fontSize: { xs: '1rem', sm: '1.125rem' },
                  }}
                >
                  Sales Details
                </Typography>

                {SELLING_PRODUCTS.map((productType, sectionIndex) => {
                  const rowIndices = fields
                    .map((_, i) => i)
                    .filter((i) => (cbgSalesRows[i]?.customerType || '') === productType);
                  const customersForType = customers.filter((c: any) => (c.type || '') === productType);
                  const productAccent = productType === 'CBG' ? '#2879b6' : productType === 'FOM' ? '#7dc244' : '#F59E21';

                  return (
                    <Box
                      key={productType}
                      sx={{
                        mb: 3,
                        pl: { xs: 2, sm: 2.5 },
                        borderLeft: `4px solid ${productAccent}`,
                        borderRadius: '0 12px 12px 0',
                        bgcolor: 'rgba(0,0,0,0.02)',
                        py: 2,
                        px: 2,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          color: 'text.primary',
                          mb: 1.5,
                          fontSize: { xs: '0.95rem', sm: '1rem' },
                        }}
                      >
                        {sectionIndex + 1}) {productType}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1.5, display: 'block', fontWeight: 500 }}
                      >
                        a) Customer Name
                      </Typography>
                      {rowIndices.map((index) => (
                        <Grid
                          container
                          spacing={2}
                          key={fields[index].id}
                          sx={{
                            mb: 2,
                            alignItems: 'center',
                            bgcolor: '#fff',
                            borderRadius: '12px',
                            p: 1.5,
                            border: '1px solid',
                            borderColor: 'divider',
                          }}
                        >
                          <Grid item xs={12} sm={5}>
                            <Controller
                              name={`cbgSales.${index}.customerId`}
                              control={control}
                              defaultValue=""
                              render={({ field: controllerField }) => (
                                <TextField
                                  select
                                  fullWidth
                                  size="small"
                                  label="Customer"
                                  value={controllerField.value || ''}
                                  onChange={controllerField.onChange}
                                  disabled={isReadOnly}
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      borderRadius: '10px',
                                      ...(isReadOnly && { backgroundColor: 'rgba(0,0,0,0.04)' }),
                                    },
                                  }}
                                >
                                  {customersForType.map((c: any) => (
                                    <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                                  ))}
                                </TextField>
                              )}
                            />
                          </Grid>
                          <Grid item xs={10} sm={4}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Quantity (kg)"
                              type="number"
                              inputProps={{ step: 'any', min: 0 }}
                              {...register(`cbgSales.${index}.quantity`)}
                              disabled={isReadOnly}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: '10px',
                                  ...(isReadOnly && { backgroundColor: 'rgba(0,0,0,0.04)' }),
                                },
                              }}
                            />
                          </Grid>
                          {!isReadOnly && (
                            <Grid item xs={2} sm={1} sx={{ display: 'flex', justifyContent: { xs: 'flex-end', sm: 'center' } }}>
                              <IconButton
                                size="small"
                                onClick={() => remove(index)}
                                color="error"
                                sx={{
                                  bgcolor: 'rgba(211, 47, 47, 0.12)',
                                  borderRadius: '10px',
                                  '&:hover': { bgcolor: 'rgba(211, 47, 47, 0.2)' },
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Grid>
                          )}
                        </Grid>
                      ))}
                      {!isReadOnly && (
                        <Box
                          sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1.5,
                            mt: 2,
                            alignItems: 'center',
                          }}
                        >
                          <Button
                            startIcon={<AddCircleIcon />}
                            variant="contained"
                            size="medium"
                            onClick={() => append({ customerType: productType, customerId: '', quantity: '' })}
                            sx={{
                              borderRadius: '12px',
                              textTransform: 'none',
                              fontWeight: 600,
                              px: 2,
                              py: 1,
                              boxShadow: '0 2px 6px rgba(40, 121, 182, 0.35)',
                            }}
                          >
                            Add Sale
                          </Button>
                          <Typography variant="body2" color="text.secondary" sx={{ mx: 0.5 }} component="span">
                            b)
                          </Typography>
                          <Button
                            startIcon={<PersonAddIcon />}
                            variant="outlined"
                            size="medium"
                            onClick={() => openAddCustomer(productType)}
                            disabled={!canCreateCustomer}
                            sx={{
                              borderRadius: '12px',
                              textTransform: 'none',
                              fontWeight: 600,
                              borderWidth: 2,
                              px: 2,
                              py: 1,
                              '&:hover': { borderWidth: 2 },
                            }}
                          >
                            Add New Customer
                          </Button>
                        </Box>
                      )}
                    </Box>
                  );
                })}

                {fields.length === 0 && (
                  <Box
                    sx={{
                      py: 4,
                      px: 2,
                      textAlign: 'center',
                      borderRadius: '12px',
                      bgcolor: 'rgba(0,0,0,0.04)',
                      border: '1px dashed',
                      borderColor: 'divider',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320, mx: 'auto' }}>
                      No sales entries added. Use &quot;Add Sale&quot; under each selling product to add customer and quantity.
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>

            <Dialog
              open={addCustomerOpen}
              onClose={() => setAddCustomerOpen(false)}
              maxWidth="sm"
              fullWidth
              fullScreen={isMobile}
              PaperProps={{
                sx: {
                  borderRadius: { xs: 0, sm: '16px' },
                  maxHeight: { xs: '100vh', sm: '90vh' },
                },
              }}
            >
              <DialogTitle sx={{ fontWeight: 700, color: '#2879b6', pb: 1 }}>
                Add New Customer
              </DialogTitle>
              <DialogContent sx={{ pt: 0 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Selling Product"
                      value={addCustomerType}
                      disabled
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      label="Customer Name"
                      value={newCustomerName}
                      onChange={(e) => setNewCustomerName(e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={newCustomerEmail}
                      onChange={(e) => setNewCustomerEmail(e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={newCustomerPhone}
                      onChange={(e) => setNewCustomerPhone(e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ px: 3, py: 2, gap: 1, flexWrap: 'wrap' }}>
                <Button onClick={() => setAddCustomerOpen(false)} sx={{ borderRadius: '10px' }}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleAddNewCustomer}
                  disabled={!newCustomerName.trim() || addCustomerSaving}
                  sx={{ borderRadius: '10px', fontWeight: 600 }}
                >
                  {addCustomerSaving ? 'Saving…' : 'Save Customer'}
                </Button>
              </DialogActions>
            </Dialog>
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

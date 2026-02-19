import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Zoom,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import {
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterIcon,
  LocalFireDepartment as BiogasIcon,
  LocalGasStation as GasIcon,
  Sell as SellIcon,
  Grass as FomIcon,
  Speed as AvgIcon,
  Storefront as StoreIcon,
  Bolt as BoltIcon,
  HealthAndSafety as SafetyIcon,
} from '@mui/icons-material';
import { Layout } from '../../components/Layout';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { misService } from '../../services/misService';
import MESSAGES from '../../utils/messages';

export default function DashboardPage() {
  const theme = useTheme();
  const isPhone = useMediaQuery('(max-width:768px)');
  const [filterType, setFilterType] = useState('month');
  // Format numbers: round to max 2 decimals for display on cards
  const formatNumber = (val: any) => {
    if (val === null || val === undefined) return '0';
    const n = Number(val);
    if (Number.isNaN(n)) return String(val);
    if (Number.isInteger(n)) return String(n);
    return n.toFixed(2);
  };
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [cbgBreakdownOpen, setCBGBreakdownOpen] = useState(false);
  const [cbgBreakdownData, setCBGBreakdownData] = useState<any[]>([]);
  const [cbgLoading, setCBGLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (filterType !== 'custom' && filterType !== 'day') fetchDashboardData();
  }, [filterType]);

  useEffect(() => {
    if (filterType === 'day' && selectedDate) fetchDashboardData();
  }, [filterType, selectedDate]);

  const fetchDashboardData = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const params: { period: string; startDate?: string; endDate?: string } = { period: filterType };
      if (filterType === 'custom' && startDate && endDate) {
        params.startDate = startDate.toISOString().slice(0, 10);
        params.endDate = endDate.toISOString().slice(0, 10);
      }
      if (filterType === 'day' && selectedDate) {
        // Adjust for local timezone offset manually to ensure the day matched is what user clicked
        const offset = selectedDate.getTimezoneOffset() * 60000;
        const localDate = new Date(selectedDate.getTime() - offset).toISOString().slice(0, 10);
        params.startDate = localDate;
        params.endDate = localDate;
      }
      const data = await misService.getDashboardData(params);
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
      setFetchError('Failed to load dashboard. Please try again.');
      setDashboardData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCBGSoldClick = async () => {
    setCBGBreakdownOpen(true);
    setCBGLoading(true);
    try {
      const params: { period: string; startDate?: string; endDate?: string } = { period: filterType };
      if (filterType === 'custom' && startDate && endDate) {
        params.startDate = startDate.toISOString().slice(0, 10);
        params.endDate = endDate.toISOString().slice(0, 10);
      }
      if (filterType === 'day' && selectedDate) {
        // Adjust for local timezone offset manually to ensure the day matched is what user clicked
        const offset = selectedDate.getTimezoneOffset() * 60000;
        const localDate = new Date(selectedDate.getTime() - offset).toISOString().slice(0, 10);
        params.startDate = localDate;
        params.endDate = localDate;
      }
      const data = await misService.getCBGSalesBreakdown(params);
      setCBGBreakdownData(data);
    } catch (error) {
      console.error('Failed to fetch CBG sales breakdown', error);
      enqueueSnackbar(MESSAGES.FAILED_LOAD_BREAKDOWN, { variant: 'error' });
    } finally {
      setCBGLoading(false);
    }
  };

  const filterButtons = [
    { value: 'day', label: 'Daily' },
    { value: 'week', label: 'Weekly' },
    { value: 'month', label: 'Monthly' },
    { value: 'year', label: 'Yearly' },
    { value: 'custom', label: 'Custom' },
  ];

  if (loading && !dashboardData) {
    return (
      <Layout>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  if (fetchError || !dashboardData?.summary) {
    return (
      <Layout>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 5, gap: 2 }}>
          <Typography color="textSecondary">{fetchError || 'No dashboard data available.'}</Typography>
          <Button variant="contained" onClick={() => { setFetchError(null); fetchDashboardData(); }} sx={{ textTransform: 'none' }}>
            Retry
          </Button>
        </Box>
      </Layout>
    );
  }

  const { summary } = dashboardData;

  return (
    <Layout>
      <Box>
        <Box
          sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}
          className="aos-fade-down"
        >
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#2879b6' }}>
            Dashboard
          </Typography>
          {/* Export Report Hidden */}
        </Box>

        <Card
          className="glass-card aos-fade-up aos-delay-100 hover-lift"
          sx={{ mb: 3 }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <FilterIcon sx={{ color: '#2879b6' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#333842' }}>
                Filter Records
              </Typography>
            </Box>
            <Box sx={{
              mb: 2,
              overflowX: 'auto',
              pb: 1,
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}>
              <ButtonGroup variant="outlined" sx={{ flexWrap: 'nowrap' }}>
                {filterButtons.map((btn) => (
                  <Button
                    key={btn.value}
                    onClick={() => setFilterType(btn.value)}
                    variant={filterType === btn.value ? 'contained' : 'outlined'}
                    size={isPhone ? 'large' : 'medium'}
                    sx={{
                      textTransform: 'none',
                      minWidth: { xs: '70px', sm: '100px' },
                      minHeight: isPhone ? 48 : undefined,
                      fontSize: { xs: '0.8rem', sm: '0.875rem' },
                      px: { xs: 1, sm: 2 },
                      backgroundColor: filterType === btn.value ? '#2879b6' : 'transparent',
                      borderColor: '#2879b6',
                      color: filterType === btn.value ? '#ffffff' : '#2879b6',
                      borderRadius: '12px',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: filterType === btn.value ? '#235EAC' : 'rgba(40, 121, 182, 0.08)',
                        borderColor: '#2879b6',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {btn.label}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
            {filterType === 'day' && (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box sx={{ mt: 2, maxWidth: 300 }}>
                  <DatePicker
                    label="Select Date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue ?? null)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        sx: { '& .MuiOutlinedInput-root': { borderRadius: '12px' } }
                      }
                    }}
                  />
                </Box>
              </LocalizationProvider>
            )}
            {filterType === 'custom' && (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue ?? null)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          sx: { '& .MuiOutlinedInput-root': { borderRadius: '12px' } }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue ?? null)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          sx: { '& .MuiOutlinedInput-root': { borderRadius: '12px' } }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      onClick={() => fetchDashboardData()}
                      disabled={!startDate || !endDate || startDate > endDate}
                      fullWidth={isPhone}
                      size={isPhone ? 'large' : 'medium'}
                      sx={{ textTransform: 'none', borderRadius: '12px', minHeight: isPhone ? 48 : undefined }}
                    >
                      Apply
                    </Button>
                  </Grid>
                </Grid>
              </LocalizationProvider>
            )}
          </CardContent>
        </Card>

        <Card className="glass-card-strong aos-fade-up aos-delay-200 hover-lift">
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#333842' }}>
                MIS Summary - {filterType.toUpperCase()}
              </Typography>
              <Chip
                label="Aggregate"
                size="small"
                sx={{
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #7dc244 0%, #139B49 100%)',
                  color: '#ffffff',
                  borderRadius: '8px',
                  px: 1,
                }}
              />
            </Box>

            {/* Overall Production Summary */}
            <Box
              className="aos-fade-right aos-delay-300"
              sx={{
                mb: 1.5,
                boxShadow: 'none',
                border: '1px solid rgba(40, 121, 182, 0.2)',
                borderRadius: '12px !important',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                backgroundColor: '#fff',
                '&:hover': {
                  boxShadow: '0 4px 20px rgba(40, 121, 182, 0.15)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Box
                className="gradient-header"
                sx={{
                  background: 'linear-gradient(135deg, #2879b6 0%, #1D9AD4 100%)',
                  color: '#ffffff',
                  borderRadius: '12px 12px 0 0',
                  minHeight: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  px: 2,
                }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Overall Production Summary</Typography>
              </Box>
              <Box sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <Box
                      className="hover-lift"
                      sx={{
                        p: 2.5,
                        background: 'linear-gradient(135deg, rgba(40, 121, 182, 0.08) 0%, rgba(40, 121, 182, 0.03) 100%)',
                        borderRadius: '12px',
                        borderLeft: '4px solid #2879b6',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="caption" sx={{ color: '#58595B', fontWeight: 500 }}>
                            Total Feed Amount
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: '#2879b6', mt: 0.5 }}>
                            {formatNumber(summary.totalFeed ?? 0)} kg
                          </Typography>
                        </Box>
                        <AvgIcon sx={{ fontSize: 32, color: '#2879b6', opacity: 0.7 }} />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box
                      className="hover-lift"
                      sx={{
                        p: 2.5,
                        background: 'linear-gradient(135deg, rgba(40, 121, 182, 0.08) 0%, rgba(40, 121, 182, 0.03) 100%)',
                        borderRadius: '12px',
                        borderLeft: '4px solid #2879b6',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="caption" sx={{ color: '#58595B', fontWeight: 500 }}>
                            Total Raw Biogas
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: '#2879b6', mt: 0.5 }}>
                            {formatNumber(summary.totalRawBiogas ?? 0)} m³
                          </Typography>
                        </Box>
                        <BiogasIcon sx={{ fontSize: 32, color: '#2879b6', opacity: 0.7 }} />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box
                      className="hover-lift"
                      sx={{
                        p: 2.5,
                        background: 'linear-gradient(135deg, rgba(125, 194, 68, 0.08) 0%, rgba(125, 194, 68, 0.03) 100%)',
                        borderRadius: '12px',
                        borderLeft: '4px solid #7dc244',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="caption" sx={{ color: '#58595B', fontWeight: 500 }}>
                            CBG Produced
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: '#7dc244', mt: 0.5 }}>
                            {formatNumber(summary.totalCBGProduced ?? 0)} kg
                          </Typography>
                        </Box>
                        <GasIcon sx={{ fontSize: 32, color: '#7dc244', opacity: 0.7 }} />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box
                      className="hover-lift"
                      onClick={handleCBGSoldClick}
                      sx={{
                        p: 2.5,
                        background: 'linear-gradient(135deg, rgba(238, 106, 49, 0.08) 0%, rgba(238, 106, 49, 0.03) 100%)',
                        borderRadius: '12px',
                        borderLeft: '4px solid #ee6a31',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'rgba(238, 106, 49, 0.12)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="caption" sx={{ color: '#58595B', fontWeight: 500 }}>
                            CBG Sold
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: '#ee6a31', mt: 0.5 }}>
                            {formatNumber(summary.totalCBGSold ?? 0)} kg
                          </Typography>
                        </Box>
                        <SellIcon sx={{ fontSize: 32, color: '#ee6a31', opacity: 0.7 }} />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>

            {/* Fertilizer & Plant Availability */}
            <Box
              className="aos-fade-right aos-delay-400"
              sx={{
                mb: 1.5,
                boxShadow: 'none',
                border: '1px solid rgba(125, 194, 68, 0.36)',
                borderRadius: '12px !important',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                backgroundColor: '#fff',
                '&:hover': {
                  boxShadow: '0 6px 24px rgba(34,139,34,0.12)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #2879b6 0%, #1D9AD4 100%)',
                  color: '#ffffff',
                  borderRadius: '12px 12px 0 0',
                  minHeight: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  px: 2,
                }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Fertilizer & Plant Availability</Typography>
              </Box>
              <Box sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Box
                      className="hover-lift"
                      sx={{
                        p: 2.5,
                        background: 'linear-gradient(135deg, rgba(40, 121, 182, 0.08) 0%, rgba(40, 121, 182, 0.03) 100%)',
                        borderRadius: '12px',
                        borderLeft: '4px solid #2879b6',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="caption" sx={{ color: '#58595B', fontWeight: 500 }}>
                            FOM Produced
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: '#2879b6', mt: 0.5 }}>
                            {formatNumber(summary.totalFOMProduced ?? 0)} kg
                          </Typography>
                        </Box>
                        <FomIcon sx={{ fontSize: 32, color: '#2879b6', opacity: 0.7 }} />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box
                      className="hover-lift"
                      sx={{
                        p: 2.5,
                        background: 'linear-gradient(135deg, rgba(125, 194, 68, 0.08) 0%, rgba(125, 194, 68, 0.03) 100%)',
                        borderRadius: '12px',
                        borderLeft: '4px solid #7dc244',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="caption" sx={{ color: '#58595B', fontWeight: 500 }}>
                            Avg Availability
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: '#7dc244', mt: 0.5 }}>
                            {formatNumber(summary.avgPlantAvailability ?? 0)}%
                          </Typography>
                        </Box>
                        <AvgIcon sx={{ fontSize: 32, color: '#7dc244', opacity: 0.7 }} />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box
                      className="hover-lift"
                      sx={{
                        p: 2.5,
                        background: 'linear-gradient(135deg, rgba(238, 106, 49, 0.08) 0%, rgba(238, 106, 49, 0.03) 100%)',
                        borderRadius: '12px',
                        borderLeft: '4px solid #ee6a31',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="caption" sx={{ color: '#58595B', fontWeight: 500 }}>
                            FOM Sold
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: '#ee6a31', mt: 0.5 }}>
                            {formatNumber(summary.totalFOMSold ?? 0)} kg
                          </Typography>
                        </Box>
                        <StoreIcon sx={{ fontSize: 32, color: '#ee6a31', opacity: 0.7 }} />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>

            {/* Utilities & HSE Summary */}
            <Box
              className="aos-fade-right aos-delay-500"
              sx={{
                boxShadow: 'none',
                border: '1px solid rgba(238, 106, 49, 0.2)',
                borderRadius: '12px !important',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                backgroundColor: '#fff',
                '&:hover': {
                  boxShadow: '0 4px 20px rgba(238, 106, 49, 0.15)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #2879b6 0%, #1D9AD4 100%)',
                  color: '#ffffff',
                  borderRadius: '12px 12px 0 0',
                  minHeight: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  px: 2,
                }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Utilities & HSE Summary</Typography>
              </Box>
              <Box sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box
                      className="hover-lift"
                      sx={{
                        p: 2.5,
                        background: 'linear-gradient(135deg, rgba(40, 121, 182, 0.08) 0%, rgba(40, 121, 182, 0.03) 100%)',
                        borderRadius: '12px',
                        borderLeft: '4px solid #2879b6',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="caption" sx={{ color: '#58595B', fontWeight: 500 }}>
                            Electricity Consumption
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: '#2879b6', mt: 0.5 }}>
                            {formatNumber(summary.totalElectricityConsumption ?? 0)} kWh
                          </Typography>
                        </Box>
                        <BoltIcon sx={{ fontSize: 32, color: '#2879b6', opacity: 0.7 }} />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box
                      className="hover-lift"
                      sx={{
                        p: 2.5,
                        background: 'linear-gradient(135deg, rgba(125, 194, 68, 0.08) 0%, rgba(125, 194, 68, 0.03) 100%)',
                        borderRadius: '12px',
                        borderLeft: '4px solid #7dc244',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="caption" sx={{ color: '#58595B', fontWeight: 500 }}>
                            HSE Incidents
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: '#7dc244', mt: 0.5 }}>
                            {formatNumber(summary.totalHSEIncidents ?? 0)}
                          </Typography>
                        </Box>
                        <SafetyIcon sx={{ fontSize: 32, color: '#7dc244', opacity: 0.7 }} />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Dialog
        open={cbgBreakdownOpen}
        onClose={() => setCBGBreakdownOpen(false)}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Zoom}
        TransitionProps={{ timeout: 400 }}
      >
        <DialogTitle>CBG Sales Detail</DialogTitle>
        <DialogContent className="aos-fade-up">
          {cbgLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box>
          ) : cbgBreakdownData.length === 0 ? (
            <Typography align="center" color="textSecondary">No sales data for this period.</Typography>
          ) : (
            <TableContainer component={Paper} elevation={0} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Quantity (kg)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cbgBreakdownData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.customerName}</TableCell>
                      <TableCell align="right">{formatNumber(row.totalQuantity)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCBGBreakdownOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}

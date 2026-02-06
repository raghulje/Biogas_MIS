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
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { Layout } from '../../components/Layout';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { misService } from '../../services/misService';

export default function DashboardPage() {
  const [filterType, setFilterType] = useState('month');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    fetchDashboardData();
  }, [filterType]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const data = await misService.getDashboardData(filterType);
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
    } finally {
      setLoading(false);
    }
  };

  const filterButtons = [
    { value: 'day', label: 'Daily' },
    { value: 'week', label: 'Weekly' },
    { value: 'month', label: 'Monthly' },
    { value: 'year', label: 'Yearly' },
    { value: 'custom', label: 'Custom' },
  ];

  if (loading || !dashboardData) {
    return (
      <Layout>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress />
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
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            className="btn-gradient-success"
            sx={{
              textTransform: 'none',
              borderRadius: '12px',
              color: '#ffffff',
              fontWeight: 600,
              px: 3,
              py: 1.2,
              boxShadow: '0 4px 15px rgba(125, 194, 68, 0.3)',
            }}
          >
            Export Report
          </Button>
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
            <Box sx={{ mb: 2 }}>
              <ButtonGroup variant="outlined" sx={{ flexWrap: 'wrap' }}>
                {filterButtons.map((btn) => (
                  <Button
                    key={btn.value}
                    onClick={() => setFilterType(btn.value)}
                    variant={filterType === btn.value ? 'contained' : 'outlined'}
                    sx={{
                      textTransform: 'none',
                      minWidth: { xs: '80px', sm: '100px' },
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
            {filterType === 'custom' && (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          sx: {
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                            }
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          sx: {
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                            }
                          }
                        }
                      }}
                    />
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

            <Accordion
              defaultExpanded
              className="aos-fade-right aos-delay-300"
              sx={{
                mb: 1.5,
                boxShadow: 'none',
                border: '1px solid rgba(40, 121, 182, 0.2)',
                borderRadius: '12px !important',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 4px 20px rgba(40, 121, 182, 0.15)',
                  transform: 'translateY(-2px)',
                },
                '&:before': {
                  display: 'none',
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff' }} />}
                className="gradient-header"
                sx={{
                  background: 'linear-gradient(135deg, #2879b6 0%, #1D9AD4 100%)',
                  color: '#ffffff',
                  borderRadius: '12px 12px 0 0',
                  minHeight: '56px',
                  '&.Mui-expanded': {
                    minHeight: '56px',
                  }
                }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Overall Production Summary</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
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
                      <Typography variant="caption" sx={{ color: '#58595B', fontWeight: 500 }}>
                        Cow Dung Purchased
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: '#2879b6', mt: 0.5 }}>
                        {summary.totalRawBiogas} m³
                      </Typography>
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
                      <Typography variant="caption" sx={{ color: '#58595B', fontWeight: 500 }}>
                        Cow Dung Stock
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: '#7dc244', mt: 0.5 }}>
                        {summary.totalCBGProduced} kg
                      </Typography>
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
                      <Typography variant="caption" sx={{ color: '#58595B', fontWeight: 500 }}>
                        Press Mud Used
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: '#ee6a31', mt: 0.5 }}>
                        {summary.totalCBGSold} kg
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className="aos-fade-right aos-delay-400"
              sx={{
                mb: 1.5,
                boxShadow: 'none',
                border: '1px solid rgba(125, 194, 68, 0.2)',
                borderRadius: '12px !important',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 4px 20px rgba(125, 194, 68, 0.15)',
                  transform: 'translateY(-2px)',
                },
                '&:before': {
                  display: 'none',
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff' }} />}
                sx={{
                  background: 'linear-gradient(135deg, #7dc244 0%, #139B49 100%)',
                  color: '#ffffff',
                  borderRadius: '12px 12px 0 0',
                  minHeight: '56px',
                  '&.Mui-expanded': {
                    minHeight: '56px',
                  }
                }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Fertilizer & Plant Availability</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
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
                      <Typography variant="caption" sx={{ color: '#58595B', fontWeight: 500 }}>
                        FOM Produced
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: '#2879b6', mt: 0.5 }}>
                        {summary.totalFOMProduced} kg
                      </Typography>
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
                      <Typography variant="caption" sx={{ color: '#58595B', fontWeight: 500 }}>
                        Avg Availability
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: '#7dc244', mt: 0.5 }}>
                        {summary.avgPlantAvailability}%
                      </Typography>
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
                      <Typography variant="caption" sx={{ color: '#58595B', fontWeight: 500 }}>
                        FOM Sold
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: '#ee6a31', mt: 0.5 }}>
                        {summary.totalFOMSold} kg
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className="aos-fade-right aos-delay-500"
              sx={{
                boxShadow: 'none',
                border: '1px solid rgba(238, 106, 49, 0.2)',
                borderRadius: '12px !important',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 4px 20px rgba(238, 106, 49, 0.15)',
                  transform: 'translateY(-2px)',
                },
                '&:before': {
                  display: 'none',
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff' }} />}
                sx={{
                  background: 'linear-gradient(135deg, #ee6a31 0%, #F59E21 100%)',
                  color: '#ffffff',
                  borderRadius: '12px 12px 0 0',
                  minHeight: '56px',
                  '&.Mui-expanded': {
                    minHeight: '56px',
                  }
                }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Utilities & HSE Summary</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
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
                      <Typography variant="caption" sx={{ color: '#58595B', fontWeight: 500 }}>
                        Electricity Consumption
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: '#2879b6', mt: 0.5 }}>
                        {summary.totalElectricityConsumption} kWh
                      </Typography>
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
                      <Typography variant="caption" sx={{ color: '#58595B', fontWeight: 500 }}>
                        HSE Incidents
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: '#7dc244', mt: 0.5 }}>
                        {summary.totalHSEIncidents}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
}

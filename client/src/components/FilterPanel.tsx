
import { useState } from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FilterListIcon from '@mui/icons-material/FilterList';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';

interface FilterPanelProps {
  onApplyFilters: (filters: FilterValues) => void;
  onReset: () => void;
  onExport: () => void;
  onImport: () => void;
}

export interface FilterValues {
  singleDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  month: string;
  quarter: string;
  year: string;
  digester: string;
  dataCategory: string;
}

const quarters = [
  { value: '', label: 'All Quarters' },
  { value: 'Q1', label: 'Q1 (Apr-Jun)' },
  { value: 'Q2', label: 'Q2 (Jul-Sep)' },
  { value: 'Q3', label: 'Q3 (Oct-Dec)' },
  { value: 'Q4', label: 'Q4 (Jan-Mar)' },
];

const digesters = [
  { value: 'all', label: 'All' },
  { value: 'D-01', label: 'D-01' },
  { value: 'D-02', label: 'D-02' },
  { value: 'D-03', label: 'D-03' },
];

const dataCategories = [
  { value: 'all', label: 'All Categories' },
  { value: 'feed', label: 'Feed Data' },
  { value: 'digester', label: 'Digester Performance' },
  { value: 'biogas', label: 'Biogas Quality' },
  { value: 'cbg', label: 'CBG Production' },
  { value: 'separator', label: 'Separator Data' },
  { value: 'slurry', label: 'Slurry Management' },
  { value: 'power', label: 'Power Consumption' },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

const months = [
  { value: '', label: 'All Months' },
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

export default function FilterPanel({
  onApplyFilters,
  onReset,
  onExport,
  onImport,
}: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterValues>({
    singleDate: null,
    startDate: null,
    endDate: null,
    month: '',
    quarter: '',
    year: currentYear.toString(),
    digester: 'all',
    dataCategory: 'all',
  });

  const handleFilterChange = (field: keyof FilterValues, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleReset = () => {
    const resetFilters: FilterValues = {
      singleDate: null,
      startDate: null,
      endDate: null,
      month: '',
      quarter: '',
      year: currentYear.toString(),
      digester: 'all',
      dataCategory: 'all',
    };
    setFilters(resetFilters);
    onReset();
  };

  return (
    <Card sx={{ mb: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FilterListIcon sx={{ mr: 1, color: '#2879b6' }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333842' }}>Filters</Typography>
        </Box>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={2}>
            {/* Single Date Picker */}
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="Single Date"
                value={filters.singleDate}
                onChange={(date) => handleFilterChange('singleDate', date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: 'small',
                  },
                }}
              />
            </Grid>

            {/* Date Range - Start Date */}
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="Start Date"
                value={filters.startDate}
                onChange={(date) => handleFilterChange('startDate', date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: 'small',
                  },
                }}
              />
            </Grid>

            {/* Date Range - End Date */}
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="End Date"
                value={filters.endDate}
                onChange={(date) => handleFilterChange('endDate', date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: 'small',
                  },
                }}
              />
            </Grid>

            {/* Month Picker */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                size="small"
                label="Month"
                value={filters.month}
                onChange={(e) => handleFilterChange('month', e.target.value)}
              >
                {months.map((month) => (
                  <MenuItem key={month.value} value={month.value}>
                    {month.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Quarter Selector */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                size="small"
                label="Quarter"
                value={filters.quarter}
                onChange={(e) => handleFilterChange('quarter', e.target.value)}
              >
                {quarters.map((quarter) => (
                  <MenuItem key={quarter.value} value={quarter.value}>
                    {quarter.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Year Selector */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                size="small"
                label="Year"
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year.toString()}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Digester Filter */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                size="small"
                label="Digester"
                value={filters.digester}
                onChange={(e) => handleFilterChange('digester', e.target.value)}
              >
                {digesters.map((digester) => (
                  <MenuItem key={digester.value} value={digester.value}>
                    {digester.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Data Category Filter */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                size="small"
                label="Data Category"
                value={filters.dataCategory}
                onChange={(e) =>
                  handleFilterChange('dataCategory', e.target.value)
                }
              >
                {dataCategories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexWrap: 'wrap',
                  mt: 1,
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<FilterListIcon />}
                  onClick={handleApply}
                  sx={{
                    whiteSpace: 'nowrap',
                    backgroundColor: '#2879b6',
                    '&:hover': { backgroundColor: '#235EAC' },
                  }}
                >
                  Apply Filters
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<RestartAltIcon />}
                  onClick={handleReset}
                  sx={{
                    whiteSpace: 'nowrap',
                    borderColor: '#58595B',
                    color: '#58595B',
                    '&:hover': {
                      borderColor: '#333842',
                      backgroundColor: 'rgba(88, 89, 91, 0.04)',
                    },
                  }}
                >
                  Reset Filters
                </Button>
                <Button
                  variant="contained"
                  startIcon={<FileDownloadIcon />}
                  onClick={onExport}
                  sx={{
                    whiteSpace: 'nowrap',
                    backgroundColor: '#7dc244',
                    '&:hover': { backgroundColor: '#139B49' },
                  }}
                >
                  Export Excel
                </Button>
                <Button
                  variant="contained"
                  startIcon={<FileUploadIcon />}
                  onClick={onImport}
                  sx={{
                    whiteSpace: 'nowrap',
                    backgroundColor: '#ee6a31',
                    '&:hover': { backgroundColor: '#F59E21' },
                  }}
                >
                  Import Excel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
}

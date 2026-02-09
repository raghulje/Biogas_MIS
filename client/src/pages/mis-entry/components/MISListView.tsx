
import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Tooltip,
  IconButton,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  FileUpload as ImportIcon,
  FileDownload as ExportIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MISEntry } from '../../../mocks/misEntries';
import Slider from '@mui/material/Slider'; // Ensure Slide is imported
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function displayStatus(status: string | undefined): string {
  if (!status || typeof status !== 'string') return 'Draft';
  const s = status.toLowerCase();
  if (s === 'approved') return 'Approved';
  if (s === 'submitted' || s === 'under_review') return 'Submitted';
  if (s === 'rejected') return 'Rejected';
  if (s === 'deleted') return 'Deleted';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

interface MISListViewProps {
  entries: MISEntry[];
  onCreateNew: () => void;
  onEdit: (entry: MISEntry) => void;
  onView: (entry: MISEntry) => void;
  onDelete: (entry: MISEntry) => void;
  onImportSuccess?: () => void;
}

export default function MISListView({
  entries,
  onCreateNew,
  onEdit,
  onView,
  onDelete,
  onImportSuccess,
}: MISListViewProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<MISEntry | null>(null);
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const { misService } = await import('../../../services/misService');
      await misService.importEntries(file);
      alert('Data imported successfully!');
      onImportSuccess?.();
    } catch (error: any) {
      console.error(error);
      alert('Import failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setImporting(false);
      event.target.value = '';
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const { misService } = await import('../../../services/misService');
      const params: Record<string, string> = {};
      if (startDate) params.startDate = startDate.toISOString().slice(0, 10);
      if (endDate) params.endDate = endDate.toISOString().slice(0, 10);
      if (statusFilter !== 'All') params.status = statusFilter.toLowerCase();
      const blob = await misService.exportEntries(params);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mis_entries_export_${new Date().toISOString().slice(0, 10)}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error(error);
      alert('Export failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setExporting(false);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const { misService } = await import('../../../services/misService');
      const blob = await misService.getImportTemplate();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'MIS_Import_Template.xlsx';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error(error);
      alert('Failed to download template: ' + (error.response?.data?.message || error.message));
    }
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      String(entry.id).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.createdBy && String(entry.createdBy).toLowerCase().includes(searchQuery.toLowerCase()));
    const entryStatusDisplay = displayStatus(entry.status);
    const matchesStatus = statusFilter === 'All' || entryStatusDisplay === statusFilter;
    const entryDate = new Date(entry.date);
    const matchesDateRange =
      (!startDate || entryDate >= startDate) && (!endDate || entryDate <= endDate);
    return matchesSearch && matchesStatus && matchesDateRange;
  });

  const handleDeleteClick = (entry: MISEntry) => {
    setEntryToDelete(entry);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (entryToDelete) {
      onDelete(entryToDelete);
      setDeleteDialogOpen(false);
      setEntryToDelete(null);
    }
  };

  const getStatusColor = (status: string) => {
    const s = (status || '').toLowerCase();
    if (s === 'submitted' || s === 'under_review') return { bg: 'rgba(40, 121, 182, 0.1)', color: '#2879b6' };
    if (s === 'approved') return { bg: 'rgba(125, 194, 68, 0.1)', color: '#7dc244' };
    if (s === 'draft') return { bg: 'rgba(245, 158, 33, 0.1)', color: '#F59E21' };
    if (s === 'rejected') return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
    if (s === 'deleted') return { bg: 'rgba(88, 89, 91, 0.2)', color: '#58595B' };
    return { bg: 'rgba(88, 89, 91, 0.1)', color: '#58595B' };
  };

  return (
    <Box className="aos-fade-up">
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#2879b6' }}>
          MIS Entry Records
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            startIcon={<ExportIcon />}
            onClick={handleDownloadTemplate}
            sx={{
              textTransform: 'none',
              borderRadius: '12px',
              borderColor: '#2879b6',
              color: '#2879b6',
              fontWeight: 600,
              px: 3,
              py: 1.2,
            }}
          >
            Download Template
          </Button>
          <input
            type="file"
            id="import-excel"
            style={{ display: 'none' }}
            accept=".xlsx, .xls"
            onChange={handleImport}
          />
          <label htmlFor="import-excel">
            <Button
              component="span"
              variant="contained"
              startIcon={importing ? <CircularProgress size={20} /> : <ImportIcon />}
              disabled={importing}
              className="btn-gradient-primary"
              sx={{
                textTransform: 'none',
                borderRadius: '12px',
                px: 3,
                py: 1.2,
                borderColor: '#2879b6',
                fontWeight: 600,
              }}
            >
              {importing ? 'Importing…' : 'Import'}
            </Button>
          </label>
          <Button
            variant="contained"
            startIcon={exporting ? <CircularProgress size={20} /> : <ExportIcon />}
            onClick={handleExport}
            disabled={exporting || entries.length === 0}
            sx={{
              textTransform: 'none',
              borderRadius: '12px',
              px: 3,
              py: 1.2,
              backgroundColor: '#58595B',
              color: '#fff',
              fontWeight: 600,
              '&:hover': { backgroundColor: '#333842' },
            }}
          >
            {exporting ? 'Exporting…' : 'Export'}
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onCreateNew}
            className="btn-gradient-success"
            sx={{
              textTransform: 'none',
              borderRadius: '12px',
              px: 3,
              py: 1.2,
              color: '#fff',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            Create New Entry
          </Button>
        </Box>
      </Box>

      {/* Filter Section */}
      <Card
        className="glass-card hover-lift aos-fade-up aos-delay-100"
        sx={{ mb: 3, borderRadius: '20px', overflow: 'hidden' }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
            <FilterIcon sx={{ color: '#2879b6' }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333842' }}>
              Filter Records
            </Typography>
          </Box>
          <Grid container spacing={2.5}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search by ID or Creator..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#58595B' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255,255,255,0.8)',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                fullWidth
                select
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255,255,255,0.8)',
                  },
                }}
              >
                <MenuItem value="All">All Status</MenuItem>
                <MenuItem value="Draft">Draft</MenuItem>
                <MenuItem value="Submitted">Submitted</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={2.5}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="From Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: {
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          backgroundColor: 'rgba(255,255,255,0.8)',
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={2.5}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="To Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: {
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          backgroundColor: 'rgba(255,255,255,0.8)',
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={1}>
              <Tooltip title="Reset Filters">
                <IconButton
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('All');
                    setStartDate(null);
                    setEndDate(null);
                  }}
                  sx={{
                    width: '100%',
                    height: '56px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(238, 106, 49, 0.1)',
                    color: '#ee6a31',
                    '&:hover': {
                      backgroundColor: 'rgba(238, 106, 49, 0.2)',
                    },
                  }}
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Records Table (Desktop) */}
      <Card
        className="glass-card-strong aos-fade-up aos-delay-200"
        sx={{
          borderRadius: '20px',
          overflow: 'hidden',
          display: { xs: 'none', md: 'block' } // Hide on mobile
        }}
      >
        <TableContainer sx={{ maxHeight: '60vh' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: '#2879b6', fontSize: '0.95rem', bgcolor: '#f8f9fa' }}>
                  Entry ID
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2879b6', fontSize: '0.95rem', bgcolor: '#f8f9fa' }}>
                  Date
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2879b6', fontSize: '0.95rem', bgcolor: '#f8f9fa' }}>
                  Created By
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2879b6', fontSize: '0.95rem', bgcolor: '#f8f9fa' }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2879b6', fontSize: '0.95rem', bgcolor: '#f8f9fa' }}>
                  CBG Produced
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2879b6', fontSize: '0.95rem', bgcolor: '#f8f9fa' }}>
                  Total Biogas
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 700, color: '#2879b6', fontSize: '0.95rem', bgcolor: '#f8f9fa' }}
                  align="center"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEntries.map((entry) => {
                const statusColors = getStatusColor(entry.status);
                return (
                  <TableRow
                    key={entry.id}
                    className="hover-lift"
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': { backgroundColor: 'rgba(40, 121, 182, 0.03)' },
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600, color: '#333842' }}>{entry.id}</TableCell>
                    <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                    <TableCell>{entry.createdBy}</TableCell>
                    <TableCell>
                      <Chip
                        label={displayStatus(entry.status)}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          backgroundColor: statusColors.bg,
                          color: statusColors.color,
                          borderRadius: '8px',
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {entry.compressedBiogas?.produced ?? 0} kg
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {entry.rawBiogas?.totalRawBiogas ?? 0} m³
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => onView(entry)}
                            sx={{
                              color: '#2879b6',
                              backgroundColor: 'rgba(40, 121, 182, 0.1)',
                              borderRadius: '10px',
                              '&:hover': { backgroundColor: 'rgba(40, 121, 182, 0.2)' },
                            }}
                          >
                            <ViewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Entry">
                          <IconButton
                            size="small"
                            onClick={() => onEdit(entry)}
                            sx={{
                              color: '#7dc244',
                              backgroundColor: 'rgba(125, 194, 68, 0.1)',
                              borderRadius: '10px',
                              '&:hover': { backgroundColor: 'rgba(125, 194, 68, 0.2)' },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Entry">
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(entry)}
                            sx={{
                              color: '#ee6a31',
                              backgroundColor: 'rgba(238, 106, 49, 0.1)',
                              borderRadius: '10px',
                              '&:hover': { backgroundColor: 'rgba(238, 106, 49, 0.2)' },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredEntries.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                    <Typography variant="body1" sx={{ color: '#58595B' }}>
                      No records found matching your criteria
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Mobile Card List View */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 2 }}>
        {filteredEntries.map((entry) => {
          const statusColors = getStatusColor(entry.status);
          return (
            <Card key={entry.id} className="glass-card" sx={{ borderRadius: '16px', overflow: 'visible' }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2879b6' }}>
                      #{entry.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(entry.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Chip
                    label={displayStatus(entry.status)}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      backgroundColor: statusColors.bg,
                      color: statusColors.color,
                      borderRadius: '8px',
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">CBG Produced:</Typography>
                    <Typography variant="body2" fontWeight={600}>{entry.compressedBiogas?.produced ?? 0} kg</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Total Biogas:</Typography>
                    <Typography variant="body2" fontWeight={600}>{entry.rawBiogas?.totalRawBiogas ?? 0} m³</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Created By:</Typography>
                    <Typography variant="body2" fontWeight={500}>{entry.createdBy}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<ViewIcon />}
                    onClick={() => onView(entry)}
                    sx={{ borderRadius: '10px', borderColor: '#2879b6', color: '#2879b6' }}
                  >
                    View
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(entry)}
                    sx={{ borderRadius: '10px', borderColor: '#7dc244', color: '#7dc244' }}
                  >
                    Edit
                  </Button>
                  <IconButton
                    onClick={() => handleDeleteClick(entry)}
                    sx={{
                      borderRadius: '10px',
                      color: '#ee6a31',
                      border: '1px solid rgba(238, 106, 49, 0.5)'
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          );
        })}
        {filteredEntries.length === 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, textAlign: 'center' }}>
            <Typography color="textSecondary">No records found matching your criteria</Typography>
          </Box>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        TransitionComponent={Transition}
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : '20px',
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, color: '#ee6a31' }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete entry <strong>{entryToDelete?.id}</strong>? This action
            cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{ textTransform: 'none', color: '#58595B', borderRadius: '12px' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={confirmDelete}
            sx={{
              textTransform: 'none',
              backgroundColor: '#ee6a31',
              borderRadius: '12px',
              whiteSpace: 'nowrap',
              '&:hover': { backgroundColor: '#d55a28' },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

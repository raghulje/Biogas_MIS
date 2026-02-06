
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

interface MISListViewProps {
  entries: MISEntry[];
  onCreateNew: () => void;
  onEdit: (entry: MISEntry) => void;
  onView: (entry: MISEntry) => void;
  onDelete: (entry: MISEntry) => void;
}

export default function MISListView({
  entries,
  onCreateNew,
  onEdit,
  onView,
  onDelete,
}: MISListViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<MISEntry | null>(null);
  const [importing, setImporting] = useState(false);

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const { misService } = await import('../../../services/misService');
      await misService.importEntries(file);
      alert('Data imported successfully!');
      window.location.reload(); // Refresh to see new entries
    } catch (error: any) {
      console.error(error);
      alert('Import failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setImporting(false);
      event.target.value = '';
    }
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      String(entry.id).toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || entry.status === statusFilter;
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
    switch (status) {
      case 'Submitted':
        return { bg: 'rgba(40, 121, 182, 0.1)', color: '#2879b6' };
      case 'Approved':
        return { bg: 'rgba(125, 194, 68, 0.1)', color: '#7dc244' };
      case 'Draft':
        return { bg: 'rgba(245, 158, 33, 0.1)', color: '#F59E21' };
      default:
        return { bg: 'rgba(88, 89, 91, 0.1)', color: '#58595B' };
    }
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
        <Box sx={{ display: 'flex', gap: 2 }}>
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
              variant="outlined"
              startIcon={importing ? <CircularProgress size={20} /> : <ImportIcon />}
              disabled={importing}
              sx={{
                textTransform: 'none',
                borderRadius: '12px',
                px: 3,
                py: 1.2,
                color: '#2879b6',
                borderColor: '#2879b6',
                fontWeight: 600,
              }}
            >
              Import Data
            </Button>
          </label>
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

      {/* Records Table */}
      <Card
        className="glass-card-strong aos-fade-up aos-delay-200"
        sx={{ borderRadius: '20px', overflow: 'hidden' }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background:
                    'linear-gradient(135deg, rgba(40, 121, 182, 0.1) 0%, rgba(125, 194, 68, 0.1) 100%)',
                }}
              >
                <TableCell sx={{ fontWeight: 700, color: '#2879b6', fontSize: '0.95rem' }}>
                  Entry ID
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2879b6', fontSize: '0.95rem' }}>
                  Date
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2879b6', fontSize: '0.95rem' }}>
                  Created By
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2879b6', fontSize: '0.95rem' }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2879b6', fontSize: '0.95rem' }}>
                  CBG Produced
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2879b6', fontSize: '0.95rem' }}>
                  Total Biogas
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 700, color: '#2879b6', fontSize: '0.95rem' }}
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
                        label={entry.status}
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
                      {entry.compressedBiogas.produced} kg
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {entry.rawBiogas.totalRawBiogas} m³
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: '20px',
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

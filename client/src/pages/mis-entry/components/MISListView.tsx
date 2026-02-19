
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
  Checkbox,
  TablePagination,
  Zoom,
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
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  IndeterminateCheckBox as IndeterminateCheckBoxIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
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
import MESSAGES from '../../../utils/messages';

import { useAuth } from '../../../context/AuthContext';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Zoom ref={ref} {...props} />;
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
  onBulkDelete?: (ids: string[]) => Promise<{ deleted: number; failed: number } | null>;
  onImportSuccess?: () => void;
  onImportError?: (err: any) => void;
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
  // Parent component will handle notifications for import/export/delete results.
  const { hasPermission } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<MISEntry | null>(null);
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const canCreate = hasPermission('mis_entry', 'create');
  const canUpdate = hasPermission('mis_entry', 'update');
  const canImport = hasPermission('mis_entry', 'import');
  const canExport = hasPermission('mis_entry', 'export');
  const canDelete = hasPermission('mis_entry', 'delete');

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const { misService } = await import('../../../services/misService');
      await misService.importEntries(file);
      onImportSuccess?.();
    } catch (error: any) {
      console.error(error);
      onImportError?.(error);
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
      // Parent owns notifications; do not show snackbar here.
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
      // Parent owns notifications; do not show snackbar here.
    }
  };

  const isApproverOnly = hasPermission('mis_entry', 'approve') && !hasPermission('mis_entry', 'update') && !hasPermission('mis_entry', 'create');

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      String(entry.id).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.createdBy && String(entry.createdBy).toLowerCase().includes(searchQuery.toLowerCase()));
    const entryStatusDisplay = displayStatus(entry.status);
    const matchesStatus = statusFilter === 'All' || entryStatusDisplay === statusFilter;
    const entryDate = new Date(entry.date);
    const matchesDateRange =
      (!startDate || entryDate >= startDate) && (!endDate || entryDate <= endDate);
    const isDraft = String(entry.status || '').toLowerCase() === 'draft';
    if (isApproverOnly && isDraft) return false; // approvers should not see drafts
    return matchesSearch && matchesStatus && matchesDateRange;
  });
  const pageCount = Math.max(1, Math.ceil(filteredEntries.length / rowsPerPage));
  const paginatedEntries = filteredEntries.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const handleDeleteClick = (entry: MISEntry) => {
    setEntryToDelete(entry);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!entryToDelete) return;
    try {
      await Promise.resolve(onDelete(entryToDelete));
    } catch (error: any) {
      console.error('Delete failed:', error);
      // Parent will handle error notifications.
    } finally {
      setDeleteDialogOpen(false);
      setEntryToDelete(null);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIds = new Set(filteredEntries.map(entry => entry.id));
      setSelectedIds(allIds);
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleBulkDelete = () => {
    setBulkDeleteDialogOpen(true);
  };

  const handleBulkDeleteConfirm = () => {
    (async () => {
      const ids = Array.from(selectedIds);
      try {
        if (typeof onBulkDelete === 'function') {
          await onBulkDelete(ids);
        } else {
          // Fallback: call single-delete handler for each id (no snackbars here)
          for (const id of ids) {
            const entry = entries.find(e => e.id === id);
            if (!entry) continue;
            try {
              // parent onDelete is expected to handle notifications
              // we await to keep order and avoid overwhelming backend
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              await Promise.resolve(onDelete(entry)).catch(() => {});
            } catch (err) {
              console.error('Bulk delete fallback failed for', id, err);
            }
          }
        }
      } finally {
        setSelectedIds(new Set());
        setBulkDeleteDialogOpen(false);
      }
    })();
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
        className="aos-fade-down aos-delay-100"
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
          {canExport && (
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
          )}
          {canImport && (
            <>
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
            </>
          )}
          {canExport && (
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
          )}
          {canCreate && (
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
          )}
        </Box>
      </Box>

      {/* Bulk Actions Toolbar (disabled) */}
      {/* 
      {selectedIds.size > 0 && (
        <Card
          className="glass-card aos-fade-down"
          sx={{
            mb: 2,
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(40, 121, 182, 0.1) 0%, rgba(125, 194, 68, 0.1) 100%)',
            border: '2px solid #2879b6',
          }}
        >
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#2879b6' }}>
                {selectedIds.size} {selectedIds.size === 1 ? 'entry' : 'entries'} selected
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => setSelectedIds(new Set())}
                  sx={{
                    textTransform: 'none',
                    borderRadius: '12px',
                    borderColor: '#58595B',
                    color: '#58595B',
                    fontWeight: 600,
                  }}
                >
                  Clear Selection
                </Button>
                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  onClick={handleBulkDelete}
                  sx={{
                    textTransform: 'none',
                    borderRadius: '12px',
                    backgroundColor: '#ee6a31',
                    color: '#fff',
                    fontWeight: 600,
                    '&:hover': { backgroundColor: '#d45a21' },
                  }}
                >
                  Delete Selected
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
      */}

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
                {/* Multi-select header checkbox hidden for now */}
                {/* <TableCell padding="checkbox" sx={{ bgcolor: '#f8f9fa' }}>
                  <Checkbox
                    indeterminate={selectedIds.size > 0 && selectedIds.size < filteredEntries.length}
                    checked={filteredEntries.length > 0 && selectedIds.size === filteredEntries.length}
                    onChange={handleSelectAll}
                    sx={{
                      color: '#2879b6',
                      '&.Mui-checked': { color: '#2879b6' },
                      '&.MuiCheckbox-indeterminate': { color: '#2879b6' },
                    }}
                  />
                </TableCell> */}
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
              {paginatedEntries.map((entry) => {
                const statusColors = getStatusColor(entry.status);
                return (
                  <TableRow
                    key={entry.id}
                    className="hover-lift"
                    sx={{
                      transition: 'all 0.3s ease',
                      backgroundColor: selectedIds.has(entry.id) ? 'rgba(40, 121, 182, 0.05)' : 'transparent',
                      '&:hover': {
                        backgroundColor: selectedIds.has(entry.id) ? 'rgba(40, 121, 182, 0.1)' : 'rgba(40, 121, 182, 0.03)',
                      },
                    }}
                  >
                    {/* Row multi-select checkbox hidden for now */}
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedIds.has(entry.id)}
                        onChange={() => handleSelectOne(entry.id)}
                        sx={{
                          color: '#2879b6',
                          '&.Mui-checked': { color: '#2879b6' },
                        }}
                      />
                    </TableCell> */}
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
                        {canUpdate && (
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
                        )}
                        {canDelete && (
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
                        )}
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <TablePagination
            component="div"
            count={filteredEntries.length}
            page={page}
            onPageChange={(_e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[]}
          />
        </Box>
      </Card>

      {/* Mobile Card List View */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 2 }}>
        {paginatedEntries.map((entry) => {
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
                  {canUpdate && (
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<EditIcon />}
                      onClick={() => onEdit(entry)}
                      sx={{ borderRadius: '10px', borderColor: '#7dc244', color: '#7dc244' }}
                    >
                      Edit
                    </Button>
                  )}
                  {canDelete && (
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
                  )}
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
        {/* Mobile pagination controls */}
        {filteredEntries.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 2 }}>
            <IconButton
              onClick={() => { setPage((p) => Math.max(0, p - 1)); }}
              disabled={page === 0}
              aria-label="previous page"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="body2">Page {page + 1} of {pageCount}</Typography>
            <IconButton
              onClick={() => { setPage((p) => Math.min(pageCount - 1, p + 1)); }}
              disabled={page >= pageCount - 1}
              aria-label="next page"
            >
              <ArrowForwardIcon />
            </IconButton>
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
        <DialogContent className="aos-fade-up">
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

      {/* Bulk Delete Confirmation Dialog */}
      <Dialog
        open={bulkDeleteDialogOpen}
        onClose={() => setBulkDeleteDialogOpen(false)}
        TransitionComponent={Transition}
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : '20px',
            minWidth: isMobile ? '100%' : '400px',
          },
        }}
      >
        <DialogTitle
          sx={{
            background: 'linear-gradient(135deg, rgba(238, 106, 49, 0.1) 0%, rgba(238, 106, 49, 0.05) 100%)',
            fontWeight: 700,
            color: '#ee6a31',
            borderBottom: '1px solid rgba(238, 106, 49, 0.2)',
          }}
        >
          Confirm Bulk Delete
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }} className="aos-fade-up">
          <Typography variant="body1" sx={{ color: '#333842', mb: 2 }}>
            Are you sure you want to delete <strong>{selectedIds.size}</strong> selected {selectedIds.size === 1 ? 'entry' : 'entries'}?
          </Typography>
          <Typography variant="body2" sx={{ color: '#58595B' }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button
            onClick={() => setBulkDeleteDialogOpen(false)}
            sx={{ textTransform: 'none', color: '#58595B', borderRadius: '12px' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleBulkDeleteConfirm}
            sx={{
              textTransform: 'none',
              backgroundColor: '#ee6a31',
              borderRadius: '12px',
              whiteSpace: 'nowrap',
              '&:hover': { backgroundColor: '#d55a28' },
            }}
          >
            Delete {selectedIds.size} {selectedIds.size === 1 ? 'Entry' : 'Entries'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

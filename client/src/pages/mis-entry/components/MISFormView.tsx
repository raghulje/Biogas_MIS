
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Save as SaveIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import type { MISEntry } from '../../../mocks/misEntries';
import RawMaterialsSection from './sections/RawMaterialsSection';
import FeedMixingTankSection from './sections/FeedMixingTankSection';
import DigestersSection from './sections/DigestersSection';
import SLSMachineSection from './sections/SLSMachineSection';
import BiogasSection from './sections/BiogasSection';
import OtherSections from './sections/OtherSections';
import { misService } from '../../../services/misService';
import { useSnackbar } from 'notistack';
import MESSAGES from '../../../utils/messages';
import { useAuth } from '../../../context/AuthContext';

interface Digester {
  id: number;
  name: string;
  feeding: { totalSlurryFeed: number; avgTs: number; avgVs: number };
  discharge: { totalSlurryOut: number; avgTs: number; avgVs: number };
  characteristics: {
    lignin: number;
    vfa: number;
    alkalinity: number;
    vfaAlkRatio: number;
    ash: number;
    density: number;
    ph: number;
    temperature: number;
    pressure: number;
    slurryLevel: number;
  };
  health: {
    hrt: number;
    vsDestruction: number;
    olr: number;
    balloonLevel: number;
    agitatorCondition: string;
    foamingLevel: number;
  };
}

interface MISFormViewProps {
  viewMode: 'create' | 'edit' | 'view';
  selectedEntry: MISEntry | null;
  digesters: Digester[];
  onBackToList: () => void;
  onAddDigester: () => void;
  onRemoveDigester: (id: number) => void;
}


const ProgressiveRender = ({ children, delay }: { children: React.ReactNode; delay: number }) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return ready ? <>{children}</> : null;
};

export default function MISFormView({
  viewMode,
  selectedEntry,
  digesters, // We might ignore this prop and use form state
  onBackToList,
  onAddDigester, // We might ignore this prop
  onRemoveDigester, // We might ignore this prop
}: MISFormViewProps) {
  const isReadOnly = viewMode === 'view';
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const defaultCreateValues = {
    date: new Date().toISOString().split('T')[0],
    shift: 'General',
    digesters: [
      { id: 1, name: 'Digester 01', feeding: {}, discharge: {}, characteristics: {}, health: {} },
      { id: 2, name: 'Digester 02', feeding: {}, discharge: {}, characteristics: {}, health: {} },
      { id: 3, name: 'Digester 03', feeding: {}, discharge: {}, characteristics: {}, health: {} }
    ],
    rawMaterials: {},
    feedMixingTank: {},
    slsMachine: {},
    rawBiogas: {},
    rawBiogasQuality: {},
    compressedBiogas: {},
    cbgSales: [],
    compressors: {},
    fertilizer: {},
    utilities: {},
    manpower: {},
    plantAvailability: {},
    hse: {},
    remarks: ''
  };

  const methods = useForm<any>({
    defaultValues: defaultCreateValues,
    shouldUnregister: false
  });

  useEffect(() => {
    if (viewMode === 'create' && !selectedEntry) {
      methods.reset(defaultCreateValues);
    } else if (selectedEntry) {
      methods.reset(selectedEntry);
    }
  }, [viewMode, selectedEntry]);

  const { hasPermission } = useAuth();
  const canSave = (viewMode === 'create' && hasPermission('mis_entry', 'create')) ||
    (viewMode === 'edit' && hasPermission('mis_entry', 'update'));
  const canApprove = hasPermission('mis_entry', 'approve');

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (!canSave) {
      setError('You do not have permission to save.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const payload = { ...data, status: 'submitted' };
      if (viewMode === 'edit' && selectedEntry) {
        await misService.updateEntry(Number(selectedEntry.id), payload);
        await misService.submitEntry(Number(selectedEntry.id));
      enqueueSnackbar(MESSAGES.ENTRY_UPDATED_SUBMITTED, { variant: 'success' });
      } else {
        const res = await misService.createEntry(payload);
        await misService.submitEntry(Number(res.id));
      enqueueSnackbar(MESSAGES.ENTRY_CREATED_SUBMITTED, { variant: 'success' });
      }
      onBackToList();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to submit entry');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!canSave) {
      setError('You do not have permission to save draft.');
      return;
    }
    const data = methods.getValues();
    setSubmitting(true);
    setError(null);
    try {
      const payload = { ...data, status: 'draft' };
      if (viewMode === 'edit' && selectedEntry) {
        await misService.updateEntry(Number(selectedEntry.id), payload);
        enqueueSnackbar(MESSAGES.DRAFT_UPDATED, { variant: 'success' });
      } else {
        await misService.createEntry(payload);
        enqueueSnackbar(MESSAGES.DRAFT_SAVED, { variant: 'success' });
      }
      onBackToList();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save draft');
    } finally {
      setSubmitting(false);
    }
  };

  const handleApprove = async () => {
    if (!selectedEntry || !canApprove) return;
    setSubmitting(true);
    try {
      await misService.approveEntry(Number(selectedEntry.id));
      enqueueSnackbar(MESSAGES.ENTRY_APPROVED, { variant: 'success' });
      onBackToList();
    } catch (err: any) {
      setError('Failed to approve entry');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!selectedEntry || !canApprove) return;
    const reason = prompt('Please enter rejection reason:');
    if (reason === null) return;
    setSubmitting(true);
    try {
      await misService.rejectEntry(Number(selectedEntry.id), reason);
      enqueueSnackbar(MESSAGES.ENTRY_REJECTED, { variant: 'info' });
      onBackToList();
    } catch (err: any) {
      setError('Failed to reject entry');
    } finally {
      setSubmitting(false);
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
    <FormProvider {...methods}>
      <Box className="aos-fade-up" component="form" onSubmit={methods.handleSubmit(onSubmit)} sx={{ position: 'relative' }}>
        {submitting && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1300,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(2px)',
            }}
          >
            <Box
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 2,
                p: 3,
                boxShadow: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <CircularProgress size={44} sx={{ color: '#2879b6' }} />
              <Typography variant="body1" fontWeight={600} color="text.primary">
                Saving…
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Please wait, do not close the page.
              </Typography>
            </Box>
          </Box>
        )}
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={onBackToList}
              sx={{
                backgroundColor: 'rgba(40, 121, 182, 0.1)',
                borderRadius: '12px',
                '&:hover': { backgroundColor: 'rgba(40, 121, 182, 0.2)' },
              }}
            >
              <ArrowBackIcon sx={{ color: '#2879b6' }} />
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#2879b6' }}>
              {viewMode === 'create'
                ? 'Create New MIS Entry'
                : viewMode === 'edit'
                  ? `Edit: ${selectedEntry?.id}`
                  : `View: ${selectedEntry?.id}`}
            </Typography>
            {selectedEntry && (
              <Chip
                label={selectedEntry.status}
                size="small"
                sx={{
                  fontWeight: 600,
                  backgroundColor: getStatusColor(selectedEntry.status).bg,
                  color: getStatusColor(selectedEntry.status).color,
                  borderRadius: '8px',
                }}
              />
            )}
          </Box>
          {!isReadOnly ? (
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, flexWrap: 'wrap' }}>
              {canSave && (
                <>
                  <Button
                    variant="outlined"
                    startIcon={<SaveIcon />}
                    className="btn-gradient-warning"
                    onClick={handleSaveDraft}
                    disabled={submitting}
                    sx={{
                      textTransform: 'none',
                      borderRadius: '12px',
                      border: 'none',
                      color: '#fff',
                      px: 3,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Save Draft
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={submitting ? <CircularProgress size={20} /> : <SendIcon />}
                    type="submit"
                    disabled={submitting}
                    className="btn-gradient-success"
                    sx={{
                      textTransform: 'none',
                      borderRadius: '12px',
                      color: '#fff',
                      px: 3,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Submit
                  </Button>
                </>
              )}
            </Box>
          ) : (
            selectedEntry && String(selectedEntry.status || '').toLowerCase() === 'submitted' && canApprove && (
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleApprove}
                  disabled={submitting}
                  sx={{ borderRadius: '12px', px: 3 }}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleReject}
                  disabled={submitting}
                  sx={{ borderRadius: '12px', px: 3 }}
                >
                  Reject
                </Button>
              </Box>
            )
          )}
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* Date Field - Mandatory for Create */}
        {viewMode === 'create' && (
          <Box sx={{ mb: 2, p: 2, bgcolor: '#fff', borderRadius: 2 }}>
            <Typography variant="subtitle2">Date</Typography>
            <input type="date" {...methods.register('date', { required: true })} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', width: '100%', height: '44px' }} />
          </Box>
        )}

        <RawMaterialsSection isReadOnly={isReadOnly} />
        <ProgressiveRender delay={100}>
          <FeedMixingTankSection isReadOnly={isReadOnly} />
        </ProgressiveRender>
        <ProgressiveRender delay={200}>
          <DigestersSection isReadOnly={isReadOnly} />
        </ProgressiveRender>
        <ProgressiveRender delay={300}>
          <SLSMachineSection isReadOnly={isReadOnly} />
        </ProgressiveRender>
        <ProgressiveRender delay={400}>
          <BiogasSection isReadOnly={isReadOnly} />
        </ProgressiveRender>
        <ProgressiveRender delay={500}>
          <OtherSections isReadOnly={isReadOnly} />
        </ProgressiveRender>

        {!isReadOnly && (
          <Box
            className="mobile-sticky-footer"
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'flex-end',
              flexWrap: 'wrap',
              mt: 3,
              bgcolor: { xs: 'rgba(255,255,255,0.9)', md: 'transparent' },
              backdropFilter: { xs: 'blur(10px)', md: 'none' },
              borderTop: { xs: '1px solid rgba(0,0,0,0.1)', md: 'none' },
              mx: { xs: -2, md: 0 },
              px: { xs: 2, md: 0 },
              py: { xs: 2, md: 0 },
            }}
          >
            {canSave && (
              <>
                <Button
                  variant="outlined"
                  startIcon={<SaveIcon />}
                  className="btn-gradient-warning"
                  onClick={handleSaveDraft}
                  disabled={submitting}
                  sx={{
                    textTransform: 'none',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    px: 3,
                    whiteSpace: 'nowrap',
                    flex: { xs: 1, md: 'initial' },
                    display: { xs: 'flex', md: 'none' } // Only show at bottom on mobile (since top hidden)
                  }}
                >
                  Save Draft
                </Button>
                <Button
                  variant="contained"
                  startIcon={submitting ? <CircularProgress size={20} /> : <SendIcon />}
                  type="submit"
                  disabled={submitting}
                  className="btn-gradient-success"
                  size="large"
                  sx={{
                    textTransform: 'none',
                    borderRadius: '12px',
                    px: 4,
                    color: '#fff',
                    whiteSpace: 'nowrap',
                    flex: { xs: 1, md: 'initial' },
                  }}
                >
                  Submit
                </Button>
              </>
            )}
          </Box>
        )}
      </Box>
    </FormProvider>
  );
}

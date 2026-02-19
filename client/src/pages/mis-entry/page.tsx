import { useState, useEffect, lazy, Suspense } from 'react';
import { Layout } from '../../components/Layout';
import MISListView from './components/MISListView';
import { misService } from '../../services/misService';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import MESSAGES from '../../utils/messages';

const MISFormView = lazy(() => import('./components/MISFormView'));

// Define loose type for now to avoid strict type errors with mock overrides
type MISEntry = any;

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

type ViewMode = 'list' | 'create' | 'edit' | 'view';

const defaultDigesters: Digester[] = [
  {
    id: 1,
    name: 'Digester 01',
    feeding: { totalSlurryFeed: 0, avgTs: 0, avgVs: 0 },
    discharge: { totalSlurryOut: 0, avgTs: 0, avgVs: 0 },
    characteristics: { lignin: 0, vfa: 0, alkalinity: 0, vfaAlkRatio: 0, ash: 0, density: 0, ph: 0, temperature: 0, pressure: 0, slurryLevel: 0 },
    health: { hrt: 0, vsDestruction: 0, olr: 0, balloonLevel: 0, agitatorCondition: 'OK', foamingLevel: 0 },
  },
  {
    id: 2,
    name: 'Digester 02',
    feeding: { totalSlurryFeed: 0, avgTs: 0, avgVs: 0 },
    discharge: { totalSlurryOut: 0, avgTs: 0, avgVs: 0 },
    characteristics: { lignin: 0, vfa: 0, alkalinity: 0, vfaAlkRatio: 0, ash: 0, density: 0, ph: 0, temperature: 0, pressure: 0, slurryLevel: 0 },
    health: { hrt: 0, vsDestruction: 0, olr: 0, balloonLevel: 0, agitatorCondition: 'OK', foamingLevel: 0 },
  },
  {
    id: 3,
    name: 'Digester 03',
    feeding: { totalSlurryFeed: 0, avgTs: 0, avgVs: 0 },
    discharge: { totalSlurryOut: 0, avgTs: 0, avgVs: 0 },
    characteristics: { lignin: 0, vfa: 0, alkalinity: 0, vfaAlkRatio: 0, ash: 0, density: 0, ph: 0, temperature: 0, pressure: 0, slurryLevel: 0 },
    health: { hrt: 0, vsDestruction: 0, olr: 0, balloonLevel: 0, agitatorCondition: 'OK', foamingLevel: 0 },
  },
];

export default function MISEntryPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [entries, setEntries] = useState<MISEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<MISEntry | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [digesters, setDigesters] = useState<Digester[]>(defaultDigesters);

  useEffect(() => {
    if (viewMode === 'list') {
      fetchEntries();
    }
  }, [viewMode]);

  const fetchEntries = async () => {
    try {
      const data = await misService.getEntries();
      setEntries(data);
    } catch (error) {
      console.error('Failed to fetch entries', error);
    }
  };

  const handleEdit = async (entry: MISEntry) => {
    setLoadingDetails(true);
    try {
      const fullEntry = await misService.getEntryById(entry.id);
      setSelectedEntry(fullEntry);
      setViewMode('edit');
    } catch (e) {
      console.error(e);
      enqueueSnackbar(MESSAGES.FAILED_LOAD_ENTRY_DETAILS, { variant: 'error' });
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleView = async (entry: MISEntry) => {
    setLoadingDetails(true);
    try {
      const fullEntry = await misService.getEntryById(entry.id);
      setSelectedEntry(fullEntry);
      setViewMode('view');
    } catch (e) {
      console.error(e);
      enqueueSnackbar(MESSAGES.FAILED_LOAD_ENTRY_DETAILS, { variant: 'error' });
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleDelete = async (entry: MISEntry) => {
    try {
      await misService.deleteEntry(entry.id);
      await fetchEntries();
      enqueueSnackbar(MESSAGES.ENTRY_DELETED, { variant: 'success' });
    } catch (error) {
      console.error('Failed to delete entry', error);
      enqueueSnackbar(MESSAGES.FAILED_DELETE_ENTRY, { variant: 'error' });
    }
  };

  const handleSubmitSuccess = async (mode: 'create' | 'edit') => {
    await fetchEntries();
    if (mode === 'create') enqueueSnackbar(MESSAGES.ENTRY_CREATED_SUBMITTED, { variant: 'success' });
    else enqueueSnackbar(MESSAGES.ENTRY_UPDATED_SUBMITTED, { variant: 'success' });
  };

  const handleDraftSaved = async (mode: 'create' | 'edit') => {
    await fetchEntries();
    if (mode === 'create') enqueueSnackbar(MESSAGES.DRAFT_SAVED, { variant: 'success' });
    else enqueueSnackbar(MESSAGES.DRAFT_UPDATED, { variant: 'success' });
  };

  const handleApproveNotify = async () => {
    await fetchEntries();
    enqueueSnackbar(MESSAGES.ENTRY_APPROVED, { variant: 'success' });
  };

  const handleRejectNotify = async () => {
    await fetchEntries();
    enqueueSnackbar(MESSAGES.ENTRY_REJECTED, { variant: 'info' });
  };
  // Bulk delete handler (called by list view). Returns deleted/failed counts.
  const handleBulkDelete = async (ids: string[]) => {
    let deleted = 0;
    let failed = 0;
    for (const id of ids) {
      try {
        await misService.deleteEntry(id);
        deleted++;
      } catch (err) {
        console.error('Bulk delete failed for', id, err);
        failed++;
      }
    }
    await fetchEntries();
    if (deleted > 0) {
      enqueueSnackbar(MESSAGES.DELETED_N_ENTRIES(deleted), { variant: 'success' });
    }
    if (failed > 0) {
      enqueueSnackbar(`${failed} entries failed to delete`, { variant: 'error' });
    }
    return { deleted, failed };
  };

  const handleCreateNew = () => {
    setSelectedEntry(null);
    setDigesters(defaultDigesters);
    setViewMode('create');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedEntry(null);
  };

  // Deprecated state handlers kept for compatibility if needed
  const addDigester = () => { };
  const removeDigester = (id: number) => { };

  const formFallback = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 320,
        gap: 2,
        bgcolor: 'rgba(255,255,255,0.9)',
        borderRadius: 2,
        p: 4,
      }}
    >
      <CircularProgress size={48} sx={{ color: '#2879b6' }} />
      <Typography variant="body1" sx={{ color: '#58595B', fontWeight: 500 }}>
        Loading form…
      </Typography>
    </Box>
  );

  return (
    <Layout>
      {loadingDetails ? (
        formFallback
      ) : viewMode === 'list' ? (
        <MISListView
          entries={entries}
          onCreateNew={handleCreateNew}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
          onImportSuccess={async () => { await fetchEntries(); enqueueSnackbar(MESSAGES.IMPORT_DATA_SUCCESS, { variant: 'success' }); }}
          onBulkDelete={handleBulkDelete}
        />
      ) : (
        <Suspense fallback={formFallback}>
          <MISFormView
            viewMode={viewMode}
            selectedEntry={selectedEntry}
            digesters={digesters}
            onBackToList={handleBackToList}
            onAddDigester={addDigester}
            onRemoveDigester={removeDigester}
          />
        </Suspense>
      )}
    </Layout>
  );
}

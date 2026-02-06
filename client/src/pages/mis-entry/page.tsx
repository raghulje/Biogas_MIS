
import { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import MISListView from './components/MISListView';
import MISFormView from './components/MISFormView';
import { misService } from '../../services/misService';

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
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [entries, setEntries] = useState<MISEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<MISEntry | null>(null);
  // We keep digesters state for legacy compatibility if components rely on it, 
  // but MISFormView now uses react-hook-form.
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
    try {
      const fullEntry = await misService.getEntryById(entry.id);
      setSelectedEntry(fullEntry);
      setViewMode('edit');
    } catch (e) {
      console.error(e);
      alert('Failed to load entry details');
    }
  };

  const handleView = async (entry: MISEntry) => {
    try {
      const fullEntry = await misService.getEntryById(entry.id);
      setSelectedEntry(fullEntry);
      setViewMode('view');
    } catch (e) {
      console.error(e);
      alert('Failed to load entry details');
    }
  };

  const handleDelete = async (entry: MISEntry) => {
    try {
      await misService.deleteEntry(entry.id);
      fetchEntries();
    } catch (error) {
      console.error('Failed to delete entry', error);
      alert('Failed to delete entry');
    }
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

  return (
    <Layout>
      {viewMode === 'list' ? (
        <MISListView
          entries={entries}
          onCreateNew={handleCreateNew}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
        />
      ) : (
        <MISFormView
          viewMode={viewMode}
          selectedEntry={selectedEntry}
          digesters={digesters}
          onBackToList={handleBackToList}
          onAddDigester={addDigester}
          onRemoveDigester={removeDigester}
        />
      )}
    </Layout>
  );
}


import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  LinearProgress,
  Alert,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { misService } from '../services/misService';
import { useSnackbar } from 'notistack';

interface ImportModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ImportModal({ open, onClose, onSuccess }: ImportModalProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [recordsImported, setRecordsImported] = useState(0);
  const [error, setError] = useState('');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setSelectedFile(file);
        setError('');
        setSuccess(false);
      } else {
        setError('Please select a valid Excel file (.xlsx or .xls)');
        setSelectedFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    try {
      setUploading(true);
      setProgress(0);
      setError('');
      setSuccess(false);

      const data = await misService.importEntries(selectedFile);

      setSuccess(true);
      setRecordsImported(data?.results?.success ?? data?.recordsImported ?? 0);
      setSelectedFile(null);

      if (onSuccess) {
        onSuccess();
      }
      enqueueSnackbar('Import completed successfully', { variant: 'success' });
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.response?.data?.error || 'Failed to import Excel file. Please try again.'
      );
      enqueueSnackbar(err.response?.data?.message || err.response?.data?.error || 'Failed to import Excel file. Please try again.', { variant: 'error' });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleClose = () => {
    if (!uploading) {
      setSelectedFile(null);
      setError('');
      setSuccess(false);
      setProgress(0);
      setRecordsImported(0);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Import Excel File
        </Typography>
        <IconButton
          onClick={handleClose}
          disabled={uploading}
          sx={{ cursor: 'pointer' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ py: 2 }}>
          {/* File Upload Area */}
          <Box
            sx={{
              border: '2px dashed #1a237e',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              backgroundColor: '#f5f5f5',
              mb: 2,
            }}
          >
            <CloudUploadIcon sx={{ fontSize: 48, color: '#1a237e', mb: 2 }} />
            <Typography variant="body1" sx={{ mb: 2 }}>
              Select an Excel file to import MIS data
            </Typography>
            <Button
              variant="contained"
              component="label"
              disabled={uploading}
              sx={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
            >
              Choose File
              <input
                type="file"
                hidden
                accept=".xlsx,.xls"
                onChange={handleFileSelect}
              />
            </Button>
          </Box>

          {/* Selected File Display */}
          {selectedFile && (
            <Box
              sx={{
                p: 2,
                backgroundColor: '#e8eaf6',
                borderRadius: 1,
                mb: 2,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Selected File:
              </Typography>
              <Typography variant="body2" sx={{ color: '#1a237e' }}>
                {selectedFile.name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#666' }}>
                Size: {(selectedFile.size / 1024).toFixed(2)} KB
              </Typography>
            </Box>
          )}

          {/* Upload Progress */}
          {uploading && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Uploading... {progress}%
              </Typography>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
          )}

          {/* Success Message */}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Import Successful!
              </Typography>
              <Typography variant="body2">
                {recordsImported} record(s) imported successfully.
              </Typography>
            </Alert>
          )}

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Instructions */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 1 }}>
              <strong>Instructions:</strong>
            </Typography>
            <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>
              • Only .xlsx and .xls files are supported
            </Typography>
            <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>
              • Ensure the Excel file follows the correct format
            </Typography>
            <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>
              • Maximum file size: 10 MB
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={handleClose}
          disabled={uploading}
          sx={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          sx={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

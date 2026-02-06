
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import axios from 'axios';

interface Permission {
  page: string;
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

const defaultPermissions: Permission[] = [
  { page: 'Dashboard', read: true, create: false, update: false, delete: false },
  { page: 'MIS Entry', read: true, create: true, update: true, delete: false },
  { page: 'Consolidated MIS View', read: true, create: false, update: false, delete: false },
  { page: 'Admin Panel', read: true, create: true, update: true, delete: true },
  { page: 'Audit Logs', read: true, create: false, update: false, delete: false },
  { page: 'Import Data', read: true, create: true, update: false, delete: false },
];

export default function RolePermissions() {
  const [permissions, setPermissions] = useState<Permission[]>(defaultPermissions);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/permissions');
      if (response.data && response.data.length > 0) {
        setPermissions(response.data);
      }
    } catch (error) {
      // Use default permissions if API fails
      console.log('Using default permissions');
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionChange = (pageIndex: number, permissionType: keyof Permission) => {
    if (permissionType === 'page') return;
    
    setPermissions((prev) =>
      prev.map((perm, index) =>
        index === pageIndex
          ? { ...perm, [permissionType]: !perm[permissionType] }
          : perm
      )
    );
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await axios.post('http://localhost:3000/permissions', { permissions });
      setMessage({ type: 'success', text: 'Permissions saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save permissions. Please try again.' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress sx={{ color: '#2879b6' }} />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#333842' }}>
          Role Permissions
        </Typography>
        <Button
          variant="contained"
          startIcon={saving ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : <SaveIcon />}
          onClick={handleSave}
          disabled={saving}
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            backgroundColor: '#7dc244',
            whiteSpace: 'nowrap',
            '&:hover': { backgroundColor: '#139B49' },
          }}
        >
          Save Permissions
        </Button>
      </Box>

      {message && (
        <Alert 
          severity={message.type} 
          sx={{ 
            mb: 2, 
            borderRadius: 2,
            '&.MuiAlert-standardSuccess': {
              backgroundColor: 'rgba(125, 194, 68, 0.1)',
              color: '#139B49',
            },
            '&.MuiAlert-standardError': {
              backgroundColor: 'rgba(238, 106, 49, 0.1)',
              color: '#ee6a31',
            },
          }}
        >
          {message.text}
        </Alert>
      )}

      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Table>
          <TableHead sx={{ backgroundColor: 'rgba(40, 121, 182, 0.05)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: '#2879b6' }}>Page Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: '#2879b6' }}>Read</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: '#2879b6' }}>Create</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: '#2879b6' }}>Update</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: '#2879b6' }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map((perm, index) => (
              <TableRow key={perm.page} hover>
                <TableCell sx={{ fontWeight: 500 }}>{perm.page}</TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={perm.read}
                    onChange={() => handlePermissionChange(index, 'read')}
                    sx={{
                      color: '#2879b6',
                      '&.Mui-checked': { color: '#2879b6' },
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={perm.create}
                    onChange={() => handlePermissionChange(index, 'create')}
                    sx={{
                      color: '#7dc244',
                      '&.Mui-checked': { color: '#7dc244' },
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={perm.update}
                    onChange={() => handlePermissionChange(index, 'update')}
                    sx={{
                      color: '#F59E21',
                      '&.Mui-checked': { color: '#F59E21' },
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={perm.delete}
                    onChange={() => handlePermissionChange(index, 'delete')}
                    sx={{
                      color: '#ee6a31',
                      '&.Mui-checked': { color: '#ee6a31' },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

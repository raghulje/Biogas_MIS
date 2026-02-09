import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { adminService } from '../../services/adminService';

export default function AdminMobile() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [smtp, setSmtp] = useState<any | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const [u, t, f] = await Promise.all([
        adminService.getUsers().catch(() => []),
        adminService.getTemplates().catch(() => []),
        adminService.getSMTPConfig().catch(() => null),
      ]);
      setUsers(Array.isArray(u) ? u : []);
      setTemplates(Array.isArray(t) ? t : []);
      setSmtp(f || null);
      const al = await adminService.getAuditLogs().catch(() => []);
      setLogs(Array.isArray(al) ? al : []);
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Admin (Mobile)
      </Typography>

      <Card sx={{ mb: 2, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>SMTP</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {smtp ? `${smtp.host}:${smtp.port} (${smtp.auth_user})` : 'No SMTP configured'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={load}>Refresh</Button>
        </CardActions>
      </Card>

      <Card sx={{ mb: 2, borderRadius: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Users</Typography>
            <IconButton size="small" onClick={load}><RefreshIcon /></IconButton>
          </Box>
          <TextField size="small" placeholder="Search users" value={search} onChange={(e) => setSearch(e.target.value)} sx={{ mt: 1 }} fullWidth />
          <List dense>
            {users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())).map(u => (
              <React.Fragment key={u.id}>
                <ListItem
                  secondaryAction={
                    <Box>
                      <IconButton edge="end" aria-label="edit"><EditIcon /></IconButton>
                      <IconButton edge="end" aria-label="delete"><DeleteIcon /></IconButton>
                    </Box>
                  }
                >
                  <ListItemText primary={u.name} secondary={u.email} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card sx={{ mb: 2, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Email Templates</Typography>
          <List dense>
            {templates.map(t => (
              <ListItem key={t.id} secondaryAction={<IconButton><EditIcon /></IconButton>}>
                <ListItemText primary={t.name} secondary={t.subject} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card sx={{ mb: 6, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Activity Logs</Typography>
          {logs.slice(0, 10).map((l: any) => (
            <Box key={l.id} sx={{ py: 1, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>{l.user}</Typography>
              <Typography variant="caption" color="text.secondary">{l.timestamp}</Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>{l.formatted_description || l.description}</Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}


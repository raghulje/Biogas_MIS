
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Layout } from '../../components/Layout';
import { PageBanner } from '../../components/PageBanner';

export default function AuditLogsPage() {
  const theme = useTheme();
  const isCompact = useMediaQuery(theme.breakpoints.down('lg'));
  const mockLogs = [
    {
      id: 1,
      timestamp: '2024-01-15 09:30:45',
      user: 'John Doe',
      action: 'Created MIS Entry',
      status: 'Success',
      details: 'Daily MIS form submitted',
    },
    {
      id: 2,
      timestamp: '2024-01-15 08:15:22',
      user: 'Jane Smith',
      action: 'Updated User',
      status: 'Success',
      details: 'Modified user role',
    },
    {
      id: 3,
      timestamp: '2024-01-14 16:45:10',
      user: 'Mike Johnson',
      action: 'Login',
      status: 'Success',
      details: 'User logged in',
    },
    {
      id: 4,
      timestamp: '2024-01-14 14:20:33',
      user: 'John Doe',
      action: 'Deleted MIS Entry',
      status: 'Success',
      details: 'Removed draft entry',
    },
    {
      id: 5,
      timestamp: '2024-01-14 11:05:18',
      user: 'Unknown',
      action: 'Login Attempt',
      status: 'Failed',
      details: 'Invalid credentials',
    },
  ];

  return (
    <Layout>
      <Box>
        <PageBanner title="Audit Logs" subtitle="Who signed in and what changed" />

        <Card sx={{ mb: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333842' }}>
              Filter Logs
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField fullWidth label="User" size="small" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField fullWidth label="Action" size="small" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField fullWidth label="Start Date" type="date" size="small" InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField fullWidth label="End Date" type="date" size="small" InputLabelProps={{ shrink: true }} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {isCompact ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {mockLogs.map((log) => (
              <Card key={log.id} sx={{ borderRadius: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, alignItems: 'flex-start' }}>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 700 }}>{log.action}</Typography>
                      <Typography variant="body2" color="text.secondary">{log.user}</Typography>
                    </Box>
                    <Chip
                      label={log.status}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        backgroundColor: log.status === 'Success' ? '#7dc244' : '#ee6a31',
                        color: '#ffffff',
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1 }}>{log.details}</Typography>
                  <Typography variant="caption" color="text.secondary">{log.timestamp}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
        <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <CardContent>
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
              <Table>
                <TableHead sx={{ backgroundColor: 'rgba(23, 162, 180, 0.05)' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: '#17a2b4' }}>Timestamp</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#17a2b4' }}>User</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#17a2b4' }}>Action</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#17a2b4' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#17a2b4' }}>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockLogs.map((log) => (
                    <TableRow key={log.id} hover>
                      <TableCell sx={{ fontSize: '0.875rem' }}>{log.timestamp}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>
                        <Chip
                          label={log.status}
                          size="small"
                          sx={{ 
                            fontWeight: 600,
                            backgroundColor: log.status === 'Success' ? '#7dc244' : '#ee6a31',
                            color: '#ffffff',
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: '#58595B' }}>{log.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
        )}
      </Box>
    </Layout>
  );
}

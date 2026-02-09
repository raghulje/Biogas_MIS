import { useEffect, useState, useCallback } from 'react';
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
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  Divider,
  Alert,
  CircularProgress,
  TablePagination,
  Chip,
} from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import ErrorBoundary from '../../components/ErrorBoundary';
import { themePresets } from '../../themes';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  FileDownload as FileDownloadIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { Layout } from '../../components/Layout';
import { adminService } from '../../services/adminService';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Permission {
  page: string;
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string | { name: string };
  permissions: Permission[];
}

interface ActivityLog {
  id: number;
  user: string;
  action: string;
  entity: string;
  description: string;
  formatted_description: string;
  changes: { field: string; from: string; to: string }[];
  timestamp: string;
  original_timestamp?: string;
}

interface SessionRow {
  userId: number;
  userName: string;
  lastLogin: string;
  loginTime: string;
  logoutTime: string;
  sessionDurationMinutes: number;
  device?: string | null;
  userAgent?: string | null;
  ipAddress?: string | null;
}

interface EmailTemplate {
  id: number;
  name: string;
  type: 'entry_not_created' | 'entry_not_submitted' | 'submission_to_manager' | 'review_request';
  subject: string;
  body: string;
  placeholders: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SchedulerConfig {
  id: number;
  notificationType: 'entry_not_created' | 'entry_not_submitted' | 'submission_to_manager' | 'review_request';
  isEnabled: boolean;
  checkTime: string;
  recipientRoles: string[];
  reminderFrequency: 'once' | 'daily' | 'hourly';
  templateId: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

// MIS Entry Email recipients (submit + no-entry reminder)
function MISEntryEmailPanel({
  formConfig,
  message,
  setMessage,
}: {
  formConfig: any;
  message: { type: string; text: string } | null;
  setMessage: (m: { type: 'success' | 'error'; text: string } | null) => void;
}) {
  const [submitNotifyEmails, setSubmitNotifyEmails] = useState<string[]>([]);
  const [entryNotCreatedEmails, setEntryNotCreatedEmails] = useState<string[]>([]);
  const [newSubmitEmail, setNewSubmitEmail] = useState('');
  const [newNoEntryEmail, setNewNoEntryEmail] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const config = formConfig?.mis_email_config;
    if (config) {
      setSubmitNotifyEmails(Array.isArray(config.submit_notify_emails) ? config.submit_notify_emails : []);
      setEntryNotCreatedEmails(Array.isArray(config.entry_not_created_emails) ? config.entry_not_created_emails : []);
    }
  }, [formConfig?.mis_email_config]);

  // When panel is shown, fetch latest in case formConfig was loaded before config existed
  const loadConfig = () => {
    adminService.getMISEmailConfig().then((data: any) => {
      if (data) {
        setSubmitNotifyEmails(Array.isArray(data.submit_notify_emails) ? data.submit_notify_emails : []);
        setEntryNotCreatedEmails(Array.isArray(data.entry_not_created_emails) ? data.entry_not_created_emails : []);
      }
    }).catch(() => { });
  };
  useEffect(() => { loadConfig(); }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await adminService.saveMISEmailConfig({
        submit_notify_emails: submitNotifyEmails,
        entry_not_created_emails: entryNotCreatedEmails,
        not_submitted_notify_emails: [],
        escalation_notify_emails: [],
      });
      setMessage({ type: 'success', text: 'MIS Entry email settings saved.' });
    } catch (e: any) {
      setMessage({ type: 'error', text: e?.response?.data?.message || 'Failed to save.' });
    } finally {
      setSaving(false);
    }
  };

  const addEmail = (which: 'submit' | 'noEntry', email: string) => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;
    if (which === 'submit') {
      if (!submitNotifyEmails.includes(trimmed)) setSubmitNotifyEmails([...submitNotifyEmails, trimmed]);
      setNewSubmitEmail('');
    } else {
      if (!entryNotCreatedEmails.includes(trimmed)) setEntryNotCreatedEmails([...entryNotCreatedEmails, trimmed]);
      setNewNoEntryEmail('');
    }
  };

  const removeEmail = (which: 'submit' | 'noEntry', email: string) => {
    if (which === 'submit') setSubmitNotifyEmails(submitNotifyEmails.filter(e => e !== email));
    else setEntryNotCreatedEmails(entryNotCreatedEmails.filter(e => e !== email));
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, color: '#333842', mb: 2 }}>
        MIS Entry – Email Recipients
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Configure who receives emails when an MIS entry is submitted, and who is notified when no entry is created for the day (checked at the scheduled time in Scheduler Configuration).
      </Typography>
      {message && (
        <Alert severity={message.type as any} onClose={() => setMessage(null)} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1, color: '#2879b6' }}>
              When an MIS entry is submitted – send to:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <TextField
                size="small"
                fullWidth
                placeholder="email@example.com"
                value={newSubmitEmail}
                onChange={(e) => setNewSubmitEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addEmail('submit', newSubmitEmail)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              <Button variant="contained" onClick={() => addEmail('submit', newSubmitEmail)} sx={{ borderRadius: '12px', whiteSpace: 'nowrap' }}>
                Add
              </Button>
            </Box>
            <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
              {submitNotifyEmails.map((email) => (
                <li key={email} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <Typography variant="body2">{email}</Typography>
                  <IconButton size="small" onClick={() => removeEmail('submit', email)} sx={{ color: '#ee6a31', p: 0.25 }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </li>
              ))}
              {submitNotifyEmails.length === 0 && (
                <Typography variant="body2" color="text.secondary">No emails. Add above or leave empty to use Manager/Admin users.</Typography>
              )}
            </Box>
          </Card>
        </Grid>
            {/* Mobile SMTP card removed from this panel to avoid referencing parent SMTP state.
                The SMTP settings are available in the SMTP tab (responsive there). */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1, color: '#2879b6' }}>
              If no entry created for the day (at scheduled time) – send to:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <TextField
                size="small"
                fullWidth
                placeholder="email@example.com"
                value={newNoEntryEmail}
                onChange={(e) => setNewNoEntryEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addEmail('noEntry', newNoEntryEmail)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              <Button variant="contained" onClick={() => addEmail('noEntry', newNoEntryEmail)} sx={{ borderRadius: '12px', whiteSpace: 'nowrap' }}>
                Add
              </Button>
            </Box>
            <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
              {entryNotCreatedEmails.map((email) => (
                <li key={email} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <Typography variant="body2">{email}</Typography>
                  <IconButton size="small" onClick={() => removeEmail('noEntry', email)} sx={{ color: '#ee6a31', p: 0.25 }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </li>
              ))}
              {entryNotCreatedEmails.length === 0 && (
                <Typography variant="body2" color="text.secondary">No emails. Add above or leave empty to use Operator users.</Typography>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        startIcon={saving ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : <SaveIcon />}
        onClick={handleSave}
        disabled={saving}
        className="btn-gradient-success"
        sx={{ mt: 3, borderRadius: '12px', textTransform: 'none', color: '#fff' }}
      >
        Save MIS Entry Email Settings
      </Button>
    </Box>
  );
}

// Final MIS Report email: recipients, subject, body, schedule (daily/weekly/monthly/quarterly/custom + time/cron)
function FinalMISReportEmailPanel({
  message,
  setMessage,
}: {
  message: { type: string; text: string } | null;
  setMessage: (m: { type: 'success' | 'error'; text: string } | null) => void;
}) {
  const [toEmails, setToEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [subject, setSubject] = useState('Final MIS Report');
  const [body, setBody] = useState('');
  const [scheduleType, setScheduleType] = useState<string>('monthly');
  const [scheduleTime, setScheduleTime] = useState('09:00');
  const [cronExpression, setCronExpression] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sendingTest, setSendingTest] = useState(false);
  const [testStartDate, setTestStartDate] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 1);
    return d.toISOString().slice(0, 10);
  });
  const [testEndDate, setTestEndDate] = useState(() => new Date().toISOString().slice(0, 10));

  const loadConfig = useCallback(() => {
    adminService.getFinalMISReportConfig().then((data: any) => {
      if (data) {
        setToEmails(Array.isArray(data.to_emails) ? data.to_emails : []);
        setSubject(data.subject || 'Final MIS Report');
        setBody(data.body || '');
        setScheduleType(data.schedule_type || 'monthly');
        setScheduleTime(data.schedule_time || '09:00');
        setCronExpression(data.cron_expression || '');
        setIsActive(data.is_active !== false);
      }
    }).catch(() => { });
  }, []);
  useEffect(() => { loadConfig(); }, [loadConfig]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const addEmail = () => {
    const trimmed = newEmail.trim().toLowerCase();
    if (!trimmed) return;
    if (!toEmails.includes(trimmed)) setToEmails([...toEmails, trimmed]);
    setNewEmail('');
  };

  const removeEmail = (email: string) => setToEmails(toEmails.filter(e => e !== email));

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await adminService.saveFinalMISReportConfig({
        to_emails: toEmails,
        subject,
        body,
        schedule_type: scheduleType,
        schedule_time: scheduleTime,
        cron_expression: scheduleType === 'custom' ? cronExpression : undefined,
        is_active: isActive,
      });
      setMessage({ type: 'success', text: 'Final MIS Report email settings saved.' });
    } catch (e: any) {
      setMessage({ type: 'error', text: e?.response?.data?.message || 'Failed to save.' });
    } finally {
      setSaving(false);
    }
  };

  const handleSendTest = async () => {
    if (toEmails.length === 0) {
      setMessage({ type: 'error', text: 'Add at least one recipient before sending a test.' });
      return;
    }
    setSendingTest(true);
    setMessage(null);
    try {
      await adminService.sendTestFinalMISReport(testStartDate, testEndDate);
      setMessage({ type: 'success', text: `Test report sent for ${testStartDate} to ${testEndDate}.` });
    } catch (e: any) {
      setMessage({ type: 'error', text: e?.response?.data?.message || 'Failed to send test.' });
    } finally {
      setSendingTest(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, color: '#333842', mb: 2 }}>
        Final MIS Report – Email &amp; Schedule
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Send the Final MIS Report (same format and colors as the report page) to business heads by email. Configure recipients, subject, optional body, and when to send (daily, weekly, monthly, quarterly, or custom cron).
      </Typography>
      {message && (
        <Alert severity={message.type as any} onClose={() => setMessage(null)} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1, color: '#2879b6' }}>
              Recipients (report will be sent to these emails)
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <TextField
                size="small"
                fullWidth
                placeholder="email@example.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addEmail())}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              <Button variant="contained" onClick={addEmail} fullWidth={isMobile} sx={{ borderRadius: '12px', whiteSpace: 'nowrap' }}>
                Add
              </Button>
            </Box>
            <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
              {toEmails.map((email) => (
                <li key={email} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <Typography variant="body2">{email}</Typography>
                  <IconButton size="small" onClick={() => removeEmail(email)} sx={{ color: '#ee6a31', p: 0.25 }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </li>
              ))}
              {toEmails.length === 0 && (
                <Typography variant="body2" color="text.secondary">No recipients. Add emails above.</Typography>
              )}
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1, color: '#2879b6' }}>
              Email content
            </Typography>
            <TextField
              size="small"
              fullWidth
              label="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              sx={{ mb: 1.5, '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
            <TextField
              size="small"
              fullWidth
              multiline
              rows={3}
              label="Body (optional HTML intro before the report table)"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="e.g. Dear Team, Please find the consolidated report below."
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1, color: '#2879b6' }}>
              Schedule – when to send the report
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  size="small"
                  fullWidth
                  label="Frequency"
                  value={scheduleType}
                  onChange={(e) => setScheduleType(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                >
                  <MenuItem value="daily">Daily (previous day)</MenuItem>
                  <MenuItem value="weekly">Weekly (previous week, Monday run)</MenuItem>
                  <MenuItem value="monthly">Monthly (previous month, 1st run)</MenuItem>
                  <MenuItem value="quarterly">Quarterly (previous quarter)</MenuItem>
                  <MenuItem value="custom">Custom (cron expression)</MenuItem>
                </TextField>
              </Grid>
              {scheduleType !== 'custom' && (
                <Grid item xs={12} sm={3}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Time (24h)"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    placeholder="09:00"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />
                </Grid>
              )}
              {scheduleType === 'custom' && (
                <Grid item xs={12} sm={4}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Cron expression"
                    value={cronExpression}
                    onChange={(e) => setCronExpression(e.target.value)}
                    placeholder="0 9 * * 1"
                    helperText="e.g. 0 9 * * 1 = Monday 9:00"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={2}>
                <FormControlLabel
                  control={<Checkbox checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />}
                  label="Active"
                />
              </Grid>
            </Grid>
            <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
              Report is sent at the configured time. The server checks every hour; for daily at 09:00, the report runs at 09:00 for the previous day.
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1, color: '#2879b6' }}>
              Send test report now
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
              <TextField type="date" size="small" label="Start date" value={testStartDate} onChange={(e) => setTestStartDate(e.target.value)} InputLabelProps={{ shrink: true }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
              <TextField type="date" size="small" label="End date" value={testEndDate} onChange={(e) => setTestEndDate(e.target.value)} InputLabelProps={{ shrink: true }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
              <Button variant="outlined" onClick={handleSendTest} disabled={sendingTest || toEmails.length === 0} startIcon={sendingTest ? <CircularProgress size={18} /> : null} fullWidth={isMobile} sx={{ borderRadius: '12px', textTransform: 'none' }}>
                {sendingTest ? 'Sending…' : 'Send test report'}
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        startIcon={saving ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : <SaveIcon />}
        onClick={handleSave}
        disabled={saving}
        className="btn-gradient-success"
        fullWidth={isMobile}
        sx={{ mt: 3, borderRadius: '12px', textTransform: 'none', color: '#fff' }}
      >
        Save Final MIS Report Email Settings
      </Button>
    </Box>
  );
}

const defaultPermissions: Permission[] = [
  { page: 'Dashboard', read: true, create: false, update: false, delete: false },
  { page: 'MIS Entry', read: true, create: true, update: true, delete: false },
  { page: 'Consolidated MIS View', read: true, create: false, update: false, delete: false },
  { page: 'User Management', read: false, create: false, update: false, delete: false },
  { page: 'Roles & Permissions', read: false, create: false, update: false, delete: false },
  { page: 'Admin Panel', read: false, create: false, update: false, delete: false },
  { page: 'Audit Logs', read: true, create: false, update: false, delete: false },
  { page: 'Import Data', read: true, create: true, update: false, delete: false },
];

const adminPermissions: Permission[] = [
  { page: 'Dashboard', read: true, create: true, update: true, delete: true },
  { page: 'MIS Entry', read: true, create: true, update: true, delete: true },
  { page: 'Consolidated MIS View', read: true, create: true, update: true, delete: true },
  { page: 'User Management', read: true, create: true, update: true, delete: true },
  { page: 'Roles & Permissions', read: true, create: true, update: true, delete: true },
  { page: 'Admin Panel', read: true, create: true, update: true, delete: true },
  { page: 'Audit Logs', read: true, create: true, update: true, delete: true },
  { page: 'Import Data', read: true, create: true, update: true, delete: true },
];

// Mock activity logs data
const mockActivityLogs: ActivityLog[] = [
  {
    id: 1,
    user: 'John Doe',
    lastLogin: '2024-01-15 09:30:00',
    action: 'Updated MIS Entry #1234',
    previousValue: 'Total Slurry Feed: 150 m³',
    newValue: 'Total Slurry Feed: 155 m³',
    timestamp: '2024-01-15 10:45:00',
    actionType: 'update',
  },
  {
    id: 2,
    user: 'Jane Smith',
    lastLogin: '2024-01-15 08:00:00',
    action: 'Created MIS Entry #1235',
    previousValue: '-',
    newValue: 'New entry for 2024-01-15',
    timestamp: '2024-01-15 08:15:00',
    actionType: 'create',
  },
  {
    id: 3,
    user: 'Mike Johnson',
    lastLogin: '2024-01-15 07:45:00',
    action: 'Viewed Dashboard',
    previousValue: '-',
    newValue: '-',
    timestamp: '2024-01-15 07:45:00',
    actionType: 'view',
  },
  {
    id: 4,
    user: 'John Doe',
    lastLogin: '2024-01-15 09:30:00',
    action: 'Updated Digester D-01 Temperature',
    previousValue: 'Temperature: 35°C',
    newValue: 'Temperature: 37°C',
    timestamp: '2024-01-15 11:20:00',
    actionType: 'update',
  },
  {
    id: 5,
    user: 'Jane Smith',
    lastLogin: '2024-01-15 08:00:00',
    action: 'Deleted MIS Entry #1200',
    previousValue: 'Entry for 2024-01-10',
    newValue: '-',
    timestamp: '2024-01-15 09:30:00',
    actionType: 'delete',
  },
  {
    id: 6,
    user: 'Mike Johnson',
    lastLogin: '2024-01-15 07:45:00',
    action: 'Updated User Role',
    previousValue: 'Role: Viewer',
    newValue: 'Role: Operator',
    timestamp: '2024-01-15 08:00:00',
    actionType: 'update',
  },
  {
    id: 7,
    user: 'John Doe',
    lastLogin: '2024-01-15 09:30:00',
    action: 'Created User Account',
    previousValue: '-',
    newValue: 'User: Sarah Williams',
    timestamp: '2024-01-15 12:00:00',
    actionType: 'create',
  },
  {
    id: 8,
    user: 'Jane Smith',
    lastLogin: '2024-01-15 08:00:00',
    action: 'Updated Biogas Production',
    previousValue: 'Production: 1200 m³',
    newValue: 'Production: 1250 m³',
    timestamp: '2024-01-15 10:00:00',
    actionType: 'update',
  },
];

const mockEmailTemplates: EmailTemplate[] = [
  {
    id: 1,
    name: 'Entry Not Created Notification',
    type: 'entry_not_created',
    subject: 'Reminder: MIS Entry Not Created for {{date}}',
    body: 'Dear {{user_name}},\n\nThis is a reminder that no MIS entry has been created for {{date}}.\n\nPlease create and submit your MIS entry as soon as possible.\n\nThank you,\nBiogas MIS System',
    placeholders: ['{{user_name}}', '{{date}}'],
    isActive: true,
    createdAt: '2024-01-10 10:00:00',
    updatedAt: '2024-01-10 10:00:00',
  },
  {
    id: 2,
    name: 'Entry Not Submitted Notification',
    type: 'entry_not_submitted',
    subject: 'Reminder: MIS Entry #{{entry_id}} Not Submitted',
    body: 'Dear {{user_name}},\n\nYour MIS entry #{{entry_id}} for {{date}} has been created but not submitted yet.\n\nPlease review and submit your entry before the deadline.\n\nThank you,\nBiogas MIS System',
    placeholders: ['{{user_name}}', '{{date}}', '{{entry_id}}'],
    isActive: true,
    createdAt: '2024-01-10 10:00:00',
    updatedAt: '2024-01-10 10:00:00',
  },
  {
    id: 3,
    name: 'Submission to Manager',
    type: 'submission_to_manager',
    subject: 'New MIS Entry Submitted for Review - #{{entry_id}}',
    body: 'Dear Manager,\n\nA new MIS entry has been submitted for your review:\n\nEntry ID: {{entry_id}}\nDate: {{date}}\nSubmitted by: {{user_name}}\nSubmitted at: {{timestamp}}\n\nPlease review and approve or send back for corrections.\n\nThank you,\nBiogas MIS System',
    placeholders: ['{{user_name}}', '{{date}}', '{{entry_id}}', '{{timestamp}}'],
    isActive: true,
    createdAt: '2024-01-10 10:00:00',
    updatedAt: '2024-01-10 10:00:00',
  },
  {
    id: 4,
    name: 'Review Request to Entry Person',
    type: 'review_request',
    subject: 'MIS Entry #{{entry_id}} Requires Corrections',
    body: 'Dear {{user_name}},\n\nYour MIS entry #{{entry_id}} for {{date}} has been reviewed and requires corrections.\n\nReview Comment:\n{{review_comment}}\n\nPlease update the entry and resubmit.\n\nThank you,\nBiogas MIS System',
    placeholders: ['{{user_name}}', '{{date}}', '{{entry_id}}', '{{review_comment}}'],
    isActive: true,
    createdAt: '2024-01-10 10:00:00',
    updatedAt: '2024-01-10 10:00:00',
  },
];

const mockSchedulerConfigs: SchedulerConfig[] = [
  {
    id: 1,
    notificationType: 'entry_not_created',
    isEnabled: true,
    checkTime: '09:00',
    recipientRoles: ['Operator'],
    reminderFrequency: 'once',
    templateId: 1,
  },
  {
    id: 2,
    notificationType: 'entry_not_submitted',
    isEnabled: true,
    checkTime: '17:00',
    recipientRoles: ['Operator'],
    reminderFrequency: 'daily',
    templateId: 2,
  },
  {
    id: 3,
    notificationType: 'submission_to_manager',
    isEnabled: true,
    checkTime: '00:00',
    recipientRoles: ['Admin', 'Manager'],
    reminderFrequency: 'once',
    templateId: 3,
  },
  {
    id: 4,
    notificationType: 'review_request',
    isEnabled: true,
    checkTime: '00:00',
    recipientRoles: ['Operator'],
    reminderFrequency: 'once',
    templateId: 4,
  },
];

import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function AdminPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  // Explicit mobile breakpoint required by project (<=768px)
  const isPhone = useMediaQuery('(max-width:768px)');
  const [tabValue, setTabValue] = useState(0);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userPermissions, setUserPermissions] = useState<Permission[]>(defaultPermissions);
  const [selectedRole, setSelectedRole] = useState('Operator');
  const [saving, setSaving] = useState(false);
  const [selectedThemeKey, setSelectedThemeKey] = useState<string>(() => localStorage.getItem('appTheme') || 'professional');

  const handleSaveTheme = async () => {
    try {
      setSaving(true);
      await adminService.saveAppTheme(selectedThemeKey);
      localStorage.setItem('appTheme', selectedThemeKey);
      // reload so theme applies globally
      window.location.reload();
    } catch (e: any) {
      setMessage({ type: 'error', text: e?.response?.data?.message || 'Failed to save theme' });
    } finally {
      setSaving(false);
    }
  };
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterUser, setFilterUser] = useState('');
  const [filterActionType, setFilterActionType] = useState('all');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [loading, setLoading] = useState(false);

  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [templateName, setTemplateName] = useState('');
  const [templateType, setTemplateType] = useState<EmailTemplate['type']>('entry_not_created');
  const [templateSubject, setTemplateSubject] = useState('');
  const [templateBody, setTemplateBody] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const [users, setUsers] = useState<User[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [lastLoginsByUser, setLastLoginsByUser] = useState<Record<number, string>>({});
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [schedulerConfigs, setSchedulerConfigs] = useState<SchedulerConfig[]>([]);

  // Role Permissions tab: which role is being edited and the permission matrix
  const [selectedRoleIdForPerms, setSelectedRoleIdForPerms] = useState<number | null>(null);
  const [rolePermissionsEdit, setRolePermissionsEdit] = useState<Permission[]>(defaultPermissions);

  // Single form-config (roles, permissions, smtp_config, scheduler_config) - loaded once
  const [formConfig, setFormConfig] = useState<{
    roles: { id: number; name: string; permissions?: any[] }[];
    permissions: { id: number; name: string; resource: string; action: string }[];
    smtp_config: any;
    scheduler_config: any[];
    mis_email_config?: { submit_notify_emails: string[]; entry_not_created_emails: string[] };
  } | null>(null);

  // SMTP Configuration form state (primary source; synced from formConfig when tab or config loads)
  const [smtpHost, setSmtpHost] = useState('');
  const [smtpPort, setSmtpPort] = useState('587');
  const [smtpSecure, setSmtpSecure] = useState(false);
  const [smtpUser, setSmtpUser] = useState('');
  const [smtpPass, setSmtpPass] = useState('');
  const [smtpFromEmail, setSmtpFromEmail] = useState('');
  const [smtpFromName, setSmtpFromName] = useState('');
  const [smtpId, setSmtpId] = useState<number | null>(null);
  const [smtpTestTo, setSmtpTestTo] = useState('');
  const [smtpTesting, setSmtpTesting] = useState(false);

  // Backend resources map to one or more UI rows so Admin/Manager see all relevant boxes checked
  const mapBackendPermissionsToUI = (backendPerms: any[]) => {
    if (!backendPerms || !Array.isArray(backendPerms)) return defaultPermissions;
    const uiPerms = JSON.parse(JSON.stringify(defaultPermissions));
    const resourceToUIPages: Record<string, string[]> = {
      mis_entry: ['MIS Entry', 'Consolidated MIS View', 'Import Data'],
      user: ['User Management'],
      role: ['Roles & Permissions'],
      config: ['Dashboard', 'Admin Panel'],
      audit: ['Audit Logs']
    };
    backendPerms.forEach((bp: { resource?: string; action?: string }) => {
      const uiPages = bp.resource ? resourceToUIPages[bp.resource] : null;
      if (!uiPages?.length) return;
      uiPages.forEach((uiName) => {
        const permIndex = uiPerms.findIndex((p: { page: string }) => p.page === uiName);
        if (permIndex > -1) {
          if (bp.action === 'read') uiPerms[permIndex].read = true;
          if (bp.action === 'create') uiPerms[permIndex].create = true;
          if (bp.action === 'update') uiPerms[permIndex].update = true;
          if (bp.action === 'delete') uiPerms[permIndex].delete = true;
        }
      });
    });
    return uiPerms;
  };

  // Load form-config once (roles, permissions, smtp_config, scheduler_config) - single API
  useEffect(() => {
    const loadFormConfig = async () => {
      try {
        const data = await adminService.getFormConfig();
        setFormConfig(data);
        if (tabValue === 3) {
          setSchedulerConfigs(Array.isArray(data?.scheduler_config) ? data.scheduler_config : []);
        }
        if (data?.roles?.length && selectedRoleIdForPerms == null) {
          setSelectedRoleIdForPerms(data.roles[0].id);
        }
      } catch (e) {
        console.error('Failed to load form config', e);
        setFormConfig(null);
      }
    };
    loadFormConfig();
  }, []);

  // When selected role for permissions changes, load that role's permissions from formConfig
  useEffect(() => {
    if (!formConfig?.roles || selectedRoleIdForPerms == null) return;
    const role = formConfig.roles.find((r: any) => Number(r.id) === Number(selectedRoleIdForPerms));
    if (role) {
      setRolePermissionsEdit(
        (role.permissions && Array.isArray(role.permissions))
          ? mapBackendPermissionsToUI(role.permissions)
          : defaultPermissions
      );
    }
  }, [selectedRoleIdForPerms, formConfig]);

  // Helper: apply saved SMTP config into form state (backend uses snake_case: auth_user, from_email)
  const applySmtpConfigToForm = (c: any) => {
    if (!c) {
      setSmtpId(null);
      setSmtpHost('');
      setSmtpPort('587');
      setSmtpSecure(false);
      setSmtpUser('');
      setSmtpPass('');
      setSmtpFromEmail('');
      setSmtpFromName('');
      return;
    }
    setSmtpId(c.id ?? null);
    setSmtpHost(c.host ?? '');
    setSmtpPort(c.port != null ? String(c.port) : '587');
    setSmtpSecure(Boolean(c.secure));
    setSmtpUser((c.auth_user ?? c.authUser) ?? '');
    setSmtpPass(''); // Never prefill password
    setSmtpFromEmail((c.from_email ?? c.fromEmail) ?? '');
    setSmtpFromName((c.from_name ?? c.fromName) ?? '');
  };

  // When user opens SMTP tab: sync form from formConfig, or refetch SMTP config so values show from DB
  useEffect(() => {
    if (tabValue !== 3) return;
    const c = formConfig?.smtp_config;
    if (c && (c.id || c.host || c.auth_user || c.from_email)) {
      applySmtpConfigToForm(c);
      return;
    }
    // No smtp_config in formConfig: refetch SMTP directly so we show saved values (e.g. after is_active fix)
    let cancelled = false;
    adminService.getSMTPConfig().then((data: any) => {
      if (cancelled || !data) return;
      applySmtpConfigToForm(data);
      setFormConfig((prev: any) => (prev ? { ...prev, smtp_config: data } : prev));
    }).catch(() => { });
    return () => { cancelled = true; };
  }, [tabValue, formConfig?.smtp_config]);

  useEffect(() => {
    loadData();
  }, [tabValue, formConfig]);

  const handleSaveSMTP = async () => {
    const host = smtpHost?.trim();
    const port = Number(smtpPort);
    const user = smtpUser?.trim();
    const fromEmail = smtpFromEmail?.trim();
    if (!host || !user || !fromEmail) {
      setMessage({ type: 'error', text: 'Host, Username, and From Email are required.' });
      return;
    }
    if (isNaN(port) || port < 1 || port > 65535) {
      setMessage({ type: 'error', text: 'Port must be between 1 and 65535.' });
      return;
    }
    if (!smtpId && !smtpPass?.trim()) {
      setMessage({ type: 'error', text: 'Password is required when creating a new SMTP config.' });
      return;
    }
    try {
      setSaving(true);
      setMessage(null);
      const payload: any = {
        host,
        port,
        secure: smtpSecure,
        auth_user: user,
        from_email: fromEmail,
        from_name: smtpFromName?.trim() || undefined,
      };
      if (smtpPass?.trim()) payload.auth_pass = smtpPass.trim();
      if (smtpId) {
        await adminService.updateSMTPConfig(smtpId, payload);
        setMessage({ type: 'success', text: 'SMTP settings updated successfully.' });
      } else {
        await adminService.createSMTPConfig(payload);
        setMessage({ type: 'success', text: 'SMTP settings saved successfully.' });
      }
      const fresh = await adminService.getFormConfig();
      setFormConfig(fresh);
      if (fresh?.smtp_config) {
        applySmtpConfigToForm(fresh.smtp_config);
      }
      setSmtpPass(''); // Clear password after save
    } catch (e: any) {
      setMessage({ type: 'error', text: e.response?.data?.message || 'Failed to save SMTP settings.' });
    } finally {
      setSaving(false);
    }
  };

  const handleTestSMTP = async () => {
    const to = smtpTestTo?.trim();
    if (!to) {
      setMessage({ type: 'error', text: 'Enter a test recipient email address.' });
      return;
    }
    const host = smtpHost?.trim();
    const user = smtpUser?.trim();
    const fromEmail = smtpFromEmail?.trim();
    const hasFormConfig = host && user && fromEmail;
    if (!hasFormConfig && !smtpId) {
      setMessage({ type: 'error', text: 'Save SMTP config first, or fill in Host, Username, and From Email to test.' });
      return;
    }
    if (hasFormConfig && !smtpPass?.trim() && !smtpId) {
      setMessage({ type: 'error', text: 'Password is required to test new config (or save first then test with saved config).' });
      return;
    }
    try {
      setSmtpTesting(true);
      setMessage(null);
      let payload: any = { to };
      // Use saved config (send only to) when we have saved config and no password in form
      if (smtpId && !smtpPass?.trim()) {
        payload = { to };
      } else if (hasFormConfig && (smtpPass?.trim() || smtpId)) {
        payload = {
          to,
          host,
          port: Number(smtpPort) || 587,
          secure: smtpSecure,
          auth_user: user,
          from_email: fromEmail,
          from_name: smtpFromName?.trim() || undefined,
        };
        if (smtpPass?.trim()) payload.auth_pass = smtpPass.trim();
      }
      await adminService.testSMTPConfig(payload);
      setMessage({ type: 'success', text: 'Test email sent successfully. Check the recipient inbox.' });
    } catch (e: any) {
      setMessage({ type: 'error', text: e.response?.data?.message || 'Failed to send test email.' });
    } finally {
      setSmtpTesting(false);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      if (tabValue === 0) {
        const data = await adminService.getUsers();
        setUsers((data || [])
          .filter((u: any) => u.is_active !== false)
          .map((u: any) => ({
            ...u,
            role: u.role?.name || u.role || 'Operator',
            // User-level permissions (primary); fallback to role permissions for backward compat
            permissions: (u.permissions && Array.isArray(u.permissions) && u.permissions.length > 0)
              ? mapBackendPermissionsToUI(u.permissions)
              : (u.role?.permissions && Array.isArray(u.role.permissions)) ? mapBackendPermissionsToUI(u.role.permissions) : defaultPermissions
          })));
      } else if (tabValue === 1) {
        const [auditData, sessionsData] = await Promise.all([
          adminService.getAuditLogs(),
          adminService.getSessions({ limit: 100 }).catch(() => ({ sessions: [], lastLogins: {} }))
        ]);
        setActivityLogs((Array.isArray(auditData) ? auditData : []).map((log: any) => ({
          id: log.id,
          userId: log.user_id,
          user: log.user || log.actor?.name || 'System',
          lastLogin: '',
          timestamp: log.timestamp || log.createdAt || log.created_at || '',
          action: log.action || log.action || '',
          actionType: ((log.action || '').toLowerCase().includes('create')) ? 'create' :
                      ((log.action || '').toLowerCase().includes('delete')) ? 'delete' :
                      ((log.action || '').toLowerCase().includes('login')) ? 'login' :
                      ((log.action || '').toLowerCase().includes('logout')) ? 'logout' : 'update',
          // Prefer server-provided structured changes when available
          changes: Array.isArray(log.changes) ? log.changes : (log.changes ? log.changes : (Array.isArray(log.changes) ? log.changes : [])),
          formatted_description: log.formatted_description || log.description || '',
          description: log.description || log.formatted_description || '',
          // Also keep raw old/new JSON strings for debugging if needed
          previousValue: log.old_values != null ? (typeof log.old_values === 'string' ? log.old_values : JSON.stringify(log.old_values)) : '',
          newValue: log.new_values != null ? (typeof log.new_values === 'string' ? log.new_values : JSON.stringify(log.new_values)) : ''
        })));
        setSessions(Array.isArray(sessionsData?.sessions) ? sessionsData.sessions : []);
        const lastLogins: Record<number, string> = {};
        if (sessionsData?.lastLogins && typeof sessionsData.lastLogins === 'object') {
          for (const [uid, iso] of Object.entries(sessionsData.lastLogins)) {
            if (iso) lastLogins[Number(uid)] = String(iso);
          }
        }
        setLastLoginsByUser(lastLogins);
      } else if (tabValue === 2) {
        const data = await adminService.getTemplates();
        setEmailTemplates(Array.isArray(data) ? data : []);
      } else if (tabValue === 3) {
        // Use form-config (single API) instead of getSchedulers()
        setSchedulerConfigs(Array.isArray(formConfig?.scheduler_config) ? formConfig.scheduler_config : []);
      }
    } catch (e) {
      setMessage({ type: 'error', text: 'Failed to load data' });
      if (tabValue === 0) setUsers([]);
      if (tabValue === 1) {
        setActivityLogs([]);
        setSessions([]);
        setLastLoginsByUser({});
      }
      if (tabValue === 2) setEmailTemplates([]);
      if (tabValue === 3) setSchedulerConfigs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    if (role === 'Admin') {
      setUserPermissions(adminPermissions);
    } else if (role === 'Manager') {
      setUserPermissions(adminPermissions.map(p => ({ ...p, delete: false }))); // Manager can see everything but delete less
    } else {
      setUserPermissions(defaultPermissions);
    }
  };

  const handlePermissionChange = (pageIndex: number, permissionType: keyof Permission) => {
    if (permissionType === 'page') return;
    setUserPermissions(prev =>
      prev.map((perm, index) =>
        index === pageIndex ? { ...perm, [permissionType]: !perm[permissionType] } : perm
      )
    );
  };

  const handleOpenCreateUser = () => {
    setMessage(null);
    setEditingUser(null);
    setUserName('');
    setUserEmail('');
    setUserPassword('');
    setSelectedRole('Operator');
    setUserPermissions(defaultPermissions);
    setOpenUserDialog(true);
  };

  const handleOpenEditUser = (user: User) => {
    setMessage(null);
    setEditingUser(user);
    setUserName(user.name);
    setUserEmail(user.email);
    setUserPassword('');
    const roleName = typeof user.role === 'string' ? user.role : (user.role?.name || 'Operator');
    setSelectedRole(roleName);
    const perms = Array.isArray(user.permissions) && user.permissions.length > 0
      ? user.permissions
      : (roleName === 'Admin' ? adminPermissions : roleName === 'Manager' ? adminPermissions.map(p => ({ ...p, delete: false })) : defaultPermissions);
    setUserPermissions(perms);
    setOpenUserDialog(true);
  };

  const handleSaveUser = async () => {
    console.log('handleSaveUser called', { userName, userEmail, selectedRole, editingUser });
    if (!userName || !userEmail || (!editingUser && !userPassword)) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    try {
      setSaving(true);
      const userData = {
        name: userName,
        email: userEmail,
        password: userPassword || undefined,
        role: selectedRole,
        role_id: selectedRole === 'Admin' ? 1 : (selectedRole === 'Manager' ? 2 : 3),
        permissions: userPermissions
      };

      if (editingUser) {
        await adminService.updateUser(editingUser.id, userData);
        setMessage({ type: 'success', text: 'User updated successfully' });
      } else {
        await adminService.createUser(userData);
        setMessage({ type: 'success', text: 'User created successfully' });
      }
      setOpenUserDialog(false);
      loadData();
    } catch (e: any) {
      console.error('Save user error:', e);
      setMessage({ type: 'error', text: e.response?.data?.message || 'Failed to save user' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm('Deactivate this user? They will no longer be able to log in.')) return;
    try {
      await adminService.deleteUser(userId);
      setMessage({ type: 'success', text: 'User deactivated' });
      loadData();
    } catch (e: any) {
      setMessage({ type: 'error', text: e.response?.data?.message || 'Failed to deactivate user' });
    }
  };

  const pageToResource: Record<string, string> = {
    'Dashboard': 'config',
    'MIS Entry': 'mis_entry',
    'Consolidated MIS View': 'mis_entry',
    'Consolidated MIS v2': 'mis_entry',
    'Admin Panel': 'config',
    'User Management': 'user',
    'Roles & Permissions': 'role',
    'Audit Logs': 'audit',
    'Import Data': 'mis_entry',
  };

  const handleSavePermissions = async () => {
    if (selectedRoleIdForPerms == null || !formConfig?.permissions) {
      setMessage({ type: 'error', text: 'Select a role and ensure config is loaded.' });
      return;
    }
    try {
      setSaving(true);
      const permissionIds: number[] = [];
      for (const perm of rolePermissionsEdit) {
        const resource = pageToResource[perm.page];
        if (!resource) continue;
        for (const action of ['read', 'create', 'update', 'delete'] as const) {
          if (perm[action]) {
            const p = formConfig.permissions.find(
              (x: any) => x.resource === resource && x.action === action
            );
            if (p?.id) permissionIds.push(Number(p.id));
          }
        }
      }
      const role = formConfig.roles?.find((r: any) => Number(r.id) === Number(selectedRoleIdForPerms));
      const existingIds = new Set((role?.permissions || []).map((p: any) => Number(p.id)).filter((id: number) => !isNaN(id)));
      const checkboxActions = ['read', 'create', 'update', 'delete'];
      for (const p of formConfig.permissions) {
        if (permissionIds.includes(Number(p.id))) continue;
        if (!checkboxActions.includes(p.action) && existingIds.has(Number(p.id))) {
          permissionIds.push(Number(p.id));
        }
      }
      await adminService.assignPermissions({
        roleId: selectedRoleIdForPerms,
        permissionIds,
      });
      setMessage({ type: 'success', text: 'Permissions saved successfully!' });
      // Refetch form config so role permissions persist when revisiting or refreshing
      const fresh = await adminService.getFormConfig();
      setFormConfig(fresh);
    } catch (error: any) {
      console.error('Failed to save permissions', error);
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to save permissions.' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleRolePermissionsTabRoleChange = (roleId: number) => {
    setSelectedRoleIdForPerms(roleId);
  };

  const handleRolePermissionCheckboxChange = (pageIndex: number, action: keyof Permission) => {
    if (action === 'page') return;
    setRolePermissionsEdit(prev =>
      prev.map((p, i) =>
        i === pageIndex ? { ...p, [action]: !p[action] } : p
      )
    );
  };

  // Activity Logs functions
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRefreshLogs = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setMessage({ type: 'success', text: 'Activity logs refreshed!' });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleExportLogs = () => {
    if (filteredLogs.length === 0) {
      setMessage({ type: 'error', text: 'No logs to export.' });
      return;
    }

    const headers = ['User', 'Action', 'Entity', 'Description', 'Timestamp'];
    const csvContent = [
      headers.join(','),
      ...filteredLogs.map(log => {
        const row = [
          `"${log.user}"`,
          `"${log.action}"`,
          `"${log.entity}"`,
          `"${log.formatted_description.replace(/"/g, '""')}"`, // Escape quotes
          `"${log.timestamp}"`
        ];
        return row.join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `audit_logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setMessage({ type: 'success', text: 'Activity logs exported successfully!' });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleApplyFilters = () => {
    // Filter logic would be implemented here
    setPage(0);
    setMessage({ type: 'success', text: 'Filters applied!' });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleResetFilters = () => {
    setFilterUser('');
    setFilterActionType('all');
    setFilterDateFrom('');
    setFilterDateTo('');
    setPage(0);
  };

  const getActionTypeColor = (actionType: string) => {
    switch (actionType) {
      case 'create':
        return '#7dc244';
      case 'update':
        return '#2879b6';
      case 'delete':
        return '#ee6a31';
      case 'login':
        return '#F59E21';
      case 'view':
        return '#58595B';
      default:
        return '#333842';
    }
  };

  const getActionTypeLabel = (actionType: string) => {
    return actionType.charAt(0).toUpperCase() + actionType.slice(1);
  };

  const formatDateTime = (iso: string | undefined) => {
    if (!iso) return '—';
    try {
      const d = new Date(iso);
      return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
    } catch {
      return iso;
    }
  };

  // Filter logs based on current filters
  // Filter logs based on current filters
  const filteredLogs = activityLogs.filter(log => {
    if (filterUser && !log.user.toLowerCase().includes(filterUser.toLowerCase())) return false;
    if (filterActionType !== 'all') {
      const action = log.action.toLowerCase();
      if (filterActionType === 'create' && !action.includes('creat')) return false;
      if (filterActionType === 'update' && !action.includes('updat')) return false;
      if (filterActionType === 'delete' && !action.includes('delet')) return false;
      if (filterActionType === 'login' && !action.includes('log')) return false;
      if (filterActionType === 'view' && !action.includes('view')) return false;
    }
    if (filterDateFrom && new Date(log.timestamp) < new Date(filterDateFrom)) return false;
    if (filterDateTo && new Date(log.timestamp) > new Date(filterDateTo)) return false;
    return true;
  });

  const paginatedLogs = filteredLogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Email Templates functions
  const getTemplateTypeLabel = (type: EmailTemplate['type']) => {
    switch (type) {
      case 'entry_not_created':
        return 'Entry Not Created';
      case 'entry_not_submitted':
        return 'Entry Not Submitted';
      case 'submission_to_manager':
        return 'Submission to Manager';
      case 'review_request':
        return 'Review Request';
      default:
        return type;
    }
  };

  const getTemplateTypeColor = (type: EmailTemplate['type']) => {
    switch (type) {
      case 'entry_not_created':
        return '#ee6a31';
      case 'entry_not_submitted':
        return '#F59E21';
      case 'submission_to_manager':
        return '#2879b6';
      case 'review_request':
        return '#7dc244';
      default:
        return '#333842';
    }
  };

  const getPlaceholdersForType = (type: EmailTemplate['type']): string[] => {
    const common = ['{{user_name}}', '{{date}}'];
    switch (type) {
      case 'entry_not_created':
        return common;
      case 'entry_not_submitted':
        return [...common, '{{entry_id}}'];
      case 'submission_to_manager':
        return [...common, '{{entry_id}}', '{{timestamp}}'];
      case 'review_request':
        return [...common, '{{entry_id}}', '{{review_comment}}'];
      default:
        return common;
    }
  };

  const handleOpenCreateTemplate = () => {
    setEditingTemplate(null);
    setTemplateName('');
    setTemplateType('entry_not_created');
    setTemplateSubject('');
    setTemplateBody('');
    setShowPreview(false);
    setOpenTemplateDialog(true);
  };

  const handleOpenEditTemplate = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setTemplateName(template.name);
    setTemplateType(template.type);
    setTemplateSubject(template.subject);
    setTemplateBody(template.body);
    setShowPreview(false);
    setOpenTemplateDialog(true);
  };

  const handleSaveTemplate = async () => {
    try {
      setSaving(true);
      const placeholders = getPlaceholdersForType(templateType);

      const templateData = {
        name: templateName,
        type: templateType,
        subject: templateSubject,
        body: templateBody,
        placeholders,
        isActive: true
      };

      if (editingTemplate) {
        await adminService.updateTemplate(editingTemplate.id, templateData);
        setMessage({ type: 'success', text: 'Template updated successfully!' });
      } else {
        await adminService.createTemplate(templateData);
        setMessage({ type: 'success', text: 'Template created successfully!' });
      }
      setOpenTemplateDialog(false);
      loadData();
    } catch (error) {
      console.error('Failed to save template', error);
      setMessage({ type: 'error', text: 'Failed to save template.' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDeleteTemplate = async (templateId: number) => {
    try {
      setSaving(true);
      await adminService.deleteTemplate(templateId);
      setMessage({ type: 'success', text: 'Template deleted successfully!' });
      loadData();
    } catch (error) {
      console.error('Failed to delete template', error);
      setMessage({ type: 'error', text: 'Failed to delete template.' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleToggleTemplateStatus = async (templateId: number) => {
    try {
      setSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setEmailTemplates(
        emailTemplates.map(t =>
          t.id === templateId ? { ...t, isActive: !t.isActive } : t
        )
      );
      setMessage({ type: 'success', text: 'Template status updated!' });
    } catch (error) {
      console.error('Failed to update template status', error);
      setMessage({ type: 'error', text: 'Failed to update template status.' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const insertPlaceholder = (placeholder: string) => {
    setTemplateBody(prev => prev + ' ' + placeholder);
  };

  const renderPreview = () => {
    let previewSubject = templateSubject;
    let previewBody = templateBody;

    // Replace placeholders with sample data
    const sampleData: Record<string, string> = {
      '{{user_name}}': 'John Doe',
      '{{date}}': '2024-01-15',
      '{{entry_id}}': '1234',
      '{{timestamp}}': '2024-01-15 14:30:00',
      '{{review_comment}}': 'Please update the biogas production values for Digester D-02.',
    };

    Object.entries(sampleData).forEach(([placeholder, value]) => {
      previewSubject = previewSubject.replace(new RegExp(placeholder, 'g'), value);
      previewBody = previewBody.replace(new RegExp(placeholder, 'g'), value);
    });

    return (
      <Box sx={{ mt: 2, p: 2, backgroundColor: 'rgba(40, 121, 182, 0.05)', borderRadius: '12px' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2879b6', mb: 1 }}>
          Preview
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
          Subject: {previewSubject}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
          {previewBody}
        </Typography>
      </Box>
    );
  };

  // Scheduler state
  const [schedulerActive, setSchedulerActive] = useState(true);
  const [testingNotification, setTestingNotification] = useState(false);
  const [openSchedulerDialog, setOpenSchedulerDialog] = useState(false);
  const [editingScheduler, setEditingScheduler] = useState<SchedulerConfig | null>(null);
  const [schedulerNotificationType, setSchedulerNotificationType] = useState<SchedulerConfig['notificationType']>('entry_not_created');
  const [schedulerCheckTime, setSchedulerCheckTime] = useState('09:00');
  const [schedulerRecipientRoles, setSchedulerRecipientRoles] = useState<string[]>(['Operator']);
  const [schedulerReminderFrequency, setSchedulerReminderFrequency] = useState<'once' | 'daily' | 'hourly'>('once');
  const [schedulerTemplateId, setSchedulerTemplateId] = useState(1);

  // Scheduler functions
  const getNotificationTypeLabel = (type: SchedulerConfig['notificationType']) => {
    switch (type) {
      case 'entry_not_created':
        return 'Entry Not Created';
      case 'entry_not_submitted':
        return 'Entry Not Submitted';
      case 'submission_to_manager':
        return 'Submission to Manager';
      case 'review_request':
        return 'Review Request';
      default:
        return type;
    }
  };

  const getNotificationTypeColor = (type: SchedulerConfig['notificationType']) => {
    switch (type) {
      case 'entry_not_created':
        return '#ee6a31';
      case 'entry_not_submitted':
        return '#F59E21';
      case 'submission_to_manager':
        return '#2879b6';
      case 'review_request':
        return '#7dc244';
      default:
        return '#333842';
    }
  };

  const handleToggleScheduler = async () => {
    try {
      setSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setSchedulerActive(!schedulerActive);
      setMessage({
        type: 'success',
        text: schedulerActive ? 'Scheduler deactivated!' : 'Scheduler activated!'
      });
    } catch (error) {
      console.error('Failed to toggle scheduler', error);
      setMessage({ type: 'error', text: 'Failed to toggle scheduler.' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleTestNotification = async (config: SchedulerConfig) => {
    try {
      setTestingNotification(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessage({
        type: 'success',
        text: `Test notification sent for ${getNotificationTypeLabel(config.notificationType)}!`
      });
    } catch (error) {
      console.error('Failed to send test notification', error);
      setMessage({ type: 'error', text: 'Failed to send test notification.' });
    } finally {
      setTestingNotification(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleToggleSchedulerConfig = async (configId: number) => {
    try {
      setSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setSchedulerConfigs(
        (schedulerConfigs || []).map(config =>
          config.id === configId ? { ...config, isEnabled: !config.isEnabled } : config
        )
      );
      setMessage({ type: 'success', text: 'Notification status updated!' });
    } catch (error) {
      console.error('Failed to update notification status', error);
      setMessage({ type: 'error', text: 'Failed to update notification status.' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleOpenEditScheduler = (config: SchedulerConfig) => {
    setEditingScheduler(config);
    setSchedulerNotificationType(config.notificationType);
    setSchedulerCheckTime(config.checkTime);
    setSchedulerRecipientRoles(Array.isArray(config.recipientRoles) ? config.recipientRoles : []);
    setSchedulerReminderFrequency(config.reminderFrequency);
    setSchedulerTemplateId(config.templateId);
    setOpenSchedulerDialog(true);
  };

  const handleSaveSchedulerConfig = async () => {
    try {
      setSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (editingScheduler) {
        setSchedulerConfigs(
          (schedulerConfigs || []).map(config =>
            config.id === editingScheduler.id
              ? {
                ...config,
                checkTime: schedulerCheckTime,
                recipientRoles: schedulerRecipientRoles,
                reminderFrequency: schedulerReminderFrequency,
                templateId: schedulerTemplateId,
              }
              : config
          )
        );
        setMessage({ type: 'success', text: 'Scheduler configuration updated!' });
      }
      setOpenSchedulerDialog(false);
    } catch (error) {
      console.error('Failed to save scheduler config', error);
      setMessage({ type: 'error', text: 'Failed to save scheduler configuration.' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleRoleToggle = (role: string) => {
    setSchedulerRecipientRoles(prev => {
      const cur = Array.isArray(prev) ? prev : [];
      return cur.includes(role) ? cur.filter(r => r !== role) : [...cur, role];
    });
  };

  return (
    <Layout>
      <Box className="aos-fade-up">
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#2879b6', mb: 3 }}>
          Admin Panel
        </Typography>

        <Card className="glass-card-strong" sx={{ borderRadius: '20px', overflow: 'hidden' }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              background: 'linear-gradient(135deg, rgba(40, 121, 182, 0.05) 0%, rgba(125, 194, 68, 0.05) 100%)',
            }}
          >
            <Tabs
              value={tabValue}
              onChange={(_, newValue) => setTabValue(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                },
                '& .Mui-selected': {
                  color: '#2879b6',
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#2879b6',
                  height: 3,
                  borderRadius: '3px 3px 0 0',
                },
              }}
            >
              <Tab label="User Management" />
              <Tab label="User Activity Logs" />
              <Tab label="Email Templates" />
              <Tab label="SMTP Configuration" />
              {/* Scheduler Configuration tab hidden for now */}
              <Tab label="MIS Entry Email" />
              <Tab label="Final MIS Report Email" />
            </Tabs>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
            <Typography sx={{ fontWeight: 600 }}>Theme:</Typography>
            <TextField
              select
              size="small"
              value={selectedThemeKey}
              onChange={(e) => setSelectedThemeKey(e.target.value)}
              sx={{ minWidth: 220 }}
            >
              {Object.values(themePresets).map((p: any) => (
                <MenuItem key={p.key} value={p.key}>{p.name}</MenuItem>
              ))}
            </TextField>
            <Button variant="contained" onClick={handleSaveTheme} disabled={saving} sx={{ textTransform: 'none' }}>
              Save Theme
            </Button>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#333842' }}>
                  Users
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleOpenCreateUser}
                  className="btn-gradient-success"
                size={isPhone ? 'large' : 'medium'}
                fullWidth={isPhone}
                sx={{
                  textTransform: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  whiteSpace: 'nowrap',
                  minHeight: isPhone ? 48 : undefined,
                }}
                >
                  Create User
                </Button>
              </Box>

              <TableContainer component={Paper} className="glass-card" sx={{ borderRadius: '16px', boxShadow: 'none', display: { xs: 'none', md: 'block' } }}>
                <Table>
                  <TableHead sx={{ background: 'linear-gradient(135deg, rgba(40, 121, 182, 0.1) 0%, rgba(125, 194, 68, 0.1) 100%)' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>Role</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#2879b6' }} align="right">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map(user => (
                      <TableRow key={user.id} className="hover-lift" sx={{ transition: 'all 0.3s ease' }}>
                        <TableCell sx={{ fontWeight: 500 }}>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{typeof user.role === 'string' ? user.role : user.role?.name}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={() => handleOpenEditUser(user)}
                            sx={{
                              color: '#7dc244',
                              backgroundColor: 'rgba(125, 194, 68, 0.1)',
                              borderRadius: '10px',
                              mr: 1,
                              '&:hover': { backgroundColor: 'rgba(125, 194, 68, 0.2)' },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteUser(user.id)}
                            sx={{
                              color: '#ee6a31',
                              backgroundColor: 'rgba(238, 106, 49, 0.1)',
                              borderRadius: '10px',
                              '&:hover': { backgroundColor: 'rgba(238, 106, 49, 0.2)' },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Mobile list for users */}
              <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 2 }}>
                {users.map((u) => (
                  <Card key={`user-mobile-${u.id}`} variant="outlined" sx={{ mb: 2, p: 2, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography sx={{ fontWeight: 700 }}>{u.name}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{u.email}</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>{typeof u.role === 'string' ? u.role : u.role?.name}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" onClick={() => handleOpenEditUser(u)}><EditIcon /></IconButton>
                        <IconButton size="small" onClick={() => handleOpenDeleteUser(u)}><DeleteIcon /></IconButton>
                      </Box>
                    </Box>
                  </Card>
                ))}
              </Box>

              {/* Mobile Card List View for Users */}
              <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 2 }}>
                {users.map(user => (
                  <Card key={user.id} variant="outlined" sx={{ borderRadius: '16px', p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6" fontWeight={600}>{user.name}</Typography>
                      <Chip label={typeof user.role === 'string' ? user.role : user.role?.name} size="small" color="primary" variant="outlined" />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{user.email}</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button variant="outlined" size="small" fullWidth onClick={() => handleOpenEditUser(user)}>Edit</Button>
                      <Button variant="outlined" size="small" color="error" fullWidth onClick={() => handleDeleteUser(user.id)}>Deactivate</Button>
                    </Box>
                  </Card>
                ))}
              </Box>
            </CardContent>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#333842' }}>
                  User Activity Logs
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={loading ? <CircularProgress size={20} /> : <RefreshIcon />}
                    onClick={handleRefreshLogs}
                    disabled={loading}
                    sx={{
                      textTransform: 'none',
                      borderRadius: '12px',
                      borderColor: '#2879b6',
                      color: '#2879b6',
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        borderColor: '#2879b6',
                        backgroundColor: 'rgba(40, 121, 182, 0.05)',
                      },
                    }}
                  >
                    Refresh
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<FileDownloadIcon />}
                    onClick={handleExportLogs}
                    className="btn-gradient-success"
                    sx={{
                      textTransform: 'none',
                      borderRadius: '12px',
                      color: '#fff',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Export Logs
                  </Button>
                </Box>
              </Box>

              {message && (
                <Alert
                  severity={message.type}
                  sx={{
                    mb: 2,
                    borderRadius: '12px',
                    '&.MuiAlert-standardSuccess': {
                      backgroundColor: 'rgba(125, 194, 68, 0.1)',
                      color: '#139B49',
                    },
                  }}
                >
                  {message.text}
                </Alert>
              )}

              {/* Filters */}
              <Card className="glass-card" sx={{ borderRadius: '16px', mb: 3, p: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333842', mb: 2 }}>
                  Filters
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Search User"
                      placeholder="Enter user name"
                      value={filterUser}
                      onChange={(e) => setFilterUser(e.target.value)}
                      size="small"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      select
                      label="Action Type"
                      value={filterActionType}
                      onChange={(e) => setFilterActionType(e.target.value)}
                      size="small"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    >
                      <MenuItem value="all">All Actions</MenuItem>
                      <MenuItem value="create">Create</MenuItem>
                      <MenuItem value="update">Update</MenuItem>
                      <MenuItem value="delete">Delete</MenuItem>
                      <MenuItem value="login">Login</MenuItem>
                      <MenuItem value="view">View</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2}>
                    <TextField
                      fullWidth
                      label="Date From"
                      type="date"
                      value={filterDateFrom}
                      onChange={(e) => setFilterDateFrom(e.target.value)}
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={2}>
                    <TextField
                      fullWidth
                      label="Date To"
                      type="date"
                      value={filterDateTo}
                      onChange={(e) => setFilterDateTo(e.target.value)}
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        onClick={handleApplyFilters}
                        className="btn-gradient-primary"
                        sx={{
                          textTransform: 'none',
                          borderRadius: '12px',
                          color: '#fff',
                          whiteSpace: 'nowrap',
                          flex: 1,
                        }}
                      >
                        Apply
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={handleResetFilters}
                        sx={{
                          textTransform: 'none',
                          borderRadius: '12px',
                          borderColor: '#58595B',
                          color: '#58595B',
                          whiteSpace: 'nowrap',
                          '&:hover': {
                            borderColor: '#58595B',
                            backgroundColor: 'rgba(88, 89, 91, 0.05)',
                          },
                        }}
                      >
                        Reset
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Card>

              {/* Login sessions: Last Login, Login time, Logout time, Session duration */}
              {sessions.length > 0 && (
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333842', mt: 3, mb: 1.5 }}>
                  Login sessions (active session time)
                </Typography>
              )}
              {sessions.length > 0 && (
                <TableContainer component={Paper} className="glass-card" sx={{ borderRadius: '16px', boxShadow: 'none', mb: 3, overflowX: 'auto' }}>
                  <Table size="small" sx={{ minWidth: 650 }}>
                    <TableHead sx={{ background: 'linear-gradient(135deg, rgba(40, 121, 182, 0.1) 0%, rgba(125, 194, 68, 0.1) 100%)' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>User</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>Last Login</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>Login Time</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>Logout Time</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>Session Duration</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>Device</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>IP</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sessions.slice(0, 20).map((s, idx) => (
                        <TableRow key={`session-${s.userId}-${idx}`} className="hover-lift">
                          <TableCell sx={{ fontWeight: 500 }}>{s.userName}</TableCell>
                          <TableCell sx={{ fontSize: '0.875rem', color: '#58595B' }}>{formatDateTime(s.lastLogin)}</TableCell>
                          <TableCell sx={{ fontSize: '0.875rem', color: '#58595B' }}>{formatDateTime(s.loginTime)}</TableCell>
                          <TableCell sx={{ fontSize: '0.875rem', color: '#58595B' }}>{formatDateTime(s.logoutTime)}</TableCell>
                          <TableCell sx={{ fontSize: '0.875rem', color: '#333842' }}>
                            {s.sessionDurationMinutes >= 60
                              ? `${Math.floor(s.sessionDurationMinutes / 60)}h ${s.sessionDurationMinutes % 60}m`
                              : `${s.sessionDurationMinutes} min`}
                          </TableCell>
                          <TableCell sx={{ fontSize: '0.875rem', color: '#58595B' }}>{s.device || '-'}</TableCell>
                          <TableCell sx={{ fontSize: '0.875rem', color: '#58595B' }}>{s.ipAddress || '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {/* Activity Logs Table */}
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333842', mb: 1.5 }}>
                Activity log
              </Typography>
              {isPhone ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {paginatedLogs.length > 0 ? (
                    paginatedLogs.map((log) => (
                      <Card key={log.id} variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{log.user}</Typography>
                          <Chip label={log.action} size="small" sx={{ fontWeight: 600 }} />
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>{log.entity}</Typography>
                        <Typography variant="body2" sx={{ color: '#58595B', mb: 1 }}>{log.description}</Typography>
                        {log.changes && log.changes.length > 0 && (
                          <Box sx={{ mt: 1 }}>
                            {log.changes.map((change, i) => (
                              <Typography key={i} variant="caption" display="block" sx={{ color: '#58595B' }}>
                                {change.field}: <span style={{ textDecoration: 'line-through', color: '#9e9e9e' }}>{change.from}</span> → <span style={{ fontWeight: 600, color: '#2e7d32' }}>{change.to}</span>
                              </Typography>
                            ))}
                          </Box>
                        )}
                        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>{log.timestamp}</Typography>
                      </Card>
                    ))
                  ) : (
                    <Typography color="text.secondary">No activity logs found</Typography>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                    <Button onClick={() => handleChangePage(null as any, Math.max(0, page - 1))} disabled={page === 0} sx={{ mr: 1 }} size="small">Prev</Button>
                    <Button onClick={() => handleChangePage(null as any, page + 1)} disabled={(page + 1) * rowsPerPage >= filteredLogs.length} size="small">Next</Button>
                  </Box>
                </Box>
              ) : (
                <TableContainer component={Paper} className="glass-card" sx={{ borderRadius: '16px', boxShadow: 'none', overflowX: 'auto' }}>
                  <Table sx={{ minWidth: 800 }}>
                    <TableHead sx={{ background: 'linear-gradient(135deg, rgba(40, 121, 182, 0.1) 0%, rgba(125, 194, 68, 0.1) 100%)' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>User</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>Action</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>Entity</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>Description</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>Timestamp</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedLogs.length > 0 ? (
                        paginatedLogs.map((log) => (
                          <TableRow key={log.id} className="hover-lift" sx={{ transition: 'all 0.3s ease' }}>
                            <TableCell sx={{ fontWeight: 500 }}>{log.user}</TableCell>
                            <TableCell>
                              <Chip
                                label={log.action}
                                size="small"
                                sx={{
                                  fontWeight: 600,
                                  borderRadius: '8px',
                                  backgroundColor: log.action.toLowerCase().includes('delete') ? '#ffebee' :
                                    log.action.toLowerCase().includes('create') ? '#e8f5e9' :
                                      log.action.toLowerCase().includes('update') ? '#e3f2fd' : '#f5f5f5',
                                  color: log.action.toLowerCase().includes('delete') ? '#d32f2f' :
                                    log.action.toLowerCase().includes('create') ? '#2e7d32' :
                                      log.action.toLowerCase().includes('update') ? '#1976d2' : '#616161'
                                }}
                              />
                            </TableCell>
                            <TableCell sx={{ fontWeight: 500 }}>{log.entity}</TableCell>
                            <TableCell sx={{ fontSize: '0.875rem', color: '#58595B' }}>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>{log.description}</Typography>
                              {log.changes && log.changes.length > 0 && (
                                <Box component="ul" sx={{ m: 0, pl: 2, mt: 0.5 }}>
                                  {log.changes.map((change, i) => (
                                    <Typography component="li" key={i} variant="caption" display="list-item" sx={{ color: '#58595B' }}>
                                      {change.field}: <span style={{ textDecoration: 'line-through', color: '#9e9e9e' }}>{change.from}</span> &rarr; <span style={{ fontWeight: 600, color: '#2e7d32' }}>{change.to}</span>
                                    </Typography>
                                  ))}
                                </Box>
                              )}
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.875rem', color: '#58595B' }}>{log.timestamp}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} align="center" sx={{ py: 4, color: '#58595B' }}>
                            No activity logs found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={filteredLogs.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                      borderTop: '1px solid rgba(40, 121, 182, 0.1)',
                      '& .MuiTablePagination-toolbar': {
                        paddingLeft: 2,
                        paddingRight: 2,
                      },
                    }}
                  />
                </TableContainer>
              )}
            </CardContent>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <CardContent sx={{ p: 3 }}>
              <ErrorBoundary>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#333842' }}>
                  Email Templates
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleOpenCreateTemplate}
                  className="btn-gradient-success"
                  sx={{
                    textTransform: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Create Template
                </Button>
              </Box>

              {message && (
                <Alert
                  severity={message.type}
                  sx={{
                    mb: 2,
                    borderRadius: '12px',
                    '&.MuiAlert-standardSuccess': {
                      backgroundColor: 'rgba(125, 194, 68, 0.1)',
                      color: '#139B49',
                    },
                  }}
                >
                  {message.text}
                </Alert>
              )}

              {/* Mobile SMTP card (phone only) */}
              <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
                <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1, color: '#2879b6' }}>
                    SMTP Settings
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Configure mail server used for notifications. Save then Send Test to verify.
                  </Typography>
                  <TextField fullWidth label="SMTP Host" value={smtpHost} onChange={(e) => setSmtpHost(e.target.value)} sx={{ mb: 1 }} />
                  <TextField fullWidth label="SMTP Port" value={smtpPort} onChange={(e) => setSmtpPort(e.target.value)} sx={{ mb: 1 }} />
                  <TextField fullWidth label="Username" value={smtpUser} onChange={(e) => setSmtpUser(e.target.value)} sx={{ mb: 1 }} />
                  <TextField fullWidth label="Password" type="password" value={smtpPass} onChange={(e) => setSmtpPass(e.target.value)} sx={{ mb: 1 }} />
                  <TextField fullWidth label="From Email" value={smtpFromEmail} onChange={(e) => setSmtpFromEmail(e.target.value)} sx={{ mb: 1 }} />
                  <TextField fullWidth label="From Name" value={smtpFromName} onChange={(e) => setSmtpFromName(e.target.value)} sx={{ mb: 1 }} />
                  <FormControlLabel control={<Checkbox checked={smtpSecure} onChange={(e) => setSmtpSecure(e.target.checked)} sx={{ color: '#2879b6' }} />} label="Use TLS/SSL (secure)" />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                    <Button variant="contained" onClick={handleSaveSMTP} disabled={saving} fullWidth size="large" sx={{ borderRadius: '12px' }}>
                      {saving ? 'Saving…' : 'Save SMTP Settings'}
                    </Button>
                    <TextField size="small" label="Test recipient email" placeholder="test@example.com" value={smtpTestTo} onChange={(e) => setSmtpTestTo(e.target.value)} sx={{ mt: 1 }} />
                    <Button variant="outlined" onClick={handleTestSMTP} disabled={smtpTesting || !smtpTestTo?.trim()} fullWidth size="large" sx={{ borderRadius: '12px' }}>
                      {smtpTesting ? 'Sending…' : 'Send Test Email'}
                    </Button>
                  </Box>
                </Card>
              </Box>

              <Grid container spacing={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
                {emailTemplates.map((template, index) => (
                  <Grid item xs={12} md={6} key={template.id}>
                    <Card
                      className="glass-card hover-lift"
                      sx={{
                        borderRadius: '16px',
                        p: 2.5,
                        transition: 'all 0.3s ease',
                        borderLeft: `4px solid ${getTemplateTypeColor(template.type)}`,
                      }}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333842', mb: 0.5 }}>
                            {template.name}
                          </Typography>
                          <Chip
                            label={getTemplateTypeLabel(template.type)}
                            size="small"
                            sx={{
                              backgroundColor: `${getTemplateTypeColor(template.type)}15`,
                              color: getTemplateTypeColor(template.type),
                              fontWeight: 600,
                              borderRadius: '8px',
                            }}
                          />
                        </Box>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={template.isActive}
                              onChange={() => handleToggleTemplateStatus(template.id)}
                              sx={{
                                color: '#7dc244',
                                '&.Mui-checked': { color: '#7dc244' },
                              }}
                            />
                          }
                          label="Active"
                          sx={{ m: 0 }}
                        />
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#58595B', mb: 0.5 }}>
                          Subject:
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#333842' }}>
                          {template.subject}
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#58595B', mb: 0.5 }}>
                          Placeholders:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {(template.placeholders || []).map(placeholder => (
                            <Chip
                              key={placeholder}
                              label={placeholder}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(40, 121, 182, 0.1)',
                                color: '#2879b6',
                                fontSize: '0.75rem',
                                height: '24px',
                              }}
                            />
                          ))}
                        </Box>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ color: '#58595B' }}>
                          Updated: {template.updatedAt}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleOpenEditTemplate(template)}
                            sx={{
                              color: '#2879b6',
                              backgroundColor: 'rgba(40, 121, 182, 0.1)',
                              borderRadius: '10px',
                              '&:hover': { backgroundColor: 'rgba(40, 121, 182, 0.2)' },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteTemplate(template.id)}
                            sx={{
                              color: '#ee6a31',
                              backgroundColor: 'rgba(238, 106, 49, 0.1)',
                              borderRadius: '10px',
                              '&:hover': { backgroundColor: 'rgba(238, 106, 49, 0.2)' },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              {/* Mobile list for email templates */}
              <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 2 }}>
                {emailTemplates.map((template) => (
                  <Card key={`tmpl-mobile-${template.id}`} variant="outlined" sx={{ mb: 2, p: 2, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography sx={{ fontWeight: 700 }}>{template.name}</Typography>
                        <Chip label={getTemplateTypeLabel(template.type)} size="small" sx={{ mt: 1 }} />
                        <Typography variant="body2" sx={{ mt: 1 }}>{template.subject}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" onClick={() => handleOpenEditTemplate(template)}><EditIcon /></IconButton>
                        <IconButton size="small" onClick={() => handleDeleteTemplate(template.id)}><DeleteIcon /></IconButton>
                      </Box>
                    </Box>
                  </Card>
                ))}
              </Box>
              </ErrorBoundary>
            </CardContent>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <CardContent sx={{ p: 3 }}>
              <ErrorBoundary>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#333842' }}>
                SMTP Settings
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Configure the mail server used for notifications and test emails. Save your settings, then use &quot;Send Test Email&quot; to verify.
              </Typography>
              {message && (
                <Alert
                  severity={message.type}
                  sx={{
                    mb: 2,
                    borderRadius: '12px',
                    '&.MuiAlert-standardSuccess': { backgroundColor: 'rgba(125, 194, 68, 0.1)', color: '#139B49' },
                  }}
                >
                  {message.text}
                </Alert>
              )}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="SMTP Host"
                    required
                    placeholder="smtp.gmail.com"
                    value={smtpHost}
                    onChange={(e) => setSmtpHost(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="SMTP Port"
                    type="number"
                    required
                    placeholder="587"
                    value={smtpPort}
                    onChange={(e) => setSmtpPort(e.target.value)}
                    inputProps={{ min: 1, max: 65535 }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Username"
                    required
                    placeholder="user@example.com"
                    value={smtpUser}
                    onChange={(e) => setSmtpUser(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    placeholder={smtpId ? 'Leave blank to keep current' : ''}
                    value={smtpPass}
                    onChange={(e) => setSmtpPass(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="From Email"
                    required
                    placeholder="noreply@example.com"
                    value={smtpFromEmail}
                    onChange={(e) => setSmtpFromEmail(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="From Name"
                    placeholder="Biogas MIS"
                    value={smtpFromName}
                    onChange={(e) => setSmtpFromName(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={smtpSecure}
                        onChange={(e) => setSmtpSecure(e.target.checked)}
                        sx={{ color: '#2879b6', '&.Mui-checked': { color: '#2879b6' } }}
                      />
                    }
                    label="Use TLS/SSL (secure)"
                  />
                </Grid>
                <Grid item xs={12} sm={6} />
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      onClick={handleSaveSMTP}
                      disabled={saving}
                      startIcon={saving ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : null}
                      className="btn-gradient-primary"
                      sx={{ textTransform: 'none', borderRadius: '12px', px: 4, color: '#fff', whiteSpace: 'nowrap' }}
                    >
                      {saving ? 'Saving…' : 'Save SMTP Settings'}
                    </Button>
                    <TextField
                      size="small"
                      label="Test recipient email"
                      placeholder="test@example.com"
                      value={smtpTestTo}
                      onChange={(e) => setSmtpTestTo(e.target.value)}
                      sx={{ minWidth: 220, '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    />
                    <Button
                      variant="outlined"
                      onClick={handleTestSMTP}
                      disabled={smtpTesting || !smtpTestTo?.trim()}
                      startIcon={smtpTesting ? <CircularProgress size={20} /> : null}
                      sx={{
                        textTransform: 'none',
                        borderRadius: '12px',
                        borderColor: '#2879b6',
                        color: '#2879b6',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {smtpTesting ? 'Sending…' : 'Send Test Email'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              </ErrorBoundary>
            </CardContent>
          </TabPanel>

          {false && (<TabPanel value={tabValue} index={4}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#333842' }}>
                    Notification Scheduler
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#58595B', mt: 0.5 }}>
                    Configure automated email notifications for MIS workflow
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#58595B' }}>
                      Scheduler Status:
                    </Typography>
                    <Chip
                      label={schedulerActive ? 'Active' : 'Inactive'}
                      size="small"
                      sx={{
                        backgroundColor: schedulerActive ? 'rgba(125, 194, 68, 0.15)' : 'rgba(238, 106, 49, 0.15)',
                        color: schedulerActive ? '#7dc244' : '#ee6a31',
                        fontWeight: 600,
                        borderRadius: '8px',
                      }}
                    />
                  </Box>
                  <Button
                    variant={schedulerActive ? 'outlined' : 'contained'}
                    onClick={handleToggleScheduler}
                    disabled={saving}
                    className={schedulerActive ? '' : 'btn-gradient-success'}
                    sx={{
                      textTransform: 'none',
                      borderRadius: '12px',
                      whiteSpace: 'nowrap',
                      ...(schedulerActive && {
                        borderColor: '#ee6a31',
                        color: '#ee6a31',
                        '&:hover': {
                          borderColor: '#ee6a31',
                          backgroundColor: 'rgba(238, 106, 49, 0.05)',
                        },
                      }),
                      ...(schedulerActive ? {} : { color: '#fff' }),
                    }}
                  >
                    {schedulerActive ? 'Deactivate Scheduler' : 'Activate Scheduler'}
                  </Button>
                </Box>
              </Box>

              {message && (
                <Alert
                  severity={message.type}
                  sx={{
                    mb: 2,
                    borderRadius: '12px',
                    '&.MuiAlert-standardSuccess': {
                      backgroundColor: 'rgba(125, 194, 68, 0.1)',
                      color: '#139B49',
                    },
                  }}
                >
                  {message.text}
                </Alert>
              )}

              {/* Workflow Diagram */}
              <Card
                className="glass-card"
                sx={{
                  borderRadius: '16px',
                  p: 3,
                  mb: 3,
                  borderLeft: '4px solid #2879b6',
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333842', mb: 2 }}>
                  MIS Entry Workflow
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Chip
                    label="1. Entry Created"
                    sx={{
                      backgroundColor: 'rgba(40, 121, 182, 0.1)',
                      color: '#2879b6',
                      fontWeight: 600,
                    }}
                  />
                  <Typography sx={{ color: '#58595B' }}>→</Typography>
                  <Chip
                    label="2. Entry Submitted"
                    sx={{
                      backgroundColor: 'rgba(125, 194, 68, 0.1)',
                      color: '#7dc244',
                      fontWeight: 600,
                    }}
                  />
                  <Typography sx={{ color: '#58595B' }}>→</Typography>
                  <Chip
                    label="3. Manager Review"
                    sx={{
                      backgroundColor: 'rgba(245, 158, 33, 0.1)',
                      color: '#F59E21',
                      fontWeight: 600,
                    }}
                  />
                  <Typography sx={{ color: '#58595B' }}>→</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Chip
                      label="✓ Approve → Consolidated MIS"
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(19, 155, 73, 0.1)',
                        color: '#139B49',
                        fontWeight: 600,
                      }}
                    />
                    <Chip
                      label="✗ Send Back with Comment"
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(238, 106, 49, 0.1)',
                        color: '#ee6a31',
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                </Box>
              </Card>

              {/* Notification Configurations */}
              <Grid container spacing={3}>
                {(schedulerConfigs || []).map((config, index) => {
                  const template = emailTemplates.find(t => t.id === config.templateId);
                  return (
                    <Grid item xs={12} md={6} key={config.id}>
                      <Card
                        className="glass-card hover-lift"
                        sx={{
                          borderRadius: '16px',
                          p: 2.5,
                          transition: 'all 0.3s ease',
                          borderLeft: `4px solid ${getNotificationTypeColor(config.notificationType)}`,
                        }}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333842', mb: 0.5 }}>
                              {getNotificationTypeLabel(config.notificationType)}
                            </Typography>
                            <Chip
                              label={config.isEnabled ? 'Enabled' : 'Disabled'}
                              size="small"
                              sx={{
                                backgroundColor: config.isEnabled
                                  ? 'rgba(125, 194, 68, 0.15)'
                                  : 'rgba(88, 89, 91, 0.15)',
                                color: config.isEnabled ? '#7dc244' : '#58595B',
                                fontWeight: 600,
                                borderRadius: '8px',
                              }}
                            />
                          </Box>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={config.isEnabled}
                                onChange={() => handleToggleSchedulerConfig(config.id)}
                                sx={{
                                  color: '#7dc244',
                                  '&.Mui-checked': { color: '#7dc244' },
                                }}
                              />
                            }
                            label=""
                            sx={{ m: 0 }}
                          />
                        </Box>

                        <Grid container spacing={2} sx={{ mb: 2 }}>
                          <Grid item xs={6}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#58595B', mb: 0.5 }}>
                              Check Time:
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#333842' }}>
                              {config.checkTime}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#58595B', mb: 0.5 }}>
                              Frequency:
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#333842', textTransform: 'capitalize' }}>
                              {config.reminderFrequency}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#58595B', mb: 0.5 }}>
                            Recipients:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {(config.recipientRoles || []).map(role => (
                              <Chip
                                key={role}
                                label={role}
                                size="small"
                                sx={{
                                  backgroundColor: 'rgba(40, 121, 182, 0.1)',
                                  color: '#2879b6',
                                  fontSize: '0.75rem',
                                  height: '24px',
                                }}
                              />
                            ))}
                          </Box>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#58595B', mb: 0.5 }}>
                            Email Template:
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#333842' }}>
                            {template?.name || 'Not assigned'}
                          </Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleOpenEditScheduler(config)}
                            sx={{
                              textTransform: 'none',
                              borderRadius: '10px',
                              borderColor: '#2879b6',
                              color: '#2879b6',
                              flex: 1,
                              whiteSpace: 'nowrap',
                              '&:hover': {
                                borderColor: '#2879b6',
                                backgroundColor: 'rgba(40, 121, 182, 0.05)',
                              },
                            }}
                          >
                            <EditIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            Configure
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleTestNotification(config)}
                            disabled={testingNotification || !config.isEnabled}
                            sx={{
                              textTransform: 'none',
                              borderRadius: '10px',
                              borderColor: '#7dc244',
                              color: '#7dc244',
                              flex: 1,
                              whiteSpace: 'nowrap',
                              '&:hover': {
                                borderColor: '#7dc244',
                                backgroundColor: 'rgba(125, 194, 68, 0.05)',
                              },
                            }}
                          >
                            {testingNotification ? (
                              <CircularProgress size={16} sx={{ mr: 0.5 }} />
                            ) : (
                              <RefreshIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            )}
                            Test
                          </Button>
                        </Box>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </TabPanel>)}

          <TabPanel value={tabValue} index={4}>
            <CardContent sx={{ p: 3 }}>
              <MISEntryEmailPanel
                formConfig={formConfig}
                message={message}
                setMessage={setMessage}
              />
            </CardContent>
          </TabPanel>
          <TabPanel value={tabValue} index={5}>
            <CardContent sx={{ p: 3 }}>
              <FinalMISReportEmailPanel message={message} setMessage={setMessage} />
            </CardContent>
          </TabPanel>
        </Card>
      </Box>

      {/* Create/Edit User Dialog with Permissions */}
      <Dialog
        open={openUserDialog}
        onClose={() => setOpenUserDialog(false)}
        maxWidth="md"
        fullWidth
        TransitionComponent={Transition}
        fullScreen={isPhone}
        PaperProps={{ sx: { borderRadius: isPhone ? 0 : '20px' } }}
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            color: '#2879b6',
            background: 'linear-gradient(135deg, rgba(40, 121, 182, 0.05) 0%, rgba(125, 194, 68, 0.05) 100%)',
          }}
        >
          {editingUser ? 'Edit User' : 'Create New User'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {message && (
            <Alert
              severity={message.type}
              sx={{
                mb: 2,
                borderRadius: '12px',
                '&.MuiAlert-standardSuccess': {
                  backgroundColor: 'rgba(125, 194, 68, 0.1)',
                  color: '#139B49',
                },
              }}
            >
              {message.text}
            </Alert>
          )}
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  required={!editingUser}
                  placeholder={editingUser ? 'Leave blank to keep current' : ''}
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Role"
                  value={selectedRole}
                  onChange={e => handleRoleChange(e.target.value)}
                  required
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Operator">Operator</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333842', mb: 0.5 }}>
              User Permissions
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Assign access per page for this user. These permissions apply only to this user and are the primary way to manage access.
            </Typography>

            <TableContainer component={Paper} className="glass-card" sx={{ borderRadius: '16px', boxShadow: 'none', display: { xs: 'none', md: 'block' } }}>
              <Table size="small">
                <TableHead sx={{ background: 'linear-gradient(135deg, rgba(40, 121, 182, 0.1) 0%, rgba(125, 194, 68, 0.1) 100%)' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>Page</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700, color: '#2879b6' }}>
                      Read
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700, color: '#7dc244' }}>
                      Create
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700, color: '#F59E21' }}>
                      Update
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700, color: '#ee6a31' }}>
                      Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userPermissions.map((perm, index) => (
                    <TableRow key={perm.page}>
                      <TableCell sx={{ fontWeight: 500 }}>{perm.page}</TableCell>
                      <TableCell align="center">
                        <Checkbox
                          checked={perm.read}
                          onChange={() => handlePermissionChange(index, 'read')}
                          size="small"
                          sx={{ color: '#2879b6', '&.Mui-checked': { color: '#2879b6' } }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox
                          checked={perm.create}
                          onChange={() => handlePermissionChange(index, 'create')}
                          size="small"
                          sx={{ color: '#7dc244', '&.Mui-checked': { color: '#7dc244' } }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox
                          checked={perm.update}
                          onChange={() => handlePermissionChange(index, 'update')}
                          size="small"
                          sx={{ color: '#F59E21', '&.Mui-checked': { color: '#F59E21' } }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox
                          checked={perm.delete}
                          onChange={() => handlePermissionChange(index, 'delete')}
                          size="small"
                          sx={{ color: '#ee6a31', '&.Mui-checked': { color: '#ee6a31' } }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Mobile Stacked List for Permissions */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 2 }}>
              {userPermissions.map((perm, index) => (
                <Card key={perm.page} variant="outlined" sx={{ borderRadius: '12px', p: 2 }}>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1, color: '#2879b6' }}>
                    {perm.page}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {['read', 'create', 'update', 'delete'].map((action) => (
                      <Box key={action} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>{action}</Typography>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={(perm as any)[action]}
                              onChange={() => handlePermissionChange(index, action as any)}
                              size="medium"
                              sx={{ p: 0.5, color: action === 'read' ? '#2879b6' : action === 'create' ? '#7dc244' : action === 'update' ? '#F59E21' : '#ee6a31', '&.Mui-checked': { color: action === 'read' ? '#2879b6' : action === 'create' ? '#7dc244' : action === 'update' ? '#F59E21' : '#ee6a31' } }}
                            />
                          }
                          label=""
                          sx={{ m: 0 }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Card>
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, flexDirection: isPhone ? 'column' : 'row', gap: isPhone ? 1 : 0 }}>
          <Button onClick={() => setOpenUserDialog(false)} sx={{ textTransform: 'none', color: '#58595B', borderRadius: '12px' }} fullWidth={isPhone}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveUser}
            className="btn-gradient-success"
            fullWidth={isPhone}
            size={isPhone ? 'large' : 'medium'}
            sx={{
              textTransform: 'none',
              borderRadius: '12px',
              color: '#fff',
              whiteSpace: 'nowrap',
              minHeight: isPhone ? 48 : undefined,
            }}
          >
            {editingUser ? 'Save Changes' : 'Create User'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Email Template Dialog */}
      <Dialog
        open={openTemplateDialog}
        onClose={() => setOpenTemplateDialog(false)}
        maxWidth="md"
        fullWidth
        TransitionComponent={Transition}
        fullScreen={isPhone}
        PaperProps={{ sx: { borderRadius: isPhone ? 0 : '20px' } }}
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            color: '#2879b6',
            background: 'linear-gradient(135deg, rgba(40, 121, 182, 0.05) 0%, rgba(125, 194, 68, 0.05) 100%)',
          }}
        >
          {editingTemplate ? 'Edit Email Template' : 'Create Email Template'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Template Name"
                  required
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="e.g., Entry Not Created Notification"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Template Type"
                  value={templateType}
                  onChange={(e) => setTemplateType(e.target.value as EmailTemplate['type'])}
                  required
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                >
                  <MenuItem value="entry_not_created">Entry Not Created</MenuItem>
                  <MenuItem value="entry_not_submitted">Entry Not Submitted</MenuItem>
                  <MenuItem value="submission_to_manager">Submission to Manager</MenuItem>
                  <MenuItem value="review_request">Review Request to Entry Person</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Subject"
                  required
                  value={templateSubject}
                  onChange={(e) => setTemplateSubject(e.target.value)}
                  placeholder="e.g., Reminder: MIS Entry Not Created for {{date}}"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#58595B', mb: 1 }}>
                  Available Placeholders:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {getPlaceholdersForType(templateType).map(placeholder => (
                    <Chip
                      key={placeholder}
                      label={placeholder}
                      size="small"
                      onClick={() => insertPlaceholder(placeholder)}
                      sx={{
                        backgroundColor: 'rgba(40, 121, 182, 0.1)',
                        color: '#2879b6',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'rgba(40, 121, 182, 0.2)',
                        },
                      }}
                    />
                  ))}
                </Box>
                <TextField
                  fullWidth
                  label="Email Body"
                  required
                  multiline
                  rows={8}
                  value={templateBody}
                  onChange={(e) => setTemplateBody(e.target.value)}
                  placeholder="Enter your email template content here. Click placeholders above to insert them."
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  onClick={() => setShowPreview(!showPreview)}
                  sx={{
                    textTransform: 'none',
                    borderRadius: '12px',
                    borderColor: '#2879b6',
                    color: '#2879b6',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      borderColor: '#2879b6',
                      backgroundColor: 'rgba(40, 121, 182, 0.05)',
                    },
                  }}
                >
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </Button>
                {showPreview && renderPreview()}
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, flexDirection: isPhone ? 'column' : 'row', gap: isPhone ? 1 : 0 }}>
          <Button
            onClick={() => setOpenTemplateDialog(false)}
            sx={{ textTransform: 'none', color: '#58595B', borderRadius: '12px' }}
            fullWidth={isPhone}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveTemplate}
            disabled={saving || !templateName || !templateSubject || !templateBody}
            startIcon={saving ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : <SaveIcon />}
            className="btn-gradient-success"
            fullWidth={isPhone}
            size={isPhone ? 'large' : 'medium'}
            sx={{
              textTransform: 'none',
              borderRadius: '12px',
              color: '#fff',
              whiteSpace: 'nowrap',
              minHeight: isPhone ? 48 : undefined,
            }}
          >
            {editingTemplate ? 'Save Changes' : 'Create Template'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Scheduler Configuration Dialog */}
      <Dialog
        open={openSchedulerDialog}
        onClose={() => setOpenSchedulerDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '20px' } }}
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            color: '#2879b6',
            background: 'linear-gradient(135deg, rgba(40, 121, 182, 0.05) 0%, rgba(125, 194, 68, 0.05) 100%)',
          }}
        >
          Configure Notification Scheduler
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notification Type"
                  value={getNotificationTypeLabel(schedulerNotificationType)}
                  disabled
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Check Time"
                  type="time"
                  value={schedulerCheckTime}
                  onChange={(e) => setSchedulerCheckTime(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Reminder Frequency"
                  value={schedulerReminderFrequency}
                  onChange={(e) => setSchedulerReminderFrequency(e.target.value as 'once' | 'daily' | 'hourly')}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                >
                  <MenuItem value="once">Once</MenuItem>
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="hourly">Hourly</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Email Template"
                  value={schedulerTemplateId}
                  onChange={(e) => setSchedulerTemplateId(Number(e.target.value))}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                >
                  {emailTemplates
                    .filter(t => t.type === schedulerNotificationType)
                    .map(template => (
                      <MenuItem key={template.id} value={template.id}>
                        {template.name}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#58595B', mb: 1 }}>
                  Recipient Roles:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {['Admin', 'Manager', 'Operator'].map(role => (
                    <FormControlLabel
                      key={role}
                      control={
                        <Checkbox
                          checked={(schedulerRecipientRoles || []).includes(role)}
                          onChange={() => handleRoleToggle(role)}
                          sx={{
                            color: '#2879b6',
                            '&.Mui-checked': { color: '#2879b6' },
                          }}
                        />
                      }
                      label={role}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, flexDirection: isPhone ? 'column' : 'row', gap: isPhone ? 1 : 0 }}>
          <Button
            onClick={() => setOpenSchedulerDialog(false)}
            sx={{ textTransform: 'none', color: '#58595B', borderRadius: '12px' }}
            fullWidth={isPhone}
          >
            Cancel
          </Button>
            <Button
            variant="contained"
            onClick={handleSaveSchedulerConfig}
            disabled={saving || (Array.isArray(schedulerRecipientRoles) ? schedulerRecipientRoles.length === 0 : true)}
            startIcon={saving ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : <SaveIcon />}
            className="btn-gradient-success"
            fullWidth={isPhone}
            size={isPhone ? 'large' : 'medium'}
            sx={{
              textTransform: 'none',
              borderRadius: '12px',
              color: '#fff',
              whiteSpace: 'nowrap',
              minHeight: isPhone ? 48 : undefined,
            }}
          >
            Save Configuration
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}

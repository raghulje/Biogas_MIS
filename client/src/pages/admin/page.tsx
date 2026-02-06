import { useEffect, useState } from 'react';
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
  lastLogin: string;
  action: string;
  previousValue: string;
  newValue: string;
  timestamp: string;
  actionType: 'create' | 'update' | 'delete' | 'login' | 'view';
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

const defaultPermissions: Permission[] = [
  { page: 'Dashboard', read: true, create: false, update: false, delete: false },
  { page: 'MIS Entry', read: true, create: true, update: true, delete: false },
  { page: 'Consolidated MIS View', read: true, create: false, update: false, delete: false },
  { page: 'Admin Panel', read: false, create: false, update: false, delete: false },
  { page: 'Audit Logs', read: true, create: false, update: false, delete: false },
  { page: 'Import Data', read: true, create: true, update: false, delete: false },
];

const adminPermissions: Permission[] = [
  { page: 'Dashboard', read: true, create: true, update: true, delete: true },
  { page: 'MIS Entry', read: true, create: true, update: true, delete: true },
  { page: 'Consolidated MIS View', read: true, create: true, update: true, delete: true },
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

export default function AdminPage() {
  const [tabValue, setTabValue] = useState(0);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userPermissions, setUserPermissions] = useState<Permission[]>(defaultPermissions);
  const [selectedRole, setSelectedRole] = useState('Operator');
  const [saving, setSaving] = useState(false);
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
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [schedulerConfigs, setSchedulerConfigs] = useState<SchedulerConfig[]>([]);

  const mapBackendPermissionsToUI = (backendPerms: any[]) => {
    if (!backendPerms || !Array.isArray(backendPerms)) return defaultPermissions;
    const uiPerms = JSON.parse(JSON.stringify(defaultPermissions));
    const resourceMapBack: Record<string, string> = {
      mis_entry: 'MIS Entry',
      user: 'User Management',
      role: 'Roles & Permissions',
      config: 'Admin Panel',
      audit: 'Audit Logs'
    };
    backendPerms.forEach((bp: { resource?: string; action?: string }) => {
      const uiName = bp.resource ? resourceMapBack[bp.resource] : null;
      if (!uiName) return;
      const permIndex = uiPerms.findIndex((p: { page: string }) => p.page === uiName);
      if (permIndex > -1) {
        if (bp.action === 'read') uiPerms[permIndex].read = true;
        if (bp.action === 'create') uiPerms[permIndex].create = true;
        if (bp.action === 'update') uiPerms[permIndex].update = true;
        if (bp.action === 'delete') uiPerms[permIndex].delete = true;
      }
    });
    return uiPerms;
  };

  useEffect(() => {
    loadData();
  }, [tabValue]);

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
            permissions: (u.role?.permissions && Array.isArray(u.role.permissions)) ? mapBackendPermissionsToUI(u.role.permissions) : defaultPermissions
          })));
      } else if (tabValue === 1) {
        const data = await adminService.getAuditLogs();
        setActivityLogs((Array.isArray(data) ? data : []).map((log: any) => ({
          id: log.id,
          user: log.actor?.name || 'System',
          timestamp: log.createdAt ?? log.created_at ?? '',
          action: log.action || '',
          actionType: (log.action || '').toLowerCase().includes('create') ? 'create' : ((log.action || '').toLowerCase().includes('delete') ? 'delete' : 'update'),
          previousValue: log.old_values != null ? JSON.stringify(log.old_values) : '',
          newValue: log.new_values != null ? JSON.stringify(log.new_values) : ''
        })));
      } else if (tabValue === 2) {
        const data = await adminService.getTemplates();
        setEmailTemplates(data);
      } else if (tabValue === 3) {
        const data = await adminService.getSchedulers();
        setSchedulerConfigs(data);
      }
    } catch (e) {
      setMessage({ type: 'error', text: 'Failed to load data' });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    if (role === 'Admin') {
      setUserPermissions(adminPermissions);
    } else if (role === 'Viewer') {
      setUserPermissions(defaultPermissions.map(p => ({ ...p, create: false, update: false, delete: false })));
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
    setEditingUser(null);
    setUserName('');
    setUserEmail('');
    setUserPassword('');
    setSelectedRole('Operator');
    setUserPermissions(defaultPermissions);
    setOpenUserDialog(true);
  };

  const handleOpenEditUser = (user: User) => {
    setEditingUser(user);
    setUserName(user.name);
    setUserEmail(user.email);
    setUserPassword('');
    setSelectedRole(typeof user.role === 'string' ? user.role : (user.role?.name || 'Operator'));
    setUserPermissions(Array.isArray(user.permissions) && user.permissions.length > 0 ? user.permissions : defaultPermissions);
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
        role_id: selectedRole === 'Admin' ? 1 : (selectedRole === 'Operator' ? 2 : 3),
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

  const handleSavePermissions = async () => {
    try {
      setSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Permissions saved successfully!' });
    } catch (error) {
      console.error('Failed to save permissions', error);
      setMessage({ type: 'error', text: 'Failed to save permissions.' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
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
    // Simulate export functionality
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

  // Filter logs based on current filters
  const filteredLogs = activityLogs.filter(log => {
    if (filterUser && !log.user.toLowerCase().includes(filterUser.toLowerCase())) return false;
    if (filterActionType !== 'all' && log.actionType !== filterActionType) return false;
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
        schedulerConfigs.map(config =>
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
    setSchedulerRecipientRoles(config.recipientRoles);
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
          schedulerConfigs.map(config =>
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
    setSchedulerRecipientRoles(prev =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
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
              <Tab label="Scheduler Configuration" />
              <Tab label="Role Permissions" />
            </Tabs>
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
                  sx={{
                    textTransform: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Create User
                </Button>
              </Box>

              <TableContainer component={Paper} className="glass-card" sx={{ borderRadius: '16px', boxShadow: 'none' }}>
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

              {/* Activity Logs Table */}
              <TableContainer component={Paper} className="glass-card" sx={{ borderRadius: '16px', boxShadow: 'none' }}>
                <Table>
                  <TableHead sx={{ background: 'linear-gradient(135deg, rgba(40, 121, 182, 0.1) 0%, rgba(125, 194, 68, 0.1) 100%)' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>User</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>Last Login</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>Action</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>Previous Value</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>New Value</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>Timestamp</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>Type</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedLogs.length > 0 ? (
                      paginatedLogs.map((log) => (
                        <TableRow key={log.id} className="hover-lift" sx={{ transition: 'all 0.3s ease' }}>
                          <TableCell sx={{ fontWeight: 500 }}>{log.user}</TableCell>
                          <TableCell sx={{ fontSize: '0.875rem', color: '#58595B' }}>{log.lastLogin}</TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>{log.action}</TableCell>
                          <TableCell sx={{ fontSize: '0.875rem', color: '#58595B' }}>{log.previousValue}</TableCell>
                          <TableCell sx={{ fontSize: '0.875rem', color: '#333842' }}>{log.newValue}</TableCell>
                          <TableCell sx={{ fontSize: '0.875rem', color: '#58595B' }}>{log.timestamp}</TableCell>
                          <TableCell>
                            <Chip
                              label={getActionTypeLabel(log.actionType)}
                              size="small"
                              sx={{
                                backgroundColor: `${getActionTypeColor(log.actionType)}15`,
                                color: getActionTypeColor(log.actionType),
                                fontWeight: 600,
                                borderRadius: '8px',
                              }}
                            />
                          </TableCell>
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
            </CardContent>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <CardContent sx={{ p: 3 }}>
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

              <Grid container spacing={3}>
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
                          {template.placeholders.map(placeholder => (
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
            </CardContent>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#333842' }}>
                SMTP Settings
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="SMTP Host" placeholder="smtp.example.com" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="SMTP Port" type="number" placeholder="587" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Username" placeholder="user@example.com" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Password" type="password" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="From Email" placeholder="noreply@example.com" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="From Name" placeholder="Biogas MIS" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    className="btn-gradient-primary"
                    sx={{
                      textTransform: 'none',
                      borderRadius: '12px',
                      px: 4,
                      color: '#fff',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Save SMTP Settings
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </TabPanel>

          <TabPanel value={tabValue} index={4}>
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
                {schedulerConfigs.map((config, index) => {
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
                            {config.recipientRoles.map(role => (
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
          </TabPanel>

          <TabPanel value={tabValue} index={5}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#333842' }}>
                  Role Permissions
                </Typography>
                <Button
                  variant="contained"
                  startIcon={saving ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : <SaveIcon />}
                  onClick={handleSavePermissions}
                  disabled={saving}
                  className="btn-gradient-success"
                  sx={{
                    textTransform: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    whiteSpace: 'nowrap',
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

              <TableContainer component={Paper} className="glass-card" sx={{ borderRadius: '16px', boxShadow: 'none' }}>
                <Table>
                  <TableHead sx={{ background: 'linear-gradient(135deg, rgba(40, 121, 182, 0.1) 0%, rgba(125, 194, 68, 0.1) 100%)' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, color: '#2879b6' }}>Page Name</TableCell>
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
                    {defaultPermissions.map(perm => (
                      <TableRow key={perm.page} className="hover-lift" sx={{ transition: 'all 0.3s ease' }}>
                        <TableCell sx={{ fontWeight: 500 }}>{perm.page}</TableCell>
                        <TableCell align="center">
                          <Checkbox
                            checked={perm.read}
                            sx={{ color: '#2879b6', '&.Mui-checked': { color: '#2879b6' } }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox
                            checked={perm.create}
                            sx={{ color: '#7dc244', '&.Mui-checked': { color: '#7dc244' } }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox
                            checked={perm.update}
                            sx={{ color: '#F59E21', '&.Mui-checked': { color: '#F59E21' } }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox
                            checked={perm.delete}
                            sx={{ color: '#ee6a31', '&.Mui-checked': { color: '#ee6a31' } }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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
        PaperProps={{ sx: { borderRadius: '20px' } }}
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
                  <MenuItem value="Operator">Operator</MenuItem>
                  <MenuItem value="Viewer">Viewer</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333842', mb: 2 }}>
              User Permissions
            </Typography>

            <TableContainer component={Paper} className="glass-card" sx={{ borderRadius: '16px', boxShadow: 'none' }}>
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
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOpenUserDialog(false)} sx={{ textTransform: 'none', color: '#58595B', borderRadius: '12px' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveUser}
            className="btn-gradient-success"
            sx={{
              textTransform: 'none',
              borderRadius: '12px',
              color: '#fff',
              whiteSpace: 'nowrap',
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
        PaperProps={{ sx: { borderRadius: '20px' } }}
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
        <DialogActions sx={{ p: 2.5 }}>
          <Button
            onClick={() => setOpenTemplateDialog(false)}
            sx={{ textTransform: 'none', color: '#58595B', borderRadius: '12px' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveTemplate}
            disabled={saving || !templateName || !templateSubject || !templateBody}
            startIcon={saving ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : <SaveIcon />}
            className="btn-gradient-success"
            sx={{
              textTransform: 'none',
              borderRadius: '12px',
              color: '#fff',
              whiteSpace: 'nowrap',
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
                  {['Admin', 'Manager', 'Operator', 'Viewer'].map(role => (
                    <FormControlLabel
                      key={role}
                      control={
                        <Checkbox
                          checked={schedulerRecipientRoles.includes(role)}
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
        <DialogActions sx={{ p: 2.5 }}>
          <Button
            onClick={() => setOpenSchedulerDialog(false)}
            sx={{ textTransform: 'none', color: '#58595B', borderRadius: '12px' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveSchedulerConfig}
            disabled={saving || schedulerRecipientRoles.length === 0}
            startIcon={saving ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : <SaveIcon />}
            className="btn-gradient-success"
            sx={{
              textTransform: 'none',
              borderRadius: '12px',
              color: '#fff',
              whiteSpace: 'nowrap',
            }}
          >
            Save Configuration
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}

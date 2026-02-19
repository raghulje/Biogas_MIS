import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Paper, Grid, TextField, Button,
    Table, TableBody, TableCell, TableHead, TableRow,
    CircularProgress, Alert, Tab, Tabs, Checkbox,
    List, ListItem, ListItemText, ListItemIcon, Divider, Card, CardHeader, CardContent
} from '@mui/material';
import { Layout } from '../../../components/Layout';
import { adminService } from '../../../services/adminService';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { parse, format } from 'date-fns';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSnackbar } from 'notistack';

interface Scheduler {
    id: number;
    name: string;
    cron_expression: string;
    job_type: string;
    is_active: boolean;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: { name: string };
}

interface Template {
    id: number;
    name: string;
    subject: string;
    body: string;
}

function TabPanel(props: { children?: React.ReactNode; index: number; value: number }) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: { xs: 2, sm: 3 } }}>{children}</Box>}
        </div>
    );
}

export default function NotificationConfigPage() {
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isPhone = useMediaQuery('(max-width:768px)');
    const [tabValue, setTabValue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [schedulers, setSchedulers] = useState<Scheduler[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [templates, setTemplates] = useState<Template[]>([]);

    // Recipient Config
    const [siteUserEmails, setSiteUserEmails] = useState<string[]>([]); // entry_not_created & not_submitted
    const [managerEmails, setManagerEmails] = useState<string[]>([]); // escalation
    const [submitEmails, setSubmitEmails] = useState<string[]>([]); // approvers (submit notifications)
    const [approvedEditors, setApprovedEditors] = useState<string[]>([]); // users allowed to edit approved entries

    const [creationCheckTime, setCreationCheckTime] = useState<Date | null>(null);
    const [escalationCheckTime, setEscalationCheckTime] = useState<Date | null>(null);
    // Notification schedule state
    const [misStartTime, setMisStartTime] = useState<Date | null>(null);
    const [misEndTime, setMisEndTime] = useState<Date | null>(null);
    const [reminderStartTime, setReminderStartTime] = useState<Date | null>(null);
    const [reminderInterval, setReminderInterval] = useState<number>(60);
    const [reminderCount, setReminderCount] = useState<number>(4);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [schedList, userList, templateList, misConfig, nsched] = await Promise.all([
                adminService.getSchedulers(),
                adminService.getUsers(),
                adminService.getTemplates(),
                adminService.getMISEmailConfig(),
                adminService.getNotificationSchedule()
            ]);

            setSchedulers(schedList);
            setUsers(userList);
            setTemplates(templateList);

            // Parse Config Emails
            setSiteUserEmails(misConfig.entry_not_created_emails || []);
            setManagerEmails(misConfig.escalation_notify_emails || []);
            setSubmitEmails(misConfig.submit_notify_emails || []);
            setApprovedEditors(misConfig.approved_editor_emails || []);
            // Notification schedule
            if (nsched) {
                const parseTime = (t: string) => {
                    const [h, m] = (t || '00:00').split(':').map(s => Number(s));
                    const d = new Date();
                    d.setHours(h, m || 0, 0, 0);
                    return d;
                };
                setMisStartTime(nsched.mis_start_time ? parseTime(nsched.mis_start_time) : null);
                setMisEndTime(nsched.mis_end_time ? parseTime(nsched.mis_end_time) : null);
                setReminderStartTime(nsched.reminder_start_time ? parseTime(nsched.reminder_start_time) : (nsched.mis_end_time ? parseTime(nsched.mis_end_time) : null));
                setReminderInterval(nsched.reminder_interval_minutes || 60);
                setReminderCount(nsched.reminder_count || 4);
            }

            // Parse Times from Cron
            const creationJob = schedList.find((s: Scheduler) => s.job_type === 'mis_creation_check');
            if (creationJob) {
                const [mm, hh] = creationJob.cron_expression.split(' ');
                const date = new Date();
                date.setHours(parseInt(hh), parseInt(mm));
                setCreationCheckTime(date);
            } else {
                // Default 16:45
                const d = new Date();
                d.setHours(16, 45);
                setCreationCheckTime(d);
            }

            const escalationJob = schedList.find((s: Scheduler) => s.job_type === 'mis_escalation_check');
            if (escalationJob) {
                const [mm, hh] = escalationJob.cron_expression.split(' ');
                const date = new Date();
                date.setHours(parseInt(hh), parseInt(mm));
                setEscalationCheckTime(date);
            } else {
                // Default 17:30
                const d = new Date();
                d.setHours(17, 30);
                setEscalationCheckTime(d);
            }

        } catch (err: any) {
            console.error(err);
            setError('Failed to load configuration');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // When user switches to "Recipients Mapping" tab, refresh users/config so newly created users appear immediately
    useEffect(() => {
        if (tabValue === 1) {
            fetchData();
        }
    }, [tabValue]);

    const handleSaveSchedule = async () => {
        try {
            setError(null);
            setSuccess(null);

            const creationJob = schedulers.find(s => s.job_type === 'mis_creation_check');
            const escalationJob = schedulers.find(s => s.job_type === 'mis_escalation_check');

            if (creationCheckTime && creationJob) {
                const cron = `${creationCheckTime.getMinutes()} ${creationCheckTime.getHours()} * * *`;
                await adminService.updateScheduler(creationJob.id, { cron_expression: cron });
            } else if (creationCheckTime && !creationJob) {
                // Create if missing (though seed should handle it)
                const cron = `${creationCheckTime.getMinutes()} ${creationCheckTime.getHours()} * * *`;
                await adminService.createScheduler({ name: 'MIS Creation Check', cron_expression: cron, job_type: 'mis_creation_check', is_active: true });
            }

            if (escalationCheckTime && escalationJob) {
                const cron = `${escalationCheckTime.getMinutes()} ${escalationCheckTime.getHours()} * * *`;
                await adminService.updateScheduler(escalationJob.id, { cron_expression: cron });
            } else if (escalationCheckTime && !escalationJob) {
                const cron = `${escalationCheckTime.getMinutes()} ${escalationCheckTime.getHours()} * * *`;
                await adminService.createScheduler({ name: 'MIS Escalation Check', cron_expression: cron, job_type: 'mis_escalation_check', is_active: true });
            }
            // Save NotificationSchedule
            if (misStartTime && misEndTime) {
                const fmt = (d: Date) => `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
                await adminService.saveNotificationSchedule({
                    mis_start_time: fmt(misStartTime),
                    mis_end_time: fmt(misEndTime),
                    reminder_start_time: reminderStartTime ? fmt(reminderStartTime) : fmt(misEndTime),
                    reminder_interval_minutes: Number(reminderInterval),
                    reminder_count: Number(reminderCount)
                });
            }

            setSuccess('Schedule updated successfully');
            enqueueSnackbar('Schedule updated successfully', { variant: 'success' });
            await fetchData(); // Refresh
        } catch (err) {
            setError('Failed to save schedule');
            enqueueSnackbar('Failed to save schedule', { variant: 'error' });
        }
    };

    const handleSaveRecipients = async () => {
        try {
            setError(null);
            setSuccess(null);

            await adminService.saveMISEmailConfig({
                entry_not_created_emails: siteUserEmails,
                not_submitted_notify_emails: siteUserEmails, // Same recipients
                submit_notify_emails: submitEmails,
                escalation_notify_emails: managerEmails,
                approved_editor_emails: approvedEditors
            });
            // Ah wait, I need to preserve submit_notify_emails. Let's add it to state.
            // Or just fetch and update.
            // For now assume submit_notify_emails is managed elsewhere or empty.
            // Better: Fetch current inside submit? No, I have state.
            // Let's add `submitEmails` state.
            // For this implementation I will focus on the requested features.
            setSuccess('Recipients updated successfully');
            enqueueSnackbar('Recipients updated successfully', { variant: 'success' });
        } catch (err) {
            setError('Failed to save recipients');
            enqueueSnackbar('Failed to save recipients', { variant: 'error' });
        }
    };

    const handleToggleSiteUser = (email: string) => {
        if (!email) return;
        setSiteUserEmails(prev => prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]);
    };

    const handleToggleManager = (email: string) => {
        if (!email) return;
        setManagerEmails(prev => prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]);
    };

    const handleToggleSubmitNotify = (email: string) => {
        if (!email) return;
        setSubmitEmails(prev => prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]);
    };

    const handleToggleApprovedEditor = (email: string) => {
        if (!email) return;
        setApprovedEditors(prev => prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]);
    };

    const handleSaveTemplate = async (template: Template) => {
        try {
            await adminService.updateTemplate(template.id, { subject: template.subject, body: template.body });
            setSuccess(`Template '${template.name}' saved`);
            enqueueSnackbar(`Template '${template.name}' saved`, { variant: 'success' });
            fetchData();
        } catch (e) {
            setError('Failed to save template');
            enqueueSnackbar('Failed to save template', { variant: 'error' });
        }
    };

    if (loading) return (
        <Layout>
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>
        </Layout>
    );

    return (
        <Layout>
            <Box sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' }, fontWeight: 700, color: '#2879b6' }}>
                    Email Notifications
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                <Paper sx={{ mt: 2, borderRadius: '16px', overflow: 'hidden' }}>
                    <Tabs
                        value={tabValue}
                        onChange={(e, v) => setTabValue(v)}
                        indicatorColor="primary"
                        textColor="primary"
                        variant={isMobile ? 'scrollable' : 'standard'}
                        scrollButtons={isMobile ? 'auto' : false}
                        sx={{
                            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                            },
                        }}
                    >
                        <Tab label="Schedule" />
                        <Tab label="Recipients Mapping" />
                    </Tabs>

                    <TabPanel value={tabValue} index={0}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={6}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            borderRadius: { xs: '16px', md: '4px' },
                                            boxShadow: isPhone ? 1 : 0,
                                            '&:hover': {
                                                boxShadow: isPhone ? 2 : 0
                                            }
                                        }}
                                    >
                                        <CardHeader
                                            title="Daily Check (Site Users)"
                                            subheader="Checks if entry is created and submitted"
                                            sx={{
                                                '& .MuiCardHeader-title': {
                                                    fontSize: { xs: '1.125rem', sm: '1.25rem' },
                                                    fontWeight: 600
                                                },
                                                '& .MuiCardHeader-subheader': {
                                                    fontSize: { xs: '0.875rem', sm: '0.875rem' }
                                                },
                                                pb: { xs: 1, sm: 2 }
                                            }}
                                        />
                                        <CardContent sx={{ pt: { xs: 1, sm: 2 } }}>
                                            <Typography variant="body2" sx={{ mb: 2, fontSize: { xs: '0.9375rem', sm: '0.875rem' }, lineHeight: 1.6 }}>
                                                At this time, system checks if an entry exists for today. <br />
                                                If NO &rarr; Notify Site Users (Not Created Alert). <br />
                                                If YES but Draft &rarr; Notify Site Users (Not Submitted Alert).
                                            </Typography>
                                            <TimePicker
                                                label="Check Time"
                                                value={creationCheckTime}
                                                onChange={(val) => setCreationCheckTime(val)}
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        sx: {
                                                            '& .MuiOutlinedInput-root': {
                                                                borderRadius: '12px',
                                                                fontSize: { xs: '1rem', sm: '1rem' }
                                                            },
                                                            '& .MuiInputLabel-root': {
                                                                fontSize: { xs: '1rem', sm: '1rem' }
                                                            },
                                                            '& .MuiOutlinedInput-input': {
                                                                padding: { xs: '16px 14px', sm: '16.5px 14px' }
                                                            }
                                                        }
                                                    }
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            borderRadius: { xs: '16px', md: '4px' },
                                            boxShadow: isPhone ? 1 : 0,
                                            '&:hover': {
                                                boxShadow: isPhone ? 2 : 0
                                            }
                                        }}
                                    >
                                        <CardHeader
                                            title="Escalation Check (Managers)"
                                            subheader="Re-checks entry status"
                                            sx={{
                                                '& .MuiCardHeader-title': {
                                                    fontSize: { xs: '1.125rem', sm: '1.25rem' },
                                                    fontWeight: 600
                                                },
                                                '& .MuiCardHeader-subheader': {
                                                    fontSize: { xs: '0.875rem', sm: '0.875rem' }
                                                },
                                                pb: { xs: 1, sm: 2 }
                                            }}
                                        />
                                        <CardContent sx={{ pt: { xs: 1, sm: 2 } }}>
                                            <Typography variant="body2" sx={{ mb: 2, fontSize: { xs: '0.9375rem', sm: '0.875rem' }, lineHeight: 1.6 }}>
                                                At this time, system re-checks if entry is submitted. <br />
                                                If NO (Missing or Draft) &rarr; Notify Managers (Escalation Alert).
                                            </Typography>
                                            <TimePicker
                                                label="Escalation Time"
                                                value={escalationCheckTime}
                                                onChange={(val) => setEscalationCheckTime(val)}
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        sx: {
                                                            '& .MuiOutlinedInput-root': {
                                                                borderRadius: '12px',
                                                                fontSize: { xs: '1rem', sm: '1rem' }
                                                            },
                                                            '& .MuiInputLabel-root': {
                                                                fontSize: { xs: '1rem', sm: '1rem' }
                                                            },
                                                            '& .MuiOutlinedInput-input': {
                                                                padding: { xs: '16px 14px', sm: '16.5px 14px' }
                                                            }
                                                        }
                                                    }
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            <Grid item xs={12}>
                                <Card variant="outlined" sx={{ mt: 2 }}>
                                    <CardHeader title="MIS Filling Window & Reminders" subheader="Configure MIS window and reminder rules" />
                                    <CardContent>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TimePicker label="MIS Start Time" value={misStartTime} onChange={(v) => setMisStartTime(v)} />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TimePicker label="MIS End Time" value={misEndTime} onChange={(v) => setMisEndTime(v)} />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TimePicker label="Reminder Start Time" value={reminderStartTime} onChange={(v) => setReminderStartTime(v)} />
                                            </Grid>
                                            <Grid item xs={6} sm={3}>
                                                <TextField label="Interval (minutes)" type="number" fullWidth value={reminderInterval} onChange={(e) => setReminderInterval(Number(e.target.value || 0))} />
                                            </Grid>
                                            <Grid item xs={6} sm={3}>
                                                <TextField label="Reminder Count" type="number" fullWidth value={reminderCount} onChange={(e) => setReminderCount(Number(e.target.value || 0))} />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            </Grid>
                            <Box sx={{ mt: 3, display: 'flex', justifyContent: { xs: 'stretch', sm: 'flex-end' } }}>
                                <Button
                                    variant="contained"
                                    onClick={handleSaveSchedule}
                                    fullWidth={isMobile}
                                    size={isPhone ? 'large' : 'medium'}
                                    sx={{
                                        textTransform: 'none',
                                        borderRadius: '12px',
                                        py: { xs: 1.75, sm: 1.5 },
                                        fontWeight: 600,
                                        minHeight: isPhone ? 48 : undefined,
                                        fontSize: { xs: '1rem', sm: '0.875rem' },
                                        boxShadow: isPhone ? 2 : 1,
                                        '&:active': isPhone ? {
                                            transform: 'scale(0.98)',
                                            boxShadow: 1
                                        } : undefined
                                    }}
                                >
                                    Save Schedule
                                </Button>
                            </Box>
                        </LocalizationProvider>
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' } }}>
                                    Site Users (Daily Alerts)
                                </Typography>
                                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                                    Select users to receive "Not Created" and "Not Submitted" alerts.
                                </Typography>
                                    <Paper
                                    variant="outlined"
                                    sx={{
                                        maxHeight: { xs: '50vh', sm: '60vh', md: 400 },
                                        overflow: 'auto',
                                        mt: 1,
                                        borderRadius: { xs: '12px', md: '4px' },
                                        '&::-webkit-scrollbar': {
                                            width: { xs: 6, md: 8 }
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            backgroundColor: 'rgba(40, 121, 182, 0.3)',
                                            borderRadius: 4,
                                            '&:hover': {
                                                backgroundColor: 'rgba(40, 121, 182, 0.5)'
                                            }
                                        }
                                    }}
                                >
                                    <List dense={!isPhone}>
                                        {users.map(user => (
                                            <ListItem
                                                key={user.id}
                                                button
                                                onClick={() => handleToggleSiteUser(user.email)}
                                                sx={{
                                                    minHeight: isPhone ? 56 : undefined,
                                                    px: isPhone ? 2 : 1,
                                                    py: isPhone ? 1.5 : undefined,
                                                    '&:active': isPhone ? {
                                                        backgroundColor: 'rgba(40, 121, 182, 0.08)'
                                                    } : undefined
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={siteUserEmails.includes(user.email)}
                                                        disableRipple
                                                        size={isPhone ? 'medium' : 'small'}
                                                        sx={{
                                                            color: '#2879b6',
                                                            '&.Mui-checked': { color: '#2879b6' }
                                                        }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={user.name}
                                                    secondary={`${user.email} (${user.role?.name})`}
                                                    primaryTypographyProps={{
                                                        sx: { fontSize: isPhone ? '1rem' : '0.875rem', fontWeight: 500 }
                                                    }}
                                                    secondaryTypographyProps={{
                                                        sx: { fontSize: isPhone ? '0.875rem' : '0.75rem' }
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' } }}>
                                    Managers (Escalation Alerts)
                                </Typography>
                                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                                    Select users to receive "Escalation" alerts.
                                </Typography>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        maxHeight: { xs: '50vh', sm: '60vh', md: 400 },
                                        overflow: 'auto',
                                        mt: 1,
                                        borderRadius: { xs: '12px', md: '4px' },
                                        '&::-webkit-scrollbar': {
                                            width: { xs: 6, md: 8 }
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            backgroundColor: 'rgba(125, 194, 68, 0.3)',
                                            borderRadius: 4,
                                            '&:hover': {
                                                backgroundColor: 'rgba(125, 194, 68, 0.5)'
                                            }
                                        }
                                    }}
                                >
                                    <List dense={!isPhone}>
                                        {users.map(user => (
                                            <ListItem
                                                key={user.id}
                                                button
                                                onClick={() => handleToggleManager(user.email)}
                                            >
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={managerEmails.includes(user.email)}
                                                        disableRipple
                                                        size={isPhone ? 'medium' : 'small'}
                                                        sx={{ color: '#7dc244', '&.Mui-checked': { color: '#7dc244' } }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText primary={user.name} secondary={`${user.email} (${user.role?.name})`} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' } }}>
                                    Approved Editors (Can edit approved entries)
                                </Typography>
                                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                                    Select users who are allowed to edit MIS entries after they are approved.
                                </Typography>
                                <Paper variant="outlined" sx={{ maxHeight: { xs: '50vh', sm: '60vh', md: 400 }, overflow: 'auto', mt: 1, borderRadius: { xs: '12px', md: '4px' } }}>
                                    <List dense={!isPhone}>
                                        {users.map(user => (
                                            <ListItem key={user.id} button onClick={() => handleToggleApprovedEditor(user.email)}>
                                                <ListItemIcon>
                                                    <Checkbox edge="start" checked={approvedEditors.includes(user.email)} disableRipple size={isPhone ? 'medium' : 'small'} sx={{ color: '#2879b6', '&.Mui-checked': { color: '#2879b6' } }} />
                                                </ListItemIcon>
                                                <ListItemText primary={user.name} secondary={`${user.email} (${user.role?.name})`} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' } }}>
                                    Approvers (Submission Review)
                                </Typography>
                                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                                    Select users who should receive submission notifications and can approve entries.
                                </Typography>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        maxHeight: { xs: '50vh', sm: '60vh', md: 400 },
                                        overflow: 'auto',
                                        mt: 1,
                                        borderRadius: { xs: '12px', md: '4px' },
                                    }}
                                >
                                    <List dense={!isPhone}>
                                        {users.map(user => (
                                            <ListItem
                                                key={user.id}
                                                button
                                                onClick={() => handleToggleSubmitNotify(user.email)}
                                            >
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={submitEmails.includes(user.email)}
                                                        disableRipple
                                                        size={isPhone ? 'medium' : 'small'}
                                                        sx={{ color: '#2879b6', '&.Mui-checked': { color: '#2879b6' } }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={user.name}
                                                    secondary={`${user.email} (${user.role?.name})`}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: { xs: 'stretch', sm: 'flex-end' } }}>
                            <Button
                                variant="contained"
                                onClick={handleSaveRecipients}
                                fullWidth={isMobile}
                                size={isPhone ? 'large' : 'medium'}
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: '12px',
                                    py: { xs: 1.75, sm: 1.5 },
                                    fontWeight: 600,
                                    minHeight: isPhone ? 48 : undefined,
                                    boxShadow: isPhone ? 2 : 1,
                                    '&:active': isPhone ? {
                                        transform: 'scale(0.98)'
                                    } : undefined
                                }}
                            >
                                Save Recipients
                            </Button>
                        </Box>
                    </TabPanel>

                    {/* Email Templates removed from Notifications page. Templates are managed via Email Templates section. */}
                </Paper>
            </Box>
        </Layout>
    );
}


import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Card,
    Typography,
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
    TextField,
    MenuItem,
    Chip,
    InputAdornment,
    useMediaQuery,
    useTheme,
    Alert,
    Zoom
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    Person as PersonIcon,
    Business as BusinessIcon
} from '@mui/icons-material';
import { Layout } from '../../components/Layout';
import { useSnackbar } from 'notistack';
import MESSAGES from '../../utils/messages';
import { customerService } from '../../services/customerService';
import { useAuth } from '../../context/AuthContext';

export interface Customer {
    id: number;
    name: string;
    type: string;
    email: string;
    phone: string;
    address: string;
    gst_number: string;
    pan_number: string;
    status: 'active' | 'inactive';
}

const CUSTOMER_TYPES = [
    'CBG',
    'FOM',
    'LFOM'
];

export default function CustomerPage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Dialog State
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        email: '',
        phone: '',
        address: '',
        gst_number: '',
        pan_number: '',
        status: 'active'
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [serverError, setServerError] = useState<string | null>(null);

    useEffect(() => {
        fetchCustomers();
    }, [search, statusFilter]);

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const data = await customerService.getCustomers({ search, status: statusFilter });
            setCustomers(data);
        } catch (err) {
            console.error('Failed to fetch customers', err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpen = (customer?: Customer) => {
        setServerError(null);
        setErrors({});
        if (customer) {
            setSelectedCustomer(customer);
            setFormData({
                name: customer.name || '',
                type: customer.type || '',
                email: customer.email || '',
                phone: customer.phone || '',
                address: customer.address || '',
                gst_number: customer.gst_number || '',
                pan_number: customer.pan_number || '',
                status: customer.status || 'active'
            });
            setEditMode(true);
        } else {
            setSelectedCustomer(null);
            setFormData({
                name: '',
                type: '',
                email: '',
                phone: '',
                address: '',
                gst_number: '',
                pan_number: '',
                status: 'active'
            });
            setEditMode(false);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedCustomer(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const tempErrors: Record<string, string> = {};
        if (!formData.name) tempErrors.name = 'Name is required';
        // if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) tempErrors.email = 'Invalid email';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        setServerError(null);

        try {
            if (editMode && selectedCustomer) {
                await customerService.updateCustomer(selectedCustomer.id, formData);
                enqueueSnackbar(MESSAGES.CUSTOMER_UPDATED, { variant: 'success' });
            } else {
                await customerService.createCustomer(formData);
                enqueueSnackbar(MESSAGES.CUSTOMER_CREATED, { variant: 'success' });
            }
            handleClose();
            fetchCustomers();
        } catch (err: any) {
            console.error('Save failed', err);
            setServerError(err.response?.data?.message || MESSAGES.CUSTOMER_SAVE_FAILED);
            enqueueSnackbar(err.response?.data?.message || MESSAGES.CUSTOMER_SAVE_FAILED, { variant: 'error' });
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await customerService.deleteCustomer(id);
                fetchCustomers();
                enqueueSnackbar(MESSAGES.CUSTOMER_DELETED, { variant: 'success' });
            } catch (err) {
                console.error('Delete failed', err);
                enqueueSnackbar(MESSAGES.CUSTOMER_SAVE_FAILED, { variant: 'error' });
            }
        }
    };

    return (
        <Layout>
            <Box>
                <Box
                    sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}
                    className="aos-fade-down"
                >
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#2879b6' }}>
                        Customer Master
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpen()}
                        sx={{
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #2879b6 0%, #1D9AD4 100%)',
                            color: '#fff',
                            textTransform: 'none',
                            fontWeight: 600,
                            boxShadow: '0 4px 12px rgba(40, 121, 182, 0.2)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #235EAC 0%, #1889BE 100%)',
                            },
                        }}
                    >
                        Add Customer
                    </Button>
                </Box>

                {/* Filters */}
                <Card className="glass-card mb-4 aos-fade-up aos-delay-100" sx={{ p: 2, mb: 3, borderRadius: '12px' }}>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <TextField
                            placeholder="Search by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            size="small"
                            sx={{ flexGrow: 1, minWidth: '200px' }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: '8px' }
                            }}
                        />
                        {/* <TextField
                            select
                            label="Status"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            size="small"
                            sx={{ minWidth: '150px' }}
                            SelectProps={{ displayEmpty: true }}
                            InputProps={{ sx: { borderRadius: '8px' } }}
                        >
                            <MenuItem value="">All Status</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </TextField> */}
                    </Box>
                </Card>

                {/* Data Table */}
                <TableContainer
                    component={Paper}
                    elevation={0}
                    className="aos-fade-up aos-delay-200"
                    sx={{ borderRadius: '12px', border: '1px solid rgba(0,0,0,0.08)' }}
                >
                    <Table>
                        <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600, color: '#64748b' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#64748b' }}>Type</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#64748b' }}>Contact</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#64748b' }}>GST / PAN</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#64748b' }}>Status</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 600, color: '#64748b' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : customers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                                        No customers found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                customers.map((customer) => (
                                    <TableRow key={customer.id} hover>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                <Box sx={{
                                                    width: 36, height: 36, borderRadius: '50%',
                                                    backgroundColor: 'rgba(40, 121, 182, 0.1)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: '#2879b6'
                                                }}>
                                                    <BusinessIcon fontSize="small" />
                                                </Box>
                                                <Box>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#334155' }}>
                                                        {customer.name}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                        {customer.address ? (customer.address.length > 30 ? customer.address.substring(0, 30) + '...' : customer.address) : '-'}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={customer.type || 'N/A'}
                                                size="small"
                                                sx={{
                                                    backgroundColor: 'rgba(40, 121, 182, 0.08)',
                                                    color: '#2879b6',
                                                    fontWeight: 500
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>{customer.email || '-'}</Typography>
                                                <Typography variant="caption" color="textSecondary">{customer.phone || '-'}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>GST: {customer.gst_number || '-'}</Typography>
                                                <Typography variant="caption" color="textSecondary">PAN: {customer.pan_number || '-'}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={customer.status === 'active' ? 'Active' : 'Inactive'}
                                                size="small"
                                                color={customer.status === 'active' ? 'success' : 'default'}
                                                sx={{ borderRadius: '6px' }}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton size="small" onClick={() => handleOpen(customer)} sx={{ color: '#2879b6' }}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => handleDelete(customer.id)} sx={{ color: '#ef4444' }}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Add/Edit Dialog */}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{ sx: { borderRadius: '16px' } }}
                    TransitionComponent={Zoom}
                    TransitionProps={{ timeout: 400 }}
                >
                    <DialogTitle sx={{ borderBottom: '1px solid rgba(0,0,0,0.08)', pb: 2 }}>
                        {editMode ? 'Edit Customer' : 'Add New Customer'}
                    </DialogTitle>
                    <DialogContent sx={{ pt: 3 }} className="aos-fade-up">
                        {serverError && (
                            <Alert severity="error" sx={{ mb: 2 }}>{serverError}</Alert>
                        )}
                        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                            <TextField
                                name="name"
                                label="Customer Name"
                                value={formData.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                fullWidth
                                required
                            />

                            <TextField
                                select
                                name="type"
                                label="Customer Type"
                                value={formData.type}
                                onChange={handleChange}
                                fullWidth
                            >
                                {CUSTOMER_TYPES.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    name="email"
                                    label="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <TextField
                                    name="phone"
                                    label="Phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Box>

                            <TextField
                                name="address"
                                label="Address"
                                value={formData.address}
                                onChange={handleChange}
                                multiline
                                rows={2}
                                fullWidth
                            />

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    name="gst_number"
                                    label="GST Number"
                                    value={formData.gst_number}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <TextField
                                    name="pan_number"
                                    label="PAN Number"
                                    value={formData.pan_number}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Box>

                            <TextField
                                select
                                name="status"
                                label="Status"
                                value={formData.status}
                                onChange={handleChange}
                                fullWidth
                            >
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="inactive">Inactive</MenuItem>
                            </TextField>
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, pt: 1, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                        <Button onClick={handleClose} color="inherit" sx={{ borderRadius: '8px' }}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            disabled={!formData.name}
                            sx={{
                                borderRadius: '8px',
                                background: 'linear-gradient(135deg, #2879b6 0%, #1D9AD4 100%)',
                                textTransform: 'none'
                            }}
                        >
                            {editMode ? 'Update' : 'Create'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Layout>
    );
}


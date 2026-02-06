import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Hardcoded for now, ideally env variable
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const misService = {
    createEntry: async (data: any) => {
        const response = await api.post('/mis-entries', data);
        return response.data;
    },
    getEntries: async () => {
        const response = await api.get('/mis-entries');
        return response.data;
    },
    getEntryById: async (id: number) => {
        const response = await api.get(`/mis-entries/${id}`);
        return response.data;
    },
    updateEntry: async (id: number, data: any) => {
        const response = await api.put(`/mis-entries/${id}`, data);
        return response.data;
    },
    deleteEntry: async (id: number) => {
        const response = await api.delete(`/mis-entries/${id}`);
        return response.data;
    },
    submitEntry: async (id: number) => {
        const response = await api.post(`/mis-entries/${id}/submit`);
        return response.data;
    },
    approveEntry: async (id: number) => {
        const response = await api.post(`/mis-entries/${id}/approve`);
        return response.data;
    },
    rejectEntry: async (id: number, comment: string) => {
        const response = await api.post(`/mis-entries/${id}/reject`, { review_comment: comment });
        return response.data;
    },
    exportEntries: async (params: any) => {
        const response = await api.get('/mis-entries/export', { params, responseType: 'blob' });
        return response.data;
    },
    importEntries: async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.post('/mis-entries/import', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    getDashboardData: async (period: string = 'month') => {
        const response = await api.get('/dashboard/daily', { params: { period } });
        return response.data;
    },
    getConsolidatedData: async (params: {
        startDate?: string;
        endDate?: string;
        financialYear?: string;
        quarter?: string;
        year?: string;
    }) => {
        const response = await api.get('/mis-entries/consolidated', { params });
        return response.data;
    }
};

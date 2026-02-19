// Centralized user-facing message strings for snackbars and alerts
const MESSAGES = {
  // MIS entries
  ENTRY_CREATED: 'Entry created successfully',
  ENTRY_UPDATED: 'Entry updated successfully',
  ENTRY_DELETED: 'Entry deleted successfully',
  ENTRY_DELETE_FAILED: 'Failed to delete entry',

  // Import / Export
  IMPORT_SUCCESS: 'Import completed successfully',
  IMPORT_FAILED: 'Failed to import file',
  EXPORT_FAILED: 'Export failed',

  // Admin notifications/schedulers
  SCHEDULE_UPDATED: 'Schedule updated successfully',
  SCHEDULE_UPDATE_FAILED: 'Failed to save schedule',
  RECIPIENTS_UPDATED: 'Recipients updated successfully',
  RECIPIENTS_UPDATE_FAILED: 'Failed to save recipients',
  TEMPLATE_SAVED: (name: string) => `Template '${name}' saved`,
  TEMPLATE_SAVE_FAILED: 'Failed to save template',

  // Customer
  CUSTOMER_CREATED: 'Customer created successfully',
  CUSTOMER_UPDATED: 'Customer updated successfully',
  CUSTOMER_DELETED: 'Customer deleted',
  CUSTOMER_SAVE_FAILED: 'Failed to save customer',

  // Generic
  ACTION_FAILED: 'Action failed. Please try again.',
};

export default MESSAGES;


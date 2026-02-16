
import {
  Typography,
  TextField,
  Grid,
  Box,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';

interface Props {
  selectedEntry?: any;
  isReadOnly: boolean;
}

export default function RawMaterialsSection({ isReadOnly }: Props) {
  const { register } = useFormContext();

  const sectionStyle = {
    mb: 2,
    borderRadius: '12px !important',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    border: '1px solid #e0e0e0',
    backgroundColor: '#fff',
  };

  const headerStyle = {
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #e0e0e0',
    minHeight: '56px',
    display: 'flex',
    alignItems: 'center',
    px: 2,
  };

  return (
    <Box sx={sectionStyle}>
      <Box sx={headerStyle}>
        <Typography sx={{ fontWeight: 600, color: '#333' }}>Summary of Raw Materials</Typography>
      </Box>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={2.5}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Cow Dung Purchased"
              type="number"
              inputProps={{ step: 'any', inputMode: 'decimal' }}
              {...register('rawMaterials.cowDungPurchased')}
              disabled={isReadOnly}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Cow Dung in Stock"
              type="number"
              inputProps={{ step: 'any', inputMode: 'decimal' }}
              {...register('rawMaterials.cowDungStock')}
              disabled={isReadOnly}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Old Press Mud Opening Balance"
              type="number"
              inputProps={{ step: 'any', inputMode: 'decimal' }}
              {...register('rawMaterials.oldPressMudOpeningBalance')}
              disabled={isReadOnly}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Old Press Mud Purchased"
              type="number"
              inputProps={{ step: 'any', inputMode: 'decimal' }}
              {...register('rawMaterials.oldPressMudPurchased')}
              disabled={isReadOnly}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Old Press Mud Degradation Loss"
              type="number"
              inputProps={{ step: 'any', inputMode: 'decimal' }}
              {...register('rawMaterials.oldPressMudDegradationLoss')}
              disabled={isReadOnly}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Old Press Mud Closing Stock"
              type="number"
              inputProps={{ step: 'any', inputMode: 'decimal' }}
              {...register('rawMaterials.oldPressMudClosingStock')}
              disabled={isReadOnly}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="New Press Mud Purchased"
              type="number"
              inputProps={{ step: 'any', inputMode: 'decimal' }}
              {...register('rawMaterials.newPressMudPurchased')}
              disabled={isReadOnly}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Press Mud Used"
              type="number"
              inputProps={{ step: 'any', inputMode: 'decimal' }}
              {...register('rawMaterials.pressMudUsed')}
              disabled={isReadOnly}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Total Press Mud Stock"
              type="number"
              inputProps={{ step: 'any', inputMode: 'decimal' }}
              {...register('rawMaterials.totalPressMudStock')}
              disabled={isReadOnly}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Audit Note"
              multiline
              rows={3}
              {...register('rawMaterials.auditNote')}
              disabled={isReadOnly}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}


import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Grid,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useFormContext } from 'react-hook-form';

interface Props {
  selectedEntry?: any; // Making optional as we use form context
  isReadOnly: boolean;
}

export default function RawMaterialsSection({ isReadOnly }: Props) {
  const { register } = useFormContext();

  return (
    <Accordion
      defaultExpanded
      sx={{
        mb: 2,
        borderRadius: '12px !important',
        '&:before': { display: 'none' },
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        border: '1px solid #e0e0e0',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: '#666' }} />}
        sx={{
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #e0e0e0',
          minHeight: '56px',
        }}
      >
        <Typography sx={{ fontWeight: 600, color: '#333' }}>Summary of Raw Materials</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 3, backgroundColor: '#fff' }}>
        <Grid container spacing={2.5}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Cow Dung Purchased"
              type="number"
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
      </AccordionDetails>
    </Accordion>
  );
}

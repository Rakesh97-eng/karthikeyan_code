import { Dialog, Typography } from '@mui/material';
import { styled } from '@mui/system';

interface IStyledDialog {
  padding?: string;
}

export const StyledDialog = styled(Dialog)(({ padding }: IStyledDialog) => ({
  '& .MuiDialog-paper': {
    borderRadius: '8px',
    maxHeight: 'calc(100vh - 32px)',
    margin: '16px 0',
    overflowX: 'hidden',
    padding: padding,
  },
  '@media (max-width:501px)': {
    margin: '0 20px',
  },
}));

export const Title = styled(Typography)({
  width: '100%',
  textAlign: 'center',
  paddingBottom: '8px',
});

export const Desc = styled(Typography)({
  width: '100%',
  textAlign: 'center',
  paddingBottom: '24px',
});

import { Box, Dialog } from '@mui/material';
import { styled } from '@mui/system';

interface IStyledDialog {
  maxwidthsize: string;
  padding?: string;
}

export const StyledDialog = styled(Dialog)(
  ({ maxwidthsize, padding }: IStyledDialog) => ({
    '& .MuiDialog-paper': {
      maxWidth: maxwidthsize,
      borderRadius: '8px',
      padding: padding,
      maxHeight: 'calc(100vh - 32px)',
      margin: '16px 0',
      overflowX: 'hidden',
    },
    '@media (max-width:501px)': {
      margin: '0 20px',
    },
  })
);

export const ClientPreferencesStyle = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  paddingTop: '0px',
});

import { Box, Dialog } from '@mui/material';
import { styled } from '@mui/system';

interface IStyledDialog {
  maxWidthSize: string;
  padding?: string;
}

export const StyledDialog = styled(Dialog)(
  ({ maxWidthSize, padding }: IStyledDialog) => ({
    '& .MuiDialog-container': {
      alignItems: 'flex-end',
    },
    '& .MuiDialog-paper': {
      maxWidth: maxWidthSize,
      padding: padding,
      maxHeight: 'calc(100vh - 32px)',
      margin: '0px',
      borderRadius: '32px 32px 0px 0px',
      width: '100%',
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

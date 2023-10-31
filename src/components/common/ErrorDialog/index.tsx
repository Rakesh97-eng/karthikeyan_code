import { FC } from 'react';
import { DialogProps, Stack, IconButton } from '@mui/material';
import { StyledDialog, Title, Desc } from './styles';
import CloseIcon from '../../../assets/icons/X-icon.svg';
import Button from '../Button';

interface ICustomDialog {
  isModalOpen: boolean;
  handleClose: () => void;
  width?: DialogProps['maxWidth'];
  padding?: string;
  errorText?: string;
}

const CustomDialog: FC<ICustomDialog> = ({
  isModalOpen,
  handleClose,
  width = 'xs',
  padding = '24px',
  errorText,
}) => {
  const defaultErrorMsg =
    'Unfortunately an error occured while trying to complete your request. Please try again in a few minutes.';
  return (
    <StyledDialog open={isModalOpen} maxWidth={width} padding={padding}>
      <Stack direction='row' justifyContent='flex-end'>
        <IconButton onClick={handleClose}>
          <img src={CloseIcon} alt='popup close' />
        </IconButton>
      </Stack>
      <Title variant='h3'>Something Went Wrong</Title>
      <Desc variant='body1'>{defaultErrorMsg}</Desc>
      <Button
        variant='contained'
        fullWidth={false}
        onClick={handleClose}
        value='OK'
      />
    </StyledDialog>
  );
};

export default CustomDialog;

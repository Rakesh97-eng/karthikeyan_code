import { FC } from 'react';
import { StyledDialog } from './styles';

interface ICustomDialog {
  isModalOpen: boolean;
  handleClose: () => void;
  maxwidthsize: string;
  padding?:string;
}

const CustomDialog: FC<ICustomDialog> = ({
  isModalOpen,
  handleClose,
  maxwidthsize,
  children,
  padding='24px',
}) => {
  return (
    <StyledDialog
      open={isModalOpen}
      onClose={handleClose}
      fullWidth
      padding={padding}
      maxwidthsize={maxwidthsize}
    >
      {children}
    </StyledDialog>
  );
};

export default CustomDialog;

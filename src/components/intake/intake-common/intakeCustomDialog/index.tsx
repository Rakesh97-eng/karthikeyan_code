import { FC } from 'react';
import { StyledDialog } from './styles';

interface ICustomDialog {
  isModalOpen: boolean;
  handleClose: () => void;
  maxWidthSize: string;
  padding?:string;
}

const IntakeCustomDialog: FC<ICustomDialog> = ({
  isModalOpen,
  handleClose,
  maxWidthSize,
  children,
  padding='24px',
}) => {
  return (
    <StyledDialog
      open={isModalOpen}
      onClose={handleClose}
      fullWidth
      padding={padding}
      maxWidthSize={maxWidthSize}
    >
      {children}
    </StyledDialog>
  );
};

export default IntakeCustomDialog;

import { FC, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import { ReactComponent as KebabMenu } from '../../../assets/icons/kebab-menu.svg';
import { ReactComponent as DismissIcon } from '../../../assets/icons/dismiss.svg';
import { ReactComponent as XIcon } from '../../../assets/icons/X-icon.svg';
import { ReactComponent as TrashIcon } from '../../../assets/icons/trash.svg';
import { ReactComponent as EditorPencil } from '../../../assets/icons/editor-pencil-underline.svg';

import {
  TreatmentRecordHeaderAppBar,
  HeaderTitle,
  DeleteTreamentMenu,
} from './styles';
import { MenuItem, Typography } from '@mui/material';
import CustomDialog from '../../common/CustomDialog';
import { ToastContext } from '../../../providers/context/toastContext';
import { TreatmentRecordDeletePopup } from '../treatment-record-delete-popup';
import { TreatmentService } from '../../../services/Treatment';
import { TClientContext } from '../../../types/store/client';
import ClientContext from '../../../store/client/ClientContext';
import { refreshClientEndpoint } from '../../../store/client/ClientAction';
import { AxiosError } from 'axios';

interface ITreatmentRecord {
  closeFunc: (autoSave: boolean) => void;
  pastTreatment?: boolean;
  editTreatmentRecord?: () => void;
  treatmentId: string;
  treatmentIsSubmitted: boolean;
}

const TreatmentRecordHeader: FC<ITreatmentRecord> = ({
  closeFunc,
  pastTreatment = false,
  editTreatmentRecord,
  treatmentId,
  treatmentIsSubmitted,
}) => {
  const { showErrorDialog } = useContext(ToastContext);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleDeleteModal = () => setDeleteModalOpen(!deleteModalOpen);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const kebabMenuOpen = Boolean(anchorEl);
  const { clientDispatch } = useContext<TClientContext>(ClientContext);
  const handleKebabMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleKebabMenuClose = () => setAnchorEl(null);

  const deleteTRDialog = () => {
    handleKebabMenuClose();
    handleDeleteModal();
  };

  // kept different functions for future integration of delete & editing functionality
  const deleteTR = async () => {
    try {
      await TreatmentService.deleteTreatment(treatmentId);
      clientDispatch(refreshClientEndpoint(true));
      closeFunc(false);
      handleDeleteModal();
    } catch (error) {
      console.log('Error', error);
      if (error instanceof AxiosError) {
        showErrorDialog(error?.message);
      } else if (error instanceof Error) {
        showErrorDialog(error?.message);
      }
    }
  };

  const keepEditingTR = () => {
    handleDeleteModal();
  };
  const handleCloseIconClick = () => {
    closeFunc(true);
  }

  return (
    <Box>
      <TreatmentRecordHeaderAppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            aria-controls={kebabMenuOpen ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={kebabMenuOpen ? 'true' : undefined}
            onClick={handleKebabMenuClick}
          >
            <KebabMenu />
          </IconButton>
          <DeleteTreamentMenu
            id='basic-menu'
            anchorEl={anchorEl}
            open={kebabMenuOpen}
            onClose={handleKebabMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {pastTreatment && (
              <MenuItem onClick={editTreatmentRecord}>
                <EditorPencil className='delete-icon' />
                <Typography variant='body1' color='var(--neutral-primary)'>
                  Edit Record
                </Typography>
              </MenuItem>
            )}
            {!treatmentIsSubmitted ? (
              <MenuItem onClick={deleteTRDialog}>
                <TrashIcon className='delete-icon' />
                <Typography variant='body1' color='var(--neutral-primary)'>
                  Delete Treatment Record
                </Typography>
              </MenuItem>
            ) : null}
          </DeleteTreamentMenu>
          <CustomDialog
            isModalOpen={deleteModalOpen}
            handleClose={handleDeleteModal}
            maxwidthsize='360px'
          >
            <TreatmentRecordDeletePopup
              deleteTR={deleteTR}
              keepEditingTR={keepEditingTR}
              title={'Are you sure?'}
              description={
                'Deleting this Treatment Record will remove it from this platform.'
              }
              deleteBtnText={'Delete Treatment Record'}
              editBtnText={'Keep Record'}
            />
          </CustomDialog>

          <HeaderTitle variant='body1'>Treatment Record</HeaderTitle>

          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            className='dismiss-icon'
            onClick={handleCloseIconClick}
          >
            {pastTreatment ? <XIcon /> : <DismissIcon />}
          </IconButton>
        </Toolbar>
      </TreatmentRecordHeaderAppBar>
    </Box>
  );
};

export default TreatmentRecordHeader;

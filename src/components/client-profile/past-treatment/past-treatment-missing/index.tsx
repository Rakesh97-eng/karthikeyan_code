import { MenuItem, Typography } from '@mui/material';
import React, { FC, useContext, useRef, useState } from 'react';
import moment from 'moment-timezone';
import {
  HeaderDateInfoRow,
  HeaderSubInfoRow,
  PastTreatmentContainer,
  PastTreatmentHeader,
  SubInfoBox,
  Trbutton,
} from './style';
import { MenuWrapper } from '../../../../styles/global';
import { ReactComponent as PencilIcon } from '../../../../assets/icons/pencil.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/icons/trash-can.svg';
import HandIcon from '../../../../assets/icons/hand-left.svg';
import MapPinPointIcon from '../../../../assets/icons/location-pointer.svg';
import CustomDialog from '../../../common/CustomDialog';
import AttributePill from '../../../common/AttributePill';
import { getTreatmentTagIcon } from '../service';
import { Treatment } from '../../../../types/services/Treatment';
import { ToastContext } from '../../../../providers/context/toastContext';
import { TreatmentRecordDeletePopup } from '../../../treatment-record/treatment-record-delete-popup';
import { TreatmentRecordDialog } from '../../../treatment-record/styles';
import PastTreatmentRecordSectionList from '../past-treatment-record-section';
import {
  DEFAULT_TIMEZONE,
  FORMAT_DATE,
  PAST_TR_SECTIONS,
} from '../../../../constants/appConstants';
import EditTreatmentRecord from '../edit-past-treatment';
import { TreatmentService } from '../../../../services/Treatment';
import { TClientContext } from '../../../../types/store/client';
import ClientContext from '../../../../store/client/ClientContext';
import { refreshClientEndpoint } from '../../../../store/client/ClientAction';

interface Props {
  date?: Date | null;
  treatmentTag: string;
  estheticianName: string;
  location?: string | null;
  locationTZ?: string | null;
  treatmentDetails: any;
  AddTreatmentRecordHandler: (id: string) => void;
  id: string;
  onView?: (record: Treatment) => void;
  onEdit?: (record: Treatment) => void;
}
const PastTreatmentMissing: FC<Props> = ({
  date,
  treatmentTag,
  estheticianName,
  location,
  locationTZ,
  treatmentDetails,
  id,
  AddTreatmentRecordHandler,
}) => {
  const ref = useRef<HTMLElement>(null);
  const subInfoDetails = [
    { icon: HandIcon, label: estheticianName },
    { icon: MapPinPointIcon, label: location },
  ];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleDeleteModal = () => setDeleteModalOpen(!deleteModalOpen);
  const { showToast } = useContext(ToastContext);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { clientDispatch } = useContext<TClientContext>(ClientContext);
  const closeTreatmentRecordEdit = () => {
    clientDispatch(refreshClientEndpoint(true));
    setIsEdit(false);
  };
  const closeTreatmentRecordView = () => {
    setIsOpen(false);
  };
  const editTreatmentRecord = () => {
    setIsEdit(true);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    handleDeleteModal();
  };

  const treatmentRecordEditEventHandler = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.stopPropagation();
    handleMenuClose(event);
    editTreatmentRecord();
  };

  const handleMenuClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const deleteTR = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    try {
      await TreatmentService.deleteTreatment(id);
      clientDispatch(refreshClientEndpoint(true));
      handleDeleteModal();
      setAnchorEl(null);
      showToast({ text: 'Treatment Record Deleted' });
    } catch (error) {
      console.log('Error', error);
    }
  };

  const keepEditingTR1 = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    handleDeleteModal();
  };
  return (
    <>
      <PastTreatmentContainer>
        <PastTreatmentHeader ref={ref}>
          <HeaderDateInfoRow>
            <div className='date-and-moreInfo'>
              <Typography
                variant='h3'
                color={'var(--neutral-primary)'}
                fontSize={'32px'}
                lineHeight={'40px'}
              >
                {moment
                  .tz(date, locationTZ || DEFAULT_TIMEZONE)
                  .format(FORMAT_DATE.DAY_BY_MONTH)}
              </Typography>
              <AttributePill
                backgroundColor={'honey-20'}
                id={`tt-warning`}
                PrefIcon={getTreatmentTagIcon(treatmentTag)}
                label={treatmentTag.toUpperCase()}
                fontSize={'12px'}
                lineHeight={'16px'}
                padding={'4px 8px'}
                margin={`0 0 0 12px`}
                iconMargin={'0 6px 0 0'}
                letterSpacing={'0.03em'}
              />
            </div>
            <HeaderSubInfoRow>
              {subInfoDetails.map((subInfo, index) => {
                return (
                  <SubInfoBox className='subInfoBox' key={`subInfo-${index}`}>
                    <img
                      src={subInfo.icon}
                      alt={`subInfo-${index}`}
                      className='subInfoIcon'
                    />
                    <Typography variant='body1'>{subInfo.label}</Typography>
                  </SubInfoBox>
                );
              })}
            </HeaderSubInfoRow>
            <MenuWrapper
              id={id}
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem
                onClick={treatmentRecordEditEventHandler}
                style={{ justifyContent: 'flex-start' }}
                className='menu-item'
              >
                <PencilIcon className='menu-icon' />
                <Typography variant='body1'>Edit</Typography>
              </MenuItem>
              <MenuItem
                onClick={handleMenuItemClick}
                className='menu-item'
                style={{ justifyContent: 'flex-start' }}
              >
                <TrashIcon className='menu-icon' />
                <Typography variant='body1'>Delete</Typography>
              </MenuItem>
            </MenuWrapper>
          </HeaderDateInfoRow>

          <CustomDialog
            isModalOpen={deleteModalOpen}
            handleClose={handleDeleteModal}
            maxwidthsize='360px'
          >
            <TreatmentRecordDeletePopup
              keepEditingTR={keepEditingTR1}
              deleteTR={deleteTR}
              title={'Are you sure?'}
              description={
                'Deleting this Treatment Record will remove it from this platform.'
              }
              deleteBtnText={'Delete Treatment Record'}
              editBtnText={'Keep Record'}
            />
          </CustomDialog>
          <div>
            <Trbutton
              onClick={(event) => {
                event.stopPropagation();
                AddTreatmentRecordHandler(id);
              }}
            >
              + Treatment Record
            </Trbutton>
          </div>
        </PastTreatmentHeader>
      </PastTreatmentContainer>
      {isOpen && (
        <TreatmentRecordDialog
          open={isOpen}
          onClose={closeTreatmentRecordView}
          fullWidth
          maxWidth='md'
          className='treatment-record-dialog'
        >
          <PastTreatmentRecordSectionList
            pastTrSections={PAST_TR_SECTIONS}
            treatmentDetails={treatmentDetails}
            handleClose={closeTreatmentRecordView}
            editTreatmentRecord={editTreatmentRecord}
          />
        </TreatmentRecordDialog>
      )}
      {isEdit && (
        <TreatmentRecordDialog
          open={isEdit}
          onClose={closeTreatmentRecordEdit}
          fullWidth
          maxWidth='md'
          className='treatment-record-dialog'
        >
          <EditTreatmentRecord
            prefilledData={treatmentDetails}
            modalClose={closeTreatmentRecordEdit}
          />
        </TreatmentRecordDialog>
      )}
      {isOpen && (
        <TreatmentRecordDialog
          open={isOpen}
          onClose={closeTreatmentRecordView}
          fullWidth
          maxWidth='md'
          className='treatment-record-dialog'
        >
          <PastTreatmentRecordSectionList
            pastTrSections={PAST_TR_SECTIONS}
            treatmentDetails={treatmentDetails}
            handleClose={closeTreatmentRecordView}
            editTreatmentRecord={editTreatmentRecord}
          />
        </TreatmentRecordDialog>
      )}
    </>
  );
};

export default PastTreatmentMissing;

import { IconButton, MenuItem, Typography } from '@mui/material';
import React, { FC, useContext, useRef, useState } from 'react';
import AttributePill from '../../common/AttributePill';
import {
  HeaderDateInfoRow,
  HeaderSubInfoRow,
  PastTreatmentContainer,
  PastTreatmentHeader,
  SubInfoBox,
} from './styles';
import { PastTreatmentDetailSection } from '../../../types/clientProfile';
import PastTreatMentDetails from './past-treatment-details';
import { MenuWrapper } from '../../../styles/global';
import { ReactComponent as ThreeDotsMenuIcon } from '../../../assets/icons/threedots.svg';
import BackgroundCurve from '../../../assets/images/client-profile/curve.svg';
import HandIcon from '../../../assets/icons/hand-left.svg';
import MapPinPointIcon from '../../../assets/icons/map-pin-outline.svg';
import { ReactComponent as PencilIcon } from '../../../assets/icons/pencil.svg';
import { ReactComponent as TrashIcon } from '../../../assets/icons/trash-can.svg';
import {
  DEFAULT_TIMEZONE,
  FORMAT_DATE,
  PAST_TR_SECTIONS,
} from '../../../constants/appConstants';
import PastTreatmentRecordSectionList from './past-treatment-record-section';
import { TreatmentRecordDialog } from '../../treatment-record/styles';
import CustomDialog from '../../common/CustomDialog';
import { ToastContext } from '../../../providers/context/toastContext';
import { TreatmentRecordDeletePopup } from '../../treatment-record/treatment-record-delete-popup';
import EditTreatmentRecord from './edit-past-treatment';
import { TREATMENT_SECTIONS } from '../../../constants/clients';
import { Treatment } from '../../../types/services/Treatment';
import { getTreatmentTagIcon } from './service';
import { TreatmentService } from '../../../services/Treatment';
import { TClientContext } from '../../../types/store/client';
import ClientContext from '../../../store/client/ClientContext';
import { refreshClientEndpoint } from '../../../store/client/ClientAction';
import moment from 'moment-timezone';
import { AxiosError } from 'axios';

interface Props {
  date?: Date | null;
  treatmentTag: string;
  estheticianName: string;
  location?: string | null;
  locationTZ?: string | null;
  treatmentDetails: Treatment;
  id: string;
  onView?: (record: Treatment) => void;
  onEdit?: (record: Treatment) => void;
}
const PastTreatment: FC<Props> = ({
  date,
  treatmentTag,
  estheticianName,
  location,
  locationTZ,
  treatmentDetails,
  id,
}) => {
  const ref = useRef<HTMLElement>(null);
  const subInfoDetails = [
    { icon: HandIcon, label: estheticianName },
    { icon: MapPinPointIcon, label: location },
  ];
  const treatmentSections: PastTreatmentDetailSection[] = TREATMENT_SECTIONS;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleDeleteModal = () => setDeleteModalOpen(!deleteModalOpen);
  const { showToast } = useContext(ToastContext);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { showErrorDialog } = useContext(ToastContext);
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
    setIsOpen(false);
  };
  const viewTreatmentRecord = () => {
    setIsOpen(true);
    setIsEdit(false);
  };
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
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
      if (error instanceof AxiosError) {
        showErrorDialog(error?.message);
      } else if (error instanceof Error) {
        showErrorDialog(error?.message);
      }
      console.log('Error', error);
    }
  };

  const keepEditingTR1 = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    handleDeleteModal();
  };

  return (
    <>
      <PastTreatmentContainer
        onClick={() => !deleteModalOpen && viewTreatmentRecord()}
      >
        <PastTreatmentHeader
          ref={ref}
          containerWidth={ref.current ? ref.current?.offsetHeight : 0}
          backgroundColor={
            treatmentDetails.isSubmitted
              ? 'var(--honey-50)'
              : 'var(--orange-50)'
          }
        >
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
              {treatmentTag && (
                <AttributePill
                  backgroundColor={
                    treatmentDetails.isSubmitted != false
                      ? 'honey-20'
                      : 'is-missing'
                  }
                  id={`tt-${treatmentTag}`}
                  PrefIcon={getTreatmentTagIcon(treatmentTag)}
                  label={treatmentTag.toUpperCase()}
                  fontSize={'12px'}
                  lineHeight={'16px'}
                  padding={'4px 8px'}
                  margin={`0 0 0 12px`}
                  iconMargin={'0 6px 0 0'}
                  letterSpacing={'0.03em'}
                />
              )}
            </div>
            <IconButton
              className={`menu-icon ${menuOpen && 'menu-open'}`}
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              aria-controls={menuOpen ? 'menu-icon' : undefined}
              aria-haspopup='true'
              aria-expanded={menuOpen ? 'true' : undefined}
              onClick={handleMenuClick}
            >
              <ThreeDotsMenuIcon />
            </IconButton>
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
              {!treatmentDetails.isSubmitted && (
                <MenuItem
                  onClick={handleMenuItemClick}
                  className='menu-item'
                  style={{ justifyContent: 'flex-start' }}
                >
                  <TrashIcon className='menu-icon' />
                  <Typography variant='body1'>Delete</Typography>
                </MenuItem>
              )}
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
          {treatmentDetails.isSubmitted && (
            <img
              src={BackgroundCurve}
              alt='background bottom curve'
              className='backgroundBottomCurve'
            />
          )}
        </PastTreatmentHeader>

        {treatmentDetails.isSubmitted && (
          <PastTreatMentDetails
            treatmentSections={treatmentSections}
            treatmentDetail={treatmentDetails}
          />
        )}
      </PastTreatmentContainer>
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

export default PastTreatment;

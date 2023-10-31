import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { Box, Button, MenuItem, Typography } from '@mui/material';
import { TreatmentType } from '../../../utils/types/treatmentTypes';

// icons
import { ReactComponent as LocationIcon } from '../../../assets/icons/location-pointer.svg';
import { ReactComponent as CalendarIcon } from '../../../assets/icons/calendar.svg';
import { ReactComponent as CheckmarkIcon } from '../../../assets/icons/checkmark.svg';
import { ReactComponent as ExpandDown } from '../../../assets/icons/expand-down.svg';
import { ReactComponent as ExpandUp } from '../../../assets/icons/expand-up.svg';
import {
  FORMAT_DATE,
  CLIENT_PREFERENCES,
  ENHANCEMENT_RECOMMENDATIONS,
  DEFAULT_TIMEZONE,
} from '../../../constants/appConstants';
import moment from 'moment';

// styled compoents
import {
  AttributesSection,
  ClientHeader,
  ClientName,
  LocationDateWrapper,
  TreatmentTypeMenu,
  TreatmentTypeWrapper,
} from './styles';
import { SelectedPreferencesWrapper } from '../client-preferences/styles';
import AttributePill from '../../common/AttributePill';
import { TFormContext } from '../../../types/store/form';
import FormContext from '../../../store/form/formContext';
import { updateForm } from '../../../store/form/formAction';
import { TClientContext } from '../../../types/store/client';
import ClientContext from '../../../store/client/ClientContext';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
dayjs.extend(isToday);
dayjs.extend(isYesterday);

const treatmentTypes: TreatmentType[] = [
  {
    id: '50_min_facial',
    name: '50 Minute Facial',
  },
  {
    id: 'recovery_facial',
    name: 'Recovery Facial',
  },
  {
    id: 'training_facial',
    name: 'Training Facial',
  },
];
interface Props {
  treatmentType: string;
  location: string;
  tz: string;
}
const ClientInfo: FC<Props> = ({ treatmentType, location, tz }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { clientState } = useContext<TClientContext>(ClientContext);
  const { formState, formDispatch } = useContext<TFormContext>(FormContext);

  // selected treatment type
  const [selectedTreatmentType, setSelectedTreatmentType] =
    useState<TreatmentType>(
      treatmentTypes.find((type) => type.id === treatmentType) ||
        treatmentTypes[0]
    );
  const handleClose = (treatmentType: TreatmentType) => {
    setAnchorEl(null);
    setSelectedTreatmentType(treatmentType);
  };

  const selectedTreatmentTypeName = treatmentTypes.find(
    (treatmentType) => treatmentType.id == selectedTreatmentType.id
  )?.name;

  const selectedPreferences = useMemo(() => {
    return CLIENT_PREFERENCES.filter((preference) =>
      clientState.keyAttributes?.includes(preference.cp_label)
    );
  }, [clientState.keyAttributes]);

  const selectedEnhancementRecommendations = useMemo(() => {
    const pastEnhancement =
      clientState.pastTreatmentData?.next_time_enhancement;
    return pastEnhancement?.length
      ? ENHANCEMENT_RECOMMENDATIONS.filter((enhancement_recommendation) =>
          pastEnhancement.includes(enhancement_recommendation.er_label)
        )
      : [];
  }, [clientState.pastTreatmentData]);

  useEffect(() => {
    formDispatch(updateForm({ treatmentType: selectedTreatmentType.name }));
  }, [selectedTreatmentType]);
  const getLabelFromDate = (
    date: Date,
    tz: string = DEFAULT_TIMEZONE
  ): string => {
    if (!date || date === undefined) return '';
    let dayString;
    if (dayjs(date).isToday()) {
      dayString = 'Today';
    } else if (dayjs(date).isYesterday()) {
      dayString = 'Yesterday';
    } else {
      dayString = dayjs(date).format('MM/DD/YY');
    }

    const getTime = moment.tz(date, tz).format(FORMAT_DATE.TIME_MIN);
    return `${dayString} @ ${getTime}`;
  };

  return (
    <Box>
      <>
        <ClientHeader>
          <ClientName variant='h2' fontWeight={400}>
            {`${clientState.firstName} ${clientState.lastName}`}
          </ClientName>
          <LocationDateWrapper>
            <div className='inner-wrapper'>
              <LocationIcon className='icon' />
              {location && (
                <Typography variant='body1' fontWeight={400}>
                  {location}
                </Typography>
              )}
            </div>
            <div className='inner-wrapper'>
              <CalendarIcon className='icon' />
              <Typography variant='body1' fontWeight={400}>
                {formState.location &&
                  getLabelFromDate(formState.appointmentTime, tz)}
              </Typography>
            </div>
          </LocationDateWrapper>
          <TreatmentTypeWrapper>
            <div>
              <Typography variant='label' fontWeight={400}>
                TREATMENT TYPE
              </Typography>
            </div>
            <Button
              id='basic-button'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              className='treatment-type-btn'
            >
              <Typography variant='body1' fontWeight={400}>
                {selectedTreatmentTypeName}
              </Typography>
              <div className='expand-icon-wrapper'>
                {open ? <ExpandUp /> : <ExpandDown />}
              </div>
            </Button>
          </TreatmentTypeWrapper>
          <TreatmentTypeMenu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose(selectedTreatmentType)}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            className='treatment-type-menu'
          >
            {treatmentTypes.map((singleTreatmentType) => {
              return (
                <MenuItem
                  key={singleTreatmentType.id}
                  onClick={() => handleClose(singleTreatmentType)}
                  className='treatment-type-menu-item'
                >
                  <Typography>{singleTreatmentType.name}</Typography>
                  {singleTreatmentType.id == selectedTreatmentType.id && (
                    <CheckmarkIcon className='checkmark-icon' />
                  )}
                </MenuItem>
              );
            })}
          </TreatmentTypeMenu>
        </ClientHeader>
        {selectedPreferences.length ? (
          <AttributesSection>
            <Typography
              variant='label'
              className='attribute-label-title'
              fontWeight={400}
            >
              Key Attributes
            </Typography>
            <SelectedPreferencesWrapper>
              {selectedPreferences.map(({ cp_id, icon, cp_label }) => {
                return (
                  <Box key={`header-attribute-${cp_id}`}>
                    <AttributePill
                      id={cp_id}
                      PrefIcon={icon}
                      label={cp_label}
                      backgroundColor='honey-50'
                      height='40px'
                    />
                  </Box>
                );
              })}
            </SelectedPreferencesWrapper>
          </AttributesSection>
        ) : null}
        {selectedEnhancementRecommendations.length ? (
          <AttributesSection>
            <Typography variant='label' className='attribute-label-title'>
              Enhancement Recommendation
            </Typography>
            <SelectedPreferencesWrapper>
              {selectedEnhancementRecommendations.map(
                ({ er_id, icon, er_label }) => {
                  return (
                    <Box key={`enhancement-recommendation-${er_id}`}>
                      <AttributePill
                        id={er_id}
                        PrefIcon={icon}
                        label={er_label}
                        backgroundColor='neutral-tertiary-dark'
                        height='40px'
                      />
                    </Box>
                  );
                }
              )}
            </SelectedPreferencesWrapper>
          </AttributesSection>
        ) : null}
      </>
    </Box>
  );
};

export default ClientInfo;

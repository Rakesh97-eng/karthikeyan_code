import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FC, useContext } from 'react';
import { Section } from '../../../types/treatmentRecord/question';
import TreatmentRecordSection from '../treatment-record-section';
import { TRSectionHeaderWrapper } from '../treatment-record-section/styles';
import { CoreSegmentInnerWrapper, CoreSegmentWrapper } from './styles';
import { ErrorChip } from '../../common/ErrorToast';
import { ERROR_MESSAGES } from '../../../constants/errorConstant';
import { CLIENT_PREFERENCES } from '../../../constants/appConstants';
import AttributePill from '../../common/AttributePill';
import { SelectedPreferencesWrapper } from '../client-preferences/styles';
import { FormState } from '../../../types/store/form';
import ClientContext from '../../../store/client/ClientContext';

interface ITreatmentRecordRecordSegments {
  section: Section;
  error?: boolean;
  prefilledData?: Partial<FormState>;
}

const TreatmentRecordCoreSegments: FC<ITreatmentRecordRecordSegments> = ({
  section,
  error,
  prefilledData,
}) => {
  const { clientState } = useContext(ClientContext);

  const selectedPreferences = clientState?.keyAttributes?.map(
    (keyAttribute) => {
      return CLIENT_PREFERENCES?.find(
        (clientPref) => clientPref.cp_label === keyAttribute
      );
    }
  );

  return (
    <CoreSegmentWrapper>
      <CoreSegmentInnerWrapper>
        <TRSectionHeaderWrapper>
          <img src={section.icon} className='tr-section-icon' />
          <Typography variant='h3' className='core-segment-title'>
            {section.title}
            {error && <ErrorChip text={ERROR_MESSAGES.chooseThree} />}
          </Typography>
        </TRSectionHeaderWrapper>
        <Typography variant='body1' className='core-segment-info'>
          {section.info}
        </Typography>
        <SelectedPreferencesWrapper>
          {selectedPreferences?.map((selectedPreference) => {
            if (selectedPreference) {
              return (
                <Box
                  key={`core-segment-attribute-${selectedPreference?.cp_id}`}
                >
                  <AttributePill
                    id={selectedPreference?.cp_id}
                    PrefIcon={selectedPreference?.icon}
                    label={selectedPreference?.cp_label}
                    backgroundColor='honey-50'
                    height='40px'
                  />
                </Box>
              );
            }
          })}
        </SelectedPreferencesWrapper>
      </CoreSegmentInnerWrapper>
      <Box>
        {section.sections?.map((innerSection: Section, index: number) => {
          return (
            <TreatmentRecordSection
              key={`tr-core-segments-section-${index}`}
              section={innerSection}
              childKey={index}
              prefilledData={prefilledData}
            />
          );
        })}
      </Box>
    </CoreSegmentWrapper>
  );
};

export default TreatmentRecordCoreSegments;

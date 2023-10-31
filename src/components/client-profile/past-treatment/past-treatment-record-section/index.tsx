import { FC, useContext } from 'react';
import { Typography, List, ListItem } from '@mui/material';
import { Box } from '@mui/system';
import {
  PastTreatment,
  PastTreatmentElement,
} from '../../../../types/treatmentRecord/question';

// styles
import {
  PastTreatmentRecordWrapper,
  TRSectionHeaderWrapper,
  TRSectionWrapper,
} from './styles';

import TreatmentRecordHeader from '../../../treatment-record/treatment-record-header';
import PastTreatmentClientFollowUp from '../past-treatment-client-follow-up';
import { PAST_TR_SECTIONS } from '../../../../constants/enums';
import {
  Treatment,
  TreatmentResponse,
} from '../../../../types/services/Treatment';
import ClientInfoHeader from '../../../treatment-record/client-info/clientInfoPTHeader';
import ClientContext from '../../../../store/client/ClientContext';
import { TClientContext } from '../../../../types/store/client';
import { getOptionsLabel } from '../../../../utils/helper-functions/common';

interface PastTreatmentRecordSectionListProps {
  pastTrSections: PastTreatment[];
  handleClose: () => void;
  editTreatmentRecord: (treatment: Treatment) => void;
  treatmentDetails: TreatmentResponse;
}
interface PastTreatmentRecordSectionCard {
  section: PastTreatment;
}

interface InnerListULCard {
  selectedOptions: string | number | boolean | Date | null | Element[];
}

interface ElementProps {
  element: PastTreatmentElement;
}

const PastTreatmentRecordSectionList: FC<
  PastTreatmentRecordSectionListProps
> = ({
  pastTrSections,
  handleClose,
  editTreatmentRecord,
  treatmentDetails,
}) => {
  const { clientState } = useContext<TClientContext>(ClientContext);
  const pastTrSec: PastTreatment[] = pastTrSections.map((sec) => {
    if (sec.title === PAST_TR_SECTIONS.CLIENT_FOLLOW_UP) {
      sec.product = treatmentDetails['recommendedProduct'];
    }
    return {
      ...sec,
      elements: getSectionElement(sec.elements),
    };
  });
  function getSectionElement(
    elements: PastTreatmentElement[]
  ): PastTreatmentElement[] {
    return elements.map((elem) => {
      if (elem.id === 'internalNotes') {
        return {
          ...elem,
          selectedOptions:
            treatmentDetails?.note?.find((note) => note.type === elem?.type)
              ?.text || 'NA',
        };
      }
      if (elem.id === 'clientMessage') {
        return {
          ...elem,
          selectedOptions:
            treatmentDetails?.note?.find((note) => note.type === elem?.type)
              ?.text || 'NA',
        };
      }
      if (elem.id === 'generalNotes') {
        return {
          ...elem,
          selectedOptions: clientState?.keyAttributes?.join(', ') || '',
        };
      }
      if (elem.id === 'note') {
        return {
          ...elem,
          selectedOptions:
            treatmentDetails?.note?.find((note) => note.type === elem?.type)
              ?.text || '',
        };
      }
      if (!Array.isArray(elem.elements)) {
        return {
          ...elem,
          selectedIds: treatmentDetails[elem.id] as string | string[],
          selectedOptions: treatmentDetails[elem.id]
            ? getOptionsLabel(treatmentDetails[elem.id] as string | string[])
            : 'NA',
        };
      } else {
        return {
          ...elem,
          selectedIds: treatmentDetails[elem.id] as string | string[],
          selectedOptions: treatmentDetails[elem.id]
            ? getOptionsLabel(treatmentDetails[elem.id] as string | string[])
            : 'NA',
          elements: getSectionElement(elem.elements),
        };
      }
    });
  }
  const treatedBy = treatmentDetails?.treatedByStaff?.firstName
    ? `${treatmentDetails?.treatedByStaff?.firstName} ${treatmentDetails?.treatedByStaff?.lastName}`
    : treatmentDetails?.treatedByStaff?.name;
  const lastEditedBy = treatmentDetails?.enteredByStaff?.firstName
    ? `${treatmentDetails?.enteredByStaff?.firstName} ${treatmentDetails?.enteredByStaff?.lastName}`
    : treatmentDetails?.enteredByStaff?.name;
  return (
    <>
      <TreatmentRecordHeader
        closeFunc={() => handleClose()}
        pastTreatment={true}
        editTreatmentRecord={() => editTreatmentRecord(treatmentDetails)}
        treatmentId={treatmentDetails.id}
        treatmentIsSubmitted={treatmentDetails.isSubmitted || false}
      />
      <PastTreatmentRecordWrapper>
        <ClientInfoHeader
          firstName={clientState.firstName}
          lastName={clientState.lastName}
          treatedAt={treatmentDetails.appointmentTime}
          treatedBy={treatedBy}
          locationName={treatmentDetails.location.name}
          locationTZ={treatmentDetails.location.tz}
          lastEditedBy={lastEditedBy || null}
          lastEditedAt={treatmentDetails.appointmentTime}
        />
        {pastTrSec.map((section, index) => {
          return section.title !== PAST_TR_SECTIONS.CLIENT_FOLLOW_UP ? (
            <PastTreatmentCards
              key={`pasTreatment-${index}`}
              section={section}
            />
          ) : (
            <PastTreatmentClientFollowUp
              key={`pasTreatment-${index}`}
              section={section}
            />
          );
        })}
      </PastTreatmentRecordWrapper>
    </>
  );
};

const PastTreatmentCards: FC<PastTreatmentRecordSectionCard> = ({
  section,
}) => {
  return (
    <TRSectionWrapper>
      <Box className='tr-section-titles-wrapper'>
        <TRSectionHeaderWrapper>
          <img src={section.icon} className='tr-section-icon' />
          <Typography variant='h3' fontWeight={400}>
            {section.title}
          </Typography>
        </TRSectionHeaderWrapper>

        <Typography
          variant='body1'
          fontWeight={400}
          className='tr-section-info'
        >
          {section.info}
        </Typography>
      </Box>
      <Box className='tr-section-elements-wrapper'>
        <List>
          {section?.elements.map((element, id) => {
            return (
              <ListItem key={`list-${id}`} className='list-item'>
                <ListItemWrapper element={element} />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </TRSectionWrapper>
  );
};

const ListItemWrapper: FC<ElementProps> = ({ element }) => {
  return (
    <div className='list-item preview-list-wrapper'>
      <Typography
        component='div'
        textTransform={'uppercase'}
        variant='label'
        display='inline'
        className='tr-label'
      >
        {element?.label}
        {typeof element.selectedOptions === 'string' &&
        typeof element.elements !== 'object'
          ? ':'
          : null}
      </Typography>
      {element.selectedOptions !== '' && (
        <Typography
          component='div'
          display='inline'
          className='li-text'
          variant='body1'
        >
          {element.elements && typeof element.elements === 'object'
            ? ''
            : element.selectedOptions == ''
            ? 'NA'
            : element?.selectedOptions}
        </Typography>
      )}

      {element.elements && typeof element.elements === 'object' && (
        <List>
          {element.elements.map((element, id: number) => {
            return (
              <ListItem key={`list-${id}`} className='list-item'>
                <ListItemWrapper element={element} />
              </ListItem>
            );
          })}
        </List>
      )}
    </div>
  );
};

export default PastTreatmentRecordSectionList;

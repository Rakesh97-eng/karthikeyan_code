import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import { Typography, FormControl } from '@mui/material';
import { Box } from '@mui/system';
import { Section } from '../../../types/treatmentRecord/question';

// styles
import {
  ElementSection,
  TRSectionHeaderWrapper,
  TRSectionWrapper,
} from './styles';
import CustomSwitch from '../../common/CustomSwitch';
import { FormState, TFormContext } from '../../../types/store/form';
import FormContext from '../../../store/form/formContext';
import { updateForm } from '../../../store/form/formAction';
import { ELEMENT_ID } from '../../../constants/enums';
import TRClientPreferences from '../client-preferences';
import getFormElements from '../../common/FormElement';

interface ITreatmentRecordSection {
  section: Section;
  childKey: number;
  prefilledData?: Partial<FormState>;
}

const TreatmentRecordSection: FC<ITreatmentRecordSection> = ({
  section,
  childKey,
  prefilledData,
}) => {
  const { formDispatch, formState } = useContext<TFormContext>(FormContext);
  const updateFormState = (data: FormState) => {
    formDispatch(updateForm(data));
  };
  const hasElements =
    section.elements && section.elements.length ? true : false;
  const [isChecked, setIsChecked] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (section.id) {
      if (prefilledData && prefilledData[section?.id]) {
        setIsChecked(prefilledData[section.id]);
      } else {
        setIsChecked(false);
      }
    }
  }, [prefilledData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // added intentionally
    setIsChecked(event.target.checked);
    // update core segment toggle values to the form
    if (section.id) {
      updateFormState({
        [section.id]: event.target.checked,
      });
    }
  };

  // flag to check if section is a segment section
  const isSegmentSection = typeof isChecked !== 'undefined';

  return (
    <TRSectionWrapper key={childKey}>
      <Box className='tr-section-titles-wrapper'>
        <TRSectionHeaderWrapper>
          <object
            type='image/svg+xml'
            data={section.icon}
            className='tr-section-icon'
          />
          <Typography
            variant={!isSegmentSection || isChecked ? 'h3' : 'h4'}
            fontWeight={400}
          >
            {section.title}
          </Typography>
          {isSegmentSection && (
            <FormControl className='custom-switch'>
              <CustomSwitch
                checked={isChecked}
                name={section.id ? section.id : `switch-${childKey}`}
                onChange={handleChange}
              />
            </FormControl>
          )}
        </TRSectionHeaderWrapper>
        {(!isSegmentSection || isChecked) && (
          <Typography
            variant='body1'
            className='tr-section-info'
            fontWeight={400}
          >
            {section.info}
          </Typography>
        )}
      </Box>
      {hasElements && (!isSegmentSection || isChecked) && (
        <>
          <Box className='tr-section-elements-wrapper'>
            {section.elements?.map((element, index) => (
              <Fragment key={`section-element-${section.id}-${index}`}>
                <ElementSection>
                  {getFormElements(
                    element,
                    {
                      formState,
                      formDispatch,
                    },
                    prefilledData
                  )}
                </ElementSection>
                {element.id === ELEMENT_ID.MANAGE_CLIENT_PREFERENCES && (
                  <TRClientPreferences />
                )}
              </Fragment>
            ))}
          </Box>
        </>
      )}
    </TRSectionWrapper>
  );
};

export default TreatmentRecordSection;

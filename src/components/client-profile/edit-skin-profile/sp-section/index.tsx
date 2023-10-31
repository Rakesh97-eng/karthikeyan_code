import { Box, Typography } from '@mui/material';
import React, { FC, Fragment, useState } from 'react';
import {
  ADDITIONAL_RESPONSE,
  OUTSIDE_US,
} from '../../../../constants/appConstants';
import {
  ErrorObject,
  IntakeFormSectionResponseType,
  SkinProfileQuestion,
  SkinProfileQuestionTypes,
  SkinProfileSectionType,
} from '../../../../types/clientProfile';
import { FormState, IntakeFormState } from '../../../../types/store/form';
import { dateFormatValidator } from '../../../../utils/helper-functions/common';
import Checkbox from '../../../common/Checkbox';
import CheckboxWithTextField from '../../../common/CheckboxWithTextField';
import DateField from '../../../common/DateField';
import RadioButton from '../../../common/RadioButton';
import RadioButtonWithTextField from '../../../common/RadioButtonWithTextField';
import TextArea from '../../../common/TextArea';
import IntakeCustomDialog from '../../../intake/intake-common/intakeCustomDialog';
import {
  UnderEighteenPopUp,
  UnderFifteenPopUp,
} from '../../../intake/intake-popup';
import { SPSectionHeaderWrapper, SPSectionWrapper } from './styles';

interface ISPSection extends SkinProfileSectionType {
  sectionInfo?: string;
  handleChange?: (
    sectionID: string,
    questionID: string,
    questionResponse?: string,
    additionalResponse?: string
  ) => void;
  clientSectionData?: IntakeFormSectionResponseType[];
  errors?: ErrorObject;
}

const SPSection: FC<ISPSection> = ({
  sectionID,
  sectionTitle,
  sectionIcon,
  sectionQuestions,
  altSectionTitle,
  sectionInfo,
  handleChange,
  clientSectionData,
  children,
  errors,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [ageEighteen, setAgeEighteen] = useState<boolean>(false);
  const [ageFifteen, setAgeFifteen] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);

  const commonHandler = (fieldValues: FormState) => {
    const questionID = Object.keys(fieldValues)[0];
    const questionResponses = Object.values(fieldValues);
    handleChange &&
      handleChange(sectionID, questionID, questionResponses.join(','));
  };

  const onDateClickHandler = (data: FormState) => {
    if (dateFormatValidator(data.birthday)) {
      commonHandler(data);
      const todayDate = new Date();
      let difference =
        (todayDate?.getTime() - new Date(data.birthday).getTime()) / 1000;
      difference /= 60 * 60 * 24;
      const ageDifferent = Math.abs(Math.round(difference / 365.25));
      if (difference > 0) {
        setDateError(false);
        if (ageDifferent <= 18 && ageDifferent > 15) {
          setDateError(true);
          setAgeEighteen(true);
          setAgeFifteen(false);
          setIsOpen(true);
        } else if (ageDifferent <= 15) {
          setDateError(true);
          setAgeFifteen(true);
          setAgeEighteen(false);
          setIsOpen(true);
        } else {
          setDateError(false);
          setAgeFifteen(false);
          setAgeEighteen(false);
        }
      } else {
        setDateError(true);
      }
    } else {
      setDateError(true);
    }
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const isDateValidate = () => {
    setDateError(false);
  };
  const textChangeHandler = (fieldValues: FormState) => {
    const questionID = Object.keys(fieldValues)[0];
    const additionalResponse = Object.values(fieldValues).toString();
    handleChange &&
      handleChange(sectionID, questionID, undefined, additionalResponse);
  };

  const additionalLabelHandler = (fieldValues: FormState) => {
    const questionID = Object.keys(fieldValues)[0];
    const additionalResponse = Object.values(fieldValues).toString();
    handleChange && handleChange(sectionID, questionID, '', additionalResponse);
  };

  const getSectionElement = (
    sectionQuestion: SkinProfileQuestion,
    currSectionQuestionValue?: string,
    additionalResponse?: string
  ) => {
    const isRequiredErr =
      errors !== undefined
        ? Object.prototype.hasOwnProperty.call(errors, sectionQuestion.id) ||
          Object.prototype.hasOwnProperty.call(
            errors,
            sectionQuestion.id + ADDITIONAL_RESPONSE
          )
        : false;

    switch (sectionQuestion.questionType) {
      case SkinProfileQuestionTypes.radio: {
        if (
          sectionQuestion.includeOtherVal &&
          sectionQuestion.includeOtherVal !== ''
        ) {
          return (
            <RadioButtonWithTextField
              {...sectionQuestion}
              defaultSelectedValue={currSectionQuestionValue}
              onChangeHandler={commonHandler}
              textChangeHandler={textChangeHandler}
              includeOtherVal={sectionQuestion.includeOtherVal}
              additionalResponse={additionalResponse}
              error={isRequiredErr}
            />
          );
        } else {
          return (
            <RadioButton
              {...sectionQuestion}
              defaultSelectedValue={currSectionQuestionValue}
              onChangeHandler={commonHandler}
              error={isRequiredErr}
            />
          );
        }
      }
      case SkinProfileQuestionTypes.checkbox: {
        const selectedValArr = currSectionQuestionValue?.split(',');
        if (
          sectionQuestion.includeOtherVal &&
          sectionQuestion.includeOtherVal !== ''
        ) {
          return (
            <CheckboxWithTextField
              {...sectionQuestion}
              onChangeHandler={commonHandler}
              selectedValue={selectedValArr}
              includeOtherVal={sectionQuestion.includeOtherVal}
              textChangeHandler={textChangeHandler}
              additionalResponse={additionalResponse}
              error={isRequiredErr}
            />
          );
        } else {
          return (
            <Checkbox
              {...sectionQuestion}
              selectedValue={selectedValArr}
              onChangeHandler={commonHandler}
              error={isRequiredErr}
            />
          );
        }
      }
      case SkinProfileQuestionTypes.textbox: {
        //sending upper title for text field
        const sectionQuestionWithUpperTitle = {
          ...sectionQuestion,
          upperTitle: sectionQuestion.questionTitle,
        };
        return (
          <TextArea
            {...sectionQuestionWithUpperTitle}
            multiLineEnable={false}
            onChangeHandler={commonHandler}
            selectedValue={
              currSectionQuestionValue != ''
                ? currSectionQuestionValue
                : additionalResponse
            }
            error={isRequiredErr}
            additionalLabelHandler={additionalLabelHandler}
          />
        );
      }

      case SkinProfileQuestionTypes.zipcode: {
        //sending upper title for text field
        const sectionQuestionWithUpperTitle = {
          ...sectionQuestion,
          upperTitle: sectionQuestion.questionTitle,
        };
        return (
          <TextArea
            {...sectionQuestionWithUpperTitle}
            multiLineEnable={false}
            onChangeHandler={commonHandler}
            selectedValue={
              currSectionQuestionValue != ''
                ? currSectionQuestionValue
                : additionalResponse
            }
            additionalLabelHandler={additionalLabelHandler}
            isDisabled={additionalResponse == OUTSIDE_US}
            error={isRequiredErr}
          />
        );
      }

      case SkinProfileQuestionTypes.date: {
        //sending upper title for text field
        const sectionQuestionWithUpperTitle = {
          ...sectionQuestion,
          upperTitle: sectionQuestion.questionTitle,
        };
        return (
          <DateField
            {...sectionQuestionWithUpperTitle}
            onChangeHandler={onDateClickHandler}
            selectedValue={
              currSectionQuestionValue != ''
                ? currSectionQuestionValue
                : additionalResponse
            }
            additionalLabelHandler={additionalLabelHandler}
            error={isRequiredErr}
          />
        );
      }

      default:
        return null;
    }
  };

  return (
    <SPSectionWrapper>
      <Box className='sp-section-titles-wrapper'>
        <SPSectionHeaderWrapper>
          <object
            type='image/svg+xml'
            data={sectionIcon}
            className='sp-section-icon'
          />
          <Typography variant='h3'>
            {altSectionTitle || sectionTitle}
          </Typography>
        </SPSectionHeaderWrapper>
        {sectionInfo && (
          <Typography variant='body1' className='sp-section-info'>
            {sectionInfo}
          </Typography>
        )}
      </Box>
      <Box className='sp-section-elements-wrapper'>
        {sectionQuestions
          ? sectionQuestions.map((sectionQuestion, index) => {
              const currSectionQuestionValue = clientSectionData?.find(
                (currSectionQuestion) =>
                  currSectionQuestion.questionID === sectionQuestion.id
              )?.questionResponse;
              const additionalResponse = clientSectionData?.find(
                (currSectionQuestion) =>
                  currSectionQuestion.questionID === sectionQuestion.id
              )?.additionalResponse;
              return (
                <Fragment key={`section-element-${sectionID}-${index}`}>
                  <Box>
                    {getSectionElement(
                      sectionQuestion,
                      currSectionQuestionValue,
                      additionalResponse
                    )}
                  </Box>
                </Fragment>
              );
            })
          : children}
      </Box>
      {(ageEighteen || ageFifteen) && (
        <IntakeCustomDialog
          isModalOpen={isOpen}
          handleClose={handleClose}
          maxWidthSize='684px'
        >
          {ageEighteen && (
            <UnderEighteenPopUp
              onClose={handleClose}
              isDateValidate={isDateValidate}
            />
          )}
          {ageFifteen && <UnderFifteenPopUp onClose={handleClose} />}
        </IntakeCustomDialog>
      )}
    </SPSectionWrapper>
  );
};

export default SPSection;

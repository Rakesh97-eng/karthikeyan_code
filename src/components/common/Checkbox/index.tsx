import React, { useState, ChangeEvent, useEffect, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { QuestionOptions } from '../../../types/treatmentRecord/question';
import CheckboxBody from './CheckboxBody';
import { StyledMandatory, StyledOptional } from '../../../styles/global';
import QuestionNote from '../QuestionNote';
import QuestionInfo from '../QuestionInfo';
import { FormState, TFormContext } from '../../../types/store/form';
import { ErrorChip } from '../ErrorToast';
import { ERROR_MESSAGES } from '../../../constants/errorConstant';
import { ELEMENT_ID } from '../../../constants/enums';
import { INTAKE_DEFAULT_NONE } from '../../../constants/appConstants';
import { ItalicText, LabelsWrapper } from '../FormElement/styles';
import { StyledNestedElementWrapper } from './styles';
import getFormElements from '../FormElement';
import FormContext from '../../../store/form/formContext';

interface Props {
  id: string;
  note?: string;
  label: string;
  info?: string;
  options?: QuestionOptions[];
  mandatory: boolean;
  multiRequire?: number;
  onChangeHandler: (data: FormState) => void;
  error?: boolean;
  selectedValue?: string[];
  infoItalic?: boolean;
  prefilledData?: Partial<FormState>;
}

const Checkbox: React.FC<Props> = ({
  id,
  note,
  label,
  info,
  options,
  mandatory,
  multiRequire,
  onChangeHandler,
  error = false,
  selectedValue,
  infoItalic,
  prefilledData,
}) => {
  const { formDispatch, formState } = useContext<TFormContext>(FormContext);

  const [checkedVal, setCheckedVal] = useState<string[]>(
    selectedValue ? selectedValue : []
  );
  useEffect(() => {
    if (selectedValue) {
      setCheckedVal(selectedValue);
    }
  }, [selectedValue]);

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.checked) {
      if (
        target.value === INTAKE_DEFAULT_NONE ||
        checkedVal.includes(INTAKE_DEFAULT_NONE)
      ) {
        onChangeHandler({
          [id]: [...[target?.value]],
        });
        setCheckedVal([...[target?.value]]);
      } else {
        multiRequire
          ? multiRequire >= checkedVal.length + 1 &&
            onChangeHandler({
              [id]: [...checkedVal, ...[target?.value]],
            })
          : onChangeHandler({
              [id]: [...checkedVal, ...[target?.value]],
            });
        multiRequire
          ? multiRequire >= checkedVal.length + 1 &&
            setCheckedVal([...checkedVal, ...[target?.value]])
          : setCheckedVal([...checkedVal, ...[target?.value]]);
      }
    } else {
      if (checkedVal.includes(target.value)) {
        const updatedState: string[] = checkedVal.filter(
          (item) => item !== target.value
        );
        onChangeHandler({ [id]: updatedState });
        setCheckedVal(updatedState);
      }
    }
  };

  return (
    <Box className='questions-wrapper'>
      <LabelsWrapper>
        <Typography
          variant='body1'
          component='div'
          color={'var(--neutral-primary)'}
          className={id}
          fontWeight={400}
        >
          {label}
          {note && <QuestionNote note={note} />}
          {multiRequire && (
            <StyledOptional>(choose up to {multiRequire})</StyledOptional>
          )}
          {mandatory ? (
            <StyledMandatory> *</StyledMandatory>
          ) : (
            id !== ELEMENT_ID.MANAGE_CLIENT_PREFERENCES && (
              <StyledOptional>(optional)</StyledOptional>
            )
          )}
          {error && <ErrorChip text={ERROR_MESSAGES.required} />}
        </Typography>
        {info ? (
          infoItalic ? (
            <ItalicText>
              <QuestionInfo info={info} />
            </ItalicText>
          ) : (
            <QuestionInfo info={info} />
          )
        ) : null}
      </LabelsWrapper>

      <div>
        {options?.length &&
          options.map((option, index) => {
            return (
              <>
                <CheckboxBody
                  key={`checkbox-${id}-${index}`}
                  id={`checkbox-${id}-${index}`}
                  name={id}
                  checked={checkedVal?.includes(option?.value)}
                  onChange={onChange}
                  fontWeight={600}
                  {...option}
                />
                {option.subLabel && checkedVal?.includes(option?.value) && (
                  <ItalicText>
                    <Typography variant='body1'>{option.subLabel}</Typography>
                  </ItalicText>
                )}
                <StyledNestedElementWrapper
                  show={
                    !!option.elements?.length &&
                    checkedVal?.includes(option?.value)
                  }
                >
                  {option.elements?.length &&
                    checkedVal?.includes(option?.value) &&
                    option.elements.map((element) => {
                      return getFormElements(
                        element,
                        {
                          formState,
                          formDispatch,
                        },
                        prefilledData
                      );
                    })}
                </StyledNestedElementWrapper>
              </>
            );
          })}
      </div>
    </Box>
  );
};

export default Checkbox;

import { FC, useContext, useState } from 'react';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import {
  Collapse,
  SectionElementTypes,
} from '../../../types/treatmentRecord/question';
import RadioButton from '../RadioButton';
import Checkbox from '../Checkbox';
import { ReactComponent as PlusButton } from '../../../assets/icons/collapse-plus.svg';
import { ReactComponent as MinusButton } from '../../../assets/icons/collapse-minus.svg';
import { CollapseWrapper } from './index.styles';

import { FormState } from '../../../types/store/form';
import FormContext from '../../../store/form/formContext';
interface ICollapse {
  singleElement: Collapse;
  id: string;
  onChange: (data: FormState) => void;
}

const SingleCollapse: FC<ICollapse> = ({ singleElement, id, onChange }) => {
  const { formState } = useContext(FormContext);
  const [activeStep, setActiveStep] = useState(false);

  const handleOpen = () => {
    onChange({ [id]: !activeStep });
    setActiveStep(!activeStep);
  };
  const updateFormState = (data: FormState) => {
    onChange(data);
  };

  return (
    <CollapseWrapper>
      <Box>
        <Stepper orientation='vertical' activeStep={activeStep ? 0 : 1}>
          <Step>
            <StepLabel
              icon={activeStep ? <MinusButton /> : <PlusButton />}
              className='collapse-label'
              onClick={handleOpen}
            >
              <Typography variant='body1' className="txt-color"> {singleElement.title}</Typography>
            </StepLabel>
            <StepContent className='step-content'>
              {singleElement.elements.map((element) => {
                switch (element.type) {
                  case SectionElementTypes.radio:
                    return (
                      <RadioButton
                        {...element}
                        onChangeHandler={updateFormState}
                        error={
                          formState.errors
                            ? !!formState.errors[element.id]
                            : false
                        }
                      />
                    );
                  case SectionElementTypes.checkbox:
                    return (
                      <Checkbox
                        {...element}
                        onChangeHandler={updateFormState}
                        error={
                          formState.errors
                            ? !!formState.errors[element.id]
                            : false
                        }
                      />
                    );
                  default:
                    return null;
                }
              })}
            </StepContent>
          </Step>
        </Stepper>
      </Box>
    </CollapseWrapper>
  );
};

export default SingleCollapse;

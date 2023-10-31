import React, { useState, ChangeEvent, useEffect } from 'react';
import { Typography } from '@mui/material';
import { DEFAULT_NONE } from '../../../../constants/appConstants';
import { FormState } from '../../../../types/store/form';
import {
  StyledCheckboxInput,
  StyledCheckboxLabel,
  StyledCheckboxLabelWrapper,
} from './styles';

interface Props {
  id: string;
  name: string;
  label: string;
  onChangeHandler: (data: FormState, id: string, name:string) => void;
  selectedValue?: string[];
  key?: string;
}

const FilterCheckbox: React.FC<Props> = ({
  id,
  name,
  label,
  onChangeHandler,
  selectedValue,
}) => {
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
      if (target.value === DEFAULT_NONE || checkedVal.includes(DEFAULT_NONE)) {
        onChangeHandler({
          [id]: [...[target?.value]],
        }, id, name);
        setCheckedVal([...[target?.value]]);
      } else {
        onChangeHandler({
          [id]: [...checkedVal, ...[target?.value]],
        }, id, name);
        setCheckedVal([...checkedVal, ...[target?.value]]);
      }
    } else {
      if (checkedVal.includes(target.value)) {
        const updatedState: string[] = checkedVal.filter(
          (item) => item !== target.value
        );
        onChangeHandler({ [id]: updatedState }, id, name);
        setCheckedVal(updatedState);
      }
    }
  };

  return (
    <StyledCheckboxLabelWrapper>
      <StyledCheckboxInput
        name={name}
        id={id}
        type={'checkbox'}
        value={label}
        checked={checkedVal?.includes(label)}
        onChange={onChange}
      />
      <StyledCheckboxLabel htmlFor={'id'}>
        <Typography variant='body1'>{label}</Typography>
      </StyledCheckboxLabel>
    </StyledCheckboxLabelWrapper>
  );
};

export default FilterCheckbox;

import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Collapse } from '../../../types/treatmentRecord/question';
import SingleCollapse from '../Collapse';
import { MultiCollapseWrapper } from './index.styles';
import { FormState } from '../../../types/store/form';
interface IMultiCollapse {
  title: string;
  element: Collapse[];
  onChangeHandler: (data: FormState) => void;
}

const MultiCollapse: FC<IMultiCollapse> = ({
  title,
  element,
  onChangeHandler,
}) => {
  return (
    <MultiCollapseWrapper>
      <Box className='questions-wrapper1'>
        <Typography variant='label' color={'var(--neutral-primary)'}>
          {title}
        </Typography>
        {element?.map((singleElement, index) => (
          <SingleCollapse
            singleElement={singleElement}
            key={index}
            id={singleElement.id}
            onChange={onChangeHandler}
          />
        ))}
      </Box>
    </MultiCollapseWrapper>
  );
};

export default MultiCollapse;

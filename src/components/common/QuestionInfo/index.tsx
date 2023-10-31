import { Typography } from '@mui/material';
import React from 'react';
import { StyledQuestionInfo } from './styles';

interface Props {
  info: string;
}
const QuestionInfo: React.FC<Props> = ({ info }) => {
  return (
    <StyledQuestionInfo>
      <Typography variant='body1' component='span'>
        {info}
      </Typography>
    </StyledQuestionInfo>
  );
};
export default QuestionInfo;

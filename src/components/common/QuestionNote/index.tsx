import React from 'react';
import { StyledNote } from '../../../styles/global';

interface Props {
  note: string;
}
const QuestionNote: React.FC<Props> = ({ note }) => {
  return <StyledNote>{(note)}</StyledNote>;
};
export default QuestionNote;

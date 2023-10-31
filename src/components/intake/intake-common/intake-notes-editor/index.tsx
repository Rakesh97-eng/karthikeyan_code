import { FC, useState } from 'react';
import { Typography } from '@mui/material';

import {
  CharacterCountWrapper,
  NoteEditorWrapper,
  StyledTextArea,
} from './styles';

interface INotesEditor {
  notesData: string;
  handleChange: (editorData: string) => void;
  maxLengthVal?: number;
  rowNum?: number;
}

const IntakeNotesEditor: FC<INotesEditor> = ({
  notesData,
  handleChange,
  maxLengthVal = 300,
  rowNum = 5,
}) => {
  const [notes, setNotes] = useState<string>(notesData);

  const handleEditorStateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNotes(event.target.value);
    handleChange(event.target.value);
  };

  return (
    <>
      <NoteEditorWrapper>
        <StyledTextArea
          name='notes'
          fullWidth
          multiline
          rows={rowNum}
          onChange={handleEditorStateChange}
          inputProps={{ maxLength: maxLengthVal }}
          value={notes}
          className='custom-textarea'
          label='Please List Them All'
          variant='filled'
          autoFocus
        />
      </NoteEditorWrapper>
      <CharacterCountWrapper>
        <Typography variant='label' className='character-count-text'>
          {`${notes.length}/${maxLengthVal} Characters`}
        </Typography>
      </CharacterCountWrapper>
    </>
  );
};

export default IntakeNotesEditor;

import { FC } from 'react';
import { Typography } from '@mui/material';
import { TRButton } from '../styles';

interface Props {
  AddTreatment: () => void;
}
const AddTreatmentRecordButton: FC<Props> = ({ AddTreatment }) => {
  return (
    <div>
      <TRButton onClick={AddTreatment}>
        <Typography variant='btn'>+ Treatment Record</Typography>
      </TRButton>
    </div>
  );
};

export default AddTreatmentRecordButton;

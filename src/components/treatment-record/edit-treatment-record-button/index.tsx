import { FC } from 'react';
import { Typography } from '@mui/material';
import { EditIcon, ETRButton } from '../styles';
import editIcon from '../../../assets/icons/editor-pencil.svg'

interface Props {
    EditTreatment: () => void;
}
const EditTreatmentRecordButton: FC<Props> = ({EditTreatment }) => {
  return (
    <div>
      <ETRButton onClick={EditTreatment}>
        <Typography variant='btn'>
            <EditIcon><img src ={editIcon}/></EditIcon>
            Edit Treatment Record
        </Typography>
      </ETRButton>
    </div>
  );
};

export default EditTreatmentRecordButton;
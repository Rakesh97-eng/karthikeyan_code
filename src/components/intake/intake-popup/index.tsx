import {
  PopUpContent,
  PopUpContentWrapper,
  PopUpHeader,
  PopUpWrapper,
} from './index.styles';
import { ReactComponent as CloseIcon } from '../../../assets/icons/intake-icons/close-icon.svg';
import { Typography } from '@mui/material';
import StyledButton from '../../common/Button';
import { FC } from 'react';
import {
  INTAKE_TOO_YOUNG_ROUTE,
} from '../../../constants/intakeConstants';
import { useHistory } from 'react-router-dom';

interface EighteenPopUpProps {
  onClose: () => void;
  isDateValidate: () => void;
}
interface FifteenPopUpProps {
  onClose: () => void;
}

const UnderEighteenPopUp: FC<EighteenPopUpProps> = ({ onClose, isDateValidate }) => {
  const history = useHistory();
  const handleNavigate = () => {
    isDateValidate();
    onClose();
  };
  const handleFinishLater = () => {
    history.push("/intake/wait-consent")
  }
  return (
    <PopUpWrapper>
      <PopUpHeader>
        <CloseIcon onClick={onClose} />
      </PopUpHeader>
      <PopUpContent>
        <div>
          <Typography
            variant='h3'
            className='title'
            color={'var(--neutral-primary)'}
          >
            Looks like you’re under 18!
          </Typography>
          <Typography
            variant='body1'
            className='content'
            color={'var(--neutral-primary)'}
          >
            Anyone between the ages of 15 and 17 must have the consent of a
            parent/guardian to complete this form. If they’re not present,
            please finish this later with their consent.
          </Typography>
          <StyledButton
            variant='contained'
            value='My Parent/Guardian Consents'
            className='btn'
            fontWeight={600}
            onClick={handleNavigate}
          />
          <Typography variant='body1' className='bottom-btn' onClick={handleFinishLater}>
            I’ll Finish This Later
          </Typography>
        </div>
      </PopUpContent>
    </PopUpWrapper>
  );
};

const UnderFifteenPopUp: FC<FifteenPopUpProps> = ({ onClose }) => {
  const history = useHistory();
  const handleNavigate = () => {
    history.push(INTAKE_TOO_YOUNG_ROUTE);
  };
  return (
    <PopUpWrapper>
      <PopUpHeader>
        <CloseIcon onClick={onClose} />
      </PopUpHeader>
      <PopUpContentWrapper>
        <div>
          <Typography
            variant='h3'
            className='title'
            color={'var(--neutral-primary)'}
          >
            Looks like you’re under 15!
          </Typography>
          <Typography
            variant='body1'
            className='content'
            color={'var(--neutral-primary)'}
          >
            To keep young skin safe, we don`t perform facials on anyone 14 and
            under. For deeper skin concerns, we recommend seeing a
            dermatologist.
          </Typography>
          <Typography
            variant='body1'
            className='content'
            color={'var(--neutral-primary)'}
          >
            We hope to see you in the future!
          </Typography>
          <StyledButton
            variant='contained'
            value='Exit Form'
            fontWeight={600}
            onClick={handleNavigate}
          />
        </div>
      </PopUpContentWrapper>
    </PopUpWrapper>
  );
};

export { UnderEighteenPopUp, UnderFifteenPopUp };

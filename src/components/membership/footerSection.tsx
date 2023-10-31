import { FooterWrapper } from './styles';
import { Typography } from '@mui/material';
import StyledButton from '../common/Button';
import { useHistory } from 'react-router-dom';
import { MEMBERSHIP_SUCCESS_ROUTE } from '../../constants/Helpers';
import { MembershipAgreementTracking } from '../../services/Analytics';
import { CustomerDetailsContext } from '../../providers/context/IntakeClientContext';
import { HomeContext } from '../../providers/context/HomeContext';
import { useContext } from 'react';
const FooterSection = () => {
  const { customerData } = useContext(CustomerDetailsContext);
  const { selectedLocation } = useContext(HomeContext);
  const history = useHistory();
  const navigate = () => {
    MembershipAgreementTracking(customerData.userInfo, selectedLocation);
    history.push(MEMBERSHIP_SUCCESS_ROUTE);
  };
  return (
    <FooterWrapper>
      <div className='footer-container'>
        {' '}
        <StyledButton
          variant='contained'
          value='I Agree'
          fontWeight={600}
          fullWidth
          onClick={navigate}
        />
        <Typography variant='body2' className='footer-text'>
          By agreeing, you acknowledge the terms of the Heyday Membership
          summarized above, and detailed in the full agreement below.
        </Typography>
      </div>
    </FooterWrapper>
  );
};

export default FooterSection;

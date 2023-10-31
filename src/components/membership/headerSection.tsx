import { Typography } from '@mui/material';
import { HeaderContainer } from './styles';
import BottomCurve from '../../assets/images/membership/bottumcurve.svg';
import { CustomerDetailsContext } from '../../providers/context/IntakeClientContext';
import { useContext } from 'react';

const Header = () => {
  const { customerData } = useContext(CustomerDetailsContext);

  return (
    <div className='header-wrapper'>
      <HeaderContainer>
        <Typography variant='h1'>The Membership Agreement</Typography>
        <Typography variant='body1'>
          {customerData.userInfo.first_name} {customerData.userInfo.last_name}
        </Typography>
      </HeaderContainer>
      <img src={BottomCurve} className='bottom-curve' />
    </div>
  );
};
export default Header;

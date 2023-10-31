import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { MEMBERSHIP_ROUTE } from '../../constants/Helpers';
import { CustomerDetailsContext } from '../../providers/context/IntakeClientContext';
import { LayoutContext } from '../../providers/context/LayoutContext';
import CardSection from './cardSection';
import FooterSection from './footerSection';
import FAQSection from './frequentlyAskedQues';
import FullMembershipSection from './fullMembershipSection';
import Header from './headerSection';
import { MemberShipAgreementContainer } from './styles';

const MemberShipAgreement = () => {
  const { updateLayout } = useContext(LayoutContext);
  const { customerData, userLogout } = useContext(CustomerDetailsContext);
  const history= useHistory();
  useEffect(() => {
    if (!customerData?.isLoggedIn) {
      userLogout();
      history.push(MEMBERSHIP_ROUTE);
    }
    updateLayout?.({
      header: false,
    });
    return () => {
      updateLayout?.({
        header: true,
      });
    };
  }, []);

  return (
    <MemberShipAgreementContainer>
      <Header />
      <CardSection />
      <FAQSection />
      <FullMembershipSection />
      <FooterSection />
    </MemberShipAgreementContainer>
  );
};

export default MemberShipAgreement;

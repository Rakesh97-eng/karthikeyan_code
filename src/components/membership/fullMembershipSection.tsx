import {
  FullMembershipSectionContainer,
  FullMembershipSectionWrapper,
} from './styles';
import { Typography } from '@mui/material';
import DefinitionSection from './definitionSection';
import BenefitsSection from './benefitsSection';
import AgreementSection from './agreementSection';
import AdditionalTermSection from './additionalTermSection';
const FullMembershipSection = () => {
  return (
    <FullMembershipSectionContainer>
      <Typography variant='label' className='title'>
        Full Membership Agreement
      </Typography>
      <FullMembershipSectionWrapper>
        <Typography variant='body1'>
          This Monthly Membership Agreement (“Agreement”) is made between Heyday
          Wellness, LLC, its affiliates, a Delaware limited liability company
          d/b/a Heyday (referred to herein as “Heyday”, “we”, “our” and “us”),
          the member listed above (referred to herein as “Member,” “you” and
          “your”) and, if applicable, the person other than the Member who
          purchases the Heyday membership described in this Agreement (referred
          to herein as “Buyer”). This Agreement governs your Heyday membership
          (“Membership”).
        </Typography>
        <DefinitionSection />
        <BenefitsSection />
        <AgreementSection/>
        <AdditionalTermSection/>
      </FullMembershipSectionWrapper>
    </FullMembershipSectionContainer>
  );
};
export default FullMembershipSection;

import IntakeSection from '.';
import BottomCurve from '../../../assets/icons/intake-brown-curve.svg';
import {
  INTAKE_BASIC_SECTION,
  INTAKE_BASIC_SECTION_ID,
  INTAKE_SKINCARE_ROUTE,
} from '../../../constants/intakeConstants';
import MobileBottomCurve from '../../../assets/icons/intake-icons/basic-mobile-curve.svg';

const IntakeBasicSection = () => {
  const headerText = {
    headerText: 'The Basics',
    title:
      'Before we get to know your skin, we want to know you a little better.',
    progress: '1/4',
  };

  return (
    <IntakeSection
      header={headerText}
      headerColor={'var(--honey-50)'}
      bottomCurve={BottomCurve}
      localJsonData={INTAKE_BASIC_SECTION}
      sectionId={INTAKE_BASIC_SECTION_ID}
      navigateTo={INTAKE_SKINCARE_ROUTE}
      mobileBottomCurve={MobileBottomCurve}
      onClickType={'basicSection'}
      progressValue={5}
      isShow={false}
    />
  );
};
export default IntakeBasicSection;

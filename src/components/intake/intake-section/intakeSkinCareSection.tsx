import IntakeSection from '.';
import BottomCurve from '../../../assets/icons/intake-icons/skincare-curve.svg';
import MobileBottomCurve from '../../../assets/icons/intake-icons/skincare-mobile-curve.svg';
import {
  INTAKE_OIL_ACTIVITY_ROUTE,
  INTAKE_SKINCARE_SECTION,
  INTAKE_SKINCARE_SECTION_ID,
} from '../../../constants/intakeConstants';
const IntakeSkinCareSection = () => {
  const headerText = {
    headerText: 'You + Skincare',
    title: 'How does skincare fit into your life?',
    progress: '2/4',
  };

  return (
    <IntakeSection
      header={headerText}
      headerColor={'var(--sage-50)'}
      bottomCurve={BottomCurve}
      localJsonData={INTAKE_SKINCARE_SECTION}
      sectionId={INTAKE_SKINCARE_SECTION_ID}
      navigateTo={INTAKE_OIL_ACTIVITY_ROUTE}
      mobileBottomCurve={MobileBottomCurve}
      onClickType={'skinCareSection'}
      progressValue={25}
    />
  );
};
export default IntakeSkinCareSection;

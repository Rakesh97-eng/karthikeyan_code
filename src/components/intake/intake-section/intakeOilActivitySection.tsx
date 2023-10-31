import IntakeSection from '.';
import BottomCurve from '../../../assets/icons/intake-icons/oil-activity.svg';
import MobileBottomCurve from '../../../assets/icons/intake-icons/oil-mobile-curve.svg';
import {
  INTAKE_OIL_ACTIVITY_SECTION,
  INTAKE_OIL_ACTIVITY_SECTION_ID,
  INTAKE_SENSITIVITY_ROUTE,
} from '../../../constants/intakeConstants';

const IntakeOilActivitySection = () => {
  const headerText = {
    headerText: 'Oil Activity',
    title: 'Everyone deserves their time to shine.',
    progress: '3/4',
  };

  return (
    <IntakeSection
      header={headerText}
      headerColor={'var(--wheat-50)'}
      bottomCurve={BottomCurve}
      localJsonData={INTAKE_OIL_ACTIVITY_SECTION}
      sectionId={INTAKE_OIL_ACTIVITY_SECTION_ID}
      navigateTo={INTAKE_SENSITIVITY_ROUTE}
      mobileBottomCurve={MobileBottomCurve}
      onClickType={'oilActivitySection'}
      progressValue={50}
    />
  );
};
export default IntakeOilActivitySection;

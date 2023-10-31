import IntakeSection from '.';
import BottomCurve from '../../../assets/icons/intake-icons/sensitive.svg';
import MobileBottomCurve from '../../../assets/icons/intake-icons/sensitive-mobile-curve.svg';
import {
  INTAKE_DECENCY_AGREEMENT_ROUTE,
  INTAKE_SENSITIVITY_SECTION,
  INTAKE_SENSITIVITY_SECTION_ID,
} from '../../../constants/intakeConstants';

const IntakeSensitiveSection = () => {
  const headerText = {
    headerText: 'Sensitivities',
    title:
      'To craft your facial, your esthetician needs to know what your skin doesn’t like.',
    progress: '4/4',
  };
  return (
    <IntakeSection
      header={headerText}
      headerColor={'var(--sky-50)'}
      bottomCurve={BottomCurve}
      localJsonData={INTAKE_SENSITIVITY_SECTION}
      sectionId={INTAKE_SENSITIVITY_SECTION_ID}
      navigateTo={INTAKE_DECENCY_AGREEMENT_ROUTE}
      mobileBottomCurve={MobileBottomCurve}
      onClickType={'sensitiveSection'}
      progressValue={75}
      buttonText="Submit"
    />
  );
};
export default IntakeSensitiveSection;

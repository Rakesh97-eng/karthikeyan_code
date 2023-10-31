import { TreatmentTags, TreatmentTypes } from '../../../types/clientProfile';
import { ReactComponent as RecoveryIcon } from '../../../assets/icons/recovery.svg';
import { ReactComponent as SosIcon } from '../../../assets/icons/sos.svg';
import { ReactComponent as MissingIcon } from '../../../assets/icons/missing.svg';
import { ReactComponent as Handwriting } from '../../../assets/icons/sp-key-attribute-icon.svg';
import { Treatment } from '../../../types/services/Treatment';
import { Appointment } from '../../../types/services/Appointment';

export const getTreatmentTag = (treatment: Treatment) => {
  if (!treatment.isSubmitted) {
    return TreatmentTags.draft;
  } else if (treatment.sosSegment) {
    return TreatmentTags.sos;
  } else if (
    treatment.treatmentType === TreatmentTypes.recovery ||
    treatment.treatmentType === TreatmentTypes['50Min']
  ) {
    return TreatmentTags.recovery;
  } else {
    return '';
  }
};
export const getTreatmentTagIcon = (tagName: string) => {
  if (tagName === TreatmentTags.recovery) {
    return RecoveryIcon;
  }
  if (tagName === TreatmentTags.sos) {
    return SosIcon;
  }
  if (tagName === TreatmentTags.missing) {
    return MissingIcon;
  }
  if (tagName === TreatmentTags.draft) {
    return Handwriting;
  }
  return RecoveryIcon;
};

export const getMissingTag = (appointment: Appointment) => {
  if (appointment?.treatmentId == (null || undefined)) {
    return TreatmentTags.missing;
  } else {
    return '';
  }
};

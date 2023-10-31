import { object, string } from 'yup';
import usZips from 'us-zips';
import {
  INTAKE_DEFAULT_OTHER,
  OUTSIDE_US,
  QUESTION_LABELS,
} from '../../constants/appConstants';
import moment from 'moment-timezone';

export const skinProfileSchema = object().shape({
  seasonalAllergies: string().required(QUESTION_LABELS.seasonalAllergies),
  topicalAlergies: string().required(QUESTION_LABELS.topicalAlergies),
  topicalAlergiesAdditionalResp: string().when('topicalAlergies', {
    is: (topicalAlergies: string, schema: string) => {
      if (topicalAlergies?.split(',').includes(INTAKE_DEFAULT_OTHER)) {
        return schema != '';
      }
      return false;
    },
    then: string().required(QUESTION_LABELS.topicalAlergies),
  }),
  rednesOrBurning: string().required(QUESTION_LABELS.rednesOrBurning),
  accutaneIsotretinoin: string().required(QUESTION_LABELS.accutaneIsotretinoin),
  rx_medications: string().required(QUESTION_LABELS.rx_medications),
  rxTopicals: string().required(QUESTION_LABELS.rxTopicals),
  hormoneConsiderations: string().required(
    QUESTION_LABELS.hormoneConsiderations
  ),
  diagnoses: string().required(QUESTION_LABELS.diagnoses),
  electricity: string().required(QUESTION_LABELS.electricity),
  facialSurgery: string().required(QUESTION_LABELS.facialSurgery),
  oilyShine: string().required(QUESTION_LABELS.oilyShine),
  breakouts: string().required(QUESTION_LABELS.breakouts),
  facialFrequency: string().required(QUESTION_LABELS.facialFrequency),
  skincareKnowledge: string().required(QUESTION_LABELS.skincareKnowledge),
  atHomeProducts: string().required(QUESTION_LABELS.atHomeProducts),
  activeIngredients: string().required(QUESTION_LABELS.activeIngredients),
  gender: string().required(QUESTION_LABELS.gender),
  birthdayAdditionalResp: string()
    .required(QUESTION_LABELS.birthday)
    .test('DOB', QUESTION_LABELS.birthday, (value) => {
      return moment().diff(moment(value), 'years') >= 2;
    })
    .test('DOB', 'Please enter a valid date', (value) => {
      if (value) {
        const dateObject = new Date(value);
        return dateObject.getDate() <= 30;
      } else {
        return false;
      }
    })
    .test('DOB', 'Please enter a valid month', (value) => {
      if (value) {
        const dateObject = new Date(value);
        return dateObject.getMonth() <= 11;
      } else {
        return false;
      }
    })
    .test('DOB', 'Please enter a valid year', (value) => {
      if (value) {
        const dateObject = new Date(value);
        return dateObject.getFullYear() <= new Date().getFullYear();
      } else {
        return false;
      }
    }),
  zipCodeAdditionalResp: string()
    .required(QUESTION_LABELS.zipCode)
    .test('zipCode', QUESTION_LABELS.zipCode, (value) => {
      if (value === OUTSIDE_US) {
        return true;
      }

      const isValidUSZip = value && usZips[value];
      if (isValidUSZip && isValidUSZip !== undefined) {
        return true;
      } else {
        return false;
      }
    }),
  source: string().required(QUESTION_LABELS.source),
});

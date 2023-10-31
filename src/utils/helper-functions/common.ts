import dayjs from 'dayjs';
import { LOCAL_STORAGE_KEYS } from '../../constants/appConstants';
import { REMOVE_LOCATION_LIST } from '../../constants/Helpers';
import { S3JSONTypes } from '../../providers/context/IntakeClientContext';
import { Location } from '../../types/services/Location';
import { IntakeFormState } from '../../types/store/form';
import {
  IntakeQuestionJson,
  IntakeSectionJsonTypes,
  IntakeSectionTypes,
} from '../../types/treatmentRecord/question';
import { IS3Json } from '../../types/treatmentRecord/s3Json';
import { getLocalStorageItem } from './user';

export const getGreetingMessage = () => {
  const currentHour = new Date().getHours();
  const greetingMessage = () => {
    if (currentHour >= 0 && currentHour < 13) {
      return 'Good Morning ☕️';
    } else if (currentHour >= 12 && currentHour <= 16) {
      return 'Good Afternoon ☀️';
    } else if (currentHour > 16 || currentHour <= 23) {
      return 'Good Evening 🌙';
    } else {
      return 'Welcome';
    }
  };
  return greetingMessage();
};

export const textTrimmer = (data: string): string => {
  return data.trim();
};

export const containSpecialChar = (name: string): boolean => {
  return /^[A-Za-z\s]+$/.test(name);
};

export const numberOnly = (data: string): boolean => {
  return /^\d+$/.test(data);
};

export const zipCodeValidator = (zipCode: string): boolean => {
  const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(textTrimmer(zipCode));
  return isValidZip;
};

export const dateFormatValidator = (date: string): boolean => {
  const testDate = date ? dayjs(date).format('MM/DD/YYYY') : '';
  const date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  return date_regex.test(testDate);
};

export const getJsonData = (
  setAllAnswers: any,
  setSectionData: (result: S3JSONTypes) => void
) => {
  fetch(
    `${process.env.REACT_APP_INTAKE_HEALTH_JSON_URL}form-builder/health-intake-builder.json`
  ).then(async (res) => {
    const json = await res.json();
    setAllAnswers(json.intakeOptions);
    const result = Object.entries(json.intakeSections).reduce(
      (acc: any, [a, b]: any) => {
        acc[a] = { id: a, ...b };
        acc[a]['questionData'] = b.questionIds.map((q: any) => {
          const optList = json.intakeQuestions[q];
          optList.optionsData = optList.options.map((o: any) => ({
            id: o,
            label: json.intakeOptions[o],
            value: json.intakeOptions[o],
          }));
          return { id: q, ...optList };
        });
        return acc;
      },
      {}
    );
    setSectionData(result);
  });
};

export const getFilterData = (
  sectionLocalData: IntakeSectionTypes[],
  sectionJsonData: IntakeSectionJsonTypes,
  customerSectionData: IntakeFormState[],
  answerData: { [key: string]: string }
) => {
  sectionLocalData.forEach((sectionData: IntakeSectionTypes) => {
    sectionJsonData?.questionData.forEach((jsonData: IntakeQuestionJson) => {
      const ind = customerSectionData?.findIndex(
        (a: any) => a.question_id === jsonData.id
      );
      if (sectionData.questionId === jsonData.questionId) {
        sectionData.defaultError = jsonData.defaultError;
        sectionData.id = jsonData.id;
        sectionData.options = jsonData.optionsData;
        sectionData.jsonData = jsonData;
        sectionData.mandatory = jsonData.mandatory;
        if (ind > -1) {
          sectionData.selectedOptions =
            customerSectionData[ind]?.answer.length > 0
              ? customerSectionData[ind].answer
              : customerSectionData[ind]?.other_answer;
          sectionData.otherAnswer = customerSectionData[ind]?.other_answer;
        }
      }
    });
  });

  return sectionLocalData;
};

const s3TreatmentJson = (): IS3Json =>
  JSON.parse(
    getLocalStorageItem(LOCAL_STORAGE_KEYS.S3_TREATMENT_JSON) as string
  );

export const getOptionsLabel = (value: string | string[] | null): string => {
  const options = s3TreatmentJson().treatmentOptions;
  if (typeof value === 'string') {
    return options[value] ? options[value] : value;
  } else if (typeof value === 'object') {
    return value?.length
      ? value.map((val: string) => options[val]).join(', ')
      : '';
  } else {
    return 'NA';
  }
};

export const getOptionIds = (label: string) => {
  const options = s3TreatmentJson().treatmentOptions;
  return Object.keys(options).find((key) => options[key] === label);
};

export const uniqueValues = (value: string, index: number, self: string[]) => {
  return self.indexOf(value) === index;
};

export const duplicateEmail = (email: string) => {
  return email.indexOf('urn:blvd:Client:') > -1 && !email.includes('@')
    ? 'Missing Email'
    : email.indexOf('urn:blvd:Client:') > -1 && email.includes('@')
    ? true
    : false;
};

export const filterLocations = (data: Location[]) => {
  const filterDate = data.filter(
    (a: Location) => REMOVE_LOCATION_LIST.indexOf(a.name.toLowerCase()) === -1
  );
  return filterDate;
};

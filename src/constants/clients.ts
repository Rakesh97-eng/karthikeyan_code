import {
  ClientDetailsType,
  IntakeFormType,
  PastTreatmentDetailSection,
  ResourceType,
} from '../types/clientProfile';
import { PAST_PURCHASE_LIST, PRODUCTS_TO_AVOID } from './prClientFollowUp';
import Blvd from '../assets/icons/Blvd.svg';
import RightUpArrow from '../assets/icons/arrow-light-right-up.svg';
import BookOpen from '../assets/icons/BookOpen.svg';
import HandPalm from '../assets/icons/HandPalm.svg';
import Star from '../assets/icons/star.svg';

export const CLIENT_SKIN_PROFILE: IntakeFormType[] = [
  {
    sectionID: 'sensitivities',
    lastUpdatedAt: '',
    sectionResponses: [
      {
        questionID: 'seasonalAllergies',
        questionResponse: '',
        additionalResponse: '',
      },
      {
        questionID: 'topicalAlergies',
        questionResponse: '',
        additionalResponse: '',
      },
      {
        questionID: 'rednesOrBurning',
        questionResponse: '',
        additionalResponse: '',
      },
      {
        questionID: 'accutaneIsotretinoin',
        questionResponse: '',
        additionalResponse: '',
      },
      {
        questionID: 'rx_medications',
        questionResponse: '',
        additionalResponse: '',
      },
      {
        questionID: 'rxTopicals',
        questionResponse: '',
        additionalResponse: '',
      },
      {
        questionID: 'hormoneConsiderations',
        questionResponse: '',
        additionalResponse: '',
      },
      {
        questionID: 'diagnoses',
        questionResponse: '',
        additionalResponse: '',
      },
      {
        questionID: 'electricity',
        questionResponse: '',
        additionalResponse: '',
      },
      {
        questionID: 'facialSurgery',
        questionResponse: '',
        additionalResponse: '',
      },
    ],
  },
  {
    sectionID: 'oil-activity',
    lastUpdatedAt: '',
    sectionResponses: [
      {
        questionID: 'oilyShine',
        questionResponse: '',
        additionalResponse: '',
      },
      {
        questionID: 'breakouts',
        questionResponse: '',
        additionalResponse: '',
      },
    ],
  },
  {
    sectionID: 'skincare-background',
    lastUpdatedAt: '',
    sectionResponses: [
      {
        questionID: 'facialFrequency',
        questionResponse: '',
        additionalResponse: '',
      },
      {
        questionID: 'skincareKnowledge',
        questionResponse: '',
        additionalResponse: '',
      },
      {
        questionID: 'atHomeProducts',
        questionResponse: '',
        additionalResponse: '',
      },
      {
        questionID: 'activeIngredients',
        questionResponse: '',
        additionalResponse: '',
      },
    ],
  },
  {
    sectionID: 'basics',
    lastUpdatedAt: '',
    sectionResponses: [
      {
        questionID: 'email',
        questionResponse: '',
        additionalResponse: '',
      },
      {
        questionID: 'phoneNumber',
        questionResponse: '',
        additionalResponse: '',
      },
      {
        questionID: 'gender',
        questionResponse: '',
        additionalResponse: '',
      },
      {
        questionID: 'birthday',
        questionResponse: '',
        additionalResponse: '',
      },
      {
        questionID: 'zipCode',
        questionResponse: '',
        additionalResponse: '',
      },
      {
        questionID: 'source',
        questionResponse: '',
        additionalResponse: '',
      },
    ],
  },
];

const KEY_ATTRIBUTES = [
  'cp_3',
  'cp_4',
  'cp_6',
  'cp_7',
  'cp_9',
  'cp_11',
  'cp_12',
];

export const CLIENTS: ClientDetailsType[] = [
  {
    id: '2e5ef580-7f9d-428b-82b3-92789b5b1db8',
    firstName: 'Zendaya',
    lastName: 'Stoermer',
    clientNotes: '',
    tags: [],
    profileImageUrl: 'https://i.ibb.co/s3Zd2dw/Headshot.png',
    clientNotesUpdatedAt: 'Edited 2 months ago',
    pastTreatments: [],
    pastPurchases: PAST_PURCHASE_LIST,
    productToAvoid: PRODUCTS_TO_AVOID,
    keyAttributes: KEY_ATTRIBUTES,
    intakeForm: CLIENT_SKIN_PROFILE,
  },
  {
    id: 'asd-fgh-jkl',
    firstName: 'Isobel',
    lastName: 'Phillips',
    clientNotes: '',
    clientNotesUpdatedAt: 'Edited 4 months ago',
    tags: [],
    profileImageUrl: 'https://i.ibb.co/s3Zd2dw/Headshot.png',
    pastTreatments: [],
    pastPurchases: PAST_PURCHASE_LIST,
    productToAvoid: PRODUCTS_TO_AVOID,
    keyAttributes: KEY_ATTRIBUTES,
    intakeForm: CLIENT_SKIN_PROFILE,
  },
];

export const MOCK_TREATMENT_DETAIL = {
  treatment_record_id: 'abckl2',
  skin_type: 'Combination',
  conditions: ['Blackheads'],
  top_treatment_focus: ['Moisturizing & Hydration', 'Soothing Inflammation'],
  cleanse_base_product: ['Hydra Restore Cream', 'Vital C'],
  cleanse_boost: ['Clear Skin 3%', 'Oatmeal Powder'],
  cleanse_modality: ['BT Micro EXFOL'],
  client_message: 'text added',
  exfoliation_segment: true,
  exfoliation_base_product: 'Grapefruit Polish',
  exfoliation_boost: ['Glycolic 15%'],
  exfoliation_modality: ['BT Micro Exfol'],
  exfoliation_microdermabrasion: true,
  microderm_suction_rate: '5-10',
  microderm_passes: '1',
  exfoliation_peel: true,
  peel_product: ['Alchimie Brightening Peel', 'PRO Salicylic 15%'],
  peel_time_on_skin: '3-5 mins',
  peel_layers: '02',
  extractions_segment: true,
  extractions_prep_products: ['Skin Savior'],
  extractions_zone: ['Nose'],
  extractions_post_products: ['Clear Cell Tonic'],
  touch_point_segment: true,
  touch_point_base_product: 'OLO Oil',
  touch_point_touch: ['Hand/Arm'],
  toner: ['Stone Crop Mist'],
  serum: ['Vitamin C'],
  moisturizer_and_spf: ['Gotu Kola'],
  treatment_note: 'Wrap up text',
  next_time_enhancement: ['Light Therapy'],
  rehydrate_boost: ['BT Micro Clear'],
  eye_and_lip: ['Argan Peptide Eye'],
  sos_treatment_segment: true,
  sos_segment_base_product: ['Gotu Kola'],
  sos_segment_serum: ['Oatmeal Extract'],
  sos_segment_hydration: ['Cold Towels'],
};

export const RESOURCE: ResourceType[] = [
  {
    icon: Blvd,
    title: 'Boulevard',
    url: 'https://dashboard.boulevard.io/login',
    rightIcon: RightUpArrow,
  },
  {
    icon: HandPalm,
    title: 'Prospr',
    url: 'https://app.prospr.work/login',
    rightIcon: RightUpArrow,
  },
  {
    icon: BookOpen,
    title: 'The Thread',
    url: 'https://thethread.heydayskincare.com/learn',
    rightIcon: RightUpArrow,
  },
  {
    icon: Star,
    title: 'Membership Agreement',
    url: 'https://pro.heydayskincare.com/membership-agreement/',
  },
];
export const TREATMENT_SECTIONS: PastTreatmentDetailSection[] = [
  {
    title: 'Conditions',
  },
  {
    title: 'Core Segments',
  },
  {
    title: 'Enhancements',
  },
  {
    title: 'Treatment Note',
  },
];
export const knackMockData = [
  {
    treated_by: 'FirstName LastName',
    appointment_time: '9/13/22 2:18',
    skin_type: 'Combination',
    conditions: 'Blackheads, Breakouts, Hyperpigmentation, Inflammation',
    general_notes:
      'She is overexfoliating. Skin is red and irritable. Would benefit from led and ,ore nourishing products in routine. ',
    treatment_type: '50 Minute',
    top_treatment_focus: 'hydration, extractions',
    note_for_customer:
      'Hi Mandi! Make sure to slowly incorporate sweet cherry enzyme into your routine use no more than twice weekly for 3-5 mins. Don‚Äôt use any other exfoliating products on the same day as sweet cherry also try not to exfoliate more than twice weekly in general.  Use antioxidant serum twice daily and come back when you can! <br /><br />Have great week. -Nina. ',
  },
  {
    treated_by: 'FirstName LastName',
    appointment_time: '9/13/22 2:18',
    skin_type: 'Combination',
    conditions: 'Blackheads, Breakouts, Hyperpigmentation, Inflammation',
    general_notes:
      'She is overexfoliating. Skin is red and irritable. Would benefit from led and ,ore nourishing products in routine. ',
    treatment_type: '50 Minute',
    top_treatment_focus: 'hydration, extractions',
    note_for_customer:
      'Hi Mandi! Make sure to slowly incorporate sweet cherry enzyme into your routine use no more than twice weekly for 3-5 mins. Don‚Äôt use any other exfoliating products on the same day as sweet cherry also try not to exfoliate more than twice weekly in general.  Use antioxidant serum twice daily and come back when you can! <br /><br />Have great week. -Nina. ',
  },
  {
    treated_by: 'FirstName LastName',
    appointment_time: '9/13/22 2:18',
    skin_type: 'Combination',
    conditions: 'Blackheads, Breakouts, Hyperpigmentation, Inflammation',
    general_notes:
      'She is overexfoliating. Skin is red and irritable. Would benefit from led and ,ore nourishing products in routine. ',
    treatment_type: '50 Minute',
    top_treatment_focus: 'hydration, extractions',
    note_for_customer:
      'Hi Mandi! Make sure to slowly incorporate sweet cherry enzyme into your routine use no more than twice weekly for 3-5 mins. Don‚Äôt use any other exfoliating products on the same day as sweet cherry also try not to exfoliate more than twice weekly in general.  Use antioxidant serum twice daily and come back when you can! <br /><br />Have great week. -Nina. ',
  },
  {
    treated_by: 'FirstName LastName',
    appointment_time: '9/13/22 2:18',
    skin_type: 'Combination',
    conditions: 'Blackheads, Breakouts, Hyperpigmentation, Inflammation',
    general_notes:
      'She is overexfoliating. Skin is red and irritable. Would benefit from led and ,ore nourishing products in routine. ',
    treatment_type: '50 Minute',
    top_treatment_focus: 'hydration, extractions',
    note_for_customer:
      'Hi Mandi! Make sure to slowly incorporate sweet cherry enzyme into your routine use no more than twice weekly for 3-5 mins. Don‚Äôt use any other exfoliating products on the same day as sweet cherry also try not to exfoliate more than twice weekly in general.  Use antioxidant serum twice daily and come back when you can! <br /><br />Have great week. -Nina. ',
  },
  {
    treated_by: 'FirstName LastName',
    appointment_time: '9/13/22 2:18',
    skin_type: 'Combination',
    conditions: 'Blackheads, Breakouts, Hyperpigmentation, Inflammation',
    general_notes:
      'She is overexfoliating. Skin is red and irritable. Would benefit from led and ,ore nourishing products in routine. ',
    treatment_type: '50 Minute',
    top_treatment_focus: 'hydration, extractions',
    note_for_customer:
      'Hi Mandi! Make sure to slowly incorporate sweet cherry enzyme into your routine use no more than twice weekly for 3-5 mins. Don‚Äôt use any other exfoliating products on the same day as sweet cherry also try not to exfoliate more than twice weekly in general.  Use antioxidant serum twice daily and come back when you can! <br /><br />Have great week. -Nina. ',
  },
  {
    treated_by: 'FirstName LastName',
    appointment_time: '9/13/22 2:18',
    skin_type: 'Combination',
    conditions: 'Blackheads, Breakouts, Hyperpigmentation, Inflammation',
    general_notes:
      'She is overexfoliating. Skin is red and irritable. Would benefit from led and ,ore nourishing products in routine. ',
    treatment_type: '50 Minute',
    top_treatment_focus: 'hydration, extractions',
    note_for_customer:
      'Hi Mandi! Make sure to slowly incorporate sweet cherry enzyme into your routine use no more than twice weekly for 3-5 mins. Don‚Äôt use any other exfoliating products on the same day as sweet cherry also try not to exfoliate more than twice weekly in general.  Use antioxidant serum twice daily and come back when you can! <br /><br />Have great week. -Nina. ',
  },
  {
    treated_by: 'FirstName LastName',
    appointment_time: '9/13/22 2:18',
    skin_type: 'Combination',
    conditions: 'Blackheads, Breakouts, Hyperpigmentation, Inflammation',
    general_notes:
      'She is overexfoliating. Skin is red and irritable. Would benefit from led and ,ore nourishing products in routine. ',
    treatment_type: '50 Minute',
    top_treatment_focus: 'hydration, extractions',
    note_for_customer:
      'Hi Mandi! Make sure to slowly incorporate sweet cherry enzyme into your routine use no more than twice weekly for 3-5 mins. Don‚Äôt use any other exfoliating products on the same day as sweet cherry also try not to exfoliate more than twice weekly in general.  Use antioxidant serum twice daily and come back when you can! <br /><br />Have great week. -Nina. ',
  },
  {
    treated_by: 'FirstName LastName',
    appointment_time: '9/13/22 2:18',
    skin_type: 'Combination',
    conditions: 'Blackheads, Breakouts, Hyperpigmentation, Inflammation',
    general_notes:
      'She is overexfoliating. Skin is red and irritable. Would benefit from led and ,ore nourishing products in routine. ',
    treatment_type: '50 Minute',
    top_treatment_focus: 'hydration, extractions',
    note_for_customer:
      'Hi Mandi! Make sure to slowly incorporate sweet cherry enzyme into your routine use no more than twice weekly for 3-5 mins. Don‚Äôt use any other exfoliating products on the same day as sweet cherry also try not to exfoliate more than twice weekly in general.  Use antioxidant serum twice daily and come back when you can! <br /><br />Have great week. -Nina. ',
  },
  {
    treated_by: 'FirstName LastName',
    appointment_time: '9/13/22 2:18',
    skin_type: 'Combination',
    conditions: 'Blackheads, Breakouts, Hyperpigmentation, Inflammation',
    general_notes:
      'She is overexfoliating. Skin is red and irritable. Would benefit from led and ,ore nourishing products in routine. ',
    treatment_type: '50 Minute',
    top_treatment_focus: 'hydration, extractions',
    note_for_customer:
      'Hi Mandi! Make sure to slowly incorporate sweet cherry enzyme into your routine use no more than twice weekly for 3-5 mins. Don‚Äôt use any other exfoliating products on the same day as sweet cherry also try not to exfoliate more than twice weekly in general.  Use antioxidant serum twice daily and come back when you can! <br /><br />Have great week. -Nina. ',
  },
];

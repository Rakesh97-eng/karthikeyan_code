import Bot from '../assets/icons/intake-icons/bot.svg';
import Cake from '../assets/icons/intake-icons/birthday-cake.svg';
import ZipCode from '../assets/icons/intake-icons/zip-code.svg';
import AboutHeady from '../assets/icons/intake-icons/about-heyday.svg';
import Brain from '../assets/icons/intake-icons/brain.svg';
import Facial from '../assets/icons/intake-icons/facial.svg';
import Search from '../assets/icons/intake-icons/search.svg';
import Soap from '../assets/icons/intake-icons/soap.svg';
import SmileSweat from '../assets/icons/intake-icons/smilesweat.svg';
import Nose from '../assets/icons/intake-icons/nose.svg';
import Meditation from '../assets/icons/intake-icons/meditation.svg';
import Magnet from '../assets/icons/intake-icons/magnet.svg';
import DoubtSmile from '../assets/icons/intake-icons/doubt-smile.svg';
import Sanitizer from '../assets/icons/intake-icons/sanitizer.svg';
import Capsule from '../assets/icons/intake-icons/capsule.svg';
import RedSmile from '../assets/icons/intake-icons/red-smile.svg';
import Warning from '../assets/icons/intake-icons/warning.svg';
import Flower from '../assets/icons/intake-icons/flower.svg';
import Emily from '../assets/images/intake/emily.png';
import Gabriel from '../assets/images/intake/gabriel.png';
import MultiBrand from '../assets/images/intake/multibrand.png';
import TataHarper from '../assets/images/intake/tata-harper.png';
import GroupLook from '../assets/images/intake/group-look.png';
import PointFinger from '../assets/images/intake/point-finger.png';
import {
  IntakeSectionElementTypes,
  IntakeSectionTypes,
  MessageList,
} from '../types/treatmentRecord/question';

export const LOGIN_ERROR_MESSAGE =
  'That email and password combination wasn’t recognized. Please try again.';
export const RESET_ERROR_MSG = 'Invalid token. Please try again.';
export const CLIENT_INTAKE_PATH = ['/intake', '/intake/:slug'];
export const SHOP = '/shop';

export const INTAKE_BASIC_SECTION_ROUTE = '/intake/basic-section';
export const INTAKE_SKINCARE_ROUTE = '/intake/skincare-section';
export const INTAKE_OIL_ACTIVITY_ROUTE = '/intake/oil-section';
export const INTAKE_SENSITIVITY_ROUTE = '/intake/sensitive-section';
export const INTAKE_INTERSTITIAL_ROUTE = '/intake/section-success';
export const INTAKE_WELCOME_ROUTE = '/intake/intake-welcome';
export const INTAKE_WELCOME_HOME = '/intake/welcome';
export const INTAKE_RESET_SUCCESS = '/intake/reset-success';
export const INTAKE_LOGIN_ROUTE = '/intake/login';
export const INTAKE_WAITING_FOR_CONCENT_ROUTE = '/intake/wait-consent';
export const INTAKE_TOO_YOUNG_ROUTE = '/intake/too-young';
export const INTAKE_UPDATE_MESSAGE_ROUTE = '/intake/update-message';
export const INTAKE_DECENCY_AGREEMENT_ROUTE = '/intake/decency-agreement';
export const INTAKE_FORGOT_SUCCESS_ROUTE = '/intake/forgot-success';
export const INTAKE_FORGOT_ROUTE = '/intake/forgot';
export const INTAKE_SIGNUP_ROUTE = '/intake/signup';
export const INTAKE_ROUTE = '/intake';

export const INTAKE_BASIC_SECTION_ID = '14c7fb56-9ff8-4eef-836d-90c4ed74fdff';
export const INTAKE_OIL_ACTIVITY_SECTION_ID =
  'def15a91-ea75-42d7-b184-891f9d3f8804';
export const INTAKE_SKINCARE_SECTION_ID =
  '86473b19-4263-4806-a74c-4089837832d1';
export const INTAKE_SENSITIVITY_SECTION_ID =
  '051be85e-b77e-4679-ac5e-048a7f5b0c6b';
export const INTAKE_BASIC_SECTION: IntakeSectionTypes[] = [
  {
    title: 'When’s your birthday?',
    icon: Cake,
    questionId: 'birthday',
    type: IntakeSectionElementTypes.date,
    label: 'Get a treat on your big day!',
    note: '',
    mandatory: false,
    defaultError: 'Enter Valid Date',
  },
  {
    title: 'What’s your zip code?',
    icon: ZipCode,
    questionId: 'zipCode',
    type: IntakeSectionElementTypes.textarea,
    label: 'We’ll keep you in the loop with Heyday happenings in your area.',
    note: '',
    mandatory: false,
    additionalLabel: 'I live outside the US',
    defaultError: 'Enter Valid Zip Code',
  },
  {
    title: 'How do you identify?',
    icon: Bot,
    questionId: 'gender',
    type: IntakeSectionElementTypes.radio,
    label: 'Skin is skin, but there can be nuances with gender.',
    note: '',
    options: [
      { label: 'Female', value: 'Female' },
      { label: 'Male', value: 'Male' },
      { label: 'Non-binary', value: 'Non-binary' },
      { label: 'Not listed', value: 'Not listed' },
      {
        label: 'Prefer not to answer',
        value: 'Prefer not to answer',
      },
    ],
    mandatory: false,
  },
  {
    title: 'How did you hear about Heyday?',
    icon: AboutHeady,
    questionId: 'source',
    type: IntakeSectionElementTypes.checkbox,
    label: '',
    note: '(Select all that apply)',
    options: [
      { label: 'A friend or colleague', value: 'A friend or colleague' },
      {
        label: 'Publication (print or digital)',
        value: 'Publication (print or digital)',
      },
      { label: 'Influencer', value: 'Influencer' },
      { label: 'Social media', value: 'Social media' },
      {
        label: 'Google',
        value: 'Google',
      },
      { label: 'Walked by the shop', value: 'Walked by the shop' },
      { label: 'An event Heyday was at', value: 'An event Heyday was at' },
    ],
    mandatory: false,
  },
];

export const INTAKE_SKINCARE_SECTION: IntakeSectionTypes[] = [
  {
    title: 'Have you ever had a facial?',
    icon: Facial,
    questionId: 'facialFrequency',
    type: IntakeSectionElementTypes.radio,
    options: [
      {
        label: 'It’s my first time getting a facial!',
        value: 'It’s my first time getting a facial!',
      },
      {
        label: 'Yes, but it’s not a habit.',
        value: 'Yes, but it’s not a habit.',
      },
      {
        label: 'Facials are my everything.',
        value: 'Facials are my everything.',
      },
    ],
    mandatory: false,
  },
  {
    title: 'How would you rate your skincare knowledge?',
    icon: Brain,
    questionId: 'skincareKnowledge',
    type: IntakeSectionElementTypes.radio,
    options: [
      {
        label: 'Newbie',
        subLabel: 'Just getting into things!',
        value: 'Newbie',
      },
      {
        label: 'Pretty Good',
        subLabel: 'I know my way around serums & toners…',
        value: 'Pretty Good',
      },
      {
        label: 'Savvy',
        subLabel: 'My friends come to me for advice.',
        value: 'Savvy',
      },
    ],
    mandatory: false,
  },
  {
    title: 'What do you use at home?',
    icon: Soap,
    questionId: 'atHomeProducts',
    type: IntakeSectionElementTypes.checkbox,
    note: '(Select all that apply)',
    options: [
      { label: 'Cleanser', value: 'Cleanser' },
      { label: 'Exfoliant', value: 'Exfoliant' },
      { label: 'Mask', value: 'Mask' },
      { label: 'Toner', value: 'Toner' },
      { label: 'Serum', value: 'Serum' },
      { label: 'Moisturizer', value: 'Moisturizer' },
      { label: 'Eye cream', value: 'Eye cream' },
      { label: 'Facial oil', value: 'Facial oil' },
      { label: 'Sunscreen', value: 'Sunscreen' },
    ],
    mandatory: false,
  },
  {
    title: 'Do your at-home products contain any active ingredients like…',
    icon: Search,
    questionId: 'activeIngredients',
    type: IntakeSectionElementTypes.radio,
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
      { label: 'Not sure', value: 'Not sure' },
    ],
    mandatory: false,
    isListPresent: true,
    listItems: ['Glycolic acid', 'Salicylic acid', 'Lactic acid', 'Retinol'],
  },
];
export const INTAKE_OIL_ACTIVITY_SECTION: IntakeSectionTypes[] = [
  {
    title: 'Do you ever have an oily shine?',
    icon: SmileSweat,
    questionId: 'oilyShine',
    type: IntakeSectionElementTypes.radio,
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
      { label: 'Not sure', value: 'Not sure' },
    ],
    mandatory: false,
  },
  {
    title: 'How would you describe your history with breakouts?',
    icon: Nose,
    questionId: 'breakouts',
    type: IntakeSectionElementTypes.checkbox,
    note: '(Select all that apply)',
    options: [
      {
        label: 'I rarely experience breakouts.',
        value: 'I rarely experience breakouts. ',
      },
      {
        label: 'I frequently experience breakouts.',
        value: 'I frequently experience breakouts.',
      },
      {
        label: 'I experience breakouts on my chest and back.',
        value: 'I experience breakouts on my chest and back.',
      },
      {
        label: 'I have consistently experienced breakouts since puberty.',
        value: 'I have consistently experienced breakouts since puberty.',
      },
      {
        label: 'Breakouts run in my family.',
        value: 'Breakouts run in my family.',
      },
    ],
    mandatory: false,
  },
];
export const INTAKE_SENSITIVITY_SECTION: IntakeSectionTypes[] = [
  {
    title: 'Do you typically experience seasonal allergies?',
    icon: Flower,
    questionId: 'seasonalAllergies',
    type: IntakeSectionElementTypes.radio,
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
    mandatory: false,
  },
  {
    title: 'Do you have any topical allergies?',
    icon: Warning,
    questionId: 'topicalAlergies',
    type: IntakeSectionElementTypes.checkbox,
    note: '(Select all that apply)',
    includeOtherVal: 'ecfff538-78c2-4a62-91f2-f4a3b73becd9',
    options: [
      { label: 'Nuts', value: 'Nuts' },
      { label: 'Fruit', value: 'Fruit' },
      { label: 'Soy', value: 'Soy' },
      { label: 'Seeds', value: 'Seeds' },
      { label: 'Algae', value: 'Algae' },
      { label: 'Aspirin/salicylates', value: 'Aspirin/salicylates' },
      { label: 'Beeswax', value: 'Beeswax' },
      {
        label: 'Other',
        value: 'Other',
      },
      { label: 'None', value: 'none' },
    ],
    mandatory: false,
  },
  {
    title: 'Do you ever experience redness, burning, or itching on your skin?',
    icon: RedSmile,
    questionId: 'rednesOrBurning',
    type: IntakeSectionElementTypes.radio,
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
    mandatory: false,
  },
  {
    title: 'Are you currently taking or have you taken Accutane/Isotretinoin?',
    icon: Capsule,
    questionId: 'accutaneIsotretinoin',
    type: IntakeSectionElementTypes.radio,
    options: [
      {
        label: 'Yes, currently taking it!',
        value: 'Yes, currently taking it!',
      },
      {
        label: 'I stopped in the last 6 months.',
        value: 'I stopped in the last 6 months.',
      },
      {
        label: 'I stopped over 6 months ago.',
        value: 'I stopped over 6 months ago.',
      },
      {
        label: 'No, I have never taken it.',
        value: 'No, I have never taken it.',
      },
    ],
    mandatory: false,
  },
  {
    title: 'Are you taking any of the following Rx medications?',
    icon: Meditation,
    questionId: 'rx_medications',
    type: IntakeSectionElementTypes.checkbox,
    note: '(Select all that apply)',
    options: [
      { label: 'Oral antibiotics', value: 'Oral antibiotics' },
      { label: 'Topical antibiotics', value: 'Topical antibiotics' },
      { label: 'Steroids', value: 'Steroids' },
      { label: 'Antifungals', value: 'Antifungals' },
      { label: 'Antivirals', value: 'Antivirals' },
      { label: 'Immunosuppressants', value: 'Immunosuppressants' },
      { label: 'Blood thinners', value: 'Blood thinners' },
      { label: 'None', value: 'none' },
    ],
    mandatory: false,
  },
  {
    title: 'Do you use any Rx skin topicals?',
    icon: Sanitizer,
    questionId: 'rxTopicals',
    type: IntakeSectionElementTypes.radio,
    includeOtherVal: '3c14d1da-e206-4107-be72-f0922ac05704',
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
    mandatory: false,
  },
  {
    title: 'Do any of the below apply to you?',
    icon: DoubtSmile,
    questionId: 'hormoneConsiderations',
    type: IntakeSectionElementTypes.checkbox,
    note: '(Select all that apply)',
    options: [
      {
        label: 'Pregnant/nursing/trying to conceive',
        value: 'Pregnant/nursing/trying to conceive',
        note: 'Please check with your doctor before your facial and let your esthetician know which products or ingredients you would like to avoid',
      },
      { label: 'Hormone therapy', value: 'Hormone therapy' },
      { label: 'Birth control', value: 'Birth control' },
      { label: 'None', value: 'none' },
    ],
    mandatory: false,
  },
  {
    title: 'Have you been diagnosed with any of these conditions?',
    icon: Meditation,
    questionId: 'diagnoses',
    type: IntakeSectionElementTypes.checkbox,
    note: '(Select all that apply)',
    options: [
      { label: 'Rosacea', value: 'Rosacea' },
      { label: 'Asthma', value: 'Asthma' },
      { label: 'Eczema', value: 'Eczema' },
      { label: 'Epilepsy', value: 'Epilepsy' },
      { label: 'Diabetes', value: 'Diabetes' },
      {
        label: 'Current or recent cancer treatment',
        value: 'Current or recent cancer treatment',
      },
      { label: 'None', value: 'none' },
    ],
    mandatory: false,
  },
  {
    title: 'Do you have any of these? ',
    icon: Magnet,
    questionId: 'electricity',
    type: IntakeSectionElementTypes.checkbox,
    note: '(Select all that apply)',
    options: [
      { label: 'Pacemaker', value: 'Pacemaker' },
      { label: 'Metal implants', value: 'Metal implants' },
      { label: 'Facial/body piercings', value: 'Facial/body piercings' },
      { label: 'None', value: 'none' },
    ],
    mandatory: false,
  },
  {
    title: 'Have you had facial surgery within the last 6 months?',
    icon: Meditation,
    questionId: 'facialSurgery',
    type: IntakeSectionElementTypes.radio,
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
    mandatory: false,
  },
];

export const UPDATE_MESSAGE_LIST: MessageList[] = [
  {
    header: 'Getting Ready For Your Facial',
    title: 'What should I do (or avoid) before my facial?',
    image: Emily,
    path: 'https://www.heydayskincare.com/blogs/skin-deep/what-to-know-before-getting-a-facial',
  },
  {
    header: 'Let’s Talk Enhancements',
    title: 'What they are, what they do and why they matter.',
    image: Gabriel,
    path: 'https://www.heydayskincare.com/blogs/skin-deep/let-s-talk-about-facial-enhancements',
  },
  {
    header: 'Building A Skincare Routine',
    title: 'What’s the right order to use skincare products?',
    image: MultiBrand,
    path: 'https://www.heydayskincare.com/blogs/skin-deep/routine-order',
  },
];

export const WAIT_FOR_CONSENT_LIST: MessageList[] = [
  {
    header: 'Getting Ready For Your Facial',
    title: 'What should I do (or avoid) before my facial?',
    image: Emily,
    path: 'https://www.heydayskincare.com/blogs/skin-deep/what-to-know-before-getting-a-facial',
  },
  {
    header: 'How To Treat Hormonal Acne',
    title: 'Our best tips for at-home treatment.',
    image: TataHarper,
    path: 'https://www.heydayskincare.com/blogs/skin-deep/how-to-treat-hormonal-acne',
  },
  {
    header: 'Building A Skincare Routine',
    title: 'What’s the right order to use skincare products?',
    image: MultiBrand,
    path: 'https://www.heydayskincare.com/blogs/skin-deep/routine-order',
  },
];
export const TOO_YOUNG_LIST: MessageList[] = [
  {
    header: 'SPF: The VIP Of Skincare',
    title: 'Everything you need to know about sunscreen.',
    image: GroupLook,
    path: 'https://www.heydayskincare.com/blogs/skin-deep/the-core-four-sunscreen',
  },
  {
    header: 'We Answered Your Top Acne Questions',
    title: 'Our tips and tricks to handle pesky breakouts.',
    image: PointFinger,
    path: 'https://www.heydayskincare.com/blogs/skin-deep/your-top-6-acne-qs-answered',
  },
  {
    header: 'Building A Skincare Routine',
    title: 'What’s the right order to use skincare products?',
    image: MultiBrand,
    path: 'https://www.heydayskincare.com/blogs/skin-deep/routine-order',
  },
];
export const CUSTOMER_SESSION_TOKEN = 'customer_session_token';
export const NO_TOKEN_FOUND = 'No Token Found';

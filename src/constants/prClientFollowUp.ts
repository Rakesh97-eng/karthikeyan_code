import {
  Section,
  SectionElementTypes,
} from '../types/treatmentRecord/question';

export const CLIENT_FOLLOW_UP: Section = {
  id: 'nextTimeEnhancement',
  title: 'nextTimeEnhancement',
  icon: 'fileName',
  isEnabled: false,
  elements: [
    {
      type: SectionElementTypes.checkbox,
      id: 'nextTimeEnhancement',
      label: 'Enhancement Suggestion for Next Time',
      mandatory: true,
      options: [
        {
          label: 'Diamond Tip Microdermabrasion',
          value: 'c3d4c0ef-6178-4b50-932d-6883718d1ea4',
        },
        { label: 'Gua Sha', value: 'ea129ab1-dc38-4f55-8ff6-52fa8ae2e4e6' },
        {
          label: 'Hydro Wand Infusion',
          value: '32c915fa-8f9e-4ad2-85e0-408e4b28ca0c',
        },
        {
          label: 'Hydro Wand Microdermabrasion',
          value: '5e98f394-c6e5-4a13-bc79-2d598ff8ba83',
        },

        {
          label: 'Light Therapy',
          value: '8348786e-6133-43e8-9fb4-36ecadb3e482',
        },
        {
          label: 'Microcurrent',
          value: '78e7d46c-0789-4257-8d6d-342c5121b36b',
        },
        {
          label: 'Nano Infusion',
          value: '773676e0-d2ca-4920-8fb2-698c7c430fef',
        },
        { label: 'Peel', value: 'ce441357-5b99-4397-b3e3-abc892710898' },
      ],
    },
  ],
};

export const CLIENT_MESSAGE_TEXTAREA = {
  id: 'clientMessage',
  type: SectionElementTypes.textarea,
  label: 'Message to Client',
  mandatory: true,
  info: 'Provide additional instruction, say something nice, and/or reflect on the convo you had.',
};

export const PRODUCT_LIST = [
  {
    brand: 'Gilded',
    productName: 'The Marble Body Brush',
    price: '$35',
    chip: 'body',
    dateOfBought: 'Oct 3, 2012',
    productImage: 'prod1',
    cardPayment: false,
    isSelected: false,
  },
  {
    brand: 'Golde',
    productName: 'Original Blend',
    price: '$29',
    chip: 'body',
    dateOfBought: 'Oct 3, 2012',
    productImage: 'prod2',
    cardPayment: true,
    isSelected: false,
  },
  {
    brand: 'Grown alchemist',
    productName: 'Antibacterial Hand Cream',
    price: '$22',
    chip: 'body',
    dateOfBought: 'Oct 3, 2012',
    productImage: 'prod3',
    cardPayment: false,
    isSelected: false,
  },
];

export const PAST_PURCHASE_LIST = [
  {
    brand: 'NATUROPATHICA',
    productName: 'Manuka Honey Cleansing Balm',
    price: '$35',
    storeFront: true,
    dateOfBought: 'Nov 3, 2021 (3 months)',
    productImage: 'purchaseProd1',
    chip: 'Cleanser',
    recChip: false,
    quantity: 1,
  },
  {
    brand: 'IMAGE SKINCARE',
    productName: 'Vital C Hydrating Enzyme Masque',
    price: '$35',
    storeFront: true,
    dateOfBought: 'Nov 3, 2021 (3 months)',
    productImage: 'purchaseProd2',
    chip: 'Exfoliant',
    recChip: true,
    quantity: 2,
  },
  {
    brand: 'EMINENCE',
    productName: 'Clear Skin Probiotic Moisturizer',
    price: '$35',
    storeFront: true,
    dateOfBought: 'Nov 3, 2021 (3 months)',
    productImage: 'purchaseProd3',
    chip: 'moisturizer',
    recChip: false,
    quantity: 1,
  },
  {
    brand: 'ONEKIND',
    productName: 'Midnight Magic PM Serum',
    price: '$35',
    storeFront: true,
    dateOfBought: 'Nov 3, 2021 (3 months)',
    productImage: 'purchaseProd4',
    chip: 'serum',
    recChip: false,
    quantity: 2,
  },
  {
    brand: 'IMAGE SKINCARE',
    productName: 'Prevention+ Daily Ultimate Protection Moisturizer SPF 50',
    price: '$35',
    storeFront: true,
    dateOfBought: 'Nov 3, 2021 (3 months)',
    productImage: 'purchaseProd5',
    chip: 'Cleanser',
    recChip: true,
    quantity: 1,
  },
  {
    brand: 'IMAGE SKINCARE DEMO 1',
    productName: 'Prevention+ Daily Protection',
    price: '$35',
    storeFront: true,
    dateOfBought: 'Nov 3, 2021 (3 months)',
    productImage: 'purchaseProd1',
    chip: 'Cleanser',
    recChip: true,
    quantity: 1,
  },
];

export const PRODUCTS_TO_AVOID = [
  {
    brand: 'NATUROPATHICA',
    productName: 'Sweet Cherry Brightening Enzyme Peel ',
    productImage: 'avoidProd1',
    chip: ['fruit', 'nuts'],
  },
  {
    brand: 'ONE LOVE ORGANICS',
    productName: 'Botanical B Enzyme Cleansing Oil',
    productImage: 'avoidProd2',
    chip: ['fruit', 'nuts', 'pregnancy', 'redness/burning'],
  },
  {
    brand: 'NATUROPATHICA',
    productName: 'Calendula Essential Hydrating Cream',
    productImage: 'avoidProd3',
    chip: [
      'fruit',
      'nuts',
      'pregnancy',
      'redness/burning',
      'soy',
      'nuts',
      'pregnancy',
      'redness/burning',
    ],
  },
  {
    brand: 'Image skincare',
    productName: 'Vital C Hydrating Anti-Aging Serum',
    productImage: 'avoidProd4',
    chip: ['fruit', 'nuts'],
  },
  {
    brand: 'Image skincare',
    productName: 'Prevention+ Daily Ultimate Protection Moisturizer SPF 50',
    productImage: 'avoidProd5',
    chip: ['redness/burning'],
  },
  {
    brand: 'Image skincare demo 1',
    productName: 'Vital C Hydrating ',
    productImage: 'avoidProd1',
    chip: ['fruit'],
  },
  {
    brand: 'Image skincare demo 2',
    productName: 'Prevention+ Daily',
    productImage: 'avoidProd2',
    chip: ['redness'],
  },
];

import {
  ClientPreference,
  ClientPreferencesCategory,
  EnhancementRecommendation,
  iUTCOffset,
  PastTreatment,
  Section,
  SectionElementTypes,
} from '../types/treatmentRecord/question';

// icons
import CleanseCommunicate from '../assets/icons/cleanse_communicate.svg';
import SkinAnalysis from '../assets/icons/skin_analysis.svg';
import CoreSegments from '../assets/icons/core-segments.svg';
import Hand from '../assets/icons/hand.svg';
import Lightbulb from '../assets/icons/lightbulb.svg';
import ExfoliationSegment from '../assets/icons/exfoliation-segment.svg';
import ExtractionSegment from '../assets/icons/extractions-segment.svg';
import TouchPointSegment from '../assets/icons/touch-point-segment.svg';
import MaskSegment from '../assets/icons/mask-segment.svg';
import TargetedTherapySegment from '../assets/icons/targeted-therapy-segment.svg';
import SOSTreatment from '../assets/icons/sos-treatment.svg';
import RecapRehydrate from '../assets/icons/recap_rehydrate.svg';
import TreatmentWrapUp from '../assets/icons/treatment-wrap-up.svg';
import VaccineSVG from '../assets/icons/vaccine.svg';
import EmojiLovedSVG from '../assets/icons/emoji-loved.svg';
import EmployeeSVG from '../assets/icons/employee.svg';
import MemberSVG from '../assets/icons/member.svg';
import VaxExemption1SVG from '../assets/icons/vaxExemption1.svg';
import VaxExemption2SVG from '../assets/icons/vaxExemption2.svg';
import SPSensitivities from '../assets/icons/sp-sensitivities.svg';
import SPOilAcitivity from '../assets/icons/sp-oil-activities.svg';
import SPSkincare from '../assets/icons/sp-skincare.svg';
import SPBasic from '../assets/icons/sp-basics.svg';

import { ReactComponent as WarningCircle } from '../assets/icons/skin-profile-summary/WarningCircle.svg';
import { ReactComponent as rxBottle } from '../assets/icons/skin-profile-summary/rxBottle.svg';
import { ReactComponent as Robot } from '../assets/icons/skin-profile-summary/Robot.svg';
import { ReactComponent as prescription } from '../assets/icons/skin-profile-summary/prescription.svg';
import { ReactComponent as Leaf } from '../assets/icons/skin-profile-summary/Leaf.svg';
import { ReactComponent as Heartbeat } from '../assets/icons/skin-profile-summary/Heartbeat.svg';
import { ReactComponent as Fire } from '../assets/icons/skin-profile-summary/Fire.svg';
import { ReactComponent as CirclesThree } from '../assets/icons/skin-profile-summary/CirclesThree.svg';
import { ReactComponent as Baby } from '../assets/icons/skin-profile-summary/Baby.svg';
import { ReactComponent as Atom } from '../assets/icons/skin-profile-summary/Atom.svg';

import {
  FilterType,
  Metric,
  ProfileTag,
  QuestionLabel,
  SkinProfileQuestionTypes,
  SkinProfileSectionType,
} from '../types/clientProfile';

import { ReactComponent as Pref1 } from '../assets/icons/pref-1.svg';
import { ReactComponent as Pref2 } from '../assets/icons/pref-2.svg';
import { ReactComponent as Pref3 } from '../assets/icons/pref-3.svg';
import { ReactComponent as Pref4 } from '../assets/icons/pref-4.svg';
import { ReactComponent as Pref5 } from '../assets/icons/pref-5.svg';
import { ReactComponent as Pref6 } from '../assets/icons/pref-6.svg';
import { ReactComponent as Pref7 } from '../assets/icons/pref-7.svg';
import { ReactComponent as Pref8 } from '../assets/icons/pref-8.svg';
import { ReactComponent as Pref9 } from '../assets/icons/pref-9.svg';
import { ReactComponent as Pref10 } from '../assets/icons/pref-10.svg';
import { ReactComponent as Pref11 } from '../assets/icons/pref-11.svg';
import { ReactComponent as Pref12 } from '../assets/icons/pref-12.svg';
import { ReactComponent as Pref13 } from '../assets/icons/pref-13.svg';
import { ReactComponent as Pref14 } from '../assets/icons/pref-14.svg';
import { ReactComponent as Pref15 } from '../assets/icons/pref-15.svg';
import { ReactComponent as Pref16 } from '../assets/icons/pref-16.svg';
import { ReactComponent as Pref17 } from '../assets/icons/pref-17.svg';
import { ReactComponent as Pref18 } from '../assets/icons/pref-18.svg';

import { ReactComponent as ER_1 } from '../assets/icons/er-1.svg';
import { ReactComponent as ER_2 } from '../assets/icons/er-2.svg';
import { ReactComponent as ER_3 } from '../assets/icons/er-3.svg';
import { ReactComponent as ER_4 } from '../assets/icons/er-4.svg';

export const OUTSIDE_US = 'outside-us';
export const DEFAULT_NONE = 'none';
export const INTAKE_DEFAULT_NONE = '036ef926-ce64-464e-a830-edab78c273b4';
export const INTAKE_DEFAULT_OTHER = 'ecfff538-78c2-4a62-91f2-f4a3b73becd9';
export const INTAKE_YES = '3c14d1da-e206-4107-be72-f0922ac05704';
export const INTAKE_OTHERS = 'ecfff538-78c2-4a62-91f2-f4a3b73becd9';
export const RITTENHOUSE_LOCATION_ID = 'f5c40398-33f0-44b1-89cd-63b0ec9325c1';
export const PLYMOUTH_MEETING_LOCATION_ID =
  'f6e0050f-09d4-42a6-8b1f-59b303a1ae28';
export const CORE_BLOCK_SECTION: Section[] = [
  {
    id: 'exfoliationSegment',
    title: 'Exfoliation Segment',
    icon: ExfoliationSegment,
    isEnabled: false,
    elements: [
      {
        type: SectionElementTypes.checkbox,
        id: 'exfoliationEnhancement',
        label: 'Exfoliation Enhancements',
        mandatory: false,
        options: [
          {
            label: 'Diamond Tip Microderm — $80',
            value: '51a99884-dc09-46a2-884e-a24d1ea5fa8f',
            elements: [
              {
                type: SectionElementTypes.radio,
                id: 'exfoliationDtmWand',
                label: 'Wand',
                mandatory: true,
                options: [
                  {
                    label: 'Fine',
                    value: '6c0ce4f1-bc64-47d9-910e-204aa35bd5e9',
                  },
                  {
                    label: 'Medium',
                    value: '24b89a0e-b93c-4eaa-ba19-d602641434fb',
                  },
                ],
              },
              {
                type: SectionElementTypes.text,
                id: 'exfoliationDtmSuctionRate',
                label: 'Suction Rate',
                mandatory: true,
              },
              {
                type: SectionElementTypes.radio,
                id: 'exfoliationDtmPasses',
                label: 'Passes',
                mandatory: true,
                options: [
                  {
                    label: 'Half hashtag',
                    value: '0a6d2fe4-2c4c-4b57-a4ff-6f8fca5feee7',
                  },
                  {
                    label: 'Full hashtag',
                    value: 'fff24220-d110-4998-93a1-accb56e9c64e',
                  },
                  {
                    label: 'Hashtag plus',
                    value: '398a25b2-5d72-419d-b5e2-e6e4699bf0e3',
                  },
                ],
              },
            ],
          },
          {
            label: 'Hydro Wand Infusion — $80',
            value: '0615e6e5-ca4d-4c14-97ff-bfcf99548715',
            subLabel:
              'Do not put anything except for the Wand Product inside the microderm canister.',
            elements: [
              {
                type: SectionElementTypes.radio,
                id: 'exfoliationHwiWandProduct',
                label: 'Wand Product',
                mandatory: true,
                options: [
                  {
                    label: 'Ormedic Gel Mask',
                    value: '561c3fb0-446e-4389-9322-1fe0f34c3c1a',
                  },
                ],
              },
              {
                type: SectionElementTypes.checkbox,
                id: 'exfoliationHwiTreatmentSerum',
                label: 'Treatment Serum (choose up to 2)',
                mandatory: true,
                options: [
                  {
                    label: 'Oatmeal Extract',
                    value: 'bddf7ca2-cba0-4cf1-98d6-d53ac9a7477a',
                  },
                  {
                    label: 'Clear Cell Tonic',
                    value: 'ec1a26cf-d61e-4a3f-b4ea-90c2b5224327',
                  },
                  {
                    label: 'Clear Skin 3%',
                    value: '570c5e9c-acd5-41d8-94ff-ea6c5712b236',
                  },
                  {
                    label: 'Image Hyaluronic',
                    value: 'ab9f2909-39d9-40a3-a488-30dc8370f8e6',
                  },
                  {
                    label: 'Image Stem Cell',
                    value: '51c97a89-ae0c-4c6b-8650-521d64e4e53b',
                  },
                ],
              },
              {
                type: SectionElementTypes.text,
                id: 'exfoliationHwiSuctionRate',
                label: 'Suction Rate',
                mandatory: true,
              },
            ],
          },
          {
            label: 'Hydro Wand Microderm — $80',
            value: 'c18bd16d-3c3f-4de1-9d41-2db7c839fed2',
            subLabel:
              'Do not put anything except for the Wand Product inside the microderm canister.',
            elements: [
              {
                type: SectionElementTypes.radio,
                id: 'exfoliationHwmWandProduct',
                label: 'Wand Product',
                mandatory: true,
                options: [
                  {
                    label: 'Ormedic Gel Mask',
                    value: '561c3fb0-446e-4389-9322-1fe0f34c3c1a',
                  },
                ],
              },
              {
                type: SectionElementTypes.text,
                id: 'exfoliationHwmSuctionRate',
                label: 'Suction Rate',
                mandatory: true,
              },
              {
                type: SectionElementTypes.radio,
                id: 'exfoliationHwmPasses',
                label: 'Passes',
                mandatory: true,
                options: [
                  {
                    label: 'Half hashtag',
                    value: '0a6d2fe4-2c4c-4b57-a4ff-6f8fca5feee7',
                  },
                  {
                    label: 'Full hashtag',
                    value: 'fff24220-d110-4998-93a1-accb56e9c64e',
                  },
                  {
                    label: 'Hashtag plus',
                    value: '398a25b2-5d72-419d-b5e2-e6e4699bf0e3',
                  },
                ],
              },
            ],
          },
          {
            label: 'Peel — $50',
            value: 'a49fce71-f7f9-45f6-ae23-087ed8d05602',
            elements: [
              {
                type: SectionElementTypes.checkbox,
                id: 'exfoliationPeelProduct',
                label: 'Peel Product',
                mandatory: true,
                options: [
                  {
                    label: 'Lightening Lift',
                    value: 'f2dde6eb-a830-419d-be2d-4824d6627f82',
                  },
                  {
                    label: 'PRO Salicylic 15%',
                    value: 'b2bfbc3d-dc1e-43e7-bc25-47249eaabc5e',
                  },
                  {
                    label: 'I Peel Acne Lift',
                    value: '010a85d3-6357-4939-bce1-4897e0e5be96',
                  },
                  {
                    label: 'Alchimie Brightening Peel',
                    value: '9ff40a74-d88d-4d7a-8891-daf384dbd861',
                  },
                  {
                    label: 'NEUTRALIZER: Soothing Chamomile Tonique',
                    value: 'ea5910e9-f826-4839-bc35-40f98e35a07d',
                  },
                ],
              },
              {
                type: SectionElementTypes.radio,
                id: 'exfoliationPeelLayers',
                label: 'Peel Layers',
                mandatory: true,
                options: [
                  { label: '1', value: '04127d57-bf9d-44fc-b5a3-0b4d9966a5c5' },
                  { label: '2', value: '2c4ccbcf-425e-4459-bc64-e97dd587e601' },
                  { label: '3', value: 'ca313d7a-a4cb-4f15-9723-d36850913093' },
                ],
              },
              {
                type: SectionElementTypes.radio,
                id: 'exfoliationPeelTimeOnSkin',
                label: 'Time on Skin',
                mandatory: true,
                options: [
                  {
                    label: '1-3 minutes',
                    value: '52870b39-2820-48a5-81a9-ce58241582ca',
                  },
                  {
                    label: '3-5 minutes',
                    value: '1139a45f-8873-44a3-9e69-549f79bc83b7',
                  },
                  {
                    label: '5-7 minutes',
                    value: '4336c976-d8b0-425c-8dea-cc6afbbd13a5',
                  },
                  {
                    label: '7-10 minutes',
                    value: '63e6db2e-200b-4502-981b-f0bd3934866c',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: SectionElementTypes.radio,
        id: 'exfoliationBaseProduct',
        label: 'Exfoliation Base Product',
        info: 'Not required when using an exfoliation enhancement',
        infoItalic: true,
        mandatory: false,
        options: [
          {
            label: 'Grapefruit Polish',
            value: '39c8c762-9479-41fc-af8a-6408ada7c9b6',
          },
          {
            label: 'Vital C Enzyme',
            value: '3d027de7-3000-4fe6-9a22-eb89dcf749ed',
          },
          {
            label: 'Sweet Cherry Enzyme',
            value: 'b0d9b376-2ca4-4ac0-9155-2ef57b15b125',
          },
          {
            label: 'Glycolic 15%',
            value: 'c05d10f7-d019-4e6a-b788-ae29f8b86cfa',
          },
          {
            label: 'Ormedic Lift',
            value: '062a8b52-0229-4d28-8246-74ff40042e3e',
          },
        ],
      },
      {
        type: SectionElementTypes.checkbox,
        id: 'exfoliationBoost',
        label: 'Exfoliation Boost',
        mandatory: false,
        options: [
          {
            label: 'Glycolic 15%',
            value: 'c05d10f7-d019-4e6a-b788-ae29f8b86cfa',
          },
          {
            label: 'Clear Skin 3%',
            value: '570c5e9c-acd5-41d8-94ff-ea6c5712b236',
          },
          {
            label: 'I Peel Degreaser',
            value: 'edba83a3-3b38-4ff8-9c01-75d43e7763d3',
          },
          {
            label: 'Clear Cell Tonic',
            value: 'ec1a26cf-d61e-4a3f-b4ea-90c2b5224327',
          },
        ],
      },
      {
        type: SectionElementTypes.checkbox,
        id: 'exfoliationModality',
        label: 'Exfoliation Modality',
        mandatory: false,
        options: [
          {
            label: 'BT Micro Exfol',
            value: '80765484-f532-4ec7-91a9-8c155baf686a',
          },
        ],
      },
    ],
  },
  {
    title: 'Extractions Segment',
    icon: ExtractionSegment,
    id: 'extractionsSegment',
    isEnabled: false,
    elements: [
      {
        type: SectionElementTypes.checkbox,
        id: 'extractionsPrepProducts',
        label: 'Extractions Prep Products',
        mandatory: true,
        note: '(select all that apply)',
        options: [
          { label: 'OLO Oil', value: '4f500753-9c94-44a5-af0e-680a6ce79991' },
          { label: 'Gotu Kola', value: '11fb1794-b676-40a6-9134-2a84acb247a3' },
          {
            label: 'Skin Savior',
            value: '9d2226f0-2547-4f10-b18a-f0e65bb0b988',
          },
          {
            label: 'Desincrustation Solution',
            value: '7a9f520e-b24f-4e1d-8908-d2ee2c77e028',
          },
          {
            label: 'Soothing Chamomile Tonique',
            value: '0607f5e8-0535-4918-bf8f-3f30e3a38e28',
          },
          {
            label: 'Ormedic Gel',
            value: '36e4260f-c71b-49b4-b452-135bd0e5f46a',
          },
        ],
      },
      {
        type: SectionElementTypes.checkbox,
        id: 'extractionsBoost',
        label: 'Extractions Boost',
        mandatory: false,
        options: [
          {
            label: 'Vital C Enzyme',
            value: '3d027de7-3000-4fe6-9a22-eb89dcf749ed',
          },
        ],
      },
      {
        type: SectionElementTypes.checkbox,
        id: 'extractionsZone',
        label: 'Extractions Zone',
        mandatory: true,
        note: '(select all that apply)',
        options: [
          { label: 'Nose', value: '5fa55b4c-8ec9-4c6d-b3e0-e8ec19364560' },
          { label: 'Chin', value: '0cf77348-3d2e-412f-9730-498cf5578eee' },
          { label: 'Jawline', value: 'a7218d19-5b34-466a-9358-574e2eba2e0d' },
          { label: 'Forehead', value: '339e996b-a412-443e-a3c9-9bafd210555d' },
          { label: 'Cheeks', value: 'eb0cbd0a-da07-412d-b82a-4bd9dc3701f6' },
        ],
      },
      {
        type: SectionElementTypes.checkbox,
        id: 'extractionsModality',
        label: 'Extractions Modality',
        mandatory: false,
        options: [
          {
            label: 'BT Micro Exfol',
            value: '80765484-f532-4ec7-91a9-8c155baf686a',
          },
          {
            label: 'BT Mircro Clear',
            value: '4ef66052-05e3-4d0d-a312-c9019164b2d4',
          },
          {
            label: 'High Frequency',
            value: '197483c8-801d-4002-bf31-042e9ff9fa4b',
          },
          {
            label: 'Blue LED Spot Treatment',
            value: 'a872803f-9ec0-4418-817f-a55e082f2b2c',
          },
        ],
      },
      {
        type: SectionElementTypes.checkbox,
        id: 'extractionsPostProducts',
        label: 'Extractions Post Products',
        mandatory: true,
        options: [
          {
            label: 'Clear Cell Tonic',
            value: 'ec1a26cf-d61e-4a3f-b4ea-90c2b5224327',
          },
          {
            label: 'Clear Skin Booster 3%',
            value: 'f645bba0-e0df-4988-aee1-aee4538b8ba8',
          },
          {
            label: 'Lavender Honey Mist',
            value: '9a6427da-a075-41f5-91bc-d2d6b2bef19b',
          },
          {
            label: 'Neroli Mist',
            value: 'c031bac8-060d-4724-9e72-a1c74aad0e68',
          },
        ],
      },
    ],
  },
  {
    title: 'Touch Point Segment',
    icon: TouchPointSegment,
    id: 'touchPointSegment',
    isEnabled: false,
    elements: [
      {
        type: SectionElementTypes.checkbox,
        id: 'touchPointEnhancement',
        label: 'Touch Point Enhancement',
        mandatory: false,
        options: [
          {
            label: 'Gua Sha - $50',
            value: '0dad89d1-1ad3-48e2-a3cb-35c4e10076c0',
          },
        ],
      },
      {
        type: SectionElementTypes.radio,
        id: 'touchPointMassageMedium',
        label: 'Touch Point Massage Medium',
        mandatory: true,
        options: [
          { label: 'OLO Oil', value: '4f500753-9c94-44a5-af0e-680a6ce79991' },
          { label: 'Gotu Kola', value: '11fb1794-b676-40a6-9134-2a84acb247a3' },
          {
            label: 'Skin Savior',
            value: '9d2226f0-2547-4f10-b18a-f0e65bb0b988',
          },
        ],
      },
      {
        type: SectionElementTypes.checkbox,
        id: 'touchPointBoost',
        label: 'Touch Point Boost',
        mandatory: false,
        options: [
          {
            label: 'Vital C Enzyme',
            value: '3d027de7-3000-4fe6-9a22-eb89dcf749ed',
          },
          { label: 'White Tea', value: '350a55af-2493-4cf6-811a-f8252026a803' },
          {
            label: 'Kantic Maske',
            value: '6d396b81-ae5c-41c8-a7ba-e79101bf5b5d',
          },
          {
            label: 'Hyaluronic Serum',
            value: '911e023f-9c1e-4f06-82dc-ccbb1693ce99',
          },
          {
            label: 'Plant Stem Cell Serum',
            value: '78e38c6c-3b81-4558-ae6b-8b637c013e20',
          },
          {
            label: 'Brighten Up Serum',
            value: '46caf3e8-723b-46ea-a3d3-35f858a58d81',
          },
          {
            label: 'Soothing Chamomile Tonique',
            value: '0607f5e8-0535-4918-bf8f-3f30e3a38e28',
          },
          { label: 'Mushrooms', value: '36a25017-cfa0-4d77-9096-b334675760f8' },
          {
            label: 'Chill Aromatherapy',
            value: 'f4d822b8-1e3d-4074-b80d-b76d071a3da0',
          },
        ],
      },
      {
        type: SectionElementTypes.radio,
        id: 'touchPointModality',
        label: 'Touch Point Modality',
        mandatory: false,
        options: [
          {
            label: 'BT Micro Cream',
            value: 'f96ef106-82c3-4842-b6e9-abaf5c114745',
          },
          {
            label: 'BT Micro Serum',
            value: '1a9dbfdc-ba6a-4f79-b741-e7039f581954',
          },
          {
            label: 'BT Micro Exfol',
            value: '80765484-f532-4ec7-91a9-8c155baf686a',
          },
        ],
      },
      {
        type: SectionElementTypes.checkbox,
        id: 'touchPointTouch',
        label: 'Touch Point Touch',
        mandatory: true,
        options: [
          { label: 'Hand/Arm', value: 'ed784e4b-7eb4-4c99-9e79-4c2cb72e3351' },
          {
            label: 'Neck/Shoulder',
            value: 'a67a5dbe-4347-4a24-a7d0-cedb4d4b98b0',
          },
          { label: 'Scalp', value: '0f67bec1-7771-43b0-9b09-cd1d5db70264' },
          { label: 'Ear', value: 'ee3b5ace-00a1-4c70-a4b5-8101e89e00c1' },
          {
            label: 'Pressure Points',
            value: '546778a4-f891-4588-990d-98afe897f428',
          },
          {
            label: 'Leg/Foot Compressions',
            value: 'adb640bf-b756-4ad8-a3c2-36020c208de6',
          },
          {
            label: 'Neck Stetches',
            value: '5c864571-2259-4fcd-ae3e-cf15e7509136',
          },
        ],
      },
    ],
  },
  {
    title: 'Mask Segment',
    icon: MaskSegment,
    id: 'maskSegment',
    isEnabled: false,
    elements: [
      {
        type: SectionElementTypes.checkbox,
        id: 'maskEnhancements',
        label: 'Mask Enhancements',
        mandatory: false,
        options: [
          {
            label: 'Gua Sha - $50',
            value: '0dad89d1-1ad3-48e2-a3cb-35c4e10076c0',
          },
          {
            label: 'Hydro Wand Infusion — $80',
            value: '0615e6e5-ca4d-4c14-97ff-bfcf99548715',
            subLabel:
              'Do not put anything except for the Wand Product inside the microderm canister.',
            elements: [
              {
                type: SectionElementTypes.radio,
                id: 'maskHwiWandProduct',
                label: 'Wand Product',
                mandatory: true,
                options: [
                  {
                    label: 'Ormedic Gel Mask',
                    value: '561c3fb0-446e-4389-9322-1fe0f34c3c1a',
                  },
                ],
              },
              {
                type: SectionElementTypes.checkbox,
                id: 'maskHwiTreatmentSerum',
                label: 'Treatment Serum (choose up to 2)',
                mandatory: true,
                options: [
                  {
                    label: 'Oatmeal Extract',
                    value: 'bddf7ca2-cba0-4cf1-98d6-d53ac9a7477a',
                  },
                  {
                    label: 'Clear Cell Tonic',
                    value: 'ec1a26cf-d61e-4a3f-b4ea-90c2b5224327',
                  },
                  {
                    label: 'Clear Skin 3%',
                    value: '570c5e9c-acd5-41d8-94ff-ea6c5712b236',
                  },
                  {
                    label: 'Image Hyaluronic',
                    value: 'ab9f2909-39d9-40a3-a488-30dc8370f8e6',
                  },
                  {
                    label: 'Image Stem Cell',
                    value: '51c97a89-ae0c-4c6b-8650-521d64e4e53b',
                  },
                ],
              },
              {
                type: SectionElementTypes.text,
                id: 'maskHwiSuctionRate',
                label: 'Suction Rate',
                mandatory: true,
              },
            ],
          },
          {
            label: 'LED Panel — $50',
            value: '29af8a40-87cd-40f1-9345-aa9761565601',
            elements: [
              {
                type: SectionElementTypes.checkbox,
                id: 'maskLedPanelBoost',
                label: 'LED Panel Boost',
                mandatory: false,
                options: [
                  {
                    label: 'Ormedic Gel',
                    value: '36e4260f-c71b-49b4-b452-135bd0e5f46a',
                  },
                  {
                    label: 'Hyaluronic Serum',
                    value: '911e023f-9c1e-4f06-82dc-ccbb1693ce99',
                  },
                  {
                    label: 'Plant Stem Cell Serum',
                    value: '78e38c6c-3b81-4558-ae6b-8b637c013e20',
                  },
                  {
                    label: 'Oatmeal Extract',
                    value: 'bddf7ca2-cba0-4cf1-98d6-d53ac9a7477a',
                  },
                ],
              },
              {
                type: SectionElementTypes.radio,
                id: 'maskLedPanelTime',
                label: 'LED Panel Time',
                mandatory: true,
                options: [
                  {
                    label: '5 minutes',
                    value: 'aed87910-acd6-4318-85db-a85e2a65eabf',
                  },
                  {
                    label: '10 minutes',
                    value: '845bf728-21d6-4c0b-b8d9-d993614145ad',
                  },
                  {
                    label: '15 minutes',
                    value: '165f8d4d-2d9c-4c3a-953b-93e80fe1e516',
                  },
                ],
              },
            ],
          },
          {
            label: 'Microcurrent — $80',
            value: 'd7f82003-619f-4cc8-96de-eb8f12fcf367',
            elements: [
              {
                type: SectionElementTypes.text,
                id: 'maskMicrocurrentProgramLpi',
                label: 'Microcurrent Program',
                mandatory: true,
                placeholder: 'Long Program Intesity',
              },
              {
                type: SectionElementTypes.text,
                id: 'maskMicrocurrentProgramSpi',
                label: '',
                mandatory: false,
                placeholder: 'Short Program Intensity',
              },
              {
                type: SectionElementTypes.checkbox,
                id: 'maskMicrocurrentProduct',
                label: 'Microcurrent Product',
                mandatory: true,
                options: [
                  {
                    label: 'Ormedic Gel',
                    value: '36e4260f-c71b-49b4-b452-135bd0e5f46a',
                  },
                  {
                    label: 'Ecovue HV Gel',
                    value: '183327b4-a718-40b7-a69d-9f1a37f24b68',
                  },
                ],
              },
              {
                type: SectionElementTypes.checkbox,
                id: 'maskMicrocurrentSerum',
                label: 'Microcurrent Serum',
                mandatory: true,
                options: [
                  {
                    label: 'Image Hyaluronic',
                    value: 'ab9f2909-39d9-40a3-a488-30dc8370f8e6',
                  },
                  {
                    label: 'Image Stem Cell',
                    value: '51c97a89-ae0c-4c6b-8650-521d64e4e53b',
                  },
                  {
                    label: 'Oatmeal Extract',
                    value: 'bddf7ca2-cba0-4cf1-98d6-d53ac9a7477a',
                  },
                ],
              },
              {
                type: SectionElementTypes.radio,
                id: 'maskMicrocurrentTreatmentTime',
                label: 'Microcurrent Treatment Time',
                mandatory: true,
                options: [
                  {
                    label: '0-5 minutes',
                    value: '4c969f6a-4ea8-4f22-9be4-e7e787274083',
                  },
                  {
                    label: '6-10 minutes',
                    value: '96cefd78-1e32-4bec-9b9a-f89a7df862db',
                  },
                  {
                    label: '11-15 minutes',
                    value: '6ae1df6d-639a-4ee8-bcda-8cc2e1659d45',
                  },
                ],
              },
            ],
          },
          {
            label: 'Nano Infusion - $80',
            value: '66a61f41-5c50-43f3-b6a9-6697eb91d55b',
            elements: [
              {
                type: SectionElementTypes.text,
                id: 'maskNanoinfusionDeviceUsed',
                label: 'Device Used',
                mandatory: true,
                placeholder: 'Device Number',
              },
              {
                type: SectionElementTypes.radio,
                id: 'maskNanoinfusionSerumUsed',
                label: 'Serum Used',
                mandatory: true,
                options: [
                  {
                    label: 'Plant Stem Cell',
                    value: 'c58faa46-9d77-44ca-8cca-1c542904ba98',
                  },
                  {
                    label: 'Image Hyaluronic',
                    value: 'ab9f2909-39d9-40a3-a488-30dc8370f8e6',
                  },
                  {
                    label: 'Hyaluronic IonActive',
                    value: '082338a7-945e-4fc4-8174-ca5ab62a37f2',
                  },
                  {
                    label: 'Biolumin-C Pro',
                    value: '3d11d873-f24d-4020-94e6-b7a8ec7db4f9',
                  },
                  {
                    label: 'Oatmeal Extract',
                    value: 'bddf7ca2-cba0-4cf1-98d6-d53ac9a7477a',
                  },
                ],
              },
              {
                type: SectionElementTypes.radio,
                id: 'maskNanoinfusionMaskUsed',
                label: 'Mask Used',
                mandatory: true,
                options: [
                  {
                    label: 'Ormedic Gel',
                    value: '36e4260f-c71b-49b4-b452-135bd0e5f46a',
                  },
                ],
              },
              {
                type: SectionElementTypes.radio,
                id: 'maskNanoinfusionStitchDepthFcc',
                label: 'Stitch depth for forehead, cheeks, and chin',
                mandatory: true,
                options: [
                  {
                    label: '0.2',
                    value: 'ae94e0e6-e1bd-49a1-9d32-cab10199ef38',
                  },
                  {
                    label: '0.4',
                    value: '50189b46-774d-4733-be9c-be4a8a58cd6e',
                  },
                  {
                    label: '0.6',
                    value: '813397d7-39b4-4367-b04f-b732be92e540',
                  },
                  {
                    label: '0.8',
                    value: 'd33279eb-0bb4-4ea5-9af1-870935a7659d',
                  },
                  {
                    label: '1.0',
                    value: '7fdcaf4d-4e34-4645-8e29-f605e4998c70',
                  },
                  {
                    label: '1.2',
                    value: 'ebabfeeb-c98d-47d3-be9e-71588992a643',
                  },
                  {
                    label: '1.4',
                    value: '23b31472-8e2e-4563-8a1f-98a3d0edc48c',
                  },
                  {
                    label: '1.5',
                    value: '3723de8b-c646-4fee-b736-fc0ff62be0b3',
                  },
                ],
              },
              {
                type: SectionElementTypes.radio,
                id: 'maskNanoinfusionSpeedFcc',
                label: 'Speed for forehead, cheeks, and chin',
                mandatory: true,
                options: [
                  {
                    label: '1',
                    value: '04127d57-bf9d-44fc-b5a3-0b4d9966a5c5',
                  },
                  {
                    label: '2',
                    value: '2c4ccbcf-425e-4459-bc64-e97dd587e601',
                  },
                  {
                    label: '3',
                    value: 'ca313d7a-a4cb-4f15-9723-d36850913093',
                  },
                  {
                    label: '4',
                    value: '3568129c-d84e-4c0d-8723-816b1a0c9076',
                  },
                  {
                    label: '5',
                    value: 'ff5e9bbb-2e28-47a5-baf5-abf686e1fb4f',
                  },
                  {
                    label: '6',
                    value: '2d5b771f-496a-4cf4-9601-fe861adf1ad3',
                  },
                ],
              },
              {
                type: SectionElementTypes.radio,
                id: 'maskNanoinfusionStitchDepthNe',
                label: 'Stitch depth for nose and eyes',
                mandatory: true,
                options: [
                  {
                    label: '0.2',
                    value: 'ae94e0e6-e1bd-49a1-9d32-cab10199ef38',
                  },
                  {
                    label: '0.4',
                    value: '50189b46-774d-4733-be9c-be4a8a58cd6e',
                  },
                  {
                    label: '0.6',
                    value: '813397d7-39b4-4367-b04f-b732be92e540',
                  },
                  {
                    label: '0.8',
                    value: 'd33279eb-0bb4-4ea5-9af1-870935a7659d',
                  },
                  {
                    label: '1.0',
                    value: '7fdcaf4d-4e34-4645-8e29-f605e4998c70',
                  },
                  {
                    label: '1.2',
                    value: 'ebabfeeb-c98d-47d3-be9e-71588992a643',
                  },
                  {
                    label: '1.4',
                    value: '23b31472-8e2e-4563-8a1f-98a3d0edc48c',
                  },
                  {
                    label: '1.5',
                    value: '3723de8b-c646-4fee-b736-fc0ff62be0b3',
                  },
                ],
              },
              {
                type: SectionElementTypes.radio,
                id: 'maskNanoinfusionSpeedNe',
                label: 'Speed for nose and eyes',
                mandatory: true,
                options: [
                  {
                    label: '1',
                    value: '04127d57-bf9d-44fc-b5a3-0b4d9966a5c5',
                  },
                  {
                    label: '2',
                    value: '2c4ccbcf-425e-4459-bc64-e97dd587e601',
                  },
                  {
                    label: '3',
                    value: 'ca313d7a-a4cb-4f15-9723-d36850913093',
                  },
                  {
                    label: '4',
                    value: '3568129c-d84e-4c0d-8723-816b1a0c9076',
                  },
                  {
                    label: '5',
                    value: 'ff5e9bbb-2e28-47a5-baf5-abf686e1fb4f',
                  },
                  {
                    label: '6',
                    value: '2d5b771f-496a-4cf4-9601-fe861adf1ad3',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: SectionElementTypes.checkbox,
        id: 'maskBaseProduct',
        label: 'Mask Base Product',
        info: 'Not required when using a mask enhancement',
        infoItalic: true,
        mandatory: false,
        options: [
          {
            label: 'Outset Blue Clay Mask',
            value: 'beb33be8-97a5-40f3-9ef9-29de2e6e7856',
          },
          { label: 'Ormedic', value: '41a79e39-3cdc-435b-9a28-a512e4794d7e' },
          { label: 'Kantic', value: '7e1a48dc-c8f3-4f5e-bb9d-2f73c96ab367' },
          {
            label: 'Ash & Sage',
            value: 'b8d90787-bf13-4954-bbdc-26e5dc563ec7',
          },
          { label: 'White Tea', value: '350a55af-2493-4cf6-811a-f8252026a803' },
          {
            label: 'Marine Mask',
            value: '5d7c097e-0d37-4365-90b4-572cb7241c05',
          },
          {
            label: 'Clear Skin Probiotic',
            value: '15fdbb97-3fcb-4fc9-9ed9-bc74cdb6d046',
          },
          {
            label: 'Colloidal Oatmeal',
            value: 'ff986051-104b-41b3-b8ca-02ac09b3c979',
          },
        ],
      },
      {
        type: SectionElementTypes.checkbox,
        id: 'maskBoost',
        label: 'Mask Boost',
        mandatory: false,
        options: [
          {
            label: 'Image Hyaluronic',
            value: 'ab9f2909-39d9-40a3-a488-30dc8370f8e6',
          },
          {
            label: 'Plant Stem Cell Serum',
            value: '78e38c6c-3b81-4558-ae6b-8b637c013e20',
          },
          {
            label: 'Brighten Up Serum',
            value: '46caf3e8-723b-46ea-a3d3-35f858a58d81',
          },
          {
            label: 'Glycolic 15%',
            value: 'c05d10f7-d019-4e6a-b788-ae29f8b86cfa',
          },
          {
            label: 'Clear Skin 3%',
            value: '570c5e9c-acd5-41d8-94ff-ea6c5712b236',
          },
          { label: 'Gotu Kola', value: '11fb1794-b676-40a6-9134-2a84acb247a3' },
          {
            label: 'Colloidal Oatmeal',
            value: 'ff986051-104b-41b3-b8ca-02ac09b3c979',
          },
          {
            label: 'Oatmeal Extract',
            value: 'bddf7ca2-cba0-4cf1-98d6-d53ac9a7477a',
          },
        ],
      },
      {
        type: SectionElementTypes.checkbox,
        id: 'maskModality',
        label: 'Mask Modality',
        mandatory: false,
        options: [
          {
            label: 'BT Micro Exfol',
            value: '80765484-f532-4ec7-91a9-8c155baf686a',
          },
          {
            label: 'BT Micro Clear',
            value: '1919f030-0871-4251-9a2c-f19f29e51460',
          },
          {
            label: 'BT Micro Serum',
            value: '1a9dbfdc-ba6a-4f79-b741-e7039f581954',
          },
          {
            label: 'High Frequency',
            value: '197483c8-801d-4002-bf31-042e9ff9fa4b',
          },
          {
            label: 'Blue LED Spot Treatment',
            value: 'a872803f-9ec0-4418-817f-a55e082f2b2c',
          },
        ],
      },
    ],
  },
  {
    title: 'Targeted Therapy Segment',
    icon: TargetedTherapySegment,
    id: 'targetedTherapySegment',
    isEnabled: false,
    elements: [
      {
        type: SectionElementTypes.checkbox,
        id: 'targetedTherapyEnhancements',
        label: 'Targeted Therapy Enhancements',
        mandatory: true,
        options: [
          {
            label: 'LED Panel — $50',
            value: '29af8a40-87cd-40f1-9345-aa9761565601',
            elements: [
              {
                type: SectionElementTypes.checkbox,
                id: 'targetedTherapyLedPanelBoost',
                label: 'LED Panel Boost',
                mandatory: false,
                options: [
                  {
                    label: 'Ormedic Gel',
                    value: '36e4260f-c71b-49b4-b452-135bd0e5f46a',
                  },
                  {
                    label: 'Image Hyaluronic',
                    value: 'ab9f2909-39d9-40a3-a488-30dc8370f8e6',
                  },
                  {
                    label: 'Plant Stem Cell Serum',
                    value: '78e38c6c-3b81-4558-ae6b-8b637c013e20',
                  },
                  {
                    label: 'Oatmeal Extract',
                    value: 'bddf7ca2-cba0-4cf1-98d6-d53ac9a7477a',
                  },
                ],
              },
              {
                type: SectionElementTypes.radio,
                id: 'targetedTherapyLedPanelTime',
                label: 'LED Panel Time',
                mandatory: true,
                options: [
                  {
                    label: '5 minutes',
                    value: 'aed87910-acd6-4318-85db-a85e2a65eabf',
                  },
                  {
                    label: '10 minutes',
                    value: '845bf728-21d6-4c0b-b8d9-d993614145ad',
                  },
                  {
                    label: '15 minutes',
                    value: '165f8d4d-2d9c-4c3a-953b-93e80fe1e516',
                  },
                ],
              },
            ],
          },
          {
            label: 'Microcurrent — $80',
            value: 'd7f82003-619f-4cc8-96de-eb8f12fcf367',
            elements: [
              {
                type: SectionElementTypes.text,
                id: 'targetedTherapyMicrocurrentProgramLpi',
                label: 'Microcurrent Program',
                mandatory: true,
                placeholder: 'Long Program Intesity',
              },
              {
                type: SectionElementTypes.text,
                id: 'targetedTherapyMicrocurrentProgramSpi',
                label: '',
                mandatory: false,
                placeholder: 'Short Program Intensity',
              },
              {
                type: SectionElementTypes.checkbox,
                id: 'targetedTherapyMicrocurrentProduct',
                label: 'Microcurrent Product',
                mandatory: true,
                options: [
                  {
                    label: 'Ormedic Gel',
                    value: '36e4260f-c71b-49b4-b452-135bd0e5f46a',
                  },
                  {
                    label: 'Ecovue HV Gel',
                    value: '183327b4-a718-40b7-a69d-9f1a37f24b68',
                  },
                ],
              },
              {
                type: SectionElementTypes.checkbox,
                id: 'targetedTherapyMicrocurrentSerum',
                label: 'Microcurrent Serum',
                mandatory: true,
                options: [
                  {
                    label: 'Image Hyaluronic',
                    value: 'ab9f2909-39d9-40a3-a488-30dc8370f8e6',
                  },
                  {
                    label: 'Image Stem Cell',
                    value: '51c97a89-ae0c-4c6b-8650-521d64e4e53b',
                  },
                  {
                    label: 'Oatmeal Extract',
                    value: 'bddf7ca2-cba0-4cf1-98d6-d53ac9a7477a',
                  },
                ],
              },
              {
                type: SectionElementTypes.radio,
                id: 'targetedTherapyMicrocurrentTreatmentTime',
                label: 'Microcurrent Treatment Time',
                mandatory: true,
                options: [
                  {
                    label: '0-5 minutes',
                    value: '4c969f6a-4ea8-4f22-9be4-e7e787274083',
                  },
                  {
                    label: '6-10 minutes',
                    value: '96cefd78-1e32-4bec-9b9a-f89a7df862db',
                  },
                  {
                    label: '11-15 minutes',
                    value: '6ae1df6d-639a-4ee8-bcda-8cc2e1659d45',
                  },
                ],
              },
            ],
          },
          {
            label: 'Nano Infusion - $80',
            value: '66a61f41-5c50-43f3-b6a9-6697eb91d55b',
            elements: [
              {
                type: SectionElementTypes.text,
                id: 'targetedTherapyNanoinfusionDeviceUsed',
                label: 'Device Used',
                mandatory: true,
                placeholder: 'Device Number',
              },
              {
                type: SectionElementTypes.radio,
                id: 'targetedTherapyNanoinfusionSerumUsed',
                label: 'Serum Used',
                mandatory: true,
                options: [
                  {
                    label: 'Plant Stem Cell',
                    value: 'c58faa46-9d77-44ca-8cca-1c542904ba98',
                  },
                  {
                    label: 'Image Hyaluronic',
                    value: 'ab9f2909-39d9-40a3-a488-30dc8370f8e6',
                  },
                  {
                    label: 'Hyaluronic IonActive',
                    value: '082338a7-945e-4fc4-8174-ca5ab62a37f2',
                  },
                  {
                    label: 'Biolumin-C Pro',
                    value: '3d11d873-f24d-4020-94e6-b7a8ec7db4f9',
                  },
                  {
                    label: 'Oatmeal Extract',
                    value: 'bddf7ca2-cba0-4cf1-98d6-d53ac9a7477a',
                  },
                ],
              },
              {
                type: SectionElementTypes.radio,
                id: 'targetedTherapyNanoinfusionMaskUsed',
                label: 'Mask Used',
                mandatory: true,
                options: [
                  {
                    label: 'Ormedic Gel',
                    value: '36e4260f-c71b-49b4-b452-135bd0e5f46a',
                  },
                ],
              },
              {
                type: SectionElementTypes.radio,
                id: 'targetedTherapyNanoinfusionStitchDepthFcc',
                label: 'Stitch depth for forehead, cheeks, and chin',
                mandatory: true,
                options: [
                  {
                    label: '0.2',
                    value: 'ae94e0e6-e1bd-49a1-9d32-cab10199ef38',
                  },
                  {
                    label: '0.4',
                    value: '50189b46-774d-4733-be9c-be4a8a58cd6e',
                  },
                  {
                    label: '0.6',
                    value: '813397d7-39b4-4367-b04f-b732be92e540',
                  },
                  {
                    label: '0.8',
                    value: 'd33279eb-0bb4-4ea5-9af1-870935a7659d',
                  },
                  {
                    label: '1.0',
                    value: '7fdcaf4d-4e34-4645-8e29-f605e4998c70',
                  },
                  {
                    label: '1.2',
                    value: 'ebabfeeb-c98d-47d3-be9e-71588992a643',
                  },
                  {
                    label: '1.4',
                    value: '23b31472-8e2e-4563-8a1f-98a3d0edc48c',
                  },
                  {
                    label: '1.5',
                    value: '3723de8b-c646-4fee-b736-fc0ff62be0b3',
                  },
                ],
              },
              {
                type: SectionElementTypes.radio,
                id: 'targetedTherapyNanoinfusionSpeedFcc',
                label: 'Speed for forehead, cheeks, and chin',
                mandatory: true,
                options: [
                  {
                    label: '1',
                    value: '04127d57-bf9d-44fc-b5a3-0b4d9966a5c5',
                  },
                  {
                    label: '2',
                    value: '2c4ccbcf-425e-4459-bc64-e97dd587e601',
                  },
                  {
                    label: '3',
                    value: 'ca313d7a-a4cb-4f15-9723-d36850913093',
                  },
                  {
                    label: '4',
                    value: '3568129c-d84e-4c0d-8723-816b1a0c9076',
                  },
                  {
                    label: '5',
                    value: 'ff5e9bbb-2e28-47a5-baf5-abf686e1fb4f',
                  },
                  {
                    label: '6',
                    value: '2d5b771f-496a-4cf4-9601-fe861adf1ad3',
                  },
                ],
              },
              {
                type: SectionElementTypes.radio,
                id: 'targetedTherapyNanoinfusionStitchDepthNe',
                label: 'Stitch depth for nose and eyes',
                mandatory: true,
                options: [
                  {
                    label: '0.2',
                    value: 'ae94e0e6-e1bd-49a1-9d32-cab10199ef38',
                  },
                  {
                    label: '0.4',
                    value: '50189b46-774d-4733-be9c-be4a8a58cd6e',
                  },
                  {
                    label: '0.6',
                    value: '813397d7-39b4-4367-b04f-b732be92e540',
                  },
                  {
                    label: '0.8',
                    value: 'd33279eb-0bb4-4ea5-9af1-870935a7659d',
                  },
                  {
                    label: '1.0',
                    value: '7fdcaf4d-4e34-4645-8e29-f605e4998c70',
                  },
                  {
                    label: '1.2',
                    value: 'ebabfeeb-c98d-47d3-be9e-71588992a643',
                  },
                  {
                    label: '1.4',
                    value: '23b31472-8e2e-4563-8a1f-98a3d0edc48c',
                  },
                  {
                    label: '1.5',
                    value: '3723de8b-c646-4fee-b736-fc0ff62be0b3',
                  },
                ],
              },
              {
                type: SectionElementTypes.radio,
                id: 'targetedTherapyNanoinfusionSpeedNe',
                label: 'Speed for nose and eyes',
                mandatory: true,
                options: [
                  {
                    label: '1',
                    value: '04127d57-bf9d-44fc-b5a3-0b4d9966a5c5',
                  },
                  {
                    label: '2',
                    value: '2c4ccbcf-425e-4459-bc64-e97dd587e601',
                  },
                  {
                    label: '3',
                    value: 'ca313d7a-a4cb-4f15-9723-d36850913093',
                  },
                  {
                    label: '4',
                    value: '3568129c-d84e-4c0d-8723-816b1a0c9076',
                  },
                  {
                    label: '5',
                    value: 'ff5e9bbb-2e28-47a5-baf5-abf686e1fb4f',
                  },
                  {
                    label: '6',
                    value: '2d5b771f-496a-4cf4-9601-fe861adf1ad3',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'SOS Treatment',
    icon: SOSTreatment,
    info: 'Implement if client has adverse or allergic reaction during the facial.',
    isEnabled: false,
    id: 'sosSegment',
    elements: [
      {
        type: SectionElementTypes.checkbox,
        id: 'sosBaseProduct',
        label: 'SOS Base Product',
        mandatory: true,
        options: [
          { label: 'Gotu Kola', value: '11fb1794-b676-40a6-9134-2a84acb247a3' },
          {
            label: 'Ormedic Gel',
            value: '36e4260f-c71b-49b4-b452-135bd0e5f46a',
          },
          {
            label: 'Colloidal Oatmeal',
            value: 'ff986051-104b-41b3-b8ca-02ac09b3c979',
          },
        ],
      },
      {
        type: SectionElementTypes.checkbox,
        id: 'sosSerum',
        label: 'SOS Serum',
        mandatory: true,
        options: [
          {
            label: 'Oatmeal Extract',
            value: 'bddf7ca2-cba0-4cf1-98d6-d53ac9a7477a',
          },
          { label: 'Gotu Kola', value: '11fb1794-b676-40a6-9134-2a84acb247a3' },
        ],
      },
      {
        type: SectionElementTypes.checkbox,
        id: 'sosHydration',
        label: 'SOS Hydration',
        mandatory: false,
        options: [
          {
            label: 'Cold Towels',
            value: '93aea3cf-1f02-4642-b848-dd13908db9cf',
          },
          {
            label: 'Cold Mushrooms',
            value: '9bd34b30-4d9a-4691-ad98-ebe2cfb0f7a3',
          },
        ],
      },
    ],
  },
];

const CORE_BLOCK = {
  title: 'Core Segments',
  icon: CoreSegments,
  info: 'Choose at least 3 of the following segments. Manage expectations for each segment before and after and link back to the primary concern.',
  customerNotes: [
    { icon: Hand, label: 'Hand & Neck Massage' },
    { icon: Lightbulb, label: 'Light Sensitivity' },
  ],
  sections: CORE_BLOCK_SECTION,
};

const TR_REHYDRATE_REACAP_SECTION: Section = {
  title: 'Rehydrate & Recap',
  icon: RecapRehydrate,
  info: "Recap what you achieved, what you want to see in their home care routine, and for the next visit, when you want to see them and what you'd like to do.",
  elements: [
    {
      id: 'toner',
      type: SectionElementTypes.checkbox,
      label: 'Toner',
      options: [
        {
          label: 'Multi-Active Toner',
          value: '1b818080-943f-4d51-9490-d7ad06f30bc6',
        },
        {
          label: 'Lavender Honey Mist',
          value: '9a6427da-a075-41f5-91bc-d2d6b2bef19b',
        },
        {
          label: 'Clear Cell Tonic',
          value: 'ec1a26cf-d61e-4a3f-b4ea-90c2b5224327',
        },
      ],
      mandatory: false,
    },
    {
      id: 'serum',
      type: SectionElementTypes.checkbox,
      label: 'Serum',
      options: [
        {
          label: 'Image Hyaluronic',
          value: 'ab9f2909-39d9-40a3-a488-30dc8370f8e6',
        },
        {
          label: 'Plant Stem Cell',
          value: 'c58faa46-9d77-44ca-8cca-1c542904ba98',
        },
        { label: 'Vitamin C', value: 'e1f6f4ef-caaa-46c2-baa3-d5970b178be1' },
        {
          label: 'Oatmeal Extract',
          value: 'bddf7ca2-cba0-4cf1-98d6-d53ac9a7477a',
        },
      ],
      mandatory: false,
    },
    {
      id: 'moisturizerAndSpf',
      type: SectionElementTypes.checkbox,
      label: 'Moisturizer & SPF',
      options: [
        {
          label: 'Bio-Peptide Cream',
          value: 'a3c1ed59-5e0e-4ef0-8781-6e1d316936c6',
        },
        {
          label: 'Calendula Cream',
          value: 'f1c73231-1811-457c-bec2-3a55be5c951a',
        },
        {
          label: 'Clear Skin Probiotic',
          value: '15fdbb97-3fcb-4fc9-9ed9-bc74cdb6d046',
        },
        { label: 'Skin Savior', value: '9d2226f0-2547-4f10-b18a-f0e65bb0b988' },
        { label: 'Gotu Kola', value: '11fb1794-b676-40a6-9134-2a84acb247a3' },
        {
          label: 'Prevention+ SPF 50',
          value: '4879cbb9-87cf-4db2-a85b-6f57b3a06176',
        },
        {
          label: 'Calendula SPF 30',
          value: 'ccde6c42-b622-4042-af85-2123e699d2a0',
        },
      ],
      mandatory: false,
    },
    {
      id: 'eyeAndLip',
      type: SectionElementTypes.checkbox,
      label: 'Eye & Lip',
      options: [
        {
          label: 'Argan Peptide Eye',
          value: '1f796895-1068-4804-95cf-3fb10024166f',
        },
        { label: 'Ormedic Lip', value: '63bc139a-69a8-4ae6-9915-c2628e150647' },
      ],
      mandatory: false,
    },
    {
      id: 'rehydrateBoost',
      type: SectionElementTypes.checkbox,
      label: 'Rehydrate Boost',
      options: [
        {
          label: 'BT Micro Serum',
          value: '1a9dbfdc-ba6a-4f79-b741-e7039f581954',
        },
        {
          label: 'High Frequency',
          value: '197483c8-801d-4002-bf31-042e9ff9fa4b',
        },
        {
          label: 'Chill Aromatherapy',
          value: 'f4d822b8-1e3d-4074-b80d-b76d071a3da0',
        },
      ],
      mandatory: false,
    },
  ],
};

export const TREATMENT_WRAP_UP: Section = {
  title: 'Treatment Wrap Up',
  icon: TreatmentWrapUp,
  elements: [
    {
      id: 'internalNotes',
      type: SectionElementTypes.textarea,
      label: 'Treatment Note',
      mandatory: false,
      info: 'For internal purposes only. This note will stay attached to the treatment record.',
    },
    {
      id: 'manage_client_preferences',
      type: SectionElementTypes.checkbox,
      label: 'Manage Key Attributes',
      mandatory: false,
      info: 'Track your client’s treatment preferences (e.g. likes extra skincare education).',
    },
  ],
};

export const TR_SECTIONS: Section[] = [
  {
    title: 'Skin Analysis',
    icon: SkinAnalysis,
    elements: [
      {
        id: 'skinType',
        type: SectionElementTypes.radio,
        label: 'Skin Type',
        note: '(choose one)',
        options: [
          {
            label: 'Combination',
            value: 'bc58aaa0-9eb4-409b-b128-2ad2056c34f6',
          },
          { label: 'Dry', value: 'f884f4ca-fdb3-472b-b774-b74089f61389' },
          { label: 'Normal', value: 'ba983b76-a17d-4627-8b11-21825921f1d6' },
          { label: 'Oily', value: '6521c76e-0b49-4a26-83b2-d4adb2a2c81f' },
          {
            label: 'Sensitive (Meets Atopic Triad)',
            value: 'fd294f5d-3798-4457-8d21-99c024506325',
          },
          { label: 'Acne', value: '0419bcc7-fa3a-4f6e-9dbe-2a2c03210973' },
        ],
        mandatory: true,
      },
      {
        id: 'conditions',
        type: SectionElementTypes.checkbox,
        label: 'Conditions',
        options: [
          {
            label: 'Blackheads',
            value: 'c42c44a1-bb5f-425e-b7a4-77662acbb5ba',
          },
          { label: 'Breakouts', value: 'ef427908-3204-4b8e-b088-aafdda557f5b' },
          {
            label: 'Dehydration',
            value: '25a57512-d5e1-4f1b-8a49-817e9d0570f8',
          },
          {
            label: 'Rough Texture',
            value: 'dec65e9e-bed2-45a5-a591-c3d2ddfd28f1',
          },
          {
            label: 'Hyperpigmentation',
            value: 'a88615d1-8567-4f1e-94ed-54dcf7b3c77f',
          },
          {
            label: 'Inflammation',
            value: 'bc4ee2b7-8154-48c3-9989-79a2203bdc33',
          },
          {
            label: 'Signs of Aging',
            value: '28bf5438-b546-4c26-9444-659fd686e9df',
          },
        ],
        mandatory: true,
      },
    ],
  },
  {
    title: 'Cleanse & Communicate',
    icon: CleanseCommunicate,
    info: 'The required start to all facials. Plan your facial and communicate it clearly and confidently so your client can relax and let you lead.',
    elements: [
      {
        id: 'topTreatmentFocus',
        type: SectionElementTypes.checkbox,
        label: 'Top Treatment Focuses',
        options: [
          {
            label: 'Moisturizing & Hydration',
            value: 'd7b1c2f5-2a4d-4304-9839-af574e560c68',
          },
          {
            label: 'Soothing Inflammation',
            value: '4859c05d-ac8a-4cc9-87ed-5f61351b8810',
          },
          {
            label: 'Clearing Congestion',
            value: 'f77e109b-5600-429f-be29-2ab004679cf2',
          },
          {
            label: 'Calming Breakouts',
            value: '46cc75e3-5025-4f5b-ae19-dfcb448e8196',
          },
          {
            label: 'Evening & Brightening',
            value: '43c3ae70-e7d8-4485-bcda-6a1d941c3440',
          },
          {
            label: 'Improving Signs of Aging',
            value: '9f1fb680-1cad-4022-b549-17c45ed94583',
          },
        ],
        mandatory: true,
        multiRequire: 3,
      },
      {
        id: 'cleanseBaseProduct',
        type: SectionElementTypes.checkbox,
        label: 'Cleanse Product(s)',
        options: [
          {
            label: 'Manuka Honey Balm',
            value: '9cf7849b-6d3d-415c-91fc-aaacb4a1ea74',
          },
          {
            label: 'Vitamin B Oil',
            value: '17033e35-e2e3-4437-a6f2-1fec15f54a8b',
          },
          { label: 'Vital C', value: '777bc47f-7735-42f4-bebf-ed79603564ff' },
          {
            label: 'Hydra Restore Cream',
            value: 'c31ef98a-ff92-4204-9932-5ac7e30fb423',
          },
          {
            label: 'Gentle Gel',
            value: 'ce92ecd6-c4c5-40c3-8532-b22b7fcc6a48',
          },
        ],
        mandatory: true,
      },
      {
        id: 'cleanseBoost',
        type: SectionElementTypes.checkbox,
        label: 'Cleanse Boost',
        options: [
          {
            label: 'Grapefruit Polish',
            value: '39c8c762-9479-41fc-af8a-6408ada7c9b6',
          },
          {
            label: 'Glycolic 15%',
            value: 'c05d10f7-d019-4e6a-b788-ae29f8b86cfa',
          },
          {
            label: 'Clear Skin 3%',
            value: '570c5e9c-acd5-41d8-94ff-ea6c5712b236',
          },
          {
            label: 'Oatmeal Powder',
            value: '7ce2a087-ee5d-4042-9382-d47149b8e049',
          },
          {
            label: 'Chill Aromatherapy',
            value: 'f4d822b8-1e3d-4074-b80d-b76d071a3da0',
          },
        ],
        mandatory: false,
      },
      {
        id: 'cleanseModality',
        type: SectionElementTypes.checkbox,
        label: 'Cleanse Modality',
        options: [
          {
            label: 'BT Micro Exfol',
            value: '80765484-f532-4ec7-91a9-8c155baf686a',
          },
        ],
        mandatory: false,
      },
    ],
  },
  CORE_BLOCK,
  TR_REHYDRATE_REACAP_SECTION,
  TREATMENT_WRAP_UP,
];

export const PAST_TR_SECTIONS: PastTreatment[] = [
  {
    title: 'Skin Analysis',
    icon: SkinAnalysis,
    elements: [
      {
        id: 'skinType',
        label: 'Skin Type',
        selectedOptions: '',
      },
      {
        id: 'conditions',
        label: 'Conditions',
        selectedOptions: '',
      },
    ],
  },
  {
    title: 'Cleanse & Communicate',
    icon: CleanseCommunicate,
    elements: [
      {
        id: 'topTreatmentFocus',
        label: 'Top Treatment Focuses',
        selectedOptions: '',
      },
      {
        id: 'cleanseBaseProduct',
        label: 'Cleanse Base Product',
        selectedOptions: '',
      },
      {
        id: 'cleanseModality',
        label: 'Cleanse Modality',
        selectedOptions: '',
      },
      {
        id: 'cleanseBoost',
        label: 'Cleanse Boost',
        selectedOptions: '',
      },
    ],
  },
  {
    title: 'Exfoliation Segment',
    icon: ExfoliationSegment,
    elements: [
      {
        id: 'exfoliationEnhancement',
        label: 'Exfoliation Enhancements',
        selectedOptions: '',
        elements: [
          {
            id: 'exfoliationDiamondTipMicroderm',
            label: 'Diamond Tip Microderm',
            selectedOptions: '',
            elements: [
              {
                id: 'exfoliationDtmWand',
                label: 'Wand',
                selectedOptions: '',
              },
              {
                id: 'exfoliationDtmSuctionRate',
                label: 'Suction Rate',
                selectedOptions: '',
              },
              {
                id: 'exfoliationDtmPasses',
                label: 'Passes',
                selectedOptions: '',
              },
            ],
          },
          {
            id: 'exfoliationHydroWandInfusion',
            label: 'Hydro Wand Infusion',
            selectedOptions: '',
            elements: [
              {
                id: 'exfoliationHwiWandProduct',
                label: 'Wand Product',
                selectedOptions: '',
              },
              {
                id: 'exfoliationHwiTreatmentSerum',
                label: 'Treatment Serum',
                selectedOptions: '',
              },
              {
                id: 'exfoliationHwiSuctionRate',
                label: 'Suction Rate',
                selectedOptions: '',
              },
            ],
          },
          {
            id: 'exfoliationHydroWandMicroderm',
            label: 'Hydro Wand Microderm',
            selectedOptions: '',
            elements: [
              {
                id: 'exfoliationHwmWandProduct',
                label: 'Wand Product',
                selectedOptions: '',
              },
              {
                id: 'exfoliationHwmSuctionRate',
                label: 'Suction Rate',
                selectedOptions: '',
              },
              {
                id: 'exfoliationHwmPasses',
                label: 'Passes',
                selectedOptions: '',
              },
            ],
          },
          {
            id: 'exfoliationPeel',
            label: 'Peel',
            selectedOptions: '',
            elements: [
              {
                id: 'exfoliationPeelProduct',
                label: 'Peel Product',
                selectedOptions: '',
              },
              {
                id: 'exfoliationPeelLayers',
                label: 'Peel Layers',
                selectedOptions: '',
              },
              {
                id: 'exfoliationPeelTimeOnSkin',
                label: 'Time on Skin',
                selectedOptions: '',
              },
            ],
          },
        ],
      },
      {
        id: 'exfoliationBaseProduct',
        label: 'Exfoliation Base Product',
        selectedOptions: '',
      },
      {
        id: 'exfoliationBoost',
        label: 'Exfoliation Boost',
        selectedOptions: '',
      },
      {
        id: 'exfoliationModality',
        label: 'Exfoliation Modality',
        selectedOptions: '',
      },
    ],
  },
  {
    title: 'Extractions Segment',
    icon: ExtractionSegment,
    elements: [
      {
        id: 'extractionsPrepProducts',
        label: 'Extractions Prep Product',
        selectedOptions: '',
      },
      {
        id: 'extractionsBoost',
        label: 'Extractions Boost',
        selectedOptions: '',
      },
      {
        id: 'extractionsZone',
        label: 'Extractions Zone',
        selectedOptions: '',
      },
      {
        id: 'extractionsModality',
        label: 'Extractions Modality',
        selectedOptions: '',
      },
      {
        id: 'extractionsPostProducts',
        label: 'Extractions Post Products',
        selectedOptions: '',
      },
    ],
  },
  {
    title: 'Touch Point Segment',
    icon: TouchPointSegment,
    elements: [
      {
        id: 'touchPointMassageMedium',
        label: 'Touch Point Massage Medium',
        selectedOptions: '',
      },
      {
        id: 'touchPointBoost',
        label: 'Touch Point Boost',
        selectedOptions: '',
      },
      {
        id: 'touchPointTouch',
        label: 'Touch Point Touch',
        selectedOptions: '',
      },
      {
        id: 'touchPointModality',
        label: 'Touch Point Modality',
        selectedOptions: '',
      },
    ],
  },
  {
    title: 'Mask Segment',
    icon: MaskSegment,
    elements: [
      {
        id: 'maskEnhancements',
        label: 'Mask Enhancements',
        selectedOptions: '',
        elements: [
          {
            id: 'maskHwiWand',
            label: 'Hydro Wand Infusion',
            selectedOptions: '',
            elements: [
              {
                id: 'maskHwiWandProduct',
                label: 'Wand Product',
                selectedOptions: '',
              },
              {
                id: 'maskHwiTreatmentSerum',
                label: 'Treatment Serum (choose up to 2)',
                selectedOptions: '',
              },
              {
                id: 'maskHwiSuctionRate',
                label: 'Suction Rate',
                selectedOptions: '',
              },
            ],
          },
          {
            id: 'maskLedPanel',
            label: 'LED Panel',
            selectedOptions: '',
            elements: [
              {
                id: 'maskLedPanelBoost',
                label: 'LED Panel Boost',
                selectedOptions: '',
              },
              {
                id: 'maskLedPanelTime',
                label: 'LED Panel Time',
                selectedOptions: '',
              },
            ],
          },
          {
            id: 'maskMicrocurrent',
            label: 'Microcurrent',
            selectedOptions: '',
            elements: [
              {
                id: 'maskMicrocurrentProgramLpi',
                label: 'Microcurrent Program LPI',
                selectedOptions: '',
              },
              {
                id: 'maskMicrocurrentProgramSpi',
                label: 'Microcurrent Program SPI',
                selectedOptions: '',
              },
              {
                id: 'maskMicrocurrentProduct',
                label: 'Microcurrent Product',
                selectedOptions: '',
              },
              {
                id: 'maskMicrocurrentSerum',
                label: 'Microcurrent Serum',
                selectedOptions: '',
              },
              {
                id: 'maskMicrocurrentTreatmentTime',
                label: 'Microcurrent Treatment Time',
                selectedOptions: '',
              },
            ],
          },
          {
            id: 'maskNanoinfusion',
            label: 'Nano Infusion',
            selectedOptions: '',
            elements: [
              {
                id: 'maskNanoinfusionDeviceUsed',
                label: 'device used',
                selectedOptions: '',
              },
              {
                id: 'maskNanoinfusionSerumUsed',
                label: 'Serum Used',
                selectedOptions: '',
              },
              {
                id: 'maskNanoinfusionMaskUsed',
                label: 'Mask Used',
                selectedOptions: '',
              },
              {
                id: 'maskNanoinfusionStitchDepthFcc',
                label: 'Stitch depth for forehead, cheeks, and chin',
                selectedOptions: '',
              },
              {
                id: 'maskNanoinfusionSpeedFcc',
                label: 'Speed for forehead, cheeks, and chin',
                selectedOptions: '',
              },
              {
                id: 'maskNanoinfusionStitchDepthNe',
                label: 'Stitch depth for nose and eyes',
                selectedOptions: '',
              },
              {
                id: 'maskNanoinfusionSpeedNe',
                label: 'Speed for nose and eyes',
                selectedOptions: '',
              },
            ],
          },
        ],
      },
      {
        id: 'maskBaseProduct',
        label: 'Mask Base Product',
        selectedOptions: '',
      },
      {
        id: 'maskBoost',
        label: 'Mask Boost',
        selectedOptions: '',
      },
      {
        id: 'maskModality',
        label: 'Mask Modality',
        selectedOptions: '',
      },
    ],
  },
  {
    title: 'Targeted Therapy Segment',
    icon: TargetedTherapySegment,
    elements: [
      {
        id: 'targetedTherapyEnhancements',
        label: 'Targeted Therapy  Enhancements',
        selectedOptions: '',
        elements: [
          {
            id: 'targetedTherapyLedPanel',
            label: 'LED Panel',
            selectedOptions: '',
            elements: [
              {
                id: 'targetedTherapyLedPanelBoost',
                label: 'LED Panel Boost',
                selectedOptions: '',
              },
              {
                id: 'targetedTherapyLedPanelTime',
                label: 'LED Panel Time',
                selectedOptions: '',
              },
            ],
          },
          {
            id: 'targetedTherapyMicrocurrent',
            label: 'Microcurrent',
            selectedOptions: '',
            elements: [
              {
                id: 'targetedTherapyMicrocurrentProgramLpi',
                label: 'Microcurrent Program LPI',
                selectedOptions: '',
              },
              {
                id: 'targetedTherapyMicrocurrentProgramSpi',
                label: 'Microcurrent Program SPI',
                selectedOptions: '',
              },
              {
                id: 'targetedTherapyMicrocurrentProduct',
                label: 'Microcurrent Product',
                selectedOptions: '',
              },
              {
                id: 'targetedTherapyMicrocurrentSerum',
                label: 'Microcurrent Serum',
                selectedOptions: '',
              },
              {
                id: 'targetedTherapyMicrocurrentTreatmentTime',
                label: 'Microcurrent Treatment Time',
                selectedOptions: '',
              },
            ],
          },
          {
            id: 'targetedTherapyNanoInfusion',
            label: 'Nano Infusion',
            selectedOptions: '',
            elements: [
              {
                id: 'targetedTherapyNanoinfusionDeviceUsed',
                label: 'Device Used',
                selectedOptions: '',
              },
              {
                id: 'targetedTherapyNanoinfusionSerumUsed',
                label: 'Serum Used',
                selectedOptions: '',
              },
              {
                id: 'targetedTherapyNanoinfusionMaskUsed',
                label: 'Mask Used',
                selectedOptions: '',
              },
              {
                id: 'targetedTherapyNanoinfusionStitchDepthFcc',
                label: 'Stitch depth for forehead, cheeks, and chin',
                selectedOptions: '',
              },
              {
                id: 'targetedTherapyNanoinfusionSpeedFcc',
                label: 'Speed for forehead, cheeks, and chin',
                selectedOptions: '',
              },
              {
                id: 'targetedTherapyNanoinfusionStitchDepthNe',
                label: 'Stitch depth for nose and eyes',
                selectedOptions: '',
              },
              {
                id: 'targetedTherapyNanoinfusionSpeedNe',
                label: 'Speed for nose and eyes',
                selectedOptions: '',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'SOS Treatment',
    icon: SOSTreatment,
    elements: [
      {
        id: 'sosBaseProduct',
        label: 'SOS Base Product',
        selectedOptions: '',
      },
      {
        id: 'sosSerum',
        label: 'SOS Serum',
        selectedOptions: '',
      },
      {
        id: 'sosHydration',
        label: 'SOS Hydration',
        selectedOptions: '',
      },
    ],
  },
  {
    title: 'Rehydrate & Recap',
    icon: RecapRehydrate,
    elements: [
      {
        id: 'toner',
        label: 'Toner',
        selectedOptions: '',
      },
      {
        id: 'serum',
        label: 'Serum',
        selectedOptions: '',
      },
      {
        id: 'moisturizerAndSpf',
        label: 'Moisturizer & SPF',
        selectedOptions: '',
      },
      {
        id: 'eyeAndLip',
        label: 'Eye & Lip',
        selectedOptions: '',
      },
      {
        id: 'rehydrateBoost',
        label: 'Rehydrate Boost',
        selectedOptions: '',
      },
    ],
  },
  {
    title: 'Treatment Wrap Up',
    icon: TreatmentWrapUp,
    elements: [
      {
        id: 'internalNotes',
        type: 'general_notes',
        label: 'Treatment Note',
        selectedOptions: '',
      },
      {
        id: 'generalNotes',
        label: 'Key Attributes Added',
        selectedOptions: '',
      },
    ],
  },
  /* API Integration pending for below till this part needed commented */
  {
    title: 'Client Follow-Up',
    icon: SkinAnalysis,
    elements: [
      {
        id: 'nextTimeEnhancement',
        label: 'Enhancement Suggestions for Next Time',
        selectedOptions: '',
      },
      {
        id: 'clientMessage',
        type: 'note_for_customer',
        label: 'Message to Client',
        selectedOptions: '',
      },
    ],
    product: [],
  },
];

export const AUTO_SAVE_MESSAGE = 'Changes auto saved';
export const AUTO_SAVE_INTERVAL = 5000;

export const CLIENT_PREFERENCES_CATEGORIES: ClientPreferencesCategory[] = [
  {
    cp_category_id: 'communication',
    cp_category_title: 'Communication',
  },
  {
    cp_category_id: 'preferences',
    cp_category_title: 'Preferences',
  },
  {
    cp_category_id: 'comfort',
    cp_category_title: 'Comfort',
  },
  {
    cp_category_id: 'touch',
    cp_category_title: 'Touch',
  },
  {
    cp_category_id: 'other',
    cp_category_title: 'Other',
  },
];

export const CLIENT_PREFERENCES: ClientPreference[] = [
  {
    cp_id: 'cp_1',
    cp_category_id: 'communication',
    icon: Pref1,
    cp_label: 'Enjoys Conversation',
    selected: true,
    showOnCoreSegments: false,
  },
  {
    cp_id: 'cp_2',
    cp_category_id: 'communication',
    icon: Pref2,
    cp_label: 'Peace & Quiet',
    selected: false,
    showOnCoreSegments: false,
  },
  {
    cp_id: 'cp_3',
    cp_category_id: 'communication',
    icon: Pref3,
    cp_label: 'Extra Skincare Education',
    selected: true,
    showOnCoreSegments: false,
  },
  {
    cp_id: 'cp_4',
    cp_category_id: 'preferences',
    icon: Pref4,
    cp_label: 'Avoid Bright Lights',
    selected: true,
    showOnCoreSegments: true,
  },
  {
    cp_id: 'cp_5',
    cp_category_id: 'preferences',
    icon: Pref5,
    cp_label: 'Avoid Strong Aromas',
    selected: false,
    showOnCoreSegments: false,
  },
  {
    cp_id: 'cp_6',
    cp_category_id: 'preferences',
    icon: Pref6,
    cp_label: 'Avoid Strong Heat',
    selected: true,
    showOnCoreSegments: false,
  },
  {
    cp_id: 'cp_7',
    cp_category_id: 'comfort',
    icon: Pref7,
    cp_label: 'Chair Positioning',
    selected: true,
    showOnCoreSegments: false,
  },
  {
    cp_id: 'cp_8',
    cp_category_id: 'comfort',
    icon: Pref8,
    cp_label: 'Limited Mobility',
    selected: false,
    showOnCoreSegments: false,
  },
  {
    cp_id: 'cp_9',
    cp_category_id: 'comfort',
    icon: Pref9,
    cp_label: 'Claustrophobic',
    selected: true,
    showOnCoreSegments: true,
  },
  {
    cp_id: 'cp_10',
    cp_category_id: 'comfort',
    icon: Pref10,
    cp_label: 'Likes a Blanket',
    selected: false,
    showOnCoreSegments: false,
  },

  {
    cp_id: 'cp_11',
    cp_category_id: 'touch',
    icon: Pref11,
    cp_label: 'Likes Touchpoint',
    selected: true,
    showOnCoreSegments: true,
  },
  {
    cp_id: 'cp_12',
    cp_category_id: 'touch',
    icon: Pref12,
    cp_label: 'Light Pressure',
    selected: true,
    showOnCoreSegments: true,
  },
  {
    cp_id: 'cp_13',
    cp_category_id: 'touch',
    icon: Pref13,
    cp_label: 'Heavy Pressure',
    selected: false,
    showOnCoreSegments: true,
  },
  {
    cp_id: 'cp_14',
    cp_category_id: 'other',
    icon: Pref14,
    cp_label: 'Avoid Eyelashes',
    selected: false,
    showOnCoreSegments: false,
  },
  {
    cp_id: 'cp_15',
    cp_category_id: 'other',
    icon: Pref15,
    cp_label: 'Avoid Brows',
    selected: false,
    showOnCoreSegments: false,
  },
  {
    cp_id: 'cp_16',
    cp_category_id: 'other',
    icon: Pref16,
    cp_label: 'Avoid Hair',
    selected: false,
    showOnCoreSegments: false,
  },
  {
    cp_id: 'cp_17',
    cp_category_id: 'other',
    icon: Pref17,
    cp_label: 'Extraction-Focused',
    selected: false,
    showOnCoreSegments: true,
  },
  {
    cp_id: 'cp_18',
    cp_category_id: 'other',
    icon: Pref18,
    cp_label: 'Time-Focused',
    selected: false,
    showOnCoreSegments: false,
  },
];

export const APPOINTMENT_METRICS: Metric[] = [
  {
    title: 'Appointment count',
    key: 'appointmentsCount',
    label: 'APTS',
    value: '0',
    info: 'Number of completed appointments',
  },
  {
    title: 'Last appointment date',
    key: 'lastVisit',
    label: 'LAST VISIT',
    value: '--',
    info: 'Date of last completed appointment',
  },
  {
    title: 'Enhancement attachment Rate',
    key: 'enhancementRate',
    label: 'ENHAN RT',
    value: '--',
    info: 'Number of appointments with 1 or more enhancements divided by the total number of completed appointments',
  },
  {
    title: 'Product attachment rate',
    key: 'productAttritionRate',
    label: 'PROD ATT RT',
    value: '--',
    info: 'Number of transactions with both service and product purchases divided by the total number of completed appointments',
  },
];

export const PROFILE_TAGS: ProfileTag[] = [
  { label: 'Member', icon: MemberSVG },
  { label: 'Employee', icon: EmployeeSVG },
  { label: 'Vaccinated', icon: VaccineSVG },
  { label: 'friends & family', icon: EmojiLovedSVG },
  { label: 'Vax exemption', icon: VaxExemption1SVG },
  { label: 'Vax exemption', icon: VaxExemption2SVG },
];

export const ENHANCEMENT_RECOMMENDATIONS: EnhancementRecommendation[] = [
  {
    er_id: 'er_1',
    icon: ER_1,
    er_label: 'Gua Sha',
    selected: true,
  },
  {
    er_id: 'er_2',
    icon: ER_2,
    er_label: 'Light Therapy',
    selected: false,
  },
  {
    er_id: 'er_1',
    icon: ER_3,
    er_label: 'Microderm',
    selected: false,
  },
  {
    er_id: 'er_1',
    icon: ER_4,
    er_label: 'Peel',
    selected: false,
  },
];

export const QUESTION_LABELS: QuestionLabel = {
  seasonalAllergies: 'Do you experience seasonal allergies?',
  topicalAlergies: 'Do you have any topical allergies?',
  topicalAlergiesAdditionalResp: '',
  rednesOrBurning:
    'Do you ever experience redness, burning, or itching on your skin?',
  accutaneIsotretinoin:
    'Are you currently taking or have you taken Accutane/Isotretinoin?',
  rx_medications: 'Are you taking any of the following Rx medications?',
  rxTopicals: 'Rx Topicals',
  hormoneConsiderations: 'Should we take these into considerations?',
  diagnoses: 'Have you been diagnosed with any of these conditions?',
  electricity: 'Do you currently have any of these?',
  facialSurgery: 'Have you had facial surgery within the last 6 months?',
  skincareKnowledge: 'Skincare Knowledge Rating',
  atHomeProducts: 'At home products',
  activeIngredients: 'Active ingredients',
  gender: 'What gender do you identify with?',
  birthday: "When's your Birthday?",
  zipCode: "What's your zip code?",
  source: 'How did you hear about Heyday?',
  breakouts: 'How would you describe your history with breakouts?',
  oilyShine: 'Do you ever experience an oily shine?',
  facialFrequency: 'Ever had a facial?',
};

export const SKIN_PROFILE_SECTIONS: SkinProfileSectionType[] = [
  {
    sectionID: 'summary',
    sectionTitle: 'Summary',
  },
  {
    sectionID: 'sensitivities',
    sectionTitle: 'Sensitivities',
    sectionIcon: SPSensitivities,
    sectionQuestions: [
      {
        id: 'seasonalAllergies',
        questionTitle: 'Seasonal allergies',
        label: QUESTION_LABELS.seasonalAllergies,
        questionType: SkinProfileQuestionTypes.radio,
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
        mandatory: true,
        summaryIcon: Leaf,
      },
      {
        id: 'topicalAlergies',
        questionTitle: 'Topical Allergies',
        label: QUESTION_LABELS.topicalAlergies,
        includeOtherVal: INTAKE_DEFAULT_OTHER,
        questionType: SkinProfileQuestionTypes.checkbox,
        note: '(Select all that apply)',
        options: [
          { label: 'Nuts', value: 'nuts' },
          { label: 'Fruit', value: 'fruit' },
          { label: 'Soy', value: 'soy' },
          { label: 'Seeds', value: 'seeds' },
          { label: 'Algae', value: 'algae' },
          { label: 'Salicylic Acid', value: 'salicylicAcid' },
          { label: 'Beeswax', value: 'beeswax' },
          { label: 'Aspirin', value: 'aspirin' },
          { label: 'Other Topical Allergies', value: 'other' },
          { label: 'None', value: 'none' },
        ],
        otherField: '',
        mandatory: true,
        summaryIcon: WarningCircle,
      },
      {
        id: 'rednesOrBurning',
        questionTitle: 'Redness / Burning',
        label: QUESTION_LABELS.rednesOrBurning,
        questionType: SkinProfileQuestionTypes.radio,
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
        mandatory: true,
        summaryIcon: Fire,
      },
      {
        id: 'accutaneIsotretinoin',
        questionTitle: 'Accutane / Isotretinoin',
        label: QUESTION_LABELS.accutaneIsotretinoin,
        questionType: SkinProfileQuestionTypes.radio,
        options: [
          { label: 'Yes', value: 'currentlyTaking' },
          {
            label: 'Stopped within the last 6 months',
            value: 'stoppedLast6Months',
          },
          { label: 'Stopped over 6 months ago', value: 'stoppedOver6Months' },
          { label: 'No', value: 'no' },
        ],
        mandatory: true,
        summaryIcon: CirclesThree,
      },
      {
        id: 'rx_medications',
        questionTitle: 'RX Oral Medications',
        label: QUESTION_LABELS.rx_medications,
        questionType: SkinProfileQuestionTypes.checkbox,
        options: [
          { label: 'Oral Antibiotics', value: 'oralAntibiotics' },
          { label: 'Topical Antibiotics', value: 'topicalAntibiotics' },
          { label: 'Steroids', value: 'steroids' },
          { label: 'Antifungals', value: 'antiFungals' },
          { label: 'Antivirals', value: 'antiVirals' },
          { label: 'Immunosuppressants', value: 'immunosuppressants' },
          { label: 'Blood Thinners', value: 'bloodThinners' },
          { label: 'None', value: 'none' },
        ],
        mandatory: true,
        summaryIcon: rxBottle,
      },
      {
        id: 'rxTopicals',
        questionTitle: 'RX topicals',
        label: QUESTION_LABELS.rxTopicals,
        includeOtherVal: INTAKE_YES,
        questionType: SkinProfileQuestionTypes.radio,
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
        otherField: '',
        mandatory: true,
        summaryIcon: prescription,
      },
      {
        id: 'hormoneConsiderations',
        questionTitle: 'Hormone Considerations',
        label: QUESTION_LABELS.hormoneConsiderations,
        questionType: SkinProfileQuestionTypes.checkbox,
        note: '(Select all that apply)',
        options: [
          {
            label: 'Pregnancy-Safe Products / Nursing',
            value: 'pregnancySafe',
          },
          { label: 'Hormone Therapy', value: 'hormoneTherapy' },
          { label: 'Birth Control', value: 'birthControl' },
          { label: 'None', value: 'none' },
        ],
        mandatory: true,
        summaryIcon: Baby,
      },
      {
        id: 'diagnoses',
        questionTitle: 'Diagnoses',
        label: QUESTION_LABELS.diagnoses,
        note: '(Select all that apply)',
        questionType: SkinProfileQuestionTypes.checkbox,
        options: [
          { label: 'Rosacea', value: 'rosacea' },
          { label: 'Asthma', value: 'asthma' },
          { label: 'Eczema', value: 'eczema' },
          { label: 'Epilepsy', value: 'epilepsy' },
          { label: 'Diabetes', value: 'diabetes' },
          { label: 'Current or Recent Cancer Treatment', value: 'cancer' },
          { label: 'None', value: 'none' },
        ],
        mandatory: true,
        summaryIcon: Atom,
      },
      {
        id: 'electricity',
        questionTitle: 'Electricity',
        label: QUESTION_LABELS.electricity,
        note: '(Select all that apply)',
        questionType: SkinProfileQuestionTypes.checkbox,
        options: [
          { label: 'Pacemaker', value: 'pacemaker' },
          { label: 'Metal Implants', value: 'metalImplants' },
          { label: 'Facial Piercings', value: 'facialPiercings' },
          { label: 'None', value: 'none' },
        ],
        mandatory: true,
        summaryIcon: Heartbeat,
      },
      {
        id: 'facialSurgery',
        questionTitle: 'Facial surgery',
        label: QUESTION_LABELS.facialSurgery,
        questionType: SkinProfileQuestionTypes.radio,
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
        mandatory: true,
        summaryIcon: Robot,
      },
    ],
  },
  {
    sectionID: 'oil-activity',
    sectionTitle: 'Oil Activity',
    sectionIcon: SPOilAcitivity,
    sectionQuestions: [
      {
        id: 'oilyShine',
        questionTitle: 'Oily shine',
        label: QUESTION_LABELS.oilyShine,
        questionType: SkinProfileQuestionTypes.radio,
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
          { label: 'Occasionally', value: 'occasionally' },
        ],
        mandatory: true,
        summaryIcon: Robot,
      },
      {
        id: 'breakouts',
        questionTitle: 'Breakouts',
        label: QUESTION_LABELS.breakouts,
        note: '(Select all that apply)',
        questionType: SkinProfileQuestionTypes.checkbox,
        options: [
          { label: 'I rarely experience breakouts', value: 'rarelyExperience' },
          {
            label: 'I frequently experience breakouts',
            value: 'frequentlyExperience',
          },
          {
            label: 'I experience breakouts on my chest and back',
            value: 'chestAndBack',
          },
          {
            label: 'I have experienced breakouts since puberty',
            value: 'experiencedSincePuberty',
          },
          { label: 'Breakouts run in my family', value: 'runInFamily' },
        ],
        mandatory: true,
        summaryIcon: Robot,
      },
    ],
  },
  {
    sectionID: 'skincare-background',
    sectionTitle: 'Skincare Background',
    altSectionTitle: 'You + Skincare',
    sectionIcon: SPSkincare,
    sectionQuestions: [
      {
        id: 'facialFrequency',
        questionTitle: 'Facial frequency',
        label: QUESTION_LABELS.facialFrequency,
        questionType: SkinProfileQuestionTypes.radio,
        options: [
          { label: 'First time getting a facial!', value: 'firstTime' },
          { label: 'Yes, but not regularly!', value: 'yes' },
          { label: 'Frequently', value: 'frequently' },
        ],
        mandatory: true,
        summaryIcon: Robot,
      },
      {
        id: 'skincareKnowledge',
        questionTitle: 'Skincare knowledge',
        label: QUESTION_LABELS.skincareKnowledge,
        questionType: SkinProfileQuestionTypes.radio,
        options: [
          { label: 'Newbie', value: 'newbie' },
          { label: 'Pretty good', value: 'prettyGood' },
          { label: 'Savvy', value: 'savvy' },
        ],
        mandatory: true,
        summaryIcon: Robot,
      },
      {
        id: 'atHomeProducts',
        questionTitle: 'At home products',
        label: QUESTION_LABELS.atHomeProducts,
        questionType: SkinProfileQuestionTypes.checkbox,
        options: [
          { label: 'Cleanser', value: 'cleanser' },
          { label: 'Exfoliant', value: 'exfoliant' },
          { label: 'Mask', value: 'mask' },
          { label: 'Toner', value: 'toner' },
          { label: 'Serum', value: 'serum' },
          { label: 'Moisturizer', value: 'moisturizer' },
          { label: 'Eye Cream', value: 'eyeCream' },
          { label: 'Facial Oil', value: 'facialOil' },
          { label: 'Sunscreen', value: 'sunscreen' },
        ],
        mandatory: true,
        summaryIcon: Robot,
      },
      {
        id: 'activeIngredients',
        questionTitle: 'Active ingredients',
        label: QUESTION_LABELS.activeIngredients,
        questionType: SkinProfileQuestionTypes.radio,
        options: [{ label: 'Yes', value: 'yes' }],
        mandatory: true,
        summaryIcon: Robot,
      },
    ],
  },
  {
    sectionID: 'basics',
    sectionTitle: 'Basics',
    sectionIcon: SPBasic,
    sectionQuestions: [
      {
        id: 'birthday',
        questionTitle: 'Birthday',
        label: QUESTION_LABELS.birthday,
        questionType: SkinProfileQuestionTypes.date,
        mandatory: true,
        defaultError: 'Date format should be mm/dd/yyyy',
      },
      {
        id: 'zipCode',
        questionTitle: 'Zip code',
        label: QUESTION_LABELS.zipCode,
        questionType: SkinProfileQuestionTypes.zipcode,
        mandatory: true,
        defaultError: 'Must be a valid U.S. zip code',
        additionalLabel: 'I live outside the US',
        additionalLabelResponse: OUTSIDE_US,
      },
      {
        id: 'gender',
        questionTitle: 'Gender',
        label: QUESTION_LABELS.gender,
        questionType: SkinProfileQuestionTypes.radio,
        options: [
          { label: 'Female', value: 'female' },
          { label: 'Male', value: 'male' },
          { label: 'Non-binary', value: 'nonBinary' },
          { label: 'Not listed', value: 'notListed' },
          { label: 'Would prefer not to answer', value: 'noAnswer' },
        ],
        mandatory: true,
      },
      {
        id: 'source',
        questionTitle: 'Source',
        label: QUESTION_LABELS.source,
        questionType: SkinProfileQuestionTypes.checkbox,
        options: [
          { label: 'Friend or Colleague', value: 'friendOrColleague' },
          {
            label: 'Print or Digital Publication',
            value: 'digitalPublication',
          },
          { label: 'An Influencer', value: 'influencer' },
          { label: 'Social Media', value: 'socialMedia' },
          { label: 'Google', value: 'google' },
          { label: 'Walked by the shop', value: 'walkIn' },
          { label: 'An event Heyday was at', value: 'event' },
        ],
        mandatory: true,
      },
    ],
  },
];

export const calendarColors = [
  {
    color: 'var(--sky-75)',
    alpha: 'var(--sky-33)',
  },
  {
    color: 'var(--positive-primary)',
    alpha: 'var(--positive-primary-33)',
  },
  {
    color: 'var(--honey-75)',
    alpha: 'var(--honey-33)',
  },
  {
    color: 'var(--turmeric-100)',
    alpha: 'var(--turmeric-33)',
  },
  {
    color: 'var(--neutral-tertiary-darker)',
    alpha: 'var(--neutral-tertiary-darker-33)',
  },
  {
    color: 'var(--peony-75)',
    alpha: 'var(--peony-33)',
  },
  {
    color: 'var(--pomegranate-100)',
    alpha: 'var(--pomegranate-33)',
  },
  {
    color: 'var(--lavender-100)',
    alpha: 'var(--lavender-33)',
  },
];

export const ADDITIONAL_RESPONSE = 'AdditionalResp';
export const DATE_FORMAT = 'MMM D, YYYY @ hA';
export const DATE_FORMAT_WITHOUT_TIME = 'MMM D, YYYY';
export const INVALID_PRODUCT_VARIANT_ID =
  "'00000000-0000-0000-0000-000000000000'";

export const TYPES: FilterType[] = [
  {
    id: 'front',
    label: 'All Front Bar',
    name: 'All Front Bar',
  },
  {
    id: 'back',
    label: 'All Back Bar',
    name: 'All Back Bar',
  },
];

export const PRODUCTS: FilterType[] = [
  {
    id: 'nut',
    label: 'Nut',
    name: 'Nut',
  },
  {
    id: 'fruit',
    label: 'Fruit',
    name: 'Fruit',
  },
  {
    id: 'soy',
    label: 'Soy',
    name: 'Soy',
  },
  {
    id: 'seed',
    label: 'Seed',
    name: 'Seed',
  },
  {
    id: 'algae',
    label: 'Algae',
    name: 'Algae',
  },
  {
    id: 'salicylicates',
    label: 'Salicylicates',
    name: 'Salicylicates',
  },
  {
    id: 'beeswax',
    label: 'Beeswax',
    name: 'Beeswax',
  },
];

export const KNACK_DATA_KEYS = [
  'treatedBy',
  'appointmentTime',
  'skinType',
  'conditions',
  'generalNotes',
  'treatmentType',
  'topTreatmentFocus',
  'cleanseBaseProduct',
  'cleanseBoost',
  'cleanseModality',
  'exfoliationBaseProduct',
  'exfoliationBoost',
  'exfoliationModality',
  'exfoliationEnhancement',
  'microdermSuctionRate',
  'microdermPasses',
  'peelProduct',
  'peelLayers',
  'peelTimeOnSkin',
  'extractionsPrepProducts',
  'extractionsBoost',
  'extractionsZone',
  'extractionsModality',
  'extractionsPostProducts',
  'touchPointBaseProduct',
  'touchPointBoost',
  'touchPointModality',
  'touchPointEnhancement',
  'maskBaseProduct',
  'maskBoost',
  'maskModality',
  'maskZoneSpecificDetails',
  'targetedTherapyEnhancements',
  'ledPanelTime',
  'ledPanelBoost',
  'toner',
  'serum',
  'moisturizerAndSpf',
  'eyeAndLip',
  'rehydrateBoost',
  'enhMicroderm',
  'enhPeel',
  'currentTreatmentFocus',
  'nextTimeEnhancement',
  'noteForCustomer',
  'products',
  'locationName',
];

export const LOCAL_STORAGE_KEYS = {
  LOGGED_IN_STAFF_BOULEVARD_ID: 'logged_in_staff_boulevard_id',
  LOGGED_IN_STAFF_STAFF_ID: 'logged_in_staff_staff_id',
  LOGGED_IN_STAFF_LOCATIONS: 'logged_in_staff_locations',
  SELECTED_LOCATION_ID: 'selected_location_id',
  STAFF_FOR_LOCATION_ID: 'staff_for_location_id',
  STAFF_SHIFT_FOR_LOCATION_ID: 'staff_shift_for_location_id',
  S3_HEALTH_INTAKE: 's3_health_intake',
  S3_TREATMENT_JSON: 's3_treatment_json',
};

export const FORMAT_DATE = {
  DAY: 'YYYY-MM-DD',
  DISPLAY_DAY: 'MM/DD/YYYY',
  DAY_BY_MONTH: 'MMM DD, YYYY',
  FULL_DATE: 'MMM DD, YYYY @ hA',
  DAY_LOWER: 'yyyy-MM-dd',
  TIME_MIN: 'h:mma',
  TIME: 'h:mmaaa',
  TIME_CAPITAL: 'h:mm aaa',
};

export const PARSE_DATE = {
  TIME: 'hh:mm a',
  TIME_24: 'HH:mm:ss',
};

export const APPOINTMENT_STATES = {
  CANCELLED: 'CANCELLED',
  BOOKED: 'BOOKED',
  ACTIVE: 'ACTIVE',
  CONFIRMED: 'CONFIRMED',
  ARRIVED: 'ARRIVED',
  FINAL: 'FINAL',
};

export const UTC_OFFSETS: iUTCOffset = {
  'america/new_york': 4,
  'america/chicago': 5,
  'america/los_angeles': 7,
};

export const DEFAULT_TIMEZONE = 'America/Los_Angeles';

export const NOT_REQUIRED_FORMSTATE_KEYS = [
  'errors',
  'client_message',
  'clientMessage',
  'knackId',
  'customerId',
  'sourceCustomerId',
  'locationId',
  'enteredBy',
  'sourceEnteredBy',
  'sourceTreatedBy',
  'appointmentTime',
  'createdAt',
  'generalNotes',
  'groupAppointment',
  'currentTreatmentCount',
  'internalNotes',
  'skinRecommendationNote',
  'nextTrTimeframe',
  'noteForCustomer',
  'appointmentId',
  'healthInfoSnapshot',
  'pastTreatmentData',
  'createdAt',
  'appointment',
  'accutane',
  'customerBookerId',
  'paymentStatus',
  'btMicroDesc',
  'btMicro',
  'firstTreatment',
  'revenue',
  'otherFocusNextTime',
  'focusNextTime',
  'otherFocus',
  'currentTreatmentFocus',
  'note',
  'location',
  'customer',
  'treated_by_staff',
  'maskZoneSpecificDetails',
  'entered_by_staff',
  'treatmentByStaff',
  'enteredByStaff',
];

export enum PRODUCT_TYPE {
  backBar = 'back',
  frontBar = 'front',
  both = 'both',
}

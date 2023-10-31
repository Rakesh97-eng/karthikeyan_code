import { object, string, array, bool } from 'yup';

export const treatmentRecordSchema = object().shape({
  skinType: string().required('Skin Type').nullable(true),
  conditions: array(string())
    .required('Conditions')
    .min(1, 'Conditions')
    .nullable(true),
  topTreatmentFocus: array(string())
    .required('Top Treatment Focus')
    .min(1, 'Top Treatment Focus')
    .max(3, 'Top Treatment Focus')
    .nullable(true)
    .transform((v) => (v === null ? [] : v)),
  cleanseBaseProduct: array(string())
    .required('Cleanse Base Products')
    .min(1, 'Cleanse Base Products')
    .nullable(true)
    .transform((v) => (v === null ? [] : v)),
  exfoliationSegment: bool().nullable(),
  exfoliationEnhancement: array(string()).nullable(),
  exfoliationDtmWand: array(string())
    .when('exfoliationEnhancement', {
      is: (exfoliationEnhancement: string[]) =>
        exfoliationEnhancement?.includes('Diamond Tip Microderm — $80'),
      then: array(string())
        .required('Exfoliation Enhancements Wand')
        .min(1, 'Exfoliation Enhancements Wand'),
    })
    .nullable(true)
    .transform((v) => (v === null ? [] : v)),
  exfoliationDtmSuctionRate: string()
    .when('exfoliationEnhancement', {
      is: (exfoliationEnhancement: string[]) =>
        exfoliationEnhancement?.includes('Diamond Tip Microderm — $80'),
      then: string().required('Exfoliation Enhancements Suction Rate'),
    })
    .nullable(true)
    .transform((v) => (v === null ? '' : v)),
  exfoliationDtmPasses: string()
    .when('exfoliationEnhancement', {
      is: (exfoliationEnhancement: string[]) =>
        exfoliationEnhancement?.includes('Diamond Tip Microderm — $80'),
      then: string().required('Exfoliation Enhancements Passes'),
    })
    .nullable(true)
    .transform((v) => (v === null ? '' : v)),
  exfoliationHwmWandProduct: string()
    .when('exfoliationEnhancement', {
      is: (exfoliationEnhancement: string[]) =>
        exfoliationEnhancement?.includes('Hydro Wand Microderm — $80'),
      then: string().required('Exfoliation Enhancements Wand Product'),
    })
    .nullable(true)
    .transform((v) => (v === null ? '' : v)),
  exfoliationHwmSuctionRate: string()
    .when('exfoliationEnhancement', {
      is: (exfoliationEnhancement: string[]) =>
        exfoliationEnhancement?.includes('Hydro Wand Microderm — $80'),
      then: string().required('Exfoliation Enhancements Suction Rate'),
    })
    .nullable(true)
    .transform((v) => (v === null ? '' : v)),
  exfoliationHwmPasses: string()
    .when('exfoliationEnhancement', {
      is: (exfoliationEnhancement: string[]) =>
        exfoliationEnhancement?.includes('Hydro Wand Microderm — $80'),
      then: string().required('Exfoliation Enhancements Passes'),
    })
    .nullable(true)
    .transform((v) => (v === null ? '' : v)),
  exfoliationHwiWandProduct: string()
    .when('exfoliationEnhancement', {
      is: (exfoliationEnhancement: string[]) =>
        exfoliationEnhancement?.includes('Hydro Wand Infusion — $80'),
      then: string().required('Exfoliation Enhancements Wand Product'),
    })
    .nullable(true)
    .transform((v) => (v === null ? '' : v)),
  exfoliationHwiTreatmentSerum: array(string())
    .when('exfoliationEnhancement', {
      is: (exfoliationEnhancement: string[]) =>
        exfoliationEnhancement?.includes('Hydro Wand Infusion — $80'),
      then: array(string())
        .required('Exfoliation Enhancements treatment serum')
        .min(1, 'Exfoliation Enhancements treatment serum'),
    })
    .nullable(true)
    .transform((v) => (v === null ? [] : v)),
  exfoliationHwiSuctionRate: string()
    .when('exfoliationEnhancement', {
      is: (exfoliationEnhancement: string[]) =>
        exfoliationEnhancement?.includes('Hydro Wand Infusion — $80'),
      then: string().required('Exfoliation Enhancements Suction Rate'),
    })
    .nullable(true)
    .transform((v) => (v === null ? '' : v)),
  exfoliationPeelProduct: array(string())
    .when('exfoliationEnhancement', {
      is: (exfoliationEnhancement: string[]) =>
        exfoliationEnhancement?.includes('Peel — $50'),
      then: array(string())
        .required('Exfoliation Enhancements Peel Product')
        .min(1, 'Exfoliation Enhancements Peel Product'),
    })
    .nullable(true)
    .transform((v) => (v === null ? [] : v)),
  exfoliationPeelLayers: string()
    .when('exfoliationEnhancement', {
      is: (exfoliationEnhancement: string[]) =>
        exfoliationEnhancement?.includes('Peel — $50'),
      then: string().required('Exfoliation Enhancements Peel Layers'),
    })
    .nullable(true)
    .transform((v) => (v === null ? '' : v)),
  exfoliationPeelTimeOnSkin: string()
    .when('exfoliationEnhancement', {
      is: (exfoliationEnhancement: string[]) =>
        exfoliationEnhancement?.includes('Peel — $50'),
      then: string().required('Exfoliation Enhancements Time on Skin'),
    })
    .nullable(true)
    .transform((v) => (v === null ? '' : v)),
  extractionsSegment: bool().nullable(),
  extractionsPrepProducts: array(string())
    .when('extractionsSegment', {
      is: true,
      then: array(string())
        .required('Extraction Prep Products')
        .min(1, 'Extraction Prep Products'),
    })
    .nullable(true)
    .transform((v) => (v === null ? [] : v)),
  extractionsZone: array(string())
    .when('extractionsSegment', {
      is: true,
      then: array(string())
        .required('Extractions Zone')
        .min(1, 'Extractions Zone'),
    })
    .nullable(true)
    .transform((v) => (v === null ? [] : v)),
  extractionsPostProducts: array(string())
    .when('extractionsSegment', {
      is: true,
      then: array(string())
        .required('Extraction Post Products')
        .min(1, 'Extraction Post Products'),
    })
    .nullable(true)
    .transform((v) => (v === null ? [] : v)),
  touchPointSegment: bool().nullable(),
  touchPointMassageMedium: string()
    .when('touchPointSegment', {
      is: true,
      then: string().required('Touch Point Massage Medium'),
    })
    .nullable(true)
    .transform((v) => (v === null ? '' : v)),
  touchPointTouch: array(string())
    .when('touchPointSegment', {
      is: true,
      then: array(string())
        .required('Touch Point Touch')
        .min(1, 'Touch Point Touch'),
    })
    .nullable(true)
    .transform((v) => (v === null ? [] : v)),
  maskSegment: bool().nullable(),
  maskEnhancements: array(string()).nullable(),
  maskLedPanelTime: string()
    .when('maskEnhancements', {
      is: (maskEnhancements: string[]) =>
        maskEnhancements?.includes('LED Panel — $50'),
      then: string().required('Mask Segment LED Panel Time'),
    })
    .nullable(true)
    .transform((v) => (v === null ? '' : v)),
  maskMicrocurrentProgramLpi: string()
    .when('maskEnhancements', {
      is: (maskEnhancements: string[]) =>
        maskEnhancements?.includes('Microcurrent — $80'),
      then: string().required('Mask Segment Long Program Intesity'),
    })
    .nullable(true)
    .transform((v) => (v === null ? '' : v)),
  maskMicrocurrentProgramSpi: string()
    .when('maskEnhancements', {
      is: (maskEnhancements: string[]) =>
        maskEnhancements?.includes('Microcurrent — $80'),
      then: string().required('Mask Segment Short Program Intensity'),
    })
    .nullable(true)
    .transform((v) => (v === null ? '' : v)),
  maskMicrocurrentProduct: array(string())
    .when('maskEnhancements', {
      is: (maskEnhancements: string[]) =>
        maskEnhancements?.includes('Microcurrent — $80'),
      then: array(string())
        .required('Mask Segment Microcurrent Product')
        .min(1, 'Mask Segment Microcurrent Product'),
    })
    .nullable(true)
    .transform((v) => (v === null ? [] : v)),
  maskMicrocurrentSerum: array(string())
    .when('maskEnhancements', {
      is: (maskEnhancements: string[]) =>
        maskEnhancements?.includes('Microcurrent — $80'),
      then: array(string())
        .required('Mask Segment Microcurrent Serum')
        .min(1, 'Mask Segment Microcurrent Serum'),
    })
    .nullable(true)
    .transform((v) => (v === null ? [] : v)),
  maskMicrocurrentTreatmentTime: string()
    .when('maskEnhancements', {
      is: (maskEnhancements: string[]) => {
        return maskEnhancements?.includes('Microcurrent — $80');
      },
      then: string().required('Mask Segment Microcurrent Treatment Time'),
    })
    .nullable(true)
    .transform((v) => (v === null ? '' : v)),
  targetedTherapySegment: bool().nullable(),
  targetedTherapyEnhancements: array(string())
    .when('targetedTherapySegment', {
      is: true,
      then: array(string())
        .required('Targeted Therapy Enhancements')
        .min(1, 'Targeted Therapy Enhancements'),
    })
    .nullable(true)
    .transform((v) => (v === null ? [] : v)),
  targetedTherapyLedPanelTime: string()
    .when('targetedTherapyEnhancements', {
      is: (targetedTherapyEnhancements: string[]) => {
        return targetedTherapyEnhancements?.includes('LED Panel — $50');
      },
      then: string()
        .required('Targeted Therapy Enhancements led panel Time')
        .min(1, 'Targeted Therapy Enhancements led panel Time'),
    })
    .nullable(true)
    .transform((v) => (v === null ? '' : v)),
  targetedTherapyMicrocurrentProgramLpi: string()
    .when('targetedTherapyEnhancements', {
      is: (targetedTherapyEnhancements: string[]) => {
        return targetedTherapyEnhancements?.includes('Microcurrent — $80');
      },
      then: string()
        .required('Targeted Therapy Microcurrent Long Program Intesity')
        .min(1, 'Targeted Therapy Microcurrent Long Program Intesity'),
    })
    .nullable(true)
    .transform((v) => (v === null ? '' : v)),
  targetedTherapyMicrocurrentProgramSpi: string()
    .when('targetedTherapyEnhancements', {
      is: (targetedTherapyEnhancements: string[]) => {
        return targetedTherapyEnhancements?.includes('Microcurrent — $80');
      },
      then: string()
        .required('Targeted Therapy Microcurrent Short Program Intensity')
        .min(1, 'Targeted Therapy Microcurrent Short Program Intensity'),
    })
    .nullable(true)
    .transform((v) => (v === null ? '' : v)),
  targetedTherapyMicrocurrentProduct: array(string())
    .when('targetedTherapyEnhancements', {
      is: (targetedTherapyEnhancements: string[]) => {
        return targetedTherapyEnhancements?.includes('Microcurrent — $80');
      },
      then: array(string())
        .required('Targeted Therapy Microcurrent Product')
        .min(1, 'Targeted Therapy Microcurrent Product'),
    })
    .nullable(true)
    .transform((v) => (v === null ? [] : v)),
  targetedTherapyMicrocurrentSerum: array(string())
    .when('targetedTherapyEnhancements', {
      is: (targetedTherapyEnhancements: string[]) => {
        return targetedTherapyEnhancements?.includes('Microcurrent — $80');
      },
      then: array(string())
        .required('Targeted Therapy Microcurrent Serum')
        .min(1, 'Targeted Therapy Microcurrent Serum'),
    })
    .nullable(true)
    .transform((v) => (v === null ? [] : v)),
  targetedTherapyMicrocurrentTreatmentTime: string()
    .when('targetedTherapyEnhancements', {
      is: (targetedTherapyEnhancements: string[]) => {
        return targetedTherapyEnhancements?.includes('Microcurrent — $80');
      },
      then: string()
        .required('Targeted Therapy Microcurrent Treatment Time')
        .min(1, 'Targeted Therapy Microcurrent Treatment Time'),
    })
    .nullable(true)
    .transform((v) => (v === null ? '' : v)),
  sosSegment: bool().nullable(),
  sosBaseProduct: array(string())
    .when('sosSegment', {
      is: true,
      then: array(string())
        .required('SOS Base Product')
        .min(1, 'SOS Base Product'),
    })
    .nullable(true)
    .transform((v) => (v === null ? [] : v)),
  sosSerum: array(string())
    .when('sosSegment', {
      is: true,
      then: array(string()).required('SOS Serum').min(1, 'SOS Serum'),
    })
    .nullable(true)
    .transform((v) => (v === null ? [] : v)),
  nextTimeEnhancement: array()
    .required('Next Time Enhancements')
    .min(1, 'Next Time Enhancements')
    .nullable(true)
    .transform((v) => (v === null ? [] : v)),
  clientMessage: string().required('Client Message'),
  recommendedProduct: array()
    .required('Product Recommendations')
    .min(1, 'Product Recommendations')
    .nullable(),
  choose_one: bool().test(
    'atleast_at least three',
    'Choose atleast three segments',
    function () {
      const selectedSegment = [
        this.parent.exfoliationSegment,
        this.parent.extractionsSegment,
        this.parent.sosSegment,
        this.parent.touchPointSegment,
        this.parent.maskSegment,
        this.parent.targetedTherapySegment,
      ].filter((segment) => segment).length;
      return selectedSegment >= 3;
    }
  ),
});

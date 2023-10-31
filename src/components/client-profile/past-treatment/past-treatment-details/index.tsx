import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { PastTreatmentDetailSection } from '../../../../types/clientProfile';
import { StyledGridContainer, TreatmentDetailsHeader } from '../styles';
import WavesIcon from '../../../../assets/icons/Waves.svg';
import TargetIcon from '../../../../assets/icons/target.svg';
import SparkleIcon from '../../../../assets/icons/Sparkle.svg';
import NoteIcon from '../../../../assets/icons/Note.svg';
import { TREATMENT_SECTIONS } from '../../../../constants/enums';
import { Treatment } from '../../../../types/services/Treatment';
import {
  ConditionsSection,
  CoreSegments,
  EnhancementsSection,
  TreatmentNote,
} from './past-treatment-sections';
import { getOptionsLabel } from '../../../../utils/helper-functions/common';

interface Props {
  treatmentSections: PastTreatmentDetailSection[];
  treatmentDetail: Treatment;
}
const PastTreatmentDetails: FC<Props> = ({
  treatmentSections,
  treatmentDetail,
}) => {
  const getSectionIcons = (sectionName: string) => {
    switch (sectionName) {
      case TREATMENT_SECTIONS.CONDITIONS:
        return WavesIcon;
      case TREATMENT_SECTIONS.CORE_SEGMENTS:
        return TargetIcon;
      case TREATMENT_SECTIONS.ENHANCEMENTS:
        return SparkleIcon;
      case TREATMENT_SECTIONS.TREATMENT_NOTE:
        return NoteIcon;
    }
  };
  const getPastTreatmentSection = (
    sectionName: string,
    treatment: Treatment
  ) => {
    switch (sectionName) {
      case TREATMENT_SECTIONS.CONDITIONS:
        return (
          <ConditionsSection
            conditions={getOptionsLabel(treatment.conditions)}
          />
        );
      case TREATMENT_SECTIONS.CORE_SEGMENTS:
        return (
          <CoreSegments
            touchPointSegment={treatment.touchPointSegment}
            exfoliationSegment={treatment.exfoliationSegment}
            extractionsSegment={treatment.extractionsSegment}
            maskSegment={treatment.maskSegment}
            targetedTherapySegment={treatment.targetedTherapySegment}
            sosSegment={treatment.sosSegment}
          />
        );
      case TREATMENT_SECTIONS.ENHANCEMENTS:
        return (
          <EnhancementsSection
            peelLayers={getOptionsLabel(treatment.exfoliationPeelLayers)}
            peelProduct={getOptionsLabel(treatment.exfoliationPeelProduct)}
            peelTimeOnSkin={getOptionsLabel(
              treatment.exfoliationPeelTimeOnSkin
            )}
            ledPanelBoost={getOptionsLabel(
              treatment.targetedTherapyLedPanelBoost
            )}
            ledPanelTime={getOptionsLabel(
              treatment.targetedTherapyLedPanelTime
            )}
            microdermSuctionRate={getOptionsLabel(
              treatment.exfoliationDtmSuctionRate
            )}
            microdermPasses={getOptionsLabel(treatment.exfoliationDtmPasses)}
          />
        );
      case TREATMENT_SECTIONS.TREATMENT_NOTE:
        return (
          <TreatmentNote
            internalNotes={
              treatment?.note?.find(
                (elem) =>
                  elem.type === 'general_notes' && elem?.text?.length > 0
              )?.text || 'NA'
            }
          />
        );
    }
  };
  return (
    <StyledGridContainer container padding={'24px'} columnSpacing={'24px'}>
      {treatmentSections.map(
        (section: PastTreatmentDetailSection, index: number) => {
          return (
            <Grid
              item
              lg={
                treatmentSections.length === index + 1 && index % 2 === 0
                  ? 12
                  : 6
              }
              md={
                treatmentSections.length === index + 1 && index % 2 === 0
                  ? 12
                  : 6
              }
              xs={12}
              key={`detailGrid-${index}`}
              marginTop={'24px'}
            >
              <TreatmentDetailsHeader>
                <img
                  src={getSectionIcons(section.title) || undefined}
                  alt={section.title}
                  className='detailInfoIcon'
                />
                <Typography variant='body1' fontWeight={'700'}>
                  {section.title}
                </Typography>
              </TreatmentDetailsHeader>
              {getPastTreatmentSection(section.title, treatmentDetail)}
            </Grid>
          );
        }
      )}
    </StyledGridContainer>
  );
};
export default PastTreatmentDetails;

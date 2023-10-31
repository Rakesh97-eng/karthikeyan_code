import { Typography } from '@mui/material';
import { Treatment } from '../../../../../types/services/Treatment';
import { StyledUl } from '../../styles';

export const ConditionsSection = ({ conditions }: Partial<Treatment>) => {
  return (
    <Typography variant='body1'>{conditions ? conditions : 'NA'}</Typography>
  );
};

export const CoreSegments = ({
  touchPointSegment,
  exfoliationSegment,
  extractionsSegment,
  maskSegment,
  targetedTherapySegment,
  sosSegment,
}: Partial<Treatment>) => {
  const coreSegments = [
    { segment: exfoliationSegment, label: 'Exfoliation' },
    { segment: extractionsSegment, label: 'Extractions' },
    { segment: touchPointSegment, label: 'Touch Point' },
    { segment: maskSegment, label: 'Mask' },
    { segment: targetedTherapySegment, label: 'Targeted Therapy' },
    { segment: sosSegment, label: 'SOS' },
  ];
  return exfoliationSegment ||
    extractionsSegment ||
    touchPointSegment ||
    maskSegment ||
    targetedTherapySegment ||
    sosSegment ? (
    <Typography variant='body1'>
      {coreSegments
        .filter((seg) => seg.segment)
        .map((seg) => seg.label)
        .join(', ')}
    </Typography>
  ) : (
    <Typography variant='body1'>NA</Typography>
  );
};

export const EnhancementsSection = ({
  enhPeel,
  peelLayers,
  peelProduct,
  peelTimeOnSkin,
  ledPanelBoost,
  ledPanelTime,
  microdermSuctionRate,
  microdermPasses,
}: Partial<Treatment>) => {
  const filterAndJoin = (arr: unknown[]) => {
    return arr.filter((a) => a).join();
  };
  const peelEnh = filterAndJoin([peelProduct, peelLayers, peelTimeOnSkin]);
  const ledPanel = filterAndJoin([ledPanelBoost, ledPanelTime]);
  const microdem =
    microdermSuctionRate || microdermPasses
      ? filterAndJoin([microdermSuctionRate, microdermPasses])
      : 'NA';
  return enhPeel ||
    peelLayers ||
    peelProduct ||
    peelTimeOnSkin ||
    ledPanelBoost ||
    ledPanelTime ||
    microdermSuctionRate ||
    microdermPasses ? (
    <StyledUl>
      {peelLayers || peelProduct || peelTimeOnSkin ? (
        <li>
          <Typography variant='body1'>Peel: {peelEnh}</Typography>
        </li>
      ) : null}
      {ledPanelBoost || ledPanelTime ? (
        <li>
          <Typography variant='body1'>LED panel: {ledPanel}</Typography>
        </li>
      ) : null}
      {microdermSuctionRate || microdermPasses ? (
        <li>
          <Typography variant='body1'>Microdermabrasion: {microdem}</Typography>
        </li>
      ) : null}
    </StyledUl>
  ) : (
    <Typography variant='body1'>NA</Typography>
  );
};

export const TreatmentNote = ({ internalNotes }: Partial<Treatment>) => {
  return (
    <Typography variant='body1'>
      {internalNotes ? internalNotes : 'NA'}
    </Typography>
  );
};

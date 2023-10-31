import React, { FC } from 'react';
import {
  IntakeContentWrapper,
  IntakeFooterWrapper,
  IntakeWrapper,
} from './intake.styles';
import BottomCurve from '../../assets/icons/intake-bottom-curve.svg';
import { ReactComponent as Seeds } from '../../assets/icons/seeding.svg';
import { ReactComponent as Lake } from '../../assets/icons/lake.svg';
import { ReactComponent as Slice } from '../../assets/icons/slice.svg';

const IntakeHomeWrapper: FC = ({ children }) => {
  return (
    <IntakeWrapper>
      <IntakeContentWrapper>{children}</IntakeContentWrapper>
      <img src={BottomCurve} className='bottom-curve' alt='bottom-curve' />

      <IntakeFooterWrapper>
        <div className='intake-icon-wrapper'>
          <Seeds className='seeds-icon' />
          <Slice className='slice-icon' />
          <Lake className='lake-icon' />
        </div>
      </IntakeFooterWrapper>
    </IntakeWrapper>
  );
};

export default IntakeHomeWrapper;

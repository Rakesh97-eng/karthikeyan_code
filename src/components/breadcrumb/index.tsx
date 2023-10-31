import { Typography } from '@mui/material';
import React, { FC } from 'react';
import {
  BreadcrumbWrapper,
  StyledBreadcrumbLink,
  SvgIconWrapper,
} from './styles';
import { ReactComponent as ArrowIcon } from '../../assets/icons/greyRightArrow.svg';
import { TBreadcrumb } from '../../types/commonTypes';
interface Props {
  breadcrumbs: TBreadcrumb[];
}
const Breadcrumb: FC<Props> = ({ breadcrumbs }) => {
  return (
    <BreadcrumbWrapper>
      {breadcrumbs?.map((breadcrumb, index) => {
        return (
          <React.Fragment key={`breadcrumb-${index}`}>
            <StyledBreadcrumbLink
              to={breadcrumb?.link}
              isParent={breadcrumbs.length !== index + 1}
            >
              <Typography variant='body2'>{breadcrumb.pathName}</Typography>
            </StyledBreadcrumbLink>
            {breadcrumbs.length !== index + 1 && (
              <SvgIconWrapper>
                <ArrowIcon />
              </SvgIconWrapper>
            )}
          </React.Fragment>
        );
      })}
    </BreadcrumbWrapper>
  );
};

export default Breadcrumb;

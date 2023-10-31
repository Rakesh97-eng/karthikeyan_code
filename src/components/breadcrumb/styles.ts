import styled from '@emotion/styled';
import { BreadCrumbLinkProps } from '../../types/commonTypes';
import { StyledLink } from './_components';

export const BreadcrumbWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginTop: '16px',
  marginBottom: '24px',
});

export const StyledBreadcrumbLink = styled(StyledLink)(
  ({ isParent }: BreadCrumbLinkProps) => ({
    color: isParent ? 'var(--accent-primary)' : 'var(--neutral-primary-light)',
    display: 'inline-block',
    cursor: 'pointer',
    textDecoration: 'unset',
    borderBottom: isParent ? '1px solid' : 'unset',
  })
);

export const SvgIconWrapper = styled('span')({
  display: 'inline-block',
  margin: '0 6px',
});

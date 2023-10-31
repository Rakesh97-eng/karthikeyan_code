import { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { BreadCrumbLinkProps } from '../../types/commonTypes';

/**
 * StyledLink
 * takes in LinkProps and isParent prop but pass
 * isParent to Link as a data attribute hence no error regarding isParent being
 * invalid prop
 */
export const StyledLink: FC<LinkProps & BreadCrumbLinkProps> = ({
  isParent,
  ...props
}) => {
  return <Link {...props} data-isparent={isParent} />;
};

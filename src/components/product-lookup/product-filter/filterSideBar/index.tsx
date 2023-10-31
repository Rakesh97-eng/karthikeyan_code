import { FC } from 'react';
import {
  SideBarMenuHeader,
  SideBarMenuContainer,
  SideBarMenuItems,
  SideBarBackDrop,
} from './styles';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/X-icon.svg';
import ProductFilter from '..';
import { Typography } from '@mui/material';
import {ProductFilterOptions} from "../../../../types/services/Common";

interface Props {
  sideBarOpen: boolean;
  closeSidebar: () => void;
  getFilterData: (filterData:ProductFilterOptions ) => void;
} 
const FilterSideBarMenu: FC<Props> = ({ sideBarOpen, closeSidebar, getFilterData }) => {
  return (
    <>
      <SideBarBackDrop sideBarStatus={sideBarOpen} />
      <SideBarMenuContainer sideBarStatus={sideBarOpen}>
        <SideBarMenuHeader>
          <Typography
            variant='body1'
            color={'var(--neutral-primary-light)'}
            className={'header-text'}
          >
            Filters
          </Typography>
          <CloseIcon onClick={() => closeSidebar()} />
        </SideBarMenuHeader>
        <SideBarMenuItems>
          <ProductFilter headerTextShown={false} getFilterData={getFilterData}  />
        </SideBarMenuItems>
      </SideBarMenuContainer>
    </>
  );
};

export default FilterSideBarMenu;

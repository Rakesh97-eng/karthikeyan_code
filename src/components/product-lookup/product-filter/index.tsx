import { Typography, Divider, Tabs, Tab } from '@mui/material';
import { useState, FC, useEffect, useRef } from 'react';
import { PRODUCTS, TYPES } from '../../../constants/appConstants';
import { StyledSwitch } from '../../common/CustomSwitch/styles';
import FilterCheckbox from './filterCheckbox';
import { FilterWrapper } from './filterCheckbox/styles';
import { FormState } from '../../../types/store/form';
import { ProductFilterOptions } from '../../../types/services/Common';

interface FilterProps {
  headerTextShown: boolean;
  getFilterData: (filterData: ProductFilterOptions) => void;
}
const ProductFilter: FC<FilterProps> = ({ headerTextShown, getFilterData }) => {
  const [productType, setProductType] = useState<string[]>([]);
  const [allergicCause, setAllergicCause] = useState<string[]>([]);
  const [contradiction, setContradiction] = useState<string>('without');
  const [pregnancy, setPregnancy] = useState(false);
  const isInitialMount = useRef(true);

  const onTypeChange = (data: FormState, id: string) => {
    let newProductType: string[] = [...productType];
    if (data[id].length) {
      newProductType.push(id);
    } else {
      newProductType = newProductType.filter((item: string) => item !== id);
    }
    setProductType(newProductType);
  };

  const handleAllergyChange = (data: FormState, id: string, name: string) => {
    let newAllergicCause: string[] = [...allergicCause];
    if (data[id].length) {
      newAllergicCause.push(name);
    } else {
      newAllergicCause = newAllergicCause.filter(
        (item: string) => item !== name
      );
    }
    setAllergicCause(newAllergicCause);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setContradiction(newValue);
  };

  const handleSwitchChange = () => {
    setPregnancy(!pregnancy);
  };

  const getProductType = (): string[] => {
    if (productType.length >= 1) {
      return [...productType, 'both'];
    }
    return [];
  };

  const generateFilterData = () => {
    const product: string[] = getProductType();
    const allergy: string = [...allergicCause].join().replace(/,/g, ', ');
    const filterData: ProductFilterOptions = {};
    filterData.display_in_shopapp = true;
    if (pregnancy) {
      filterData.pregnancy_safe = `${pregnancy}`;
    }
    if (product) {
      filterData.back_or_front_bar = product;
    }
    if (contradiction && allergy) {
      filterData.allergy = { [contradiction]: allergy };
    }
    getFilterData(filterData);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    generateFilterData();
  }, [productType, allergicCause, contradiction, pregnancy]);

  return (
    <FilterWrapper>
      {headerTextShown && (
        <>
          <Typography variant='h2' color={'var(--neutral-primary)'}>
            Filters
          </Typography>
          <Divider className='divider' />
        </>
      )}
      <Typography variant='body1' className='title'>
        <strong>Type</strong>
      </Typography>
      {TYPES.map((type) => {
        return (
          <FilterCheckbox
            id={type.id}
            label={type.label}
            name={type.name}
            onChangeHandler={onTypeChange}
            key={type.id}
          />
        );
      })}
      <Divider className='divider' />
      <Typography variant='body1' className='title'>
        <strong>Contraindications</strong>
      </Typography>
      <Typography variant='body2' color={'var(--neutral-primary)'}>
        See products with or without selected contraindications
      </Typography>
      <Tabs
        value={contradiction}
        onChange={handleTabChange}
        aria-label='disabled tabs example'
      >
        <Tab
          label={
            <Typography
              variant='btn'
              component='span'
              fontWeight={700}
              textTransform='none'
            >
              Without
            </Typography>
          }
          value='without'
        />
        <Tab
          label={
            <Typography
              variant='btn'
              fontWeight={700}
              textTransform='none'
              component='span'
            >
              With
            </Typography>
          }
          value='with'
        />
      </Tabs>
      {PRODUCTS.map((product) => {
        return (
          <FilterCheckbox
            id={product.id}
            label={product.label}
            name={product.name}
            onChangeHandler={handleAllergyChange}
            key={product.id}
          />
        );
      })}
      <Divider className='divider' />
      <div className='switch-part'>
        <Typography variant='body1' fontWeight={700}>
          <strong>Pregnancy-Safe Only</strong>
        </Typography>
        <StyledSwitch
          checked={pregnancy}
          onChange={handleSwitchChange}
          name='switch'
        />
      </div>
    </FilterWrapper>
  );
};
export default ProductFilter;

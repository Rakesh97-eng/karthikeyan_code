import { FC, useContext, useEffect, useState } from 'react';
import { LocationMenu, LocationMenuWrapper } from './styles';
import { ReactComponent as MapPinOutline } from '../../../../assets/icons/map-pin-outline.svg';
import { Button, MenuItem, Typography } from '@mui/material';
import { ReactComponent as ExpandDown } from '../../../../assets/icons/arrow-down-black.svg';
import { ReactComponent as ExpandUp } from '../../../../assets/icons/arrow-up-black.svg';
import { ReactComponent as CheckmarkIcon } from '../../../../assets/icons/checkmark.svg';
import { Location } from '../../../../types/services/Location';
import { HomeContext } from '../../../../providers/context/HomeContext';
import {
  LOCAL_STORAGE_KEYS,
  UTC_OFFSETS,
} from '../../../../constants/appConstants';
import {
  getLocalStorageItem,
  setLocalStorageItem,
  deleteLocalStorageItem,
} from '../../../../utils/helper-functions/user';

interface LocationSelectProps {
  locations: Location[];
}

export const LocationSelect: FC<LocationSelectProps> = ({ locations }) => {
  const {
    selectedLocation,
    selectedDate,
    updateSelectedLocation,
    updateUtcOffsetValue,
  } = useContext(HomeContext);
  const localSelectedLocationId = getLocalStorageItem(
    LOCAL_STORAGE_KEYS.SELECTED_LOCATION_ID
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [location, setLocation] = useState<Location>(locations[0]);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (loc: Location) => {
    if (localSelectedLocationId) {
      const staffKey = `${LOCAL_STORAGE_KEYS.STAFF_FOR_LOCATION_ID}_${localSelectedLocationId}`;
      const savedStaff = getLocalStorageItem(staffKey);
      if (savedStaff) {
        deleteLocalStorageItem(staffKey);
      }
    }
    setAnchorEl(null);
    setLocation(loc);

    const timeZone = loc.tz.toLowerCase() || '';
    if (Object.hasOwnProperty.call(UTC_OFFSETS, timeZone)) {
      if (
        selectedDate < new Date(selectedDate.getFullYear + '-11-06') && // first sunday of Nov
        selectedDate > new Date(selectedDate.getFullYear + '-03-12')
      ) {
        // second sunday of march
        updateUtcOffsetValue(`-0${UTC_OFFSETS[timeZone]}:00`);
      } else {
        updateUtcOffsetValue(`-0${UTC_OFFSETS[timeZone] + 1}:00`);
      }
    } else {
      updateUtcOffsetValue('-04:00');
    }

    updateSelectedLocation(loc);
    setLocalStorageItem(LOCAL_STORAGE_KEYS.SELECTED_LOCATION_ID, loc.id);
  };

  useEffect(() => {
    if (locations?.length > 0) {
      let tempLocationId = selectedLocation?.id;
      if (!tempLocationId) {
        if (localSelectedLocationId) {
          tempLocationId = localSelectedLocationId;
        }
      }
      if (tempLocationId) {
        const location = locations.find((loc) => loc.id === tempLocationId);
        if (location) {
          if (
            tempLocationId !== selectedLocation?.id ||
            tempLocationId != localSelectedLocationId
          ) {
            handleClose(location);
          } else {
            setLocation(location);
          }
        }
      } else {
        handleClose(locations[0]);
      }
    }
  }, [locations, selectedLocation, localSelectedLocationId]);

  return (
    <>
      <LocationMenuWrapper open={open}>
        <Button
          id='basic-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          className='location-dropdown-btn'
        >
          <MapPinOutline className='mapPin' />
          <Typography variant='body1' color={'var(--neutral-primary)'}>
            {location?.name}
          </Typography>
          <div className='expand-icon-wrapper'>
            {open ? <ExpandUp /> : <ExpandDown />}
          </div>
        </Button>
      </LocationMenuWrapper>
      <LocationMenu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(location)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        className='location-dropdown-menu'
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {locations?.map((loc) => {
          return (
            <MenuItem
              key={loc.name}
              onClick={() => handleClose(loc)}
              className='location-dropdown-menu-item'
            >
              <Typography variant='body1' color={'var(--neutral-primary)'}>
                {loc.name}
              </Typography>
              {loc.name == location?.name && (
                <CheckmarkIcon className='checkmark-icon' />
              )}
            </MenuItem>
          );
        })}
      </LocationMenu>
    </>
  );
};

import { FC, useContext, useEffect, useState } from 'react';
import { ScheduleHeaderWrapper } from './styles';
import CalendarImage from '../../../../assets/images/home/calendar.png';
import { Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import {
  HomeContext,
  defaultStaff,
} from '../../../../providers/context/HomeContext';
import { StaffOrder } from '../../../../types/schedule';
import { LOCAL_STORAGE_KEYS } from '../../../../constants/appConstants';
import { getLocalStorageItem } from '../../../../utils/helper-functions/user';

const ScheduleHeader: FC = () => {
  const { staffs, selectedStaffId, updateSelectedStaffId } =
    useContext(HomeContext);
  const defaultAvail: StaffOrder = defaultStaff;
  const [staffList, setStaffList] = useState<StaffOrder[]>([]);
  const loggedInStaffId = getLocalStorageItem(LOCAL_STORAGE_KEYS.LOGGED_IN_STAFF_STAFF_ID)

  const [selectedStaffName, setSelectedStaffName] = useState(
    defaultAvail.staffName
  );

  const resetStaffList = () => {
    const tmpList: StaffOrder[] = [];
    let loggedInStaff: StaffOrder | null = null;
    for (const data of staffs) {
      const staff = data;
      const sO: StaffOrder = {
        staffId: staff.id,
        staffName:
          loggedInStaffId === staff.id
            ? `${staff.firstName} ${staff.lastName} (you)`
            : `${staff.firstName} ${staff.lastName}`,
        isSelected: selectedStaffId === staff.id,
      };
      if (loggedInStaffId === staff.id) {
        loggedInStaff = sO;
      } else {
        tmpList.push(sO);
      }

      if (staff.id === selectedStaffId) {
        setSelectedStaffName(
          loggedInStaffId === staff.id
            ? `${staff.firstName} ${staff.lastName} (you)`
            : `${staff.firstName} ${staff.lastName}`
        );
      }
    }

    if (selectedStaffId == defaultStaff.staffId) {
      setSelectedStaffName(defaultStaff.staffName);
    }

    tmpList.sort((a, b) =>
      a.staffName > b.staffName ? 1 : b.staffName > a.staffName ? -1 : 0
    );

    defaultAvail.isSelected = selectedStaffId === defaultStaff.staffId;
    tmpList.splice(0, 0, defaultAvail);

    if (loggedInStaff != null) {
      tmpList.splice(1, 0, loggedInStaff);
    }

    setStaffList(tmpList);
  };

  useEffect(() => {
    resetStaffList();
  }, [selectedStaffId, staffs]);

  const handleStaffChange = (staffId: string) => {
    updateSelectedStaffId(staffId);
  };

  const renderStaff = (): JSX.Element => {
    const staff = [];
    for (const list of staffList) {
      const s = list;
      staff.push(
        <Typography
          variant='body1'
          onClick={() => handleStaffChange(s.staffId)}
          className={`${s.isSelected ? 'selected' : ''}`}
          component='li'
          key={uuidv4()}
        >
          {s.staffName}
        </Typography>
      );
    }
    return (
      <div className='staff-options'>
        <ul>{staff}</ul>
      </div>
    );
  };

  return (
    <>
      <ScheduleHeaderWrapper>
        <div className='header-wrapper'>
          <div className='header'>
            <img
              className='calendar-icon'
              src={CalendarImage}
              alt='Calendar-image'
            />
            <Typography variant='h2' color='var(--neutral-primary)'>
              Schedule
            </Typography>

            <div className='staff-wrapper'>
              <div className='selected-option'>
                <Typography
                  variant='body1'
                  component='span'
                  className='selected-name'
                >
                  {selectedStaffName}
                </Typography>
                <span className='list-arrow'></span>
              </div>
              {renderStaff()}
            </div>
          </div>
        </div>
      </ScheduleHeaderWrapper>
    </>
  );
};

export default ScheduleHeader;

import { createContext, FC, useState, useEffect } from 'react';
import { StaffOrder } from '../../types/schedule';
import { Location } from '../../types/services/Location';
import { Staff } from '../../types/services/Staff';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../../utils/helper-functions/user';

export const defaultStaff: StaffOrder = {
  staffId: '0',
  staffName: 'All Staff',
  isSelected: false,
};

interface IHomeContext {
  staffs: Staff[];
  selectedDate: Date;
  selectedStaffId: string | null;
  selectedLocation: Location | undefined;
  utcOffsetValue: string;
  updateStaff: (staffList: Staff[]) => void;
  updateSelectedDate: (selectedDate: Date) => void;
  updateSelectedStaffId: (selectedStaffId: string) => void;
  updateSelectedLocation: (selectedLocation: Location) => void;
  updateUtcOffsetValue: (utcOffsetValue: string) => void;
}

export const HomeContext = createContext<IHomeContext>({
  staffs: [],
  selectedDate: new Date(),
  selectedStaffId: defaultStaff.staffId,
  selectedLocation: undefined,
  utcOffsetValue: '',
  updateStaff: () => {
    /* This is intentional*/
  },
  updateSelectedDate: () => {
    /* This is intentional*/
  },
  updateSelectedStaffId: () => {
    /* This is intentional*/
  },
  updateSelectedLocation: () => {
    /* This is intentional*/
  },
  updateUtcOffsetValue: () => {
    /* This is intentional*/
  },
});

const HomeContextProvider: FC = ({ children }) => {
  const [staffs, setSelectedStaff] = useState<Staff[]>([]);
  const calendarSelectedDate: string | null =
    getLocalStorageItem('selectedDate') != null
      ? getLocalStorageItem('selectedDate')
      : '';
  const calendarSelectedStaffId: string | null =
    getLocalStorageItem('selectedStaffId') != null
      ? getLocalStorageItem('selectedStaffId')
      : defaultStaff.staffId;
  const [selectedDate, setSelectedDate] = useState(
    calendarSelectedDate ? new Date(calendarSelectedDate) : new Date()
  );
  const [selectedStaffId, setSelectedStaffId] = useState(
    calendarSelectedStaffId
  );
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  const [utcOffsetValue, setUtcOffset] = useState('-04:00');

  const updateStaff = (staffList: Staff[]) => {
    setSelectedStaff(staffList);
  };

  const updateSelectedDate = (selectedDate: Date) => {
    setLocalStorageItem('selectedDate', selectedDate.toDateString());
    setSelectedDate(selectedDate);
  };

  const updateSelectedStaffId = (selectedStaffId: string) => {
    setSelectedStaffId(selectedStaffId);
    setLocalStorageItem('selectedStaffId', selectedStaffId);
  };

  const updateSelectedLocation = (selectedLocation: Location) => {
    setSelectedLocation(selectedLocation);
  };

  const updateUtcOffsetValue = (utcOffsetValue: string) => {
    setUtcOffset(utcOffsetValue);
  };

  //Setting UTC Offset Value to local storag
  useEffect(() => {
    setLocalStorageItem('utcOffsetValue', utcOffsetValue);
  }, [utcOffsetValue]);

  return (
    <HomeContext.Provider
      value={{
        staffs,
        selectedDate,
        selectedStaffId,
        selectedLocation,
        utcOffsetValue,
        updateStaff,
        updateSelectedDate,
        updateSelectedStaffId,
        updateSelectedLocation,
        updateUtcOffsetValue,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContextProvider;

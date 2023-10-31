import { createContext, FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BOULEVARD_AUTH_API_TOKEN, CUSTOMER_ACCESS_TOKEN, IS_BOULEVARD_CLIENT } from '../../constants/Helpers';
import { CUSTOMER_SESSION_TOKEN, INTAKE_WELCOME_HOME } from '../../constants/intakeConstants';
import { IntakeSectionJsonTypes } from '../../types/treatmentRecord/question';
import { UserDetails } from '../../types/userTypes';
import { getJsonData } from './../../utils/helper-functions/common';
interface ICustomerContextAction {
  type: string;
  payload: string;
}
export type S3JSONTypes = { [key: string]: IntakeSectionJsonTypes };
interface ICustomerDetailsContext {
  CustomerAccessToken: string;
  CustomerSessionToken: string;
  BoulevardAuthApiToken: string;
  IsBoulevardClient: string;
  errorQuestionData:string[];
  updateState: (action: ICustomerContextAction) => void;
  progressValue: number;
  customerData: UserDetails;
  S3JsonData: S3JSONTypes;
  updateData: (_: Partial<UserDetails>) => void;
  userLogout: () => void;
  updateProgressData: (value: number) => void;
  updateError:(value:string[])=>void;
  updateSubmit:(value:boolean)=>void;
  allAnswers:{[key: string]: string},
  allowSubmit:boolean
}
const initialCustomerData = {
  email: '',
  userInfo: {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    is_member: false,
    membership_start_on: '',
    is_intake_submitted:false,
  },
  token: '',
  isLoggedIn: false,
  section: [],
  data: [],
};
export const CustomerDetailsContext = createContext<ICustomerDetailsContext>({
  CustomerAccessToken: '',
  CustomerSessionToken: '',
  BoulevardAuthApiToken: '',
  IsBoulevardClient: '',
  progressValue: 5,
  S3JsonData: {},
  errorQuestionData:[],
  allAnswers:{},
  customerData: initialCustomerData,
  allowSubmit:true,
  updateData: () => {
    // this is intentionally
  },
  userLogout: () => {
    //this is intentionally
  },
  updateState: () => {
    //this is intentionally
  },
  updateProgressData: () => {
    //this is intentionally
  },
  updateError: () => {
      //this is intentionally
  },
  updateSubmit: () => {
     //this is intentionally
  }
});

const CustomerDetailsProvider: FC = ({ children }) => {
  const [CustomerAccessToken, setCustomerAccessToken] = useState<string>('');
  const [allAnswers, setAllAnswers] = useState<{[key:string]:string}>({});
  const [S3JsonData, setS3JsonData] = useState<S3JSONTypes>({});
  const [allowSubmit, setAllowSubmit] = useState<boolean>(true);
  const [CustomerSessionToken, setCustomerSessionToken] = useState<string>('');
  const [errorQuestionData, setErrorQuestionData] = useState<string[]>([]);
  const [BoulevardAuthApiToken, setBoulevardAuthApiToken] =
    useState<string>('');
  const [IsBoulevardClient, setIsBoulevardClient] = useState<string>('');
  const [progressValue, setProgressValue] = useState<number>(5);
  const [customerData, setCustomerData] =
    useState<UserDetails>(initialCustomerData);

  const updateData = (appStateUpdate: Partial<UserDetails>) => {
    const newData = appStateUpdate?.data ?? customerData.data;
    setCustomerData((prev) => ({ ...prev, ...appStateUpdate,data:newData }));
  };

  const updateProgressData = (value: number) => {
    setProgressValue(value);
  };

  useEffect(() => {
    getJsonData(setAllAnswers,setS3JsonData);
  }, []);

  const history = useHistory();
  const userLogout = () => {
    history.push(INTAKE_WELCOME_HOME);
    updateData(initialCustomerData);
  };

  const updateError=(a:string[]) => {
    setErrorQuestionData(a)
  }
  const updateSubmit = (a:boolean) => {
    setAllowSubmit(a)
  }
  useEffect(() => {
    updateData({ isLoggedIn: customerData.token ? true : false });
  }, [customerData.token]);

  const updateState = (action: ICustomerContextAction) => {
    switch (action.type) {
      case CUSTOMER_ACCESS_TOKEN:
        setCustomerAccessToken(action.payload);
        break;
      case CUSTOMER_SESSION_TOKEN:
        setCustomerSessionToken(action.payload);
        break;
      case BOULEVARD_AUTH_API_TOKEN:
        setBoulevardAuthApiToken(action.payload);
        break;
      case IS_BOULEVARD_CLIENT:
        setIsBoulevardClient(action.payload);
        break;
    }
  };
  return (
    <CustomerDetailsContext.Provider
      value={{
        allowSubmit,
        CustomerAccessToken,
        CustomerSessionToken,
        BoulevardAuthApiToken,
        IsBoulevardClient,
        progressValue,
        customerData,
        S3JsonData,
        updateState,
        updateData,
        userLogout,
        updateError,
        errorQuestionData,
        updateProgressData,
        allAnswers,
        updateSubmit
      }}
    >
      {children}
    </CustomerDetailsContext.Provider>
  );
};

export default CustomerDetailsProvider;

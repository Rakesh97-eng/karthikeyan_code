import { useReducer } from 'react';
import { ClientState } from '../../types/store/client';
import clientReducer from './clientReducer';

const initialState: ClientState = {
  id: '',
  firstName: '',
  lastName: '',
  profileImageUrl: '',
  originalEmail: '',
};

const useClientState = () => {
  const [clientState, clientDispatch] = useReducer(clientReducer, initialState);
  return { clientState, clientDispatch };
};
export default useClientState;

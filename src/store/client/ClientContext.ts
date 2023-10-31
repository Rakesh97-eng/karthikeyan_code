import { createContext } from 'react';
import { TClientContext } from '../../types/store/client';

const ClientContext = createContext<TClientContext>({
  clientState: {
    id: '',
    firstName: '',
    lastName: '',
    profileImageUrl: '',
    originalEmail: '',
  },
  clientDispatch: () => ({}),
});

export default ClientContext;

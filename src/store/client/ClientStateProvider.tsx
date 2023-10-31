import React from 'react';
import useClientState from './useClientState';
import ClientContext from './ClientContext';

const ClientStateProvider: React.FC = ({ children }) => (
  <ClientContext.Provider value={useClientState()}>
    {children}
  </ClientContext.Provider>
);
export default ClientStateProvider;

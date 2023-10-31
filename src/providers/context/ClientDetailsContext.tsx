import { createContext, FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CLIENTS } from '../../constants/clients';
import { ClientDetailsType, IntakeFormType } from '../../types/clientProfile';

interface IClientDetailsContext {
  clientDetailData: ClientDetailsType | null;
  updateNotes: (notes: string) => void;
  updateIntakeProfile: (intakeFormData: IntakeFormType[] | undefined) => void;
}

interface IHistoryParams {
  clientID: string;
}

export const ClientDetailsContext = createContext<IClientDetailsContext>({
  clientDetailData: null,
  updateNotes: () => {
    /* This is intentional*/
  },
  updateIntakeProfile: () => {
    /* This is intentional*/
  },
});

const getClientDetails = (clientID: string) => {
  const clientInfo = CLIENTS.find((client) => client.id === clientID);
  return clientInfo || null;
};

const ClientDetailsProvider: FC = ({ children }) => {
  const { clientID }: IHistoryParams = useParams();

  const [clientDetailData, setClientDetailData] =
    useState<ClientDetailsType | null>(() => {
      return getClientDetails(clientID);
    });

  const updateData = (clientStateData: ClientDetailsType) => {
    setClientDetailData(clientStateData);
  };

  const updateNotes = (notes: string) => {
    if (clientDetailData)
      updateData({
        ...clientDetailData,
        clientNotes: notes,
      });
  };

  const updateIntakeProfile = (
    intakeFormData: IntakeFormType[] | undefined
  ) => {
    if (clientDetailData)
      updateData({
        ...clientDetailData,
        intakeForm: intakeFormData,
      });
  };

  return (
    <ClientDetailsContext.Provider
      value={{
        clientDetailData,
        updateNotes,
        updateIntakeProfile,
      }}
    >
      {children}
    </ClientDetailsContext.Provider>
  );
};

export default ClientDetailsProvider;

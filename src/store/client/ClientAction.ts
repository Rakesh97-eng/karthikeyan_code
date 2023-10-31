import { Appointment } from '../../types/services/Appointment';
import { PaginationData } from '../../types/services/Common';
import { IHealthIntake } from '../../types/services/HealthIntake';
import { Note } from '../../types/services/Note';
import { Product } from '../../types/services/product';
import { Treatment } from '../../types/services/Treatment';
import { ClientDispatch, ClientState } from '../../types/store/client';
import { CLIENT_ACTION_TYPES } from './types';

export const updateClient = (
  clientDetail: Partial<ClientState>
): ClientDispatch => {
  return {
    type: CLIENT_ACTION_TYPES.UPDATE_CLIENT,
    payload: {
      ...clientDetail,
    },
  };
};

export const updateTreatment = (
  updatedTreatment: Treatment[]
): ClientDispatch => {
  return {
    type: CLIENT_ACTION_TYPES.UPDATE_TREATMENT,
    payload: { pastTreatments: updatedTreatment },
  };
};

export const updateNote = (
  updatedNote: string | null | undefined
): ClientDispatch => {
  return {
    type: CLIENT_ACTION_TYPES.UPDATE_NOTE,
    payload: { trRecentNotesForCustomer: updatedNote },
  };
};

export const updatePastPurchasedProduct = (
  products: Product[]
): ClientDispatch => {
  return {
    type: CLIENT_ACTION_TYPES.UPDATE_PAST_PURCHASED_PRODUCT,
    payload: { pastPurchasedProducts: products },
  };
};

export const updateProductsToAvoid = (
  products: PaginationData<Product>
): ClientDispatch => {
  return {
    type: CLIENT_ACTION_TYPES.UPDATE_PRODUCTS_TO_AVOID,
    payload: { productsToAvoid: products },
  };
};

export const updateKnackRecords = (
  knackRecords: Treatment[]
): ClientDispatch => {
  return {
    type: CLIENT_ACTION_TYPES.UPDATE_KNACK_RECORDS,
    payload: { knackRecords: knackRecords },
  };
};

export const updateAppointments = (
  appointments: Appointment[]
): ClientDispatch => {
  return {
    type: CLIENT_ACTION_TYPES.UPDATE_APPOINTMENT,
    payload: { appointments: appointments },
  };
};

export const updateClientNote = (clientNotes: Note[]): ClientDispatch => {
  return {
    type: CLIENT_ACTION_TYPES.UPDATE_CLEINT_NOTES,
    payload: { note: clientNotes },
  };
};

export const updateMappedHealthIntake = (
  mappedHealthIntake: IHealthIntake
): ClientDispatch => {
  return {
    type: CLIENT_ACTION_TYPES.UPDATE_HEALTH_INTAKE,
    payload: { mappedHealthIntake: mappedHealthIntake },
  };
};

export const refreshClientEndpoint = (refresh: boolean): ClientDispatch => {
  return {
    type: CLIENT_ACTION_TYPES.REFRESH_CLIENT_ENDPOINT,
    payload: { refreshClientEndpoints: refresh },
  };
};

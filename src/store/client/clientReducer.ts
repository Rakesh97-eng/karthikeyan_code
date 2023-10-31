import { ClientDispatch, ClientState } from '../../types/store/client';
import { CLIENT_ACTION_TYPES } from './types';

const clientReducer = (
  state: ClientState,
  action: ClientDispatch
): ClientState => {
  switch (action.type) {
    case CLIENT_ACTION_TYPES.UPDATE_CLIENT:
      if (action.payload) {
        return { ...state, ...action.payload };
      } else {
        return state;
      }
    case CLIENT_ACTION_TYPES.UPDATE_TREATMENT:
      if (action?.payload?.pastTreatments) {
        return { ...state, pastTreatments: action.payload.pastTreatments };
      } else {
        return state;
      }
    case CLIENT_ACTION_TYPES.UPDATE_NOTE:
      return {
        ...state,
        trRecentNotesForCustomer: action.payload?.trRecentNotesForCustomer,
      };
    case CLIENT_ACTION_TYPES.UPDATE_PAST_PURCHASED_PRODUCT:
      if (action.payload?.pastPurchasedProducts) {
        return {
          ...state,
          pastPurchasedProducts: action.payload.pastPurchasedProducts,
        };
      } else {
        return state;
      }
    case CLIENT_ACTION_TYPES.UPDATE_PRODUCTS_TO_AVOID:
      if (action.payload?.productsToAvoid) {
        return {
          ...state,
          productsToAvoid: action.payload.productsToAvoid,
        };
      } else {
        return state;
      }
    case CLIENT_ACTION_TYPES.UPDATE_KNACK_RECORDS:
      if (action.payload?.knackRecords) {
        return {
          ...state,
          knackRecords: action.payload.knackRecords,
        };
      } else {
        return state;
      }
    case CLIENT_ACTION_TYPES.UPDATE_APPOINTMENT:
      if (action.payload?.appointments) {
        return {
          ...state,
          appointments: action.payload.appointments,
        };
      } else {
        return state;
      }
    case CLIENT_ACTION_TYPES.UPDATE_CLEINT_NOTES:
      if (action.payload?.note) {
        return {
          ...state,
          note: action.payload.note,
        };
      } else {
        return state;
      }
    case CLIENT_ACTION_TYPES.UPDATE_HEALTH_INTAKE:
      if (action.payload?.mappedHealthIntake) {
        return {
          ...state,
          mappedHealthIntake: action.payload.mappedHealthIntake,
        };
      } else {
        return state;
      }

    case CLIENT_ACTION_TYPES.REFRESH_CLIENT_ENDPOINT:
      if (action.payload?.refreshClientEndpoints) {
        return {
          ...state,
          refreshClientEndpoints: action.payload.refreshClientEndpoints,
        };
      } else {
        return {
          ...state,
          refreshClientEndpoints: false,
        };
      }
    default:
      return state;
  }
};
export default clientReducer;

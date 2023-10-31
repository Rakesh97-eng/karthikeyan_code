import { CLIENT_ACTION_TYPES } from '../../store/client/types';
import { ProfileTag } from '../clientProfile';
import { Appointment } from '../services/Appointment';
import { PaginationData } from '../services/Common';
import { HealthIntake } from '../../types/clientProfile';
import { GiftCard } from '../services/GiftCard';
import { HealthAnswer } from '../services/HealthAnswer';
import { Membership } from '../services/Membership';
import { Note } from '../services/Note';
import { Order } from '../services/Order';
import { PaymentMethod } from '../services/PaymentMethod';
import { Product } from '../services/product';
import { Treatment } from '../services/Treatment';
import { IHealthIntake } from '../services/HealthIntake';

export interface ClientState {
  id: string;
  firstName: string;
  lastName: string;
  name?: string;
  email?: string;
  phone?: string;
  profileImageUrl: string;
  note?: Note[];
  tag?: ProfileTag[];
  pastTreatments?: Treatment[] | null;
  appointments?: Appointment[];
  giftCard?: GiftCard[];
  healthAnswer?: HealthAnswer[];
  membership?: Membership[];
  order?: Order[];
  paymentMethod?: PaymentMethod[];
  pastPurchasedProducts?: Product[];
  productsToAvoid?: PaginationData<Product>;
  appointmentsCount?: string;
  lastVisit?: string;
  enhancementRate?: string;
  productAttritionRate?: string;
  trRecentNotesForCustomer?: string | null;
  clientNotesUpdatedAt?: string;
  knackRecords?: Treatment[] | null;
  location?: { name: string };
  healthIntake?: HealthIntake[];
  keyAttributes?: string[];
  mappedHealthIntake?: IHealthIntake;
  pastTreatmentData?: { next_time_enhancement: string[] };
  refreshClientEndpoints?: boolean;
  originalEmail: string;
}

export interface ClientDispatch {
  type: CLIENT_ACTION_TYPES;
  payload?: Partial<ClientState>;
}
export interface TClientContext {
  clientState: ClientState;
  clientDispatch: (action: ClientDispatch) => void;
}

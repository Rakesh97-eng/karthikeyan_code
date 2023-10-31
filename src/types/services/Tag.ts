import { Source } from './Common';

export interface Tag {
  id: string;
  source: Source;
  sourceId: null | string;
  context: Context;
  sourceContextId: string;
  contextId: string;
  name: string;
  symbol: null | string;
}

export enum Context {
  Customer = 'customer',
  Appointment = 'appointment',
}

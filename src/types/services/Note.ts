import { Source } from './Common';

export interface Note {
  id: string;
  source: Source;
  sourceId: string;
  context: string;
  sourceContextId: string | null;
  contextId: string | null;
  text: string;
  createdAt: string;
  updatedAt: string;
  context_id: {
    id: string;
  };
  type: string;
}

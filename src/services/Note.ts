import { Axios } from './_axios';
import { Note } from '../types/services/Note';
import { DocumentObject } from 'jsonapi-fractal';

class NotesApi extends Axios<Note> {
  /**
   * post notes
   * @param data {Partial<Note>}
   * @returns _ {PaginationData<Note>} array of Note
   */
  async createNotes(data: DocumentObject) {
    const serializedData = await this.postRequest(`note`, data);
    return this.deserializeResponse(serializedData, false);
  }
  /**
   * patch note
   * @param id {String} note id
   * @param data {Partial<Note>}
   * @returns _ {PaginationData<Note>} array of Treatments
   */
  async patchNotes(id: string, data: DocumentObject) {
    const serializedData = await this.patchRequest(`note/${id}`, data);

    return serializedData;
  }
}

export const NotesService = new NotesApi();

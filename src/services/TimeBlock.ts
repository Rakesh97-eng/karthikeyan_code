import { Axios } from './_axios';
import { TimeBlock } from '../types/services/TimeBlock';
import { TimeBlockFilterOptions } from '../types/services/Common';

/**
 * TimeBlock resource
 * API call directed to /time-block
 */
class TimeBlockApi extends Axios<TimeBlock> {
  /**
   * getTimeBlocks
   * @param date
   * @param location_id
   * @param filterOptions {TimeBlockFilterOptions} boulevard_location_id, boulevard_staff_id
   * @returns _ {PaginationData<TimeBlock>} array of TimeBlocks
   */
  async getTimeBlocks(filterOptions?: TimeBlockFilterOptions) {
    const serializedData = await this.getRequest(`time-block`, {
      filter: filterOptions,
    });
    return this.deserializeResponse(serializedData, true);
  }
}

export const TimeBlockService = new TimeBlockApi();

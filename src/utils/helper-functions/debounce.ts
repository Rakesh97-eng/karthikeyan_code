type Callback<P> = (...args: Array<P>) => void;
/**
 * debounceInput
 * this will update the state after the input is stopped
 * @param cb ( Callback ) - callback function that will update the state after the delay
 * @param [delay=300] ( number ) - delay alloted before the callback is called
 * @returns (...args: any[]) => void
 */
export const debounceInput = <T>(cb: Callback<T>, delay = 300) => {
  let timeout: NodeJS.Timeout;
  return (...args: Array<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

import d from 'dayjs';

/**
 *
 * @param t current timestamp
 * @returns diff of now and provided timestamp in millisecond
 */
export const calcRemindedTime = (t: number) => d(t * 1000).diff(d(), 'second');

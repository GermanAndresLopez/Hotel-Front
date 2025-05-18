/**
 *
 * @param {number} ms delay amount
 * @returns
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

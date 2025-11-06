/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { parsePhoneNumberFromString } from 'libphonenumber-js';

/**
 * Validates a phone number for a given country code.
 * 
 * @param phone - The phone number string to validate.
 * @param countryCode - The ISO 3166-1 alpha-2 country code (e.g., "US", "IN").
 * @returns boolean - Whether the phone number is valid.
 */

// utils.js
export const getFlagEmoji = (countryCode:any) => {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char: { charCodeAt: () => number; }) => 
      String.fromCodePoint(127397 + char.charCodeAt())
    );
};


export const isValidPhoneNumber = async (phone: string, countryCode: any): Promise<boolean> => {
  try {
    
    const parsed = await parsePhoneNumberFromString(phone, countryCode);
    return parsed?.isValid() ?? false;
  } catch (error) {
    return false;
  }
};


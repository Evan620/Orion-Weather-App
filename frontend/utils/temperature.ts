import { TemperatureUnit } from '../types/weather';

/**
 * Convert temperature from kelvin to the specified unit
 * @param kelvin Temperature in Kelvin
 * @param unit Desired unit (celsius or fahrenheit)
 * @returns Temperature in the requested unit
 */
export const convertFromKelvin = (kelvin: number, unit: TemperatureUnit): number => {
  if (unit === 'celsius') {
    return kelvin - 273.15;
  } else {
    return (kelvin - 273.15) * 9/5 + 32;
  }
};

/**
 * Format temperature with the appropriate unit symbol
 * @param temp Temperature value
 * @param unit Unit of temperature (celsius or fahrenheit)
 * @returns Formatted temperature string with unit symbol
 */
export const formatTemperature = (temp: number, unit: TemperatureUnit): string => {
  const roundedTemp = Math.round(temp);
  return `${roundedTemp}°${unit === 'celsius' ? 'C' : 'F'}`;
};
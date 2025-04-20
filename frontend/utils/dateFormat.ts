/**
 * Format a UNIX timestamp to a human-readable date string
 * @param timestamp UNIX timestamp in seconds
 * @returns Formatted date string (e.g., "Monday, 27 Nov")
 */
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short'
  });
};

/**
 * Format a UNIX timestamp to a time string
 * @param timestamp UNIX timestamp in seconds
 * @returns Formatted time string (e.g., "14:30")
 */
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};
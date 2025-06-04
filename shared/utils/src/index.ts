// Shared utility functions will go here
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

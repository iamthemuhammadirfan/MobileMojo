/**
 * Utility Functions
 * Following SoC: Helper/utility functions separated from business logic
 */

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString();
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

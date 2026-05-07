export const isWithinDays = (dateString: string, days: number): boolean => {
  const date = new Date(dateString);
  const now = new Date();

  const diff = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

  return diff <= days;
};
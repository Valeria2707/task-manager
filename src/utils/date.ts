export const isValidDate = (date?: string): boolean =>
  typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date);

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
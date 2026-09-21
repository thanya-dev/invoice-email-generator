// Add 14 calendar days, then move to the nearest Friday (at most 3 days).
export const getDefaultDeadlineDate = (today = new Date()) => {
  const deadline = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);
  const offset = ((5 - deadline.getDay() + 10) % 7) - 3;
  deadline.setDate(deadline.getDate() + offset);

  const day = String(deadline.getDate()).padStart(2, '0');
  const month = String(deadline.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}/${deadline.getFullYear()}`;
};

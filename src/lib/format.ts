export const formatMoney = (value: string | number, currency = "৳") => {
  const num = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(num)) return `${currency}0`;
  return `${currency}${num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

export const formatDate = (value: string | Date) => {
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const toNumber = (value: string | number) =>
  typeof value === "string" ? Number(value) : value;

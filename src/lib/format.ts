export const formatMoney = (
  value: string | number | null | undefined,
  currency = "৳",
) => {
  if (value === null || value === undefined || value === "") {
    return `${currency}0`;
  }

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

export const toNumber = (value: string | number | null | undefined) => {
  if (value === null || value === undefined || value === "") return 0;
  const num = typeof value === "string" ? Number(value) : value;
  return Number.isNaN(num) ? 0 : num;
};

/** Balance from API may use netBalance or effectiveNet */
export const getNetBalance = (entry: {
  netBalance?: number;
  effectiveNet?: number;
}) => entry.netBalance ?? entry.effectiveNet ?? 0;

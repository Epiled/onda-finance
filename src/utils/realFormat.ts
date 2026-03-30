export const realFormat = (value: string) => {
  const cleanValue = value.replace(/[^0-9.]/g, "");

  if (!cleanValue || isNaN(parseFloat(cleanValue))) {
    return "";
  }

  const numericValue = parseFloat(cleanValue);

  const formattedValue = numericValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedValue;
};
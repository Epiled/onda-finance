export const brazilianDate = (value: string) => {
  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("pt-BR");
};
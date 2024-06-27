export const loadData = async () => {
  const response = await fetch('/data/agriculture-data.json');
  const data = await response.json();
  return data;
};
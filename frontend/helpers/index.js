const pad = value => ((value < 10) ? `0${value}` : value);

export const isMobile = () => window.innerWidth <= 768;

export const buildOptionList = list => list.map(item => ({
  value: item.id,
  label: item.name,
}));

export const getActiveLocation = (location) => {
  const currentLocation = window.location.hash;
  return currentLocation.startsWith(`#/${location}`);
};

export const formatDate = (date) => {
  if (date) {
    const value = new Date(date);
    const year = value.getFullYear();
    const month = value.getMonth() + 1;
    const day = value.getDate();
    return `${pad(day)}/${pad(month)}/${year}`;
  }
  return '';
};

export const formatAmount = (list = []) => list.length;

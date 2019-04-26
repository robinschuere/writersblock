export const isMobile = () => window.innerWidth <= 768;

export const buildOptionList = list => list.map(item => ({
  value: item.id,
  label: item.name,
}));

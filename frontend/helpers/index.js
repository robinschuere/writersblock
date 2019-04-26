export const isMobile = () => window.innerWidth <= 768;

export const buildOptionList = list => list.map(item => ({
  value: item.id,
  label: item.name,
}));

export const getActiveLocation = (location) => {
  const currentLocation = window.location.hash;
  return currentLocation.startsWith(`#/${location}`);
};

const updateStateField = (setState, field) => (value) => {
  setState({ fields: { [field]: value } });
};

const getFieldFunctionName = field => `on${field}Change`;

export const getFieldStateFunctionName = (comp, field) => comp[getFieldFunctionName(field)];

export const enrichStateFieldUpdates = (component) => {
  Object.keys(component.state.fields).forEach((field) => {
    component[getFieldFunctionName(field)] = updateStateField(component.setState, field); // eslint-disable-line
  });
};

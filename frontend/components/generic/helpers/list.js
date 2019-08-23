import {
  remove,
} from 'diacritics';

const getSearchStringFields = search => search
  .split(' ')
  .filter(x => x)
  .map(t => remove(t.toLowerCase().replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '')));

export const getValue = (item, key, column, i18n) => {
  if (column.formatFields) {
    return column.format(...column.formatFields.map(f => item[f]), i18n);
  }
  if (column.format) {
    return column.format(item[column.fieldName], i18n);
  }
  return column ? item[column.fieldName] : item[key];
};

export const getSearchValues = (items, columns, i18n) => {
  const searchValues = items.map((item) => {
    const values = [];
    columns.forEach((column) => {
      const value = column ? getValue(item, null, column, i18n) : item[column.fieldName];
      const splittedValues = value
        ? value
          .toString()
          .split(' ')
          .filter(x => x)
          .map(t => remove(t.toLowerCase().replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '')))
        : '';
      values.push(...splittedValues);
    });
    return {
      id: item.id,
      values,
    };
  });
  return searchValues;
};

export const filterItems = (items, searchValues, search) => {
  const searchFields = search ? getSearchStringFields(search) : [];
  const filteredItems = items
    .filter((item) => {
      if (!search) {
        return true;
      }
      const searchValue = searchValues.find(f => f.id === item.id);
      const foundValues = searchValue.values
        .filter((f) => {
          const foundAmount = searchFields.filter(v => f.search(v) > -1).length;
          return foundAmount > 0;
        });
      return foundValues.length >= searchFields.length;
    });
  return filteredItems;
};

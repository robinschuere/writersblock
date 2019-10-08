import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import { constants } from '../../constants';
import { getValue, filterItems, getSearchValues } from './helpers/list';
import updateSearch from '../../actions/search';

import Button from './button';
import SearchField from './searchField';

const List = ({
  computedMatch, columns, mobile, items, linkToPath, dispatch, onView,
  onRemove, onAdd, customActions, i18n, noView, noSearch, searchStore,
}) => {
  const { path } = computedMatch || {};
  const [search, setSearch] = useState(noSearch ? '' : searchStore[path]);
  const searchValues = getSearchValues(items, columns, i18n);
  const filteredItems = filterItems(items, searchValues, search);

  const handleSearch = (value) => {
    updateSearch(path, value, dispatch);
    setSearch(value);
  };

  const renderColumn = (column) => {
    const headerStyle = { textAlign: 'center', minWidth: '75px' };
    if (column.renderColumnHeader) {
      return (
        <th style={headerStyle}>
          {column.renderColumnHeader}
        </th>
      );
    }
    return mobile
      ? (<th style={headerStyle} key={column.columnName}><h4>{column.columnName}</h4></th>)
      : (<th style={headerStyle} key={column.columnName}><h3>{column.columnName}</h3></th>);
  };

  const renderValue = (column, item) => {
    if (column.renderField) {
      return <td key={`value-${item.id}-${column.fieldName}`}>{column.renderField(item)}</td>;
    }
    return <td key={`value-${item.id}-${column.fieldName}`}><p>{getValue(item, null, column, i18n)}</p></td>;
  };

  const searchField = (
    <SearchField value={search} onChange={debounce(handleSearch, 200)} i18n={i18n} />
  );

  return (
    <Fragment>
      {mobile && (
        <div className="form-group">
          {!noSearch && searchField}
        </div>
      )}

      <table className="table table-sm table-hover table-condensed">
        <thead>
          <tr key="list.head">
            {(onAdd || !noView) && (
              <th key="column-add">
                {onAdd && (
                  <Button icon="plus" onClick={onAdd}>
                    {!mobile && i18n.t('generic.add')}
                  </Button>
                )}
              </th>
            )}

            {columns.filter(f => !f.searchableField).map((column, index) => (
              index > (constants.mobileListColumns - 1) && mobile
                ? null
                : renderColumn(column)
            ))}
            <th key="column-remove" colSpan={customActions ? [onRemove, ...customActions].filter(x => x).length : 1}>
              {(!mobile && !noSearch) && searchField}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredItems && filteredItems.length > 0 && filteredItems.map(item => (
            <tr key={`list.item.${item.id}`}>
              {(onAdd || !noView) && (
                <td key={`list.item.${item.id}-view`}>
                  {!noView && (
                    <Button color="green" icon="binoculars" linkTo={!onView ? `${linkToPath}/${item.id}` : undefined} onClick={() => (onView ? onView(item.id) : undefined)}>
                      {!mobile && i18n.t('generic.view')}
                    </Button>
                  )}
                </td>
              )}

              {columns.map((column, index) => (
                index > (constants.mobileListColumns - 1) && mobile
                  ? null
                  : renderValue(column, item)
              ))}

              {onRemove && (
                <td key={`list.item.${item.id}-remove`} className="text-right">
                  <Button color="red" icon="trash" onClick={() => { onRemove(item); }}>
                    {!mobile && i18n.t('generic.delete')}
                  </Button>
                </td>
              )}
              {customActions && customActions.length > 0 && (
                customActions.map(e => (
                  <td key={`list.item.${item.id}-custom-${e.text}`} className="text-right">
                    <Button color={e.color} icon={e.icon} onClick={() => { e.action(item); }}>
                      {!mobile && e.text}
                    </Button>
                  </td>
                ))
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginBottom: 150 }} />
    </Fragment>
  );
};

List.propTypes = {
  /* Defines the route where the list is running. This for search functionality */
  computedMatch: PropTypes.object.isRequired,
  /* Defines the searchStore */
  searchStore: PropTypes.object.isRequired,
  /* Defines the dispatch functionality for altering the searchStore */
  dispatch: PropTypes.func.isRequired,
  /* Defines if the list will show less columns (due to device width) */
  mobile: PropTypes.bool.isRequired,
  /* Defines if the view button is invisible */
  noView: PropTypes.bool,
  /* Defines if the search field invisible */
  noSearch: PropTypes.bool,
  /* the translation object */
  i18n: PropTypes.object.isRequired,
  /* The columns to show */
  columns: PropTypes.arrayOf(PropTypes.shape({
    /* The fieldname of the column => This points to the list of items object property key */
    fieldName: PropTypes.string,
    /* The name of the column to be shown in the header */
    columnName: PropTypes.string,
    /* This boolean will define a field that is not viewable but is searchable */
    searchableField: PropTypes.bool,
    /* a function to format the item value. */
    format: PropTypes.func,
    /* Renders the parents definition of the item value instead of standardized formatting */
    renderField: PropTypes.func,
    /* used in conjunction with format. Defines other item property values to format the value */
    formatFields: PropTypes.arrayOf(PropTypes.string.isRequired),
  })).isRequired,
  /* The array of items that is searchable and viewable */
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  /* Defines the viewpath and navigation to the view screens */
  linkToPath: PropTypes.string,
  /* A custom function to override the view action */
  onView: PropTypes.func,
  /* A function for adding new items */
  onAdd: PropTypes.func,
  /* A function to remove an existing value */
  onRemove: PropTypes.func,
  /* An array of custom actions that are to be rendered next to the remove button */
  customActions: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    text: PropTypes.node.isRequired,
  })),
};

List.defaultProps = {
  linkToPath: '',
  noView: false,
  noSearch: false,
  onView: undefined,
  onAdd: undefined,
  onRemove: undefined,
  customActions: undefined,
};

export default List;

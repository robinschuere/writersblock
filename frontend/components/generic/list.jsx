import React from 'react';
import PropTypes from 'prop-types';
import constants from '../../constants';

import Button from './button';

const List = ({
  columns, mobile, items, linkToPath, onRemove, onAdd, customActions, i18n, noView,
}) => {
  const showValue = (column, item) => {
    if (column.format) {
      if (column.formatFields) {
        return column.format(...column.formatFields.map(f => item[f]), i18n);
      }
      return column.format(item[column.fieldName], i18n);
    }
    return item[column.fieldName];
  };

  const renderColumn = column => (mobile
    ? <th key={column.columnName}><h5>{column.columnName}</h5></th>
    : <th key={column.columnName}><h4>{column.columnName}</h4></th>);

  const renderValue = (column, item) => {
    if (column.renderField) {
      return <td key={`value-${item.id}-${column.fieldName}`}>{column.renderField(item)}</td>;
    }
    return <td key={`value-${item.id}-${column.fieldName}`}><p>{showValue(column, item)}</p></td>;
  };

  return (
    <table className="table table-sm table-hover table-condensed">
      <thead>
        <tr key="list.head">
          { onAdd && (
            <th key="column-add">
              <Button icon="plus" onClick={onAdd}>
                {!mobile && i18n.t('generic.add')}
              </Button>
            </th>
          )}
          {columns.map((column, index) => (
            index > (constants.mobileListColumns - 1) && mobile
              ? null
              : renderColumn(column)
          ))}
          {onRemove && <th key="column-remove" />}
          {customActions && customActions.length && customActions.map(e => (<th key={`column-customAction-${e.text}`} />))}
        </tr>
      </thead>
      <tbody>
        {items && items.length > 0 && items.map(item => (
          <tr key={`list.item.${item.id}`}>
            { !noView && (
              <td>
                <Button color="green" icon="binoculars" linkTo={`${linkToPath}/${item.id}`}>
                  {!mobile && i18n.t('generic.view')}
                </Button>
              </td>
            )}

            {columns.map((column, index) => (
              index > (constants.mobileListColumns - 1) && mobile
                ? null
                : renderValue(column, item)
            ))}

            { onRemove && (
              <td>
                <Button color="red" icon="trash" onClick={() => { onRemove(item); }}>
                  {!mobile && i18n.t('generic.delete')}
                </Button>
              </td>
            )}
            { customActions && customActions.length > 0 && (
              customActions.map(e => (
                <td>
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
  );
};

List.propTypes = {
  mobile: PropTypes.bool.isRequired,
  noView: PropTypes.bool,
  i18n: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    fieldName: PropTypes.string,
    columnName: PropTypes.string,
    format: PropTypes.func,
    renderField: PropTypes.func,
    formatFields: PropTypes.arrayOf(PropTypes.string.isRequired),
  })).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  linkToPath: PropTypes.string,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  customActions: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    text: PropTypes.node.isRequired,
  })),
};

List.defaultProps = {
  linkToPath: '',
  noView: false,
  onAdd: undefined,
  onRemove: undefined,
  customActions: undefined,
};

export default List;

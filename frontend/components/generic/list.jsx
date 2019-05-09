import React from 'react';
import PropTypes from 'prop-types';
import constants from '../../constants';

import Button from './button';

const List = ({
  columns, mobile, items, linkToPath, onRemove, onAdd,
}) => {
  const showValue = (column, item) => {
    if (column.format) {
      return column.format(item[column.fieldName]);
    }
    return item[column.fieldName];
  };

  return (
    <table className="table table-hover table-condensed">
      <thead>
        <tr key="list.head">
          { onAdd && (
            <th>
              <Button onClick={onAdd}>Add</Button>
            </th>
          )}
          {columns.map((column, index) => (
            index > (constants.mobileListColumns - 1) && mobile
              ? null
              : <th><h4>{column.columnName}</h4></th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items && items.length > 0 && items.map(item => (
          <tr key={`list.item.${item.id}`}>
            <td>
              <Button color="green" linkTo={`${linkToPath}/${item.id}`}>
                Edit
              </Button>
            </td>

            {columns.map((column, index) => (
              index > 2 && mobile
                ? null
                : <td><h5>{showValue(column, item)}</h5></td>
            ))}

            { onRemove && (
              <td>
                <Button color="red" onClick={() => { onRemove(item); }}>
                  Remove
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

List.propTypes = {
  mobile: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    fieldName: PropTypes.string,
    columnName: PropTypes.string,
    format: PropTypes.func,
  })).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  linkToPath: PropTypes.string.isRequired,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
};

List.defaultProps = {
  onAdd: undefined,
  onRemove: undefined,
};

export default List;

import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ level, message, onClose }) => {
  const getAlertClass = () => {
    let s = 'alert ';
    switch (level) {
      case 'warn':
        s += 'alert-warning';
        break;
      case 'error':
        s += 'alert-danger';
        break;
      default:
        s += 'alert-info';
        break;
    }

    return s;
  };

  return (
    <div style={{ position: 'sticky', top: 60, zIndex: 999 }}>
      <div className={getAlertClass()} role="alert">
        {message}
        <button type="button" className="close" onClick={onClose} data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

Alert.propTypes = {
  level: PropTypes.oneOf(['warn', 'error', 'info']),
  message: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

Alert.defaultProps = {
  level: 'info',
};

export default Alert;

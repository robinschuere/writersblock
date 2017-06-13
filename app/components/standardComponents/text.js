import React from 'react';
import PropTypes from 'prop-types';

class Text extends React.Component {
  render(){
    return(
      <div className="form-group">
        <label className="col-sm-2" htmlFor={`text.${this.props.text}`}></label>
        <div className="col-sm-10">
          <p className="form-label" id={`text.${this.props.text}`}>{this.props.text}</p>
        </div>
      </div>
    );
  }
};

Text.propTypes = {
  text: PropTypes.string,
}

export default Text;
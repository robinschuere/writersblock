import React from 'react';
import PropTypes from 'prop-types';
import Button from './button';

class Form extends React.Component {
  render() {
    return (
      <div className="panel-body" >
        <form>
          <h3>{this.props.title}</h3>
          {this.props.children}
          {this.props.onSave && <Button buttonType='isSave' onClick={this.props.onSave}>{"Save"}</Button>}
        </form>
      </div>
    );
  }
};

Form.propTypes = {
  title: PropTypes.string,
  onSave: PropTypes.func,
}

export default Form;
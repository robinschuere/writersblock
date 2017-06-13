import React from 'react';
import PropTypes from 'prop-types';
import Button from './button';

class Form extends React.Component {
  render() {
    return (
      <div className="panel-body" >
        <form className="form-horizontal">
          <h3>{this.props.title}</h3>
          {this.props.children}
          <Button
            isEdit={this.props.isEdit}
            isSave={this.props.isSave}
            isLink={!!this.props.linkTo}
            linkTo={this.props.linkTo}
            onClick={this.props.onSave}>
            {this.props.isEdit && "Edit"}
            {this.props.isSave && "Save"}
          </Button>
        </form>
      </div>
    );
  }
};

Form.propTypes = {
  title: PropTypes.string,
  onSave: PropTypes.func,
  linkTo: PropTypes.string,
  isEdit: PropTypes.bool,
  isSave: PropTypes.bool,
}

export default Form;
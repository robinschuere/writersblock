import React from 'react';
import PropTypes from 'prop-types';

class Icon extends React.Component{
  render(){
    return (
      <i className={`glyphicon glyphicon-${this.props.name} `}/>
    );
  }
}

Icon.propTypes = {
  name: PropTypes.string,
}

export default Icon;
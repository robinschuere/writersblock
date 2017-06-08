import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NavBarContainer extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <ul className="nav navbar-nav">
            <li><Link to='/'><h3>Writers~~Block</h3></Link></li>
          </ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBarContainer)

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../standardComponents/button';

class NavBarContainer extends React.Component {
  constructor() {
    super();
    this.state = { collapsed: true }
  }
  handleToggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" onClick={this.handleToggle}>
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">Writers~~Block</Link>
          </div>
          <div className={this.state.collapsed ? "collapse navbar-collapse" : "collapse-in navbar-collapse" }>
            <ul className="nav navbar-nav">
              {this.props.loggedin && <li><Link onClick={this.handleToggle} to="/character">Characters</Link></li>}
              {this.props.loggedin && <li><Link onClick={this.handleToggle} to="/erase">Erase</Link></li>}
              {!this.props.loggedin && <li><Link onClick={this.handleToggle} to="/register">Register</Link></li>}
            </ul>
          </div>
        </div>
      </nav >
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedin: state.pouchState.userLoggedIn
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

import React from 'react';
import { connect } from 'react-redux';
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
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" onClick={this.handleToggle}>
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Button isLink linkTo="/" isNavBar>WrItErS~~BlOcK</Button>
          </div>
          <div className={this.state.collapsed ? "collapse navbar-collapse" : "collapse-in navbar-collapse" }>
            <ul className="nav navbar-nav">
              <li>{"this is a test"}</li>
            </ul>
          </div>
        </div>
      </nav >
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

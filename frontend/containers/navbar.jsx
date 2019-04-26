import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = { collapsed: true };
  }

  handleToggle = () => {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  }

  render() {
    const { collapsed } = this.state;
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" onClick={this.handleToggle}>
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link className="navbar-brand" to="/">Writers~~Block</Link>
          </div>
          <div className={collapsed ? 'collapse navbar-collapse' : 'collapse-in navbar-collapse'}>
            <ul className="nav navbar-nav">
              <li><Link onClick={this.handleToggle} to="/character">Characters</Link></li>
              <li><Link onClick={this.handleToggle} to="/erase">Erase</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;

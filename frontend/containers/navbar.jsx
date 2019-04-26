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
      <div style={{ position: 'sticky', top: 0, zIndex: 999 }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" onClick={this.handleToggle} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <Link className="navbar-brand" to="/">
            Writersblock
            <small> ~ Writing your story ~ </small>
          </Link>

          <div className={collapsed ? 'collapse navbar-collapse' : 'collapse-in navbar-collapse'}>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" onClick={this.handleToggle} to="/stories">Stories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={this.handleToggle} to="/login">Login</Link>
              </li>
            </ul>
          </div>

        </nav>
      </div>
    );
  }
}

export default NavBar;

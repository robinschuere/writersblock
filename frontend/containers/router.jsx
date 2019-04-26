import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';

import { isMobile } from '../helpers';

import NavBar from './navbar';
import Footer from './footer';
import Home from './home';
import NotFound from './notFound';

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: true,
    };
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({ mobile: isMobile() });
  }

  render() {
    const { mobile } = this.state;
    return (
      <HashRouter>
        <div>
          <NavBar mobile={mobile} />
          <div className="page-header">
            <h1>
              Writers Block
              {' '}
              <small>~ The app for building better stories ~</small>
            </h1>
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="*" component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </HashRouter>
    );
  }
}

export default Router;

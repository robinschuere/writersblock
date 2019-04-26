import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';

import { isMobile } from '../helpers';

import NavBar from './navbar';
import Footer from './footer';
import Home from './home';
import NotFound from './notFound';
import About from './about';
import Contact from './contact';
import Login from './login';
import Register from './register';
import Stories from './stories';

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
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />

            <Route path="/stories" component={Stories} />

            <Route path="*" component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </HashRouter>
    );
  }
}

export default Router;

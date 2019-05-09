import React from 'react';

import withNavBar from '../components/hoc/withNavBar';

const Home = () => (
  <div className="container">
    <h4>WritersBlock</h4>
    <p>As you might see, this page is still under construction.</p>
  </div>
);

export default withNavBar(Home);

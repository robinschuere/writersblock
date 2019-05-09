import React from 'react';

import WithNavBar from '../components/hoc/withNavBar';

const About = () => (
  <div className="container">
    <h4>Robin Schuerewegen</h4>
    <p>As you might see, this page is still under construction.</p>
  </div>
);

export default WithNavBar(About);

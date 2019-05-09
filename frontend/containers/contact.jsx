import React from 'react';

import WithNavBar from '../components/hoc/withNavBar';

const Contact = () => (
  <div className="container">
    <h4>Contact me</h4>
    <p>For contacting matters, I refer to my github page.</p>
  </div>
);

export default WithNavBar(Contact);

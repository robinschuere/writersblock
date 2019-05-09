import React from 'react';

import StoryList from '../components/storyList';
import WithNavBar from '../components/hoc/withNavBar';

const Stories = props => (
  <div className="container">
    <h4>Stories</h4>
    <p>As you might see, this page is still under construction.</p>
    <StoryList {...props} />
  </div>
);

export default WithNavBar(Stories);

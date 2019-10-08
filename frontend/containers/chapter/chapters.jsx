import React from 'react';
import PropTypes from 'prop-types';

import ChapterList from '../../components/chapterList';
import WithNavBar from '../../components/hoc/withNavBar';

const Chapters = (props) => {
  const { i18n } = props;
  return (
    <div className="container-fluid">
      <h4>{i18n.t('chapter.list.header')}</h4>
      <ChapterList {...props} />
    </div>
  );
};

Chapters.propTypes = {
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(Chapters);

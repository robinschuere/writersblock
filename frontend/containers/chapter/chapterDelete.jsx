import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { removeChapter } from '../../actions/chapter';

import WithNavBar from '../../components/hoc/withNavBar';
import BackAndDeleteBar from '../../components/backAndDeleteBar';

const Chapter = ({
  computedMatch, chapterStore, dispatch, i18n, mobile,
}) => {
  const [completed, setCompleted] = useState(false);
  const { storyId, chapterId } = computedMatch.params;
  const chapter = chapterStore[chapterId];

  const handleClose = () => {
    setCompleted(true);
  };

  const handleDelete = async () => {
    await removeChapter(chapter, dispatch);
  };

  if (completed || !chapter) {
    return <Redirect to={`/stories/${storyId}/chapters`} />;
  }

  return (
    <Fragment>
      <BackAndDeleteBar
        mobile={mobile}
        onAccept={handleDelete}
        onClose={handleClose}
        i18n={i18n}
      />
      <div className="container">
        <h4>{i18n.t('chapter.delete.header', { title: chapter.title })}</h4>
        <p>{i18n.t('chapter.delete.message')}</p>
      </div>
    </Fragment>
  );
};

Chapter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  chapterStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(Chapter);

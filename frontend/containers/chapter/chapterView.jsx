import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

import { getYesNoOptions, isYes } from '../../helpers';
import { getEventsByChapter } from '../../reducers/event';

import WithNavBar from '../../components/hoc/withNavBar';
import LabelAndText from '../../components/generic/labelAndText';
import EventList from '../../components/eventList';
import constants from '../../constants';
import BackAndEditBar from '../../components/backAndEditBar';

const Chapter = (props) => {
  const {
    computedMatch, chapterStore, history, i18n, eventStore, mobile,
  } = props;
  const { storyId, chapterId } = computedMatch.params;
  const chapter = chapterStore[chapterId];
  const [completed, setCompleted] = useState(false);

  const handleChangeChapter = () => {
    history.push(`/stories/${storyId}/chapters/${chapterId}/edit`);
  };

  if (completed) {
    return <Redirect to={`/stories/${storyId}/chapters`} />;
  }

  const events = getEventsByChapter(eventStore, chapterId);

  return (
    <Fragment>
      <BackAndEditBar
        mobile={mobile}
        onAccept={handleChangeChapter}
        onClose={() => setCompleted(true)}
        i18n={i18n}
      />
      <div className="container">
        <form className="form-horizontal">
          <h5>{i18n.t('chapter.edit.header')}</h5>
          <LabelAndText type="text" label={i18n.t('generic.title')} value={chapter.title} />
          <LabelAndText type="textarea" label={i18n.t('generic.authorDescription')} value={chapter.authorDescription} />
          <LabelAndText type="select" label={i18n.t('generic.markdown')} value={chapter.markdown} options={getYesNoOptions(i18n)} />
          <LabelAndText type="number" label={i18n.t('generic.counter')} value={chapter.counter} />
          <LabelAndText type="textarea" label={i18n.t('chapter.text')} value={chapter.text} isMarkDown={isYes(chapter.markdown)} />
          <h4>{i18n.t('chapter.view.events')}</h4>
          <EventList
            {...props}
            storyRoute={constants.storyRoutes.chapters}
            parentId={chapterId}
            events={events}
          />
        </form>
      </div>
    </Fragment>
  );
};

Chapter.propTypes = {
  computedMatch: PropTypes.object.isRequired,
  chapterStore: PropTypes.object.isRequired,
  eventStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(withRouter(Chapter));

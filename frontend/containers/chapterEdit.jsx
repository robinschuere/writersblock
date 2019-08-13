import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { addChapter, updateChapter } from '../actions/chapter';

import Alert from '../components/generic/alert';
import LabelAndField from '../components/generic/labelAndField';
import BackAndSaveBar from '../components/backAndSaveBar';
import WithNavBar from '../components/hoc/withNavBar';
import { getYesNoOptions } from '../helpers';

const ChapterEdit = ({
  computedMatch, chapterStore, dispatch, mobile, i18n,
}) => {
  const { storyId, chapterId } = computedMatch.params;
  const chapter = !chapterId ? {} : chapterStore[chapterId];

  const [title, setTitle] = useState(chapter.title);
  const [authorDescription, setAuthorDescription] = useState(chapter.authorDescription);
  const [text, setText] = useState(chapter.text);
  const [counter, setCounter] = useState(chapter.counter);
  const [markdown, setMarkdown] = useState(chapter.markdown || false);
  const [validatedOnce, setValidatedOnce] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);

  const validateChapter = () => {
    if ([title].filter(x => x).length !== 1) {
      return false;
    }
    return true;
  };

  const addOrUpdate = async () => {
    setValidatedOnce(true);
    if (validateChapter()) {
      const updatedChapter = {
        ...chapter,
        title,
        authorDescription,
        text,
        counter,
        markdown,
      };
      if (updatedChapter.id) {
        await updateChapter(updatedChapter, dispatch);
      } else {
        await addChapter({ ...updatedChapter, storyId }, dispatch);
      }
      setCompleted(true);
    }
    setAlert(true);
    return null;
  };

  if (completed) {
    return <Redirect to={chapterId ? `/stories/${storyId}/chapters/${chapterId}` : `/stories/${storyId}/chapters`} />;
  }

  return (
    <Fragment>
      <BackAndSaveBar
        mobile={mobile}
        onAccept={addOrUpdate}
        onClose={() => setCompleted(true)}
        i18n={i18n}
      />
      <div className="container">
        {showAlert && <Alert message={i18n.t('chapter.edit.alert')} level="error" onClose={setAlert(false)} />}
        <form className="form-horizontal">
          <h5>{i18n.t('chapter.edit.header')}</h5>
          <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('generic.title')} placeholder={i18n.t('generic.placeholders.title')} onChange={setTitle} value={title} />
          <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.authorDescription')} placeholder={i18n.t('generic.placeholders.authorDescription')} onChange={setAuthorDescription} value={authorDescription} />
          <LabelAndField validatedOnce={validatedOnce} type="select" label={i18n.t('generic.markdown')} onChange={setMarkdown} value={markdown} options={getYesNoOptions(i18n)} />
          <LabelAndField validatedOnce={validatedOnce} min={1} type="number" label={i18n.t('generic.counter')} onChange={setCounter} value={counter} />
          <LabelAndField validatedOnce={validatedOnce} amountOfRows={mobile ? 10 : 15} type="textarea" label={i18n.t('chapter.text')} placeholder={i18n.t('chapter.placeholders.text')} onChange={setText} value={text} />
        </form>
      </div>
    </Fragment>
  );
};

ChapterEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  chapterStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(ChapterEdit);

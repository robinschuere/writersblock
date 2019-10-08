import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { addChapter, updateChapter } from '../../actions/chapter';

import Alert from '../../components/generic/alert';
import LabelAndField from '../../components/generic/labelAndField';
import BackAndSaveBar from '../../components/backAndSaveBar';
import WithNavBar from '../../components/hoc/withNavBar';
import { useField } from '../../helpers';

const ChapterEdit = ({
  computedMatch, withAuthorDescription, chapterStore, dispatch, mobile, i18n,
}) => {
  const { storyId, chapterId } = computedMatch.params;
  const chapter = !chapterId ? {} : chapterStore[chapterId];

  const [updatedChapter, setChapterFieldProps] = useField(chapter);

  const [validatedOnce, setValidatedOnce] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);

  const validateChapter = () => {
    if ([updatedChapter.title].filter(x => x).length !== 1) {
      return false;
    }
    return true;
  };

  const addOrUpdate = async () => {
    setValidatedOnce(true);
    if (validateChapter()) {
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
    return <Redirect to={`/stories/${storyId}/chapters`} />;
  }

  return (
    <Fragment>
      <BackAndSaveBar
        mobile={mobile}
        onAccept={addOrUpdate}
        onClose={() => setCompleted(true)}
        i18n={i18n}
      />
      <div className="container-fluid">
        {showAlert && <Alert message={i18n.t('chapter.edit.alert')} level="error" onClose={setAlert(false)} />}
        <form className="form-horizontal">
          <h5>{i18n.t('chapter.edit.header')}</h5>
          <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('generic.title')} placeholder={i18n.t('generic.placeholders.title')} {...setChapterFieldProps('title')} />
          {withAuthorDescription && (
            <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.authorDescription')} placeholder={i18n.t('generic.placeholders.authorDescription')} {...setChapterFieldProps('authorDescription')} />
          )}
          <LabelAndField validatedOnce={validatedOnce} min={1} type="number" label={i18n.t('generic.counter')} {...setChapterFieldProps('counter')} />
          <LabelAndField validatedOnce={validatedOnce} amountOfRows={mobile ? 10 : 15} type="textarea" label={i18n.t('chapter.text')} placeholder={i18n.t('chapter.placeholders.text')} {...setChapterFieldProps('text')} />
        </form>
      </div>
    </Fragment>
  );
};

ChapterEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  withAuthorDescription: PropTypes.bool.isRequired,
  chapterStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(ChapterEdit);

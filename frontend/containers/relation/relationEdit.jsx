import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { updateRelation, addRelation } from '../../actions/relation';
import { alphabeticalSort, formatCharacter } from '../../helpers';

import Alert from '../../components/generic/alert';
import LabelAndField from '../../components/generic/labelAndField';
import BackAndSaveBar from '../../components/backAndSaveBar';
import WithNavBar from '../../components/hoc/withNavBar';
import LabelAndText from '../../components/generic/labelAndText';

const RelationEdit = ({
  computedMatch, relationStore, characterStore, dispatch, i18n, mobile,
}) => {
  const {
    storyId, characterId, relationId,
  } = computedMatch.params;
  const formatPerson = formatCharacter(characterStore);

  const characters = Object.keys(characterStore)
    .filter(key => key !== characterId)
    .map(key => ({
      ...characterStore[key],
      value: key,
      label: formatPerson(key),
    }))
    .sort(alphabeticalSort);

  const rela = relationStore[relationId] || {};

  const [parentId, setParentId] = useState(rela.parentId || characterId);
  const [childId, setChildId] = useState(rela.childId);
  const [relation, setRelation] = useState(rela.relation);
  const [reverseRelation, setReverseRelation] = useState(rela.reverseRelation);
  const [authorDescription, setAuthorDescription] = useState(rela.authorDescription);
  const [description, setDescription] = useState(rela.description);

  const [validatedOnce, setValidatedOnce] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);

  const isRouteFromParent = parentId === characterId;

  const validateRelation = () => {
    const fieldsToCheck = [parentId, childId, relation, reverseRelation];

    if (fieldsToCheck.filter(x => x).length !== fieldsToCheck.length) {
      return false;
    }
    return true;
  };

  const addOrUpdate = async () => {
    setValidatedOnce(true);
    if (validateRelation()) {
      const updatedRelation = {
        ...rela,
        parentId,
        childId,
        relation,
        reverseRelation,
        authorDescription,
        description,
      };
      if (updatedRelation.id) {
        await updateRelation(updatedRelation, dispatch);
      } else {
        await addRelation({ ...updatedRelation, storyId }, dispatch);
      }
      setCompleted(true);
    }
    setAlert(true);
    return null;
  };

  if (completed) {
    return <Redirect to={`/stories/${storyId}/characters/${characterId}`} />;
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
        {showAlert && <Alert message={i18n.t('relation.edit.alert')} level="error" onClose={setAlert(false)} />}
        <form className="form-horizontal">
          <h5>{i18n.t('relation.edit.header')}</h5>
          {isRouteFromParent
            ? (
              <Fragment>
                <LabelAndText type="text" label={i18n.t('generic.relationParent')} placeholder={i18n.t('generic.placeholders.parent')} value={formatPerson(characterId)} />
                <LabelAndField validatedOnce={validatedOnce} required type="select" options={characters} label={i18n.t('generic.character')} placeholder={i18n.t('generic.placeholders.character')} onChange={setChildId} value={childId} />
                <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('generic.relation')} placeholder={i18n.t('generic.placeholders.relation')} onChange={setRelation} value={relation} />
                <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('generic.reverseRelation')} placeholder={i18n.t('generic.placeholders.reverseRelation')} onChange={setReverseRelation} value={reverseRelation} />
              </Fragment>
            )
            : (
              <Fragment>
                <LabelAndText type="text" label={i18n.t('generic.parent')} placeholder={i18n.t('generic.placeholders.parent')} value={formatPerson(childId)} />
                <LabelAndField validatedOnce={validatedOnce} required type="select" options={characters} label={i18n.t('generic.character')} placeholder={i18n.t('generic.placeholders.character')} onChange={setParentId} value={parentId} />
                <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('generic.relation')} placeholder={i18n.t('generic.placeholders.relation')} onChange={setReverseRelation} value={reverseRelation} />
                <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('generic.reverseRelation')} placeholder={i18n.t('generic.placeholders.reverseRelation')} onChange={setRelation} value={relation} />
              </Fragment>
            )
          }

          <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.authorDescription')} placeholder={i18n.t('generic.placeholders.authorDescription')} onChange={setAuthorDescription} value={authorDescription} />
          <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.description')} placeholder={i18n.t('generic.placeholders.description')} onChange={setDescription} value={description} />
        </form>
      </div>
    </Fragment>
  );
};

RelationEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  characterStore: PropTypes.object.isRequired,
  relationStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(RelationEdit);

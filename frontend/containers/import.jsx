import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import withNavBar from '../components/hoc/withNavBar';
import LabelAndField from '../components/generic/labelAndField';
import BackAndSaveBar from '../components/backAndSaveBar';

const Import = ({ i18n, importFromJson, mobile }) => {
  const [file, setFile] = useState();
  const [completed, setCompleted] = useState(false);
  const [importing, setImporting] = useState(false);

  const handleImport = async () => {
    if (file) {
      setImporting(true);
      await importFromJson(file);
      setCompleted(true);
    }
  };

  if (completed) {
    return <Redirect to="stories" />;
  }

  if (importing) {
    return (
      <div className="container">
        <h4>{i18n.t('generic.import.importing')}</h4>
      </div>
    );
  }

  return (
    <Fragment>
      <BackAndSaveBar
        mobile={mobile}
        onAccept={handleImport}
        onClose={() => setCompleted(true)}
        i18n={i18n}
      />
      <div className="container">
        <h4>{i18n.t('generic.import.title')}</h4>
        <p>{i18n.t('generic.import.message')}</p>
        <LabelAndField type="file" fileTypes=".wbson" label={i18n.t('generic.import.file')} onChange={setFile} />
      </div>
    </Fragment>
  );
};

Import.propTypes = {
  i18n: PropTypes.object.isRequired,
  importFromJson: PropTypes.func.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default withNavBar(Import);

import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { readFromSource } from '../../helpers/exportImport';

const VersionGenerator = ({ i18n, fileName }) => {
  const completeFileName = `${fileName}_${i18n.language}.md`;
  const [formattedValue, setFormattedValue] = useState();
  const getFile = async () => {
    const fileContent = await readFromSource(completeFileName);
    setFormattedValue(fileContent);
  };

  useEffect(() => {
    getFile();
  });

  return (
    <Fragment>
      <ReactMarkdown source={formattedValue} />
      <hr />
    </Fragment>
  );
};

VersionGenerator.propTypes = {
  i18n: PropTypes.object.isRequired,
  fileName: PropTypes.string.isRequired,
};

export default VersionGenerator;

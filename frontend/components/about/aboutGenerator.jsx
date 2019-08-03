import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import constants from '../../constants';

const AboutGenerator = ({
  i18n, sectionName,
}) => {
  const sections = Object.keys(constants.about[sectionName]);

  const renderValue = (parent, sub) => {
    switch (sub) {
      case 'title':
        return <h6>{i18n.t(`about.${sectionName}.${parent}.title`)}</h6>;
      case 'url':
        return <a href={i18n.t(`about.${sectionName}.${parent}.${sub}`)} rel="noopener noreferrer" target="_blank">{i18n.t(`about.${sectionName}.${parent}.${sub}`)}</a>;
      default:
        return <p>{i18n.t(`about.${sectionName}.${parent}.${sub}`)}</p>;
    }
  };

  const renderSection = () => sections.map((t) => {
    const values = constants.about[sectionName][t];

    return (
      <Fragment>
        <hr />
        {values.map(v => renderValue(t, v))}
      </Fragment>
    );
  });

  return (
    <Fragment>
      <h5>{i18n.t(`about.${sectionName}.title`)}</h5>
      {renderSection()}
    </Fragment>
  );
};

AboutGenerator.propTypes = {
  i18n: PropTypes.object.isRequired,
  sectionName: PropTypes.string.isRequired,
};

export default AboutGenerator;

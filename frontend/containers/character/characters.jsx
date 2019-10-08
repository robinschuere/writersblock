import React from 'react';
import PropTypes from 'prop-types';

import CharacterList from '../../components/characterList';
import WithNavBar from '../../components/hoc/withNavBar';

const Characters = (props) => {
  const { i18n } = props;

  return (
    <div className="container-fluid">
      <h4>{i18n.t('character.list.header')}</h4>
      <CharacterList {...props} />
    </div>
  );
};

Characters.propTypes = {
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(Characters);

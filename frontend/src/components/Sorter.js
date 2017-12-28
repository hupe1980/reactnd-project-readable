import React from 'react';
import PropTypes from 'prop-types';
import Tabs, { Tab } from 'material-ui/Tabs';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  sortBy: PropTypes.oneOf(['date', 'vote']).isRequired,
};

function Sorter({ sortBy, onClick }) {
  return (
    <Tabs value={sortBy} onChange={(event, value) => onClick(value)} centered>
      <Tab value="date" label="New" />
      <Tab value="vote" label="Hot" />
    </Tabs>
  );
}

Sorter.propTypes = propTypes;

export default Sorter;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SimpleForm } from './common';

const propTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.node.isRequired,
  placeholder: PropTypes.node.isRequired,
};

const defaultProps = {
  isActive: true,
};

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5em
`;

function ItemForm({
  children, isActive, placeholder, ...rest
}) {
  return (
    <div>
      {isActive ?
        <SimpleForm {...rest}>
          <FormFields>
            {children}
          </FormFields>
        </SimpleForm>
          :
        <FormFields>
          {placeholder}
        </FormFields>
        }
    </div>
  );
}

ItemForm.propTypes = propTypes;
ItemForm.defaultProps = defaultProps;

export default ItemForm;

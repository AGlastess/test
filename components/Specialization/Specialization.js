import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { SpecializationFilter } from 'components/forms';
import { FormRow, Field } from 'components/ui';
import { Delete } from 'icons';

const DeleteFieldBtn = styled(Delete)`
  position: absolute;
  top: 65%;
  right: -30px;
  transform: translateY(-50%);
  fill: #e95e5e;
  width: 23px;
  height: 23px;
  cursor: pointer;
`;

const Wrapper = styled.div`
  .delete {
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease-in;
  }

  &:hover {
    .delete {
      opacity: 1;
      visibility: visible;
    }
  }
`;

class Specialization extends React.Component {
  static propTypes = {
    field: PropTypes.object
  }

  handleDelete = (e) => {
    const { field } = this.props;
    field.onDel(e);
  }

  render() {
    const { field } = this.props;

    return (
      <Wrapper>
        <FormRow key={field.id}>
          <Field
            field={field}
            component={SpecializationFilter}
          />
          <DeleteFieldBtn className='delete' onClick={this.handleDelete} />
        </FormRow>
      </Wrapper>
    );
  }
}

export default Specialization;

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { DatePicker, Input } from 'components/forms';
import { FormRow, Field, DoubleDatePicker } from 'components/ui';
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

@observer
class Education extends React.Component {
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
        <FormRow>
          <Field
            field={field.$('title')}
            component={Input}
          />
          <DeleteFieldBtn className='delete' onClick={this.handleDelete} />
        </FormRow>
        <FormRow noPadding>
          <DoubleDatePicker>
            <Field
              noLabel
              field={field.$('from_date')}
              component={DatePicker}
            />
            <Field
              noLabel
              field={field.$('to_date')}
              component={DatePicker}
            />
          </DoubleDatePicker>
        </FormRow>
      </Wrapper>

    );
  }
}

export default Education;
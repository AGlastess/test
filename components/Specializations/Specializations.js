import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { lighten } from 'polished';

import Specialization from '../Specialization';

const AddFieldBtn = styled.span`
  display: inline-block;
  color: #1a7ce8;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: ${lighten(0.1, '#1a7ce8')}
  }
`;

const Wrapper = styled.div``;

@observer
class Specializations extends React.Component {
  static propTypes = {
    field: PropTypes.object
  }

  handleAdd = (e) => {
    const { field } = this.props;
    field.onAdd(e);
  }

  handleDelete = (e) => {
    const { field } = this.props;
    field.onDel(e);
  }

  render() {
    const { field } = this.props;

    const listItems = Array.from(field.fields.values()).map(f => (
      <Specialization key={f.id} field={f} />
    ));

    return (
      <Wrapper>
        {listItems}
        <AddFieldBtn onClick={this.handleAdd}>
          + Добавить Специализацию
        </AddFieldBtn>

      </Wrapper>
    );
  }
}

export default Specializations;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { lighten } from 'polished';

import { withTranslation } from 'react-i18next';

import Education from '../Education';

const ErrorField = styled.div`
  padding-top: 1px;
  color: #E95E5E;
  font-size: 12px;
`;

const AddFieldBtn = styled.span`
  display: inline-block;
  color: #1a7ce8;
  font-size: 14px;
  cursor: pointer;
  margin-top: 13px;

  &:hover {
    color: ${lighten(0.1, '#1a7ce8')}
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

@observer
class Educations extends React.Component {
  static propTypes = {
    form: PropTypes.object,
    t: PropTypes.func.isRequired
  }

  handleAdd = (e) => {
    const { form } = this.props;
    form.$('educations').onAdd(e);
  }

  render() {
    const { form, t } = this.props;

    let items = form.$('educations').fields.values();
    items = Array.from(items);

    const listItems = items.map(field => (
      <Education
        key={field.id}
        field={field}
      />
    ));

    return (
      <Wrapper>
        {listItems}

        <AddFieldBtn onClick={this.handleAdd}>
          + Добавить ВУЗ
        </AddFieldBtn>

        {(form.$('educations').error && form.$('educations').value.length === 0) && (
          <ErrorField>
            {t('Form.Educations.Error')}
          </ErrorField>
        )}
      </Wrapper>
    );
  }
}

export default withTranslation()(Educations);

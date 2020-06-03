import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import _debounce from 'lodash/debounce';
import { withTranslation } from 'react-i18next';
import { computed, reaction } from 'mobx';

import { SpecializationsForm } from './forms';
import { Field } from 'components/ui';
import {  Select, Form } from 'components/forms';
import { SpecializationStore } from 'stores/SpecializationStore';

const Wrapper = styled(Form)``;

@withTranslation()
@observer
class SpecializationsFilter extends React.Component {
  static propTypes = {
    filter: PropTypes.shape({
      label: PropTypes.string,
      type: PropTypes.string,
    }).isRequired,
    t: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const hooks = {
      onError: this.handleError
    };

    this.form = new SpecializationsForm({}, { hooks });
    this.specializationStore = SpecializationStore.create();
  }

  componentDidMount() {
    this._changeHandler = reaction(
      () => this.form.$(this.props.filter.type).value,
      (option) => this.handleSubmit(option)
    );
  }

  componentWillUnmount() {
    this._changeHandler();
  }

  handleError = (form) => {
    console.log(form.errors());
  }

  handleSubmit = (option) => {
    const { filter: { label, type }, onSubmit } = this.props;

    const { id: value, name } = option;

    onSubmit({ type, value, label: `${label}: ${name}` });
  }

  handleSearch = _debounce(
    (chars = '') => {
      const data = { chars };

      this.specializationStore.fetch({ data });
    },
    500
  );

  @computed get options() {
    return this.specializationStore.isFetched
      ? this.specializationStore.selectOptions
      : [];
  }

  render() {
    const { t, filter } = this.props;

    return (
      <Wrapper form={this.form}>
        <Field
          component={Select}
          dropAlign={{ top: 'bottom', left: 'left', right: 'right' }}
          emptySearchMessage={t('Doctors.Filters.Specializations.Empty')}
          searchPlaceholder={t('Doctors.Filters.Specializations.Placeholder')}
          valueKey="id"
          labelKey="name"
          items={this.options}
          onSearch={this.handleSearch}
          field={this.form.$(filter.type)}
        />
      </Wrapper>
    );
  }
}

export default SpecializationsFilter;
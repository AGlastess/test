import React from 'react';
import { observer, Provider, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import objectToFormData from 'object-to-formdata';
import _omit from 'lodash/omit';

import { DefaultLayout as Layout } from 'components/layouts';
import { DoctorForm as EditDoctorForm } from 'pages/Doctors/components';

import { DoctorForm } from 'forms';

@inject('doctorsState')
@observer
class Add extends React.Component {
  static propTypes = {
    doctorsState: PropTypes.object,
    history: PropTypes.object
  };

  constructor(props) {
    super(props);

    const hooks = {
      onSuccess: this.handleSuccess,
      onError: this.handleError
    };

    const plugins = this.plugins;
    this.doctorForm = new DoctorForm({}, { plugins, hooks });
  }

  handleSuccess = (form) => {
    const { doctorsState } = this.props;

    let data = form.values();
    data = _omit(data, 'avatar');
    data = objectToFormData({ data });

    const file = form.$('avatar').files && form.$('avatar').files[0];

    if (file) {
      data.append('data[avatar]', file);
    }

    doctorsState
      .add(data)
      .then(() => this.navigateTo('/doctors'));
  };

  handleError = (form) => {
    console.log(form.errors());
  };

  navigateTo = (store) => {
    const { history } = this.props;
    history.replace(store);
  };

  render() {
    return (
      <Provider
        doctorForm={this.doctorForm}
      >
        <Layout.OffcanvasRight>
          <EditDoctorForm />
        </Layout.OffcanvasRight>
      </Provider>
    );
  }
}

export default Add;

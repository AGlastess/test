import React from 'react';
import PropTypes from 'prop-types';
import { computed, reaction } from 'mobx';
import { observer, Provider, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import objectToFormData from 'object-to-formdata';
import _omit from 'lodash/omit';

import { DefaultLayout as Layout } from 'components/layouts';
import { DoctorForm as EditDoctorForm } from 'pages/Doctors/components';

import { DoctorForm } from 'forms';
import DoctorStore from 'stores/DoctorsStore/DoctorStore';

@withRouter
@inject('doctorsState')
@observer
class Edit extends React.Component {
  static propTypes = {
    doctorsState: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
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

    this.doctorStore = DoctorStore.create();
  }

  @computed get isFetched() {
    return this.doctorStore.isFetched;
  }

  componentDidMount() {
    this.fetchDoctorReaction = reaction(
      () => this.doctorStore.isFetched,
      (isFetched) => isFetched && this.populateForm()
    );

    this.fetchDoctor();
  }

  componentWillUnmount() {
    this.fetchDoctorReaction();
  }

  componentDidUpdate(prevProps) {
    const currId = this.props.match.params.id;
    const prevId = prevProps.match.params.id;

    if (currId !== prevId) {
      this.fetchDoctor();
    }
  }

  fetchDoctor = () => {
    const { match: { params: { id } } } = this.props;
    this.doctorStore.fetch(id);
  };

  populateForm = () => {
    if (this.doctorStore.data) {
      const values = this.doctorStore.data.toJSON();
      this.doctorForm.update(values);
    }
  };

  handleSuccess = (form) => {
    const { match: { params: { id } } } = this.props;

    let data = form.values();
    data = _omit(data, 'avatar');
    data = objectToFormData({ data });

    const file = form.$('avatar').files && form.$('avatar').files[0];

    if (file) {
      data.append('data[avatar]', file);
    }

    this.doctorStore.update(id, data)
      .then(() => this.navigateTo('/doctors'))
      .then(() => this.refreshDoctorsList());
  };

  handleError = (form) => {
    console.log(form.errors());
  };

  refreshDoctorsList = () => {
    const { doctorsState } = this.props;
    doctorsState.fetch();
  };

  navigateTo = (store) => {
    const { history } = this.props;
    history.replace(store);
  };

  render() {
    return (
      <Provider doctorForm={this.doctorForm}>
        <Layout.OffcanvasRight>
          <EditDoctorForm isFetching={!this.isFetched} />
        </Layout.OffcanvasRight>
      </Provider>
    );
  }
}

export default Edit;

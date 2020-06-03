import React from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { observer, Provider } from 'mobx-react';

import DoctorStore from 'stores/DoctorsStore/DoctorStore';
import Details from './Details';

@observer
class Show extends React.Component {
  static propTypes = {
    match: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.doctorStore = DoctorStore.create();
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    this.doctorStore.fetch(id);
  }

  componentWillUnmount() {
    this.doctorStore.clear();
  }

  @computed get hasDoctor() {
    return !!this.doctorStore.data;
  }

  render() {
    if (!this.hasDoctor) {
      return <div>Fetching</div>;
    }

    return (
      <Provider doctorStore={this.doctorStore}>
        <Details />
      </Provider>
    );
  }
}

export default Show;

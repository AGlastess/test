import React from 'react';
import { computed } from 'mobx';
import { observer, Provider, PropTypes } from 'mobx-react';
import DoctorsStore from 'stores/DoctorsStore';

@observer
class Body extends React.Component {
  static propTypes = {
    key: PropTypes.key,
  };

  constructor(props) {
    super(props);

    this.doctorsStore = DoctorsStore.create();
  }

  @computed get isFetched() {
    return !!this.doctorsStore.data;
  }

  render() {
    return (
      <Provider doctorsStore={this.doctorsStore}>
        <div>
          Body
        </div>
      </Provider>
    );
  }
}

export default Body;

import React from 'react';
import { computed } from 'mobx';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import { doctorsStorePropType } from 'types/react-prop-types';

import DoctorsList from './DoctorsList';
import DoctorItem from './DoctorItem';

import { Pagination } from 'components/ui';

const limit = 10;

const Wrapper = styled.div``;

@withRouter
@inject('doctorsState')
@observer
class Doctors extends React.Component {
  static propTypes = {
    doctorsState: doctorsStorePropType,
    location: PropTypes.object.isRequired
  };

  @computed get doctorsList() {
    const { doctors } = this.props.doctorsState;
    return doctors;
  }
  
  @computed get total() {
    const { doctorsState } = this.props;
    return doctorsState.totalLength;
  }

  handlePageChange = (page) => {
    const { doctorsState, location } = this.props;
    
    if (location.pathname === '/doctors') {
      doctorsState.fetch(page);
    }
  };

  render() {
    const doctors = this.doctorsList.map((doctor, index) => (
      <DoctorItem
        key={index}
        doctor={doctor}
      />
    ));

    const totalPages = Math.floor(this.total / limit) + 1;
    
    return (
      <Wrapper>
        <DoctorsList>
          {doctors}
        </DoctorsList>

        {totalPages >= 1 && (
          <Pagination
            total={totalPages}
            onChange={this.handlePageChange}
          />
        )}
      </Wrapper>
    );
  }
}

export default Doctors;

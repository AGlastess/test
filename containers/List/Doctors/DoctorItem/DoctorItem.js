import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { computed } from 'mobx';
import { observer, inject } from 'mobx-react';

import { TableRow, TableBodyCell } from 'components/tables/Table';
import { Ellipsis } from 'icons';

import { shortName } from 'utils/names';

const EllipsisIcn = styled(Ellipsis)`
  width: 40px;
  height: 15px;
`;

const Wrapper = styled(TableRow)``;

@inject('doctorsState')
@observer
class DoctorItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    doctor: PropTypes.object.isRequired,
    doctorsState: PropTypes.object.isRequired,
    t: PropTypes.func
  };

  @computed get page() {
    const { doctorsState } = this.props;
    return doctorsState.currentPage;
  }

  render() {
    const { doctor, t, ...rest } = this.props;
    const { id, specializations, organization, experience } = doctor;
    const fullName = shortName(doctor);

    return (
      <Wrapper
        {...rest}
        link={`/doctors/${id}/edit?page=${this.page}`}
      >
        <TableBodyCell className='nowrap'>
          {fullName}
        </TableBodyCell>

        <TableBodyCell>
          {specializations.map(({ name }) => name).join(', ')}
        </TableBodyCell>

        <TableBodyCell>
          {organization !== null ? organization.title : '-'}
        </TableBodyCell>

        <TableBodyCell className='nowrap'>
          {experience.description}
        </TableBodyCell>

        <TableBodyCell>
          <EllipsisIcn />
        </TableBodyCell>
      </Wrapper>
    );
  }
}

export default styled(withTranslation()(DoctorItem))``;

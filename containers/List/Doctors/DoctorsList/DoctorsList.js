import React from "react";
import PropTypes from "prop-types";
import { Table, TableHead, TableHeadCell, TableBody } from "components/tables";

const headers = [
  { key: 1, name: 'Имя' },
  { key: 2, name: 'Специализация' },
  { key: 3, name: 'Место работы' },
  { key: 4, name: 'Стаж' },
  // { key: 5, name: 'Статус врача' },
  { key: 5, name: '' }
];

class DoctorsList extends React.Component {
  render() {
    const { children } = this.props;

    const tableHeaders = headers.map(item => (
      <TableHeadCell key={item.key}>{item.name}</TableHeadCell>
    ));

    return (
      <Table>
        <TableHead>{tableHeaders}</TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    );
  }
}

DoctorsList.propTypes = {
  children: PropTypes.array.isRequired
};

export default DoctorsList;

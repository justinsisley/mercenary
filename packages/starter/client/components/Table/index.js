import React from 'react';
import propTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import TablePlaceholder from '../TablePlaceholder';

export default function DataTable(props) {
  if (!props.data.length) {
    return <TablePlaceholder />;
  }

  const headers = Object.keys(props.data[0]).map((header) => {
    return <Table.HeaderCell key={header}>{header}</Table.HeaderCell>;
  });

  const rows = props.data.map((row, idx1) => {
    const cells = Object.keys(row).map((header, idx2) => {
      const key = `cell-${header}-${idx1}-${idx2}`;

      return <Table.Cell key={key}>{row[header]}</Table.Cell>;
    });

    const key = `row-${idx1}`;

    return <Table.Row key={key}>{cells}</Table.Row>;
  });

  return (
    <Table singleLine selectable>
      <Table.Header>
        <Table.Row>
          {headers}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rows}
      </Table.Body>
    </Table>
  );
}

DataTable.propTypes = {
  data: propTypes.arrayOf(propTypes.shape()),
};

DataTable.defaultProps = {
  data: [],
};

import React from 'react';
import { Table } from 'semantic-ui-react';
import styles from './styles';

export default class TablePlaceholder extends React.Component {
  getPlaceholder = () => {
    const width = Math.floor(Math.random() * 70) + 20;

    return (
      <div className={styles.placeholder} style={{ width: `${width}%` }} />
    );
  }

  render() {
    const rows = [...Array(Math.floor(Math.random() * 8) + 3)].map((val, idx) => {
      const key = `placeholder-row-${idx}`;

      return (
        <Table.Row key={key}>
          <Table.Cell>{this.getPlaceholder()}</Table.Cell>
          <Table.Cell>{this.getPlaceholder()}</Table.Cell>
          <Table.Cell>{this.getPlaceholder()}</Table.Cell>
        </Table.Row>
      );
    });

    return (
      <Table singleLine selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{this.getPlaceholder()}</Table.HeaderCell>
            <Table.HeaderCell>{this.getPlaceholder()}</Table.HeaderCell>
            <Table.HeaderCell>{this.getPlaceholder()}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows}
        </Table.Body>
      </Table>
    );
  }
}

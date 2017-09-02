import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Bar, Bubble, Doughnut, HorizontalBar, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import { bar, bubble, doughnut, horizontalBar, line, pie, polar, radar } from './data';

function Charts() {
  return (
    <Grid columns={16}>
      <Grid.Row>
        <Grid.Column width={8}>
          <Bar data={bar} />
        </Grid.Column>

        <Grid.Column width={8}>
          <Bubble data={bubble} />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={8}>
          <Doughnut data={doughnut} />
        </Grid.Column>

        <Grid.Column width={8}>
          <HorizontalBar data={horizontalBar} />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={8}>
          <Line data={line} />
        </Grid.Column>

        <Grid.Column width={8}>
          <Pie data={pie} />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={8}>
          <Polar data={polar} />
        </Grid.Column>

        <Grid.Column width={8}>
          <Radar data={radar} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Charts;

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './index';

const buttonText = 'Click Me';
const onClick = action('clicked');

const story = storiesOf('Button', module);

story.add('basic', () => (
  <Button onClick={onClick}>
    {buttonText}
  </Button>
));

story.add('blue', () => (
  <Button onClick={onClick} color="blue">
    {buttonText}
  </Button>
));

story.add('green', () => (
  <Button onClick={onClick} color="green">
    {buttonText}
  </Button>
));

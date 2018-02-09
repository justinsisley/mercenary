import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './index';

const buttonText = 'Click Me';
const onClick = action('clicked');

storiesOf('Button', module)
  .add('basic', () => (
    <Button onClick={onClick}>
      {buttonText}
    </Button>
  ))
  .add('blue', () => (
    <Button onClick={onClick} color="blue">
      {buttonText}
    </Button>
  ))
  .add('green', () => (
    <Button onClick={onClick} color="green">
      {buttonText}
    </Button>
  ));

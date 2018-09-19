import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { ButtonComponent } from '../src/Button';

storiesOf('My Button', module)
  .add('with some emoji', () => ({
    component: ButtonComponent,
    props: {
      label: '😀 😎 👍 💯',
    },
  }))
  .add('with some emoji and action', () => ({
    component: ButtonComponent,
    props: {
      label: '😀 😎 👍 💯',
      click: action('clicked'),
    },
  }));
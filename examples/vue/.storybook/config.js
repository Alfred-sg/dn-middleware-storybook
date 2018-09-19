import { configure } from '@storybook/vue';

// import Vue from 'vue';
//import Mybutton from '../src/Button.vue';

//Vue.component('my-button', Mybutton);

const req = require.context('../stories', true, /\.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
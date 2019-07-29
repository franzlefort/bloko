import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import Environment from '../services/environment';
import modules from './modules';
import plugins from './plugins';

Vue.use(Vuex);

const store: StoreOptions<any> = {
  state: {
    version: '1.0.0',
  },
  modules,
  plugins,
  strict: !Environment.isProduction,
};

export default new Vuex.Store(store);

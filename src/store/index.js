import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { crudHelper } from './crud.helper';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    crudHelper
  }
});

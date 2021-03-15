import Vue from 'vue';
import CoreuiVue from '@coreui/vue';
import 'bootstrap';
import App from './App.vue';
import router from './router';

Vue.use(CoreuiVue);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

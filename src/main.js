import Vue from 'vue';
import globalFunctions from '@/utils/globalFunction';
import VueGeolocation from 'vue-browser-geolocation';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/css/reset.css';
import '@/assets/css/common.css';
import '@/assets/css/font.css';

Vue.config.productionTip = false;

// 전역으로 사용될 공통 함수
Vue.use(globalFunctions);
Vue.use(VueGeolocation);

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');

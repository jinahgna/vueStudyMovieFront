import Vue from 'vue';
import globalFunctions from '@/utils/globalFunction';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/css/reset.css';
import '@/assets/css/common.css';
import '@/assets/css/font.css';
import 'swiper/css/swiper.css';

Vue.config.productionTip = false;

// 전역으로 사용될 공통 함수
Vue.use(globalFunctions);
Vue.use(VueAwesomeSwiper);

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
